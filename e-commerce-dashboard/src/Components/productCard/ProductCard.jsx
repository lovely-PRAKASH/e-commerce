import React, { useContext, useState, useEffect } from "react";
import Rating from "@mui/material/Rating";
import { Button, IconButton, Checkbox } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { AiOutlineFullscreen } from "react-icons/ai";
import ProductModel from "../productModel/ProductModel";
import { myContext } from "../../App";
import { toast, Bounce } from "react-toastify";
import { FaMinus, FaPlus } from "react-icons/fa6";

const ProductCard = ({ product, expanded = false }) => {
  const [isOpenProductModel, setIsOpenProductModel] = useState(false);
  const { cartItems, setCartItems, convertedRate, currencySymbol } = useContext(myContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const [qty, setQty] = useState(1); // Initialize quantity

  useEffect(() => {
    const itemInCart = cartItems.some((item) => item.product._id === product._id);
    setIsFavorite(itemInCart);
  }, [cartItems, product._id]);

  const viewProductDetail = () => {
    setIsOpenProductModel(true);
  };

  const closeProductModel = () => {
    setIsOpenProductModel(false);
  };

  const handleFavoriteToggle = (product) => {
    const itemExist = cartItems.find((item) => item.product._id === product._id);
    if (!itemExist) {
      const newItem = { product, qty: 1 };
      setCartItems((state) => [...state, newItem]);
      toast.success(`${product.name} added to favorites`, { theme: "colored" });
      setIsFavorite(true);
    } else {
      const updatedCart = cartItems.filter((item) => item.product._id !== product._id);
      setCartItems(updatedCart);
      toast.info(`${product.name} removed from favorites`, { theme: "colored" });
      setIsFavorite(false);
    }
  };

  const minus = () => {
    if (qty > 1) setQty((prevQty) => prevQty - 1);
  };

  const plus = () => {
    if (qty < product.stock) {
      setQty((prevQty) => prevQty + 1);
    } else {
      toast.error("You reached the maximum stock limit", { theme: "colored" });
    }
  };

  const addToCart = () => {
    const itemExist = cartItems.find((item) => item.product._id === product._id);
    if (!itemExist) {
      const newItem = { product, qty };
      setCartItems((state) => [...state, newItem]);
      toast.success(`${product.name} added to cart`, { theme: "colored" });
    } else {
      toast.info(`${product.name} is already in the cart`, { theme: "colored" });
    }
  };
  return (
    <>
      <div className="productItem">
        <div className="imgwrapper">
          <img src={`/products/${product?.images?.[0]?.image}`} 
          // alt="No image found"
          // onerror="this.src='/products/defaultImage.jpg'"
          />
          <span className={`badge ${product.offers <= 50 ? "badge-primary" : "badge-error"}`}>
            {product.offers}%
          </span>
          <div className="actions">
            <Button className="zoom" onClick={viewProductDetail}>
              <AiOutlineFullscreen />
            </Button>
            <IconButton aria-label="add to favorites" onClick={() => handleFavoriteToggle(product)}>
              <Checkbox
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite sx={{ color: "red" }} />}
                checked={isFavorite}
              />
            </IconButton>
          </div>
        </div>
        <div className="info">
          <h4 onClick={viewProductDetail}>
            {product?.name?.length > 20 ? `${product.name.substr(0, 15)}...` : product?.name}
          </h4>
            <Rating name="size-small" value={product.ratings} size="small" precision={0.5} readOnly />
          <div className="d-flex align-items-center">
            <span className={`stock ${product.stock > 0 ? "text-success" : "text-danger"}`}>
              {product.stock > 0 ? "IN STOCK" : "OUT OF STOCK"}
            </span>
          </div>
          <div className="price">
            <del className="oldPrice">
              {currencySymbol}&nbsp;{Number(product?.price * convertedRate * 2).toFixed(2)}
            </del>
            <span className="newPrice text-danger ml-1">
            {currencySymbol}&nbsp;{Number(product?.price * convertedRate).toFixed(2)}
            </span>
          </div>
          {expanded && (
            <div className="moreDetails">
              <p>{product?.description}</p>
              <p>Category: {product?.category}</p>
              <p>Stock: {product?.stock}</p>
            </div>
          )}
        </div>
        <div className="d-flex flex-column align-items-center">
          <div className="ProductQuantityDrop d-flex mb-2 align-items-center">
            <Button onClick={minus}>
              <FaMinus />
            </Button>
            <input type="text" value={qty} className="mx-2 text-center" readOnly />
            <Button style={{fontSize:"12px",outline:"none"}} onClick={plus}>
              <FaPlus />
            </Button>
          </div>
          <Button
          style={{outline:"none"}}
            className="d-flex flex-row mb-1"
            variant="outlined"
            disabled={product.stock === 0}
            onClick={addToCart}
          >
            Add to cart
          </Button>
        </div>
      </div>
      {isOpenProductModel && <ProductModel closeProductModel={closeProductModel} product={product} />}
    </>
  );
};

export default ProductCard;
