import Image from 'next/image';
import React from 'react';

// const PAGE_SIZE = 10;
// const API_TOKEN = '5kQJ8Mfppj1YLWIPbFGBM6yXKfroJebHPJZh1k1l';

// async function fetchNews(page) {
//   const res = await fetch(process.env.NEXT_PUBLIC_DATA_API + `/getNews`);
//   if (!res.ok) {
//     throw new Error('Failed to fetch news');
//   }
//   return res.json();
// }

const NewsList = async () => {

  // const page = parseInt(searchParams.page) || 1;
  // const newsList = await fetchNews(page);

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
          {data.newses && data.newses.map((news) => (
            <div key={news.id} className='flex gap-[40px] border-[#CCCCCC] border-b pb-[50px] mb-[50px]'>
              <div className='relative'>
                <Image
                  src={process.env.NEXT_PUBLIC_DATA + news.image_url}
                  alt='News_image'
                  width={326}
                  height={229}
                  priority
                  className='object-cover'
                />
              </div>
              <div className='flex-1'>
                <div className='flex items-center justify-between w-full'>
                  <div className='text-2xl text-black font-semibold'>
                    {news.title}
                  </div>
                  <span className='text-[11px] font-medium text-[#BEBEBE]'>{news.created_at.split('T')[0]}</span>
                </div>
                <div className='text-base mt-[20px]'>{news.description}</div>
                <a className='site_btn mt-[60px]' href={`/news/${news.id}`}>Read More</a>
              </div>
            </div>
          ))}


        </div>
        {/* <div>
          <a href={`?page=${page - 1}`} disabled={page <= 1}>Previous</a>
          <span> | Page {page} </span>
          <a href={`?page=${page + 1}`}>Next</a>
        </div> */}
      </div>

    </div>
  );
};

export default NewsList;