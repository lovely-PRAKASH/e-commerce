import React, { useContext, useState, useEffect } from "react";
import Rating from "@mui/material/Rating";
import { Button, IconButton, Checkbox } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { AiOutlineFullscreen } from "react-icons/ai";
import ProductModel from "../productModel/ProductModel";
import { myContext } from "../../App";
import { toast, Bounce } from "react-toastify"; // For notifications

const ProductCard = ({ product, expanded }) => {
  const [isOpenProductModel, setIsOpenProductModel] = useState(false);
  const { cartItems, setCartItems, dollerToRupees=61.06} = useContext(myContext); // Access context
  const [isFavorite, setIsFavorite] = useState(false);

  // Check if the item is already in the cart (favorite)
  useEffect(() => {
    const itemInCart = cartItems.some(
      (item) => item.product._id === product._id
    );
    setIsFavorite(itemInCart);
  }, [cartItems, product._id]);

  const viewProductDetail = () => {
    setIsOpenProductModel(true);
  };

  const closeProductModel = () => {
    setIsOpenProductModel(false);
  };

  const handleFavoriteToggle = (product) => {
    const itemExist = cartItems.find(
      (item) => item.product._id === product._id
    );

    if (!itemExist) {
      // Add product to the cart
      const newItem = { product, qty: 1 };
      setCartItems((state) => [...state, newItem]);
      toast.success(`${product.name} is successfully added to cart`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      setIsFavorite(true); // Mark as favorite
    } else {
      // Remove product from the cart
      const updatedCart = cartItems.filter(
        (item) => item.product._id !== product._id
      );
      setCartItems(updatedCart);
      toast.info(`${product.name} is removed from the cart`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      setIsFavorite(false); // Unmark as favorite
    }
  };

  return (
    <>
      <div className="productItem">
        <div className="imgwrapper">
          <img
            src={product?.images?.[0].image || "default-image.jpg"}
            alt="Product"
          />
          <span
            className={`badge ${
              product.offers <= 50 ? "badge-primary" : "badge-error"
            }`}
          >
            {product.offers}%
          </span>

          <div className="actions">
            <Button className="zoom" onClick={viewProductDetail}>
              <AiOutlineFullscreen />
            </Button>
            <IconButton
              aria-label="add to favorites"
              onClick={() => handleFavoriteToggle(product)}
            >
              <Checkbox
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite sx={{ color: "red" }} />}
                checked={isFavorite}
                sx={{
                  color: isFavorite ? "red" : "primary",
                }}
              />
            </IconButton>
          </div>
        </div>
        <div className="info">
          <h4 onClick={viewProductDetail}>
            {product.name.length > 20
              ? product.name.substr(0, 15) + "..."
              : product.name}
          </h4>
          <span
            className={`stock d-block mt-2 mb-2 ${
              product.stock > 0 ? "text-success" : "text-danger"
            }`}
          >
            {product.stock > 0 ? "IN STOCK" : "OUT OF STOCK"}
          </span>
          <Rating
            name="size-small"
            value={product.ratings}
            size="small"
            precision={0.5}
            readOnly
          />
          <div className="price ml-1">
            <del className="oldPrice">
              <span>
              {/* ₹ {product.price} */}
                ₹{Number((product.price * dollerToRupees) * 2).toFixed(2)}
              </span>
            </del>
            <span className="newPrice text-danger ml-1">
            {/* ₹ {product.price} */}
              ₹{Number(product.price * dollerToRupees).toFixed(2)}
            </span>
          </div>
          {/* Show more details if expanded */}
          {expanded && (
            <div className="moreDetails mt-2">
              <p>{product.description}</p>
              <p>Category: {product.category}</p>
              <p>Stock: {product.stock}</p>
            </div>
          )}
        </div>
      </div>

      {isOpenProductModel && (
        <ProductModel closeProductModel={closeProductModel} product={product} />
      )}
    </>
  );
};

export default ProductCard;
