import Image from 'next/image';
import React from 'react';

const NewsList = async () => {

  const res = await fetch(process.env.NEXT_PUBLIC_DATA_API + '/getNews', { cache: 'no-cache' })
  const { data } = await res.json()
  

  return (
    <div className='mt-[120px] news_page'>
      <div className=' text-2xl uppercase bg-siteCrem '>
        <div className='custom_container text-center mx-auto justify-center h-[120px] laptopHorizontal:h-[80px] laptopHorizontal:text-base  flex items-center  text-[#B62025] font-medium'>
          Latest News
        </div>
      </div>
      <div className='custom_container'>
        <div className='news_list mt-[100px]'>
          {data.newses && data.newses.slice().reverse().map((news) => (
            <div key={news.id} className='flex gap-[40px] border-[#CCCCCC] last:border-none border-opacity-50 border-b pb-[50px] mb-[50px] laptop:flex-col laptop:gap-20 laptop:pb-[30px] laptop:mb-[30px]'>
              <div className='relative'>
                <Image
                  src={process.env.NEXT_PUBLIC_DATA + news.images[0].image_path}
                  alt='News_image'
                  width={326}
                  height={229}
                  unoptimized
                  priority
                  className='object-cover'
                />
              </div>
              <div className='flex-1 flex flex-col'>
                <div className='flex items-center justify-between w-full laptop:block'>
                  <div className='text-2xl text-black font-semibold max-w-[640px]'>
                    {news.title}
                  </div>
                  <span className='text-[12px] font-medium text-[#BEBEBE]'>{news.created_at.split('T')[0]}</span>
                </div>
                <div className='text-base mt-[20px] max-w-[680px] flex-1'>{news.description}</div>
                <a className='site_btn mt-[60px] laptop:mt-[30px]' href={`/news/${news.id}`}>Read More</a>
              </div>
            </div>
          ))}
        </div>
        {/* <button className='site_btn mx-auto mb-[50px] !opacity-45 cursor-no-drop ' >Load More</button> */}
      </div>
    </div>
  );
};

export default NewsList;