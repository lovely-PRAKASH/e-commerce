import Slider from "react-slick";
import React from "react";

const HomeBanner = () => {
  // silk slider section for carosoul
  var settings = {
    dots: true,
    infinite: true,
    // speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    // arrows: true
  };
  return (
    <>
      <div className="homeBannerSection">
        <Slider {...settings}>
          <div className="item">
            <img
              src="	https://cmsimages.shoppersstop.com/main_strapi_web_ff1a52cb76/main_strapi_web_ff1a52cb76.png"
              alt="banner2"
              className="w-100"
            />
          </div>
          <div className="item">
            <img
              src="https://cmsimages.shoppersstop.com/main_banner_web_Adidas_puma_and_more_3c0fc9ccfc/main_banner_web_Adidas_puma_and_more_3c0fc9ccfc.png"
              alt="banner1"
              className="w-100"
            />
          </div>
          <div className="item">
            <img
              src="https://cmsimages.shoppersstop.com/main_banner_web_Fossil_michael_kors_and_more_a12056fe6e/main_banner_web_Fossil_michael_kors_and_more_a12056fe6e.png"
              alt="banner3"
              className="w-100"
            />
          </div>
          <div className="item">
            <img
              src="https://cmsimages.shoppersstop.com/main_banner_web_Burberry_Versace_and_more_6089f47209/main_banner_web_Burberry_Versace_and_more_6089f47209.png"
              alt="banner1"
              className="w-100"
            />
          </div>
          <div className="item">
            <img
              src="https://cmsimages.shoppersstop.com/main_banner_web_Forever_New_forever_new_and_more_7946892631/main_banner_web_Forever_New_forever_new_and_more_7946892631.png"
              alt="banner4"
              className="w-100"
            />
          </div>
        </Slider>
      </div>
    </>
  );
};

export default HomeBanner;
