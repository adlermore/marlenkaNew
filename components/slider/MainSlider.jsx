"use client"

import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";

function MainSlider({ sliderData }) {

  const settings = {
    fade: true,
    infinite: true,
    dots: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    arrows: false,
    autoplaySpeed: 8000,
    slidesToScroll: 1,
    pauseOnHover: false
  };

  return (
    <div className="w-full relative slick_wrapper laptop:mt-[85px]">
      <Slider {...settings} >
        {sliderData.map((slider, index) => (
          <div key={index} className='slider_container h-[850px] w-full relative laptopHorizontal:h-[600px] tablet:h-[470px] mobile:h-[350px]'>
            <div className="slider_background relative h-full w-full ">
              <Image
                src={process.env.NEXT_PUBLIC_DATA + slider.image_path}
                alt='future_Image'
                fill
                priority
                unoptimized={true}
                sizes="100vw"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="cover_container">
              <div className="slider_content">
                <div className=" text-[#E6C384] relative slider_main_title whitespace-nowrap font-qwigley text-[135px] laptopHorizontal:text-[100px] tablet:text-[80px] ">{slider.title}</div>
                <div className="slider_description">{slider.description}</div>
                <Link 
                  href={slider?.category_id ? `/productListing?category=${slider?.category_id}` : `/product/${slider.product_id}`} 
                  className="slider_btn normal_btn"
                >
                  Discover more
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default MainSlider