const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET);
const BASE_URL = process.env.FRONTEND_URL;


exports.createPayment = async (req, res) => {
    try {
        const { CartItems } = req.body;

        if (!CartItems || !Array.isArray(CartItems)) {
            return res.status(400).json({ message: "Invalid CartItems data" });
        }

        // Construct line items for Stripe payment
        const lineItems = CartItems.map(cartItem => {
            // Fallback URL in case image is missing or invalid
            const productImage = 'https://via.placeholder.com/150'; //cartItem.product.images?.[0]?.image || 'https://via.placeholder.com/150'

            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: cartItem.product.name,
                        images: [productImage], // Ensure a valid URL is passed
                    },
                    unit_amount: Math.round(cartItem.product.price * 100), // Stripe expects price in cents
                },
                quantity: cartItem.qty,
            };
        });

        if (process.env.NODE_ENV === "production") {
            BASE_URL = `${req.protocol}://${req.get('host')}`; // Dynamically construct in production
            console.log("Updated payment URL for Production:", BASE_URL);
        }

        const successUrl = `${BASE_URL}/success`;
        const cancelUrl = `${BASE_URL}/cancel`;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: successUrl,
            cancel_url: cancelUrl,
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error("Stripe Error:", error);
        res.status(500).json({ message: "Payment creation failed" });
    }
};
