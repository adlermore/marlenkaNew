"use client"

import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";

function MainSlider({sliderData}) {
  
  const settings = {
    fade: true,
    infinite: true,
    dots: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    arrows: false,
    autoplaySpeed: 4000,
    slidesToScroll: 1,
    pauseOnHover: false
  };
  

  console.log('___' , process.env.NEXT_PUBLIC_DATA  + sliderData[0].image_path);
  
  return (
    <div className="w-full relative slick_wrapper laptop:mt-[85px]">
      <Slider {...settings} >
        {sliderData.map((slider , index ) => (
          <div key={index} className='slider_container h-[850px] w-full relative laptopHorizontal:h-[500px] mobile:h-[350px]'>
            <div className="slider_background relative h-full w-full ">
              <Image
                src={process.env.NEXT_PUBLIC_DATA  + slider.image_path}
                alt='future_Image'
                fill
                unoptimized={true}
                sizes="100vw"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="cover_container">
            <div className="slider_content">
              <Image
                src={process.env.NEXT_PUBLIC_DATA  + slider?.small_image_path}
                alt='future_Image'
                unoptimized={true}
                sizes="100vw"
                width={150}
                height={100}
                className="h-full w-full object-cover mobile:max-w-[300px]"
              />
              <div className="slider_description">{slider.description}</div>
              <Link href={`/product/${slider.product_id}`} className="slider_btn">Discover more</Link>
            </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default MainSlider