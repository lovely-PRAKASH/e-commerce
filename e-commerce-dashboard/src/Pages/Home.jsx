import React, { useEffect, useState } from "react";
import HomeBanner from "../Components/homeBanner/HomeBanner";
import banner from "../../src/assets/sideBanner.jpg";
import banner2 from "../../src/assets/Banner2.jpg";
import banner3 from "../../src/assets/Banner3.jpg";
import banner4 from "../../src/assets/Banner4.jpg";

import { Button, LinearProgress, CircularProgress } from "@mui/material";
import { BsArrowRight } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ProductCard from "../Components/productCard/ProductCard.jsx";
import "swiper/css/navigation";
import "swiper/css";
import { useLocation, useSearchParams } from "react-router-dom";
import Footer from "./Footer.jsx";
import NavBar from "../Components/Header/Navigation/NavBar.jsx";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParms, setSearchParms] = useSearchParams();
  const [expandedView, setExpandedView] = useState(false); // State to track expanded view
  const location = useLocation();
  // when route search is active banner is hidden
  const showBanner = location.pathname !== "/search";
  {/*  when route like cart, profile, search navbar is hidden*/ }
  const showNavbar = location.pathname !== '/cart' && location.pathname !== '/profile' && location.pathname !== '/search';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          import.meta.env.VITE_API_URL + "/products?" + searchParms
        );
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParms]);

  const toggleViewAll = () => {
    setExpandedView(!expandedView); // Toggle expanded state
  };

  return (
    <>
      {
        showNavbar && <NavBar />
      }
      {
        showBanner && <HomeBanner />
      }

      {loading ? (<LinearProgress size={54} color="info" />) : (
        <section className="homeProducts">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-4 mb-4 d-none d-md-block">
                {/* Side Banners */}
                <div className="banner mb-2">
                  <img src={banner} alt="side banner" className="cursor w-100" />
                </div>
                <div className="banner mt-4 mb-3">
                  <img src={banner2} alt="side banner" className="cursor w-100" />
                </div>
                <div className="banner">
                  <img src={banner3} alt="side banner" className="cursor w-100" />
                </div>
                <div className="banner mt-4">
                  <img src={banner4} alt="side banner" className="cursor w-100" />
                </div>
              </div>

              <div className="col-lg-9 col-md-8">
                {/* Best Sellers Section */}
                <div className="d-flex align-items-center mb-4">
                  <div className="info w-75">
                    <h3 className="hd mb-0">BEST SELLERS</h3>
                    <p className="text-light text-sml mb-0">
                      Do not miss the current offers until the end of March.
                    </p>
                  </div>
                  <Button className="viewAllBtn ml-auto" onClick={toggleViewAll}>
                    {expandedView ? "Show Less" : "View Detail"} <BsArrowRight />
                  </Button>
                </div>
                {loading ? (
                  <LinearProgress size={54} color="info" />
                ) : (<div className="product_row w-100">
                  <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    breakpoints={{
                      640: { slidesPerView: 2, spaceBetween: 20 },
                      768: { slidesPerView: 3, spaceBetween: 30 },
                      1024: { slidesPerView: 4, spaceBetween: 40 },
                    }}
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                  >
                    {products.map((product) => (
                      <SwiperSlide key={product.id}>
                        <ProductCard
                          product={product}
                          expanded={expandedView} // Pass expanded state to ProductCard
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>)}

                {/* {loading ? <div>Loading...</div> : <div>Products loaded</div>} */}


                {/* New Products Section */}
                <div className="d-flex align-items-center mt-4 mb-4">
                  <div className="info w-75">
                    <h3 className="hd mb-0">NEW PRODUCTS</h3>
                    <p className="text-light text-sml mb-0">
                      New products with updated stocks.
                    </p>
                  </div>
                  <Button className="viewAllBtn ml-auto" onClick={toggleViewAll}>
                    {expandedView ? "Show Less" : "View Detail"} <BsArrowRight />
                  </Button>
                </div>

                {loading ? (<div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                  <CircularProgress size={54} color="info" className="my-3" />
                </div>) : (<div className="product_row d-flex flex-wrap justify-content-between">
                  {products.map((product) => (
                    <div key={product.id} className="col-6 col-md-4 col-lg-3 mb-4">
                      <ProductCard
                        product={product}
                        expanded={expandedView} // Pass expanded state to ProductCard
                      />
                    </div>
                  ))}
                </div>)}
              </div>
            </div>
          </div>
          <footer>
            <Footer />
          </footer>
        </section>)}
    </>
  );
}

export default Home;
