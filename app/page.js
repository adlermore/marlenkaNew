'use client'

import Link from "next/link";
import MainSlider from "@/components/slider/MainSlider";
import { homeSliderData } from "@/utils/data/homeData";
import { bestProducts } from "@/utils/data/homeData";

import home1 from "@/public/images/home1.png"
import home2 from "@/public/images/home2.png"
import home3 from "@/public/images/home3.png"

import category1 from "@/public/images/category1.png"
import category2 from "@/public/images/category2.png"
import category3 from "@/public/images/category3.png"
import category4 from "@/public/images/category4.png"
import category5 from "@/public/images/category5.png"
import category6 from "@/public/images/category6.png"
import category7 from "@/public/images/category7.png"

import videoSection from "@/public/images/videoSection.png"
import timeline from "@/public/images/timeline.png"
import 'react-modal-video/scss/modal-video.scss';
import Image from "next/image";
import ModalVideo from 'react-modal-video';
import { useState } from "react";
import Product from "@/components/product/Product";
import IconProductHeart from "@/public/icons/IconProductHeart";


export default function Home() {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="home_page">
      <MainSlider sliderData={homeSliderData} />
      <div className="flex bg-[#FFEED9] py-[90px] relative mt-[-20px] tablet:pb-[40px]">
        <div className="custom_container flex justify-between overflow-hidden h-[500px] laptopHorizontal:h-[500px] tablet:flex-col tablet:h-auto">
          <div className="absolute left-0  flex items-center justify-center top-20 overflow-hidden bottom-20 h-full w-[47%] tablet:relative tablet:w-full tablet:h-[300px]">
            <Image
              src={home1}
              alt="Ricardo portrait"
              priority={true}
              sizes="50vw"
              style={{
                objectFit: "cover",
              }}
            />
          </div>
          <div className="py-[60px] ml-auto max-w-[650px] laptopHorizontal:max-w-[50%] laptop:py-40 tablet:max-w-none tablet:pl-10">
            <div className=" uppercase text-[32px] laptopHorizontal:text-[20px]  "><span className="text-[#B62025]">SWEET</span> highlighty </div>
            <div className="mt-[30px] text-base laptopHorizontal:mt-20 tracking-[1px]">
              International success has enabled export to more than 40 countries worldwide, while achieving top marks verified by Quality Food Certificates!
              <br />
              <br />
              No artificial colors or preservatives are ever used. All of our products are free from alcohol, animal fat, and genetically modified ingredients. Gluten-free options are also widely available.
              <br />
              <br />
              Full range has been developed with the extremely long ambient shelf-life due to our unique vacuum and O2 absorbent packaging technology. Unique taste and universal appeal of our product line is complemented with rich flavors and soft consistency.
            </div>
            <a href="/" className="site_btn mt-[25px]">Products</a>
          </div>
        </div>
      </div>

      <ModalVideo
        channel="youtube"
        youtube={{ mute: 0, autoplay: 1 }}
        autoplay={1}

        isOpen={isOpen}
        videoId="QiwtxINIVn8"
        onClose={() => setOpen(false)}
      />

      <div className="relative cursor-pointer duration-300 hover:opacity-90" onClick={() => setOpen(true)}>
        <Image
          src={videoSection}
          alt="Ricardo portrait"
          priority={true}
          unoptimized={true}
          sizes="80vw"
          style={{
            objectFit: "cover",
          }}
        />
      </div>
      <div className="bg-white !py-[80px]">
        <div className="custom_container">
          <div className="text-[32px] text-center uppercase">Best Sellers</div>
          <div className="grid grid-cols-4 gap-[25px] mt-[80px] pb-[60px]">
            <Product product={bestProducts[0]} />
            <Product product={bestProducts[1]} />
            <Product product={bestProducts[2]} />
            <Product product={bestProducts[3]} />
          </div>
        </div>
      </div>

      <div className="flex bg-[#6D1316] py-[40px] relative mt-[-20px] tablet:pb-[40px]">
        <div className="custom_container flex justify-between overflow-hidden h-[650px] laptopHorizontal:h-[500px] tablet:flex-col tablet:h-auto">
          <div className="absolute left-0 top-0  flex items-center justify-center overflow-hidden bottom-20 h-full w-[55%] tablet:relative tablet:w-full tablet:h-[300px]">
            <Image
              src={home2}
              unoptimized
              alt="Ricardo portrait"
              priority={true}
              fill
              sizes="50vw"
              style={{
                objectFit: "cover",
              }}
            />
          </div>
          <div className="py-[20px] ml-auto max-w-[530px] laptopHorizontal:max-w-[50%] laptop:py-40 tablet:max-w-none tablet:pl-10">
            <span className="relative mb-20">
              <Image
                src={home3}
                alt="Ricardo portrait"
                priority={true}
                sizes="50vw"
                style={{
                  objectFit: "contain",
                }}
              />
            </span>
            <div className="mt-[40px]">
              <div className="text-[32px] relative font-semibold flex items-center pb-[5px] text-[#E60911] red_heart">
                <span><IconProductHeart className=' [&>path]:fill-[#E60911] w-[60px] h-[60px]' /></span>
                Romantic gift
              </div>
              <div className="text-[15px] text-[#FFEED9] mt-[20px] font-regular  leading-6">
                Show your love in the most delicious way possible.  Real jewels of taste in
                splendid boxes, our chocolates will make your better half melt.
              </div>
              <div className="text-[32px] mt-[20px] relative font-semibold flex items-center pb-[5px] text-[#FFEED9]">
                Birthday gift
              </div>
              <div className="text-[15px] text-[#FFEED9] mt-[20px] font-regular  leading-6">
                A birthday! A cake, candles… All you need now is your Leonidas surprise!
                Give your loved one a special surprise: offer him or her their favourite
                chocolates or a varied assortment.t
              </div>
              <div className="text-[32px] mt-[20px] relative font-semibold flex items-center pb-[5px] text-[#FFEED9]">
                Invitation
              </div>
              <div className="text-[15px] text-[#FFEED9] mt-[20px] font-regular  leading-6">
                Show how happy you are to receive your invitation: offer the hosts the
                creations of our Maîtres Chocolatiers to express your thanks.
                There's nothing like it to put a smile on their lips.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-[90px] pb-[120px] bg-siteCrem">
        <div className="custom_container">
          <div className="text-[32px] text-center uppercase">INGREDIENTS</div>
          <div className="flex gap-20 items-end justify-between">
            <div className="flex flex-col items-center max-w-[200px] text-center">
              <Image
                src={category1}
                alt="Ricardo portrait"
                priority={true}
                unoptimized={true}
                sizes="80vw"
                style={{
                  objectFit: "cover",
                }}
              />
              <div className="text-xl font-medium text-[#B62025] mt-[12px]">CONDENSED MILK</div>
              <div className="mt-[20px] text-[12px] text-black font-medium">
                Our Classic Honey Cake is 
                scrumptious and healthy.
              </div>
            </div>
            <div className="flex flex-col items-center max-w-[200px] text-center">
              <Image
                src={category2}
                alt="Ricardo portrait"
                priority={true}
                unoptimized={true}
                sizes="80vw"
                style={{
                  objectFit: "cover",
                }}
              />
              <div className="text-xl font-medium text-[#B62025] mt-[12px]">NATURAL HONEY</div>
              <div className="mt-[20px] text-[12px] text-black font-medium">
                Our Classic Honey Cake is 
                scrumptious and healthy.
              </div>
            </div>
            <div className="flex flex-col items-center max-w-[200px] text-center">
              <Image
                src={category3}
                alt="Ricardo portrait"
                priority={true}
                unoptimized={true}
                sizes="80vw"
                style={{
                  objectFit: "cover",
                }}
              />
              <div className="text-xl font-medium text-[#B62025] mt-[12px]">WALNUT</div>
              <div className="mt-[20px] text-[12px] text-black font-medium">
                Our Classic Honey Cake is 
                scrumptious and healthy.
              </div>
            </div>
            <div className="flex flex-col items-center max-w-[200px] text-center">
              <Image
                src={category4}
                alt="Ricardo portrait"
                priority={true}
                unoptimized={true}
                sizes="80vw"
                style={{
                  objectFit: "cover",
                }}
              />
              <div className="text-xl font-medium text-[#B62025] mt-[12px]">Apricot</div>
              <div className="mt-[20px] text-[12px] text-black font-medium">
                Our Classic Honey Cake is 
                scrumptious and healthy.
              </div>
            </div>
            <div className="flex flex-col items-center max-w-[200px] text-center">
              <Image
                src={category5}
                alt="Ricardo portrait"
                priority={true}
                unoptimized={true}
                sizes="80vw"
                style={{
                  objectFit: "cover",
                }}
              />
              <div className="text-xl font-medium text-[#B62025] mt-[12px]">Almond</div>
              <div className="mt-[20px] text-[12px] text-black font-medium">
                Our Classic Honey Cake is 
                scrumptious and healthy.
              </div>
            </div>
            <div className="flex flex-col items-center max-w-[200px] text-center">
              <Image
                src={category6}
                alt="Ricardo portrait"
                priority={true}
                unoptimized={true}
                sizes="80vw"
                style={{
                  objectFit: "cover",
                }}
              />
              <div className="text-xl font-medium text-[#B62025] mt-[12px]">Coffee</div>
              <div className="mt-[20px] text-[12px] text-black font-medium">
                Our Classic Honey Cake is 
                scrumptious and healthy.
              </div>
            </div>
            <div className="flex flex-col items-center max-w-[200px] text-center">
              <Image
                src={category7}
                alt="Ricardo portrait"
                priority={true}
                unoptimized={true}
                sizes="80vw"
                style={{
                  objectFit: "cover",
                }}
              />
              <div className="text-xl font-medium text-[#B62025] mt-[12px]">Cocoa</div>
              <div className="mt-[20px] text-[12px] text-black font-medium">
                Our Classic Honey Cake is 
                scrumptious and healthy.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative duration-300 hover:opacity-90 py-[85px] bg-white">
        <div className="custom_container relative">
          <div className="text-[#B62025] uppercase text-[32px]">Marlenka's Timeline</div>
          <Image
            src={timeline}
            alt="Ricardo portrait"
            priority={true}
            unoptimized={true}
            sizes="80vw"
            style={{
              objectFit: "cover",
            }}
          />
          <Link href='/' className="text-[#B62025] text-2xl ml-auto block text-right mt-[-30px]">Read our history</Link>
        </div>
      </div>



      {/*
      <CategoryGrid category={categoryGrid} />
      <ProductSlider sliderContent={bestProducts} />
      <ParentSlider>
        {newStores.map((store, i) => (
          <div key={i}>
            <ChildSlider gallery={store.gallery} />
            <div className="mt-[30px] laptop:mt-20 text-[20px] text-center">
              {store.title}
            </div>
            <Link
              href="/"
              className="visitStore_btn flex items-center w-[215px] mx-auto h-[50px] text-[#916D50] text-[24px] bg-[#F8F6F5] justify-center mt-[25px] laptop:mt-15  laptop:text-base"
            >
              Visit Store
            </Link>
          </div>
        ))}
      </ParentSlider>
      <ProductSlider sliderContent={bestProducts} />
      */}
      {/* <FooterHero />  */}
    </div>
  );
}
