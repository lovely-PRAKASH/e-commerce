import React, { useEffect, useState } from "react";
import { RiMenu3Fill } from "react-icons/ri";
import { FaAngleDown } from "react-icons/fa";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { LiaAngleRightSolid } from "react-icons/lia";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";

const NavBar = () => {
  const [navBarToggle, setNavBarToggle] = useState(false);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >=768);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_API_URL + "/products");
        const data = await response.json();
        setProducts(data.products);
        const uniqueCategory = [
          ...new Set(data.products.map((product) => product.category)),
        ];
        setCategories(uniqueCategory);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();

    // Event listener for resizing the window
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  

  return (
    <nav className="container-fluid">
      <div className="container">
        <div className="row">
          {/* ALL CATEGORIES Button - visible on small screens */}
          {!isLargeScreen && (
            <div className="col-sm-6 navpart1">
              <div className="catwrapper">
                <Button
                  className="allCatTab align-items-center"
                  onClick={() => setNavBarToggle(!navBarToggle)}
                >
                  <span className="icon1">
                    <RiMenu3Fill />
                  </span>
                  <span className="text">ALL CATEGORIES</span>
                  <span className="icon2 ml-2">
                    <FaAngleDown />
                  </span>
                </Button>
                <div className={`sideNavbar ${navBarToggle ? "open" : ""}`}>
                  <ul>
                    {navBarToggle &&
                      categories.map((category, index) => {
                        const categoryProducts = products.filter(
                          (product) => product.category === category
                        );
                        const randomColor = getRandomColor();
                        return (
                          <li key={index}>
                            <Link to="/ ">
                              <Button style={{ backgroundColor: randomColor }} >
                                {category}
                                <LiaAngleRightSolid className="ml-auto" />
                              </Button>
                            </Link>
                            <div className="subMenu">
                              {categoryProducts.length > 0 ? (
                                <ul>
                                  {categoryProducts.map((product) => (
                                    <Link
                                      key={product._id}
                                      to={`/search?keyword=${product.name}`}
                                    >
                                      <li>{product.name}</li>
                                    </Link>
                                  ))}
                                </ul>
                              ) : (
                                <span>No products</span>
                              )}
                            </div>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Conditionally render navpart2 only for large screens */}
          {isLargeScreen && (
            <div className="col-sm-12 navpart2 d-flex align-items-center">
              <Swiper
                slidesPerView={9}
                spaceBetween={0}
                navigation={true}
                breakpoints={{
                  640: { slidesPerView: 2, spaceBetween: 10 },
                  768: { slidesPerView: 3, spaceBetween: 30 },
                  1024: { slidesPerView: 4, spaceBetween: 40 },
                }}
                modules={[Navigation]}
                className="mySwiper"
              >
                {categories.map((category, index) => {
                  const categoryProducts = products.filter(
                    (product) => product.category === category
                  );
                        // Generate a random color for each category
      const randomColor = getRandomColor();
                  return (
                    <SwiperSlide key={index}>
                      <div className="category" >
                        <Link to="/ ">
                          <Button variant="contained" style={{ backgroundColor: randomColor }} >
                            {category}
                            <LiaAngleRightSolid className="ml-auto" />
                          </Button>
                        </Link>
                        <div className="subMenu">
                          {categoryProducts.length > 0 ? (
                            <ul>
                              {categoryProducts.map((product) => (
                                <Link
                                  key={product._id}
                                  to={`/search?keyword=${product.name}`}
                                >
                                  <li>{product.name}</li>
                                </Link>
                              ))}
                            </ul>
                          ) : (
                            <span>No products</span>
                          )}
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
