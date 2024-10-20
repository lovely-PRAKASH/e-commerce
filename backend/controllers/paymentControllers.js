const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET);

exports.createPayment = async (req, res) => {
    try {
        const { CartItems } = req.body;

        if (!CartItems || !Array.isArray(CartItems)) {
            return res.status(400).json({ message: "Invalid CartItems data" });
        }

        // Construct line items for Stripe payment
        const lineItems = CartItems.map(cartItem => {
            // Fallback URL in case image is missing or invalid
            const productImage = cartItem.product.images?.[0]?.image || 'https://via.placeholder.com/150';

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

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: 'http://localhost:5173/success',
            cancel_url: 'http://localhost:5173/failure',
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error("Stripe Error:", error);
        res.status(500).json({ message: "Payment creation failed" });
    }
};
 