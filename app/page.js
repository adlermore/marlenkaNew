import Link from "next/link";
import MainSlider from "@/components/slider/MainSlider";
import timeline from "@/public/images/timeline.png"
import Image from "next/image";
import Product from "@/components/product/Product";
import ModalVideoWrap from "@/components/ModalVideoWrap";
import GiftSection from "@/components/giftSection/GiftSection";
import BestSlider from "@/components/slider/BestSlider";
import OldUserPopup from "@/components/OldUserPopup";

export default async function Home() {

  // HomePage Data Fetching
  const res = await fetch(process.env.NEXT_PUBLIC_DATA_API + '/getHomeData' , { cache: 'no-cache' })
  const { data } = await res.json()

  const resProduct = await fetch(process.env.NEXT_PUBLIC_DATA_API + '/getProducts' , { cache: 'no-cache' })
  const { data: dataProduct  } = await resProduct.json()

  return (
    <div className="home_page">
      <MainSlider sliderData={data?.sliders} />
      <div className="flex bg-[#FFF6E6] py-[90px] laptopHorizontal:py-[60px]  laptop:py-[20px] relative mt-[-20px]">
        <div className="custom_container flex justify-between overflow-hidden tablet h-[500px]  tablet:flex-col laptop:h-auto">
          <div className="absolute left-0  mobile:hidden flex items-center justify-center top-0 overflow-hidden bottom-20 h-full w-[47%] tablet:relative tablet:w-full tablet:h-[300px]">
            <div className="relative w-full h-full max-w-[75%]">
              <Image
                src={process.env.NEXT_PUBLIC_DATA + data?.highlighty.image_path}
                alt="Ricardo portrait"
                priority={true}
                unoptimized
                sizes="50vw"
                fill
                style={{
                  objectFit: "contain",
                }}
              />
            </div>
          </div>
          <div className="py-[60px]  mobile:py-[20px] laptopHorizontal:py-[30px] ml-auto max-w-[650px] laptopHorizontal:max-w-[50%] laptop:py-40 tablet:max-w-none tablet:pl-10">
            <div className=" uppercase text-[32px] laptopHorizontal:text-[20px]  "><span className="text-[#B62025]">SWEET</span> HIGHLIGHTS </div>
            <div className="mt-[30px] text-base laptopHorizontal:mt-20 tracking-[1px]">
              {data?.highlighty.description_one}
              <br />
              <br />
              {data?.highlighty.description_two}
              <br />
              <br />
              {data?.highlighty.description_three}
            </div>
            <Link href='/productListing' className="ml-auto normal_btn mt-[25px]">Products</Link>
          </div>
        </div>
      </div>
      <ModalVideoWrap videoData={data?.video.youtube_code} />
      <div className="bg-white py-[80px] laptopHorizontal:py-[40px] mobile:py-20 ">
        <div className="custom_container also_like">
          <div className="text-[32px] text-center laptopHorizontal:text-2xl mobile:text-xl uppercase">Best Sellers</div>
          <div className="product_slider_list mt-[80px]  laptopHorizontal:mt-[40px] pb-[60px] mobile:pb-[20px]">
            <BestSlider sliderContent={dataProduct?.products.slice(0,7)} />
          </div>
        </div>
      </div>
      <GiftSection romantic={data.romantic}/>
      <div className="pt-[90px] pb-[120px] laptopHorizontal:pt-[60px] mobile:pt-[30px] mobile:pb-[40px] bg-[#FFF6E6]">
        <div className="custom_container">
          <div className="text-[32px] text-center mobile:text-xl uppercase">INGREDIENTS</div>
          <div className="flex gap-20 mt-[40px] ingredients items-end justify-between laptopHorizontal:flex-wrap mobile:mt-[10px] mobile:flex-col mobile:items-center mobile:justify-center mobile:align-center">
            {data?.ingredients.map((item, index) => (
              <div key={index} className="flex flex-col items-center justify-center mobile:max-w-none max-w-[200px] text-center">
                <div className="w-full img_block relative max-w-[100px] flex items-end h-[160px]">
                  <Image
                    src={process.env.NEXT_PUBLIC_DATA + data?.ingredients[index].image_path}
                    alt="Ricardo portrait"
                    priority={true}
                    unoptimized={true}
                    sizes="80vw"
                    fill
                    style={{
                      objectFit: "contain",
                    }}
                  />
                </div>
                <div className="text-[18px] font-medium text-[#B62025] mt-[-15px] lowercase">{item.title}</div>
                <div className="mt-[10px] mobile:max-w-[180px] text-[12px] text-black font-medium">
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="relative duration-300  py-[85px] mobile:py-[30px] laptop:py-[60px] mobile:hidden bg-white">
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
          <Link href='/about' className="text-[#B62025] text-2xl ml-auto block tablet:text-base text-right  mt-[-30px]">Read our history</Link>
        </div>
      </div>
      <OldUserPopup />
    </div>
  );
}
