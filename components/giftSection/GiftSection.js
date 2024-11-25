'use client'

import IconGiftree from '@/public/icons/IconGifttree';
import IconGifttwo from '@/public/icons/IconGifttwo';
import IconProductHeart from '@/public/icons/IconProductHeart'
import Image from 'next/image'
import React, { useState } from 'react'

function GiftSection({ romantic }) {

  const [activeTitle, setActiveTitle] = useState(null);



  return (
    <div className={`flex bg-[#6D1316] py-[40px] relative mt-[-20px] tablet:pb-[40px] romantic_section ${activeTitle ? `active_${activeTitle}` : 'active_one'}`}>
      <div className="custom_container flex justify-between overflow-hidden h-[650px] laptopHorizontal:h-[500px] tablet:flex-col tablet:h-auto">
        <div className="absolute left-0 top-0  romantic_images flex items-center justify-center overflow-hidden bottom-20 h-full w-[55%] tablet:relative tablet:w-full tablet:h-[300px]">
          <Image
            src={process.env.NEXT_PUBLIC_DATA + romantic?.image_path}
            unoptimized
            alt="Ricardo portrait"
            priority={true}
            fill
            sizes="50vw"
            style={{
              objectFit: "cover",
            }}
          />
          <Image
            src={process.env.NEXT_PUBLIC_DATA + romantic?.image_path_two}
            unoptimized
            alt="Ricardo portrait"
            priority={true}
            fill
            sizes="50vw"
            style={{
              objectFit: "cover",
            }}
          />
          <Image
            src={process.env.NEXT_PUBLIC_DATA + romantic?.image_path_three}
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
          <span className="relative mb-20 w-full max-w-[520px] block h-[90px] mobile:h-[60px]">
            <Image
              src={process.env.NEXT_PUBLIC_DATA + romantic?.small_image_path}
              alt="Ricardo portrait"
              priority={true}
              unoptimized
              sizes="50vw"
              fill
              style={{
                objectFit: "contain",
              }}
            />
          </span>
          <div className="mt-[40px]">
            <div
              className={`text-[32px] relative font-semibold flex items-center pb-[5px] text-[#FFEED9] anim_title mobile:text-2xl ${activeTitle === 'one' ? 'active_class' : ''}`}
              onMouseEnter={() => setActiveTitle('one')}
              // onMouseLeave={() => setActiveTitle(null)}
            >
              <span><IconProductHeart className=' [&>path]:fill-[#E60911] w-[60px] h-[60px]' /></span>
              {romantic?.title_one}
            </div>
            <div className="text-[15px] text-[#FFEED9] mt-[20px] font-regular  leading-6">
              {romantic?.description_one}
            </div>
            <div
              className={`text-[32px] mt-[20px] relative font-semibold flex items-center pb-[5px] text-[#FFEED9] two anim_title mobile:text-2xl ${activeTitle === 'two' ? 'active_class' : ''}`}
              onMouseEnter={() => setActiveTitle('two')}
              // onMouseLeave={() => setActiveTitle(null)}
            >
              <span><IconGifttwo className=' [&>path]:fill-[#E60911] w-[60px] h-[60px]' /></span>
              {romantic?.title_two}
            </div>
            <div className="text-[15px] text-[#FFEED9] mt-[20px] font-regular  leading-6">
              {romantic?.description_two}
            </div>
            <div
              className={`text-[32px] mt-[20px] relative font-semibold flex items-center pb-[5px]  text-[#FFEED9] three anim_title mobile:text-2xl ${activeTitle === 'three' ? 'active_class' : ''}`}
              onMouseEnter={() => setActiveTitle('three')}
              // onMouseLeave={() => setActiveTitle(null)}
            >
              <span><IconGiftree className=' [&>path]:fill-[#E60911] w-[60px] h-[60px]' /></span>
              {romantic?.title_three}
            </div>
            <div className="text-[15px] text-[#FFEED9] mt-[20px] font-regular  leading-6">
              {romantic?.description_three}
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default GiftSection