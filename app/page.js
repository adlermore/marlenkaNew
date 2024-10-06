import Link from "next/link";
import MainSlider from "@/components/slider/MainSlider";
import timeline from "@/public/images/timeline.png"
import Image from "next/image";
import Product from "@/components/product/Product";
import IconProductHeart from "@/public/icons/IconProductHeart";
import ModalVideoWrap from "@/components/ModalVideoWrap";

export default async function Home() {

  // HomePage Data Fetching
  const res = await fetch(process.env.NEXT_PUBLIC_DATA_API + '/getHomeData', { cache: 'no-cache' })
  const { data } = await res.json()

  const resProduct = await fetch(process.env.NEXT_PUBLIC_DATA_API + '/getProducts', { cache: 'no-cache' })
  const { data: dataProduct  } = await resProduct.json()

  return (
    <div className="home_page">
      <MainSlider sliderData={data?.sliders} />
      <div className="flex bg-[#FFEED9] py-[90px] laptopHorizontal:py-[60px]  laptop:py-[20px] relative mt-[-20px]">
        <div className="custom_container flex justify-between overflow-hidden tablet h-[500px]  tablet:flex-col laptop:h-auto">
          <div className="absolute left-0  flex items-center justify-center top-20 overflow-hidden bottom-20 h-full w-[47%] tablet:relative tablet:w-full tablet:h-[300px]">
            <div className="relative w-full h-full max-w-[80%]">
              <Image
                src={process.env.NEXT_PUBLIC_DATA + data?.highlighty.image_path}
                alt="Ricardo portrait"
                priority={true}
                sizes="50vw"
                fill
                style={{
                  objectFit: "contain",
                }}
              />
            </div>
          </div>
          <div className="py-[60px]  laptopHorizontal:py-[30px] ml-auto max-w-[650px] laptopHorizontal:max-w-[50%] laptop:py-40 tablet:max-w-none tablet:pl-10">
            <div className=" uppercase text-[32px] laptopHorizontal:text-[20px]  "><span className="text-[#B62025]">SWEET</span> highlighty </div>
            <div className="mt-[30px] text-base laptopHorizontal:mt-20 tracking-[1px]">
              {data?.highlighty.description_one}
              <br />
              <br />
              {data?.highlighty.description_two}
              <br />
              <br />
              {data?.highlighty.description_three}
            </div>
            <Link href='/productListing' className="site_btn mt-[25px]">Products</Link>
          </div>
        </div>
      </div>
      <ModalVideoWrap videoData={data?.video.youtube_code} />
      <div className="bg-white py-[80px] laptopHorizontal:py-[40px] ">
        <div className="custom_container">
          <div className="text-[32px] text-center laptopHorizontal:text-2xl uppercase">Best Sellers</div>
          <div className="grid grid-cols-4 gap-[25px] product_slider_list mt-[80px] mobile:grid-cols-1 tablet:grid-cols-2 laptopHorizontal:grid-cols-3  overflow-hidden laptopHorizontal:mt-[40px] pb-[60px]">
            {dataProduct?.products.slice(0,4).map((product, index) => (
              <Product key={index} product={product} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex bg-[#6D1316] py-[40px] relative mt-[-20px] tablet:pb-[40px]">
        <div className="custom_container flex justify-between overflow-hidden h-[650px] laptopHorizontal:h-[500px] tablet:flex-col tablet:h-auto">
          <div className="absolute left-0 top-0  flex items-center justify-center overflow-hidden bottom-20 h-full w-[55%] tablet:relative tablet:w-full tablet:h-[300px]">
            <Image
              src={process.env.NEXT_PUBLIC_DATA + data?.romantic?.image_path}
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
          <div className="py-[20px] ml-auto max-w-[500px] laptopHorizontal:max-w-[40%] laptop:py-40 tablet:max-w-none tablet:pl-10">
            <span className="relative mb-20 w-full max-w-[520px] block h-[90px]">
              <Image
                src={process.env.NEXT_PUBLIC_DATA + data?.romantic?.small_image_path}
                alt="Ricardo portrait"
                priority={true}
                sizes="50vw"
                fill
                style={{
                  objectFit: "contain",
                }}
              />
            </span>
            <div className="mt-[40px]">
              <div className="text-[32px] relative font-semibold flex items-center pb-[5px] text-[#E60911] red_heart">
                <span><IconProductHeart className=' [&>path]:fill-[#E60911] w-[60px] h-[60px]' /></span>
                {data?.romantic?.title_one}
              </div>
              <div className="text-[15px] text-[#FFEED9] mt-[20px] font-regular  leading-6">
                {data?.romantic?.description_one}
              </div>
              <div className="text-[32px] mt-[20px] relative font-semibold flex items-center pb-[5px] text-[#FFEED9]">
                {data?.romantic?.title_two}
              </div>
              <div className="text-[15px] text-[#FFEED9] mt-[20px] font-regular  leading-6">
                {data?.romantic?.description_two}
              </div>
              <div className="text-[32px] mt-[20px] relative font-semibold flex items-center pb-[5px] text-[#FFEED9]">
                {data?.romantic?.title_three}
              </div>
              <div className="text-[15px] text-[#FFEED9] mt-[20px] font-regular  leading-6">
                {data?.romantic?.description_three}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-[90px] pb-[120px] laptopHorizontal:pt-[60px]  mobile:pb-[60px] bg-siteCrem">
        <div className="custom_container">
          <div className="text-[32px] text-center uppercase">INGREDIENTS</div>
          <div className="flex gap-20 mt-[40px] items-end justify-between laptopHorizontal:flex-wrap mobile:mt-[30px] mobile:flex-col mobile:items-center mobile:justify-center mobile:align-center">
            {data?.ingredients.map((item, index) => (
              <div key={index} className="flex flex-col items-center justify-center mobile:max-w-none max-w-[200px] text-center">
                <div className="w-full relative max-w-[100px] flex items-end h-[160px]">
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
                <div className="text-[18px] font-medium text-[#B62025] mt-[12px]">{item.title}</div>
                <div className="mt-[20px] text-[12px] text-black font-medium">
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="relative duration-300 hover:opacity-90 py-[85px] laptop:py-[60px] mobile:hidden bg-white">
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
          <Link href='/' className="text-[#B62025] text-2xl ml-auto block tablet:text-base text-right  mt-[-30px]">Read our history</Link>
        </div>
      </div>
    </div>
  );
}
