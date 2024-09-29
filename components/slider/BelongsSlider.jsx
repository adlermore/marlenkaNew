"use client";

import Link from "next/link";
import Slider from "react-slick";
import IconArrowLeft from "@/public/icons/IconArrowLeft";
import IconArrowRight from "@/public/icons/IconArrowRight";
import Product from "../product/Product";

function BelongsSlider({ sliderContent }) {
  
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
    infinite: false,
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
        breakpoint: 991,
        settings: {
          arrows: false,
          slidesToShow: 3,
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
          slidesToShow: 1.3,
        }
      }
    ]
  };

  return (
    <div className="w-full relative product_slider pt-[100px] laptopHorizontal:py-[60px] tablet:py-[30px]">
      <div className="cover_container">
        <div className="  text-[32px] text-black uppercase mb-[50px] laptopHorizontal:text-[24px]">
        Belongs to Set 05
        </div>
        <div className="grid grid-cols-4 gap-[20px]">
        {sliderContent && sliderContent.map((product, i) => (
            <Product  key={i}  product={product} onClick={(e) => dragging && e.preventDefault()} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BelongsSlider;
