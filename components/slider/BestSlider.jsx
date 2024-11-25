"use client";

import Slider from "react-slick";
import IconArrowLeft from "@/public/icons/IconArrowLeft";
import IconArrowRight from "@/public/icons/IconArrowRight";
import Product from "../product/Product";

function BestSlider({ sliderContent }) {
  
  let dragging = false;

  function SampleNextArrow(props) {
    const { style, onClick } = props;
    return (
      <div
        className="custom_slider_arr_right"
        style={{ ...style }}
        onClick={onClick}
      >
        <IconArrowRight  />
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { style, onClick } = props;
    return (
      <div
        className="custom_slider_arr_left"
        style={{ ...style }}
        onClick={onClick}
      >
        {" "}
        <IconArrowLeft/>
      </div>
    );
  }

  const settings = {
    // infinite: true,
    dots: false,
    autoplay: false,
    speed: 500,
    slidesToShow: 4,
    arrows: true,
    swipeToSlide: true,
    slidesToScroll: 1,
    beforeChange: () => (dragging = true),
    afterChange: () => (dragging = false),
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1320,
        settings: {
          arrows: false
        }
      },
      {
        breakpoint: 767,
        settings: {
          arrows: false,
          slidesToShow: 2,
        }
      }
      ,
      {
        breakpoint: 575,
        settings: {
          infinite: false,
          arrows: false,
          slidesToShow: 1.5,
        }
      }
    ]
  };

  return (
    <Slider {...settings}>
    {sliderContent && sliderContent.map((product, i) => (
      <Product  key={i}  product={product} onClick={(e) => dragging && e.preventDefault()} />
    ))}
  </Slider>
  );
}

export default BestSlider;
