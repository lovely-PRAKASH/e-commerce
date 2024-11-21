import React, { useContext, useEffect, useRef, useState } from "react";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import { IoMdClose } from "react-icons/io";
import Slide from "@mui/material/Slide";
import Rating from "@mui/material/Rating";
import Slider from "react-slick";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import InnerImageZoom from "react-inner-image-zoom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import { myContext } from "../../App";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ProductModel = ({ closeProductModel, product }) => {
  const zoomSliderBig = useRef();
  const zoomSlider = useRef();
  const {cartItems, setCartItems, dollerToRupees=61.06} = useContext(myContext);
  const [qty, setqty] = useState(1);


  useEffect(() => {
    const itemInCart = cartItems.find(
      (item) => item.product._id === product._id
    );
    if (itemInCart) {
      setqty(itemInCart.qty); 
    } else {
      setqty(1); 
    }
  }, [product, cartItems]);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    fade: false,
    arrow: true,
  };

  const settings2 = {
    dots: false,
    infinite: false,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: false,
    arrow: false,
  };

  const goto = (index) => {
    zoomSlider.current.slickGoTo(index);
    zoomSliderBig.current.slickGoTo(index);
  };

  const minus = () => {
    if (qty > 1) {
      setqty((prevQty) => prevQty - 1);
    }
  };

  const plus = () => {
    if (qty < product.stock) {
      setqty((prevQty) => prevQty + 1);
    } else {
      toast.error("You reached the maximum stock limit", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  function addToCart() {
    const itemExist = cartItems.find(
      (item) => item.product._id === product._id
    );

    if (!itemExist) {
      const newItem = { product, qty };
      setCartItems((prevItems) => [...prevItems, newItem]);
      toast.success(`${product.name} is successfully added to cart`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    } else {
      toast.error(`${product.name} is already added to cart`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  }

  return (
    <Dialog
      open={true}
      onClose={closeProductModel}
      className="productModel"
      TransitionComponent={Transition}
    >
      <div className="p-3">
        <h1 className="text-center">{product.name}</h1>
        <Button className="close_ position-absolute" onClick={() => closeProductModel()}>
          <IoMdClose />
        </Button>

        <div className="d-flex flex-wrap justify-content-evenly align-items-center">
          <div className="d-flex align-items-center">
            <span>Brands:</span>
            <span className="ml-2 mr-2">
              <b>{product?.seller || "GoCart"}</b>
            </span>
            <span classname="ml-2">category:</span>
            <span className="ml-2 mr-3">
              <b>{product?.category || "No category"}</b>
            </span>
          </div>
          <Rating
            name="size-small"
            value={product.ratings}
            size="small"
            precision={0.5}
            readOnly
          />
                    <span className="ml-1">
            <b>{product?.ratings} <i>by</i> </b>
          </span>
          <span className="ml-2">
            <b>{product?.count} customers</b>
          </span>
        </div>

        <hr />

        <div className="row mt-2 productDetailModal">
          <div className="col-md-5 col-12 mb-4">
            <div className="productZoom">
              {/* Main Zoom Slider */}
              <Slider {...settings2} className="zoomSliderBig" ref={zoomSliderBig}>
                {product.images && product.images.length > 0 ? (
                  product.images.map((img, index) => (
                    <div className="item" key={img._id}>
                      <InnerImageZoom
                        zoomType="hover"
                        zoomScale={1.5}
                        src={`/products/${img.image}`}
                        alt={product.name}
                        className="w-100"
                      />
                    </div>
                  ))
                ) : (
                  <p>No images available</p>
                )}
              </Slider>

              {/* Thumbnail Slider */}
              <Slider {...settings} className="zoomSlider" ref={zoomSlider}>
                {product.images && product.images.length > 0 ? (
                  product.images.map((img, index) => (
                    <div className="item" key={img._id}>
                      <img
                        src={`/products/${img.image}`}
                        onClick={() => goto(index)}
                        className="w-100"
                        alt={`Thumbnail of ${product.name}`}
                      />
                    </div>
                  ))
                ) : (
                  <p>No thumbnails available</p>
                )}
              </Slider>
            </div>
          </div>

          <div className="col-md-7 col-12">
            <div className="d-flex align-items-center mb-3">
              <del className="oldPrice lg">
                <span>
                  ₹ {Number(product.price * dollerToRupees * 2).toFixed(2)}{" "}
                </span>
              </del>
              <span className="newPrice lg text-danger ml-2">
                ₹ {Number(product.price * dollerToRupees).toFixed(2)}
              </span>
            </div>
            <span
              className={`stock mt-2 ${
                product.stock > 0 ? "text-success bg-success" : "text-danger"
              }`}
            >
              {product.stock > 0 ? "IN STOCK " : `OUT OF STOCK`}
            </span>
            <p className="mt-2">{product.description}</p>
            <div className="d-flex align-items-center mt-3">
              <div className="quantityDrop d-flex align-items-center">
                <Button style={{ outline: "none" }} onClick={minus}>
                  <FaMinus />
                </Button>
                <input type="text" value={qty} className="mx-2 text-center" readOnly />
                <Button style={{ outline: "none" }} onClick={plus}>
                  <FaPlus />
                </Button>
              </div>

              <Button
                variant="contained"
                disabled={product.stock === 0}
                className="ml-2"
                style={{ outline: "none" }}
                onClick={addToCart}
              >
                Add to cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ProductModel;
