'use client';

import Image from 'next/image';
import emptybag from '@/public/images/emptybag.png';
import { useSelector } from 'react-redux';
import Product from '@/components/product/Product';

export default function Page() {

  const wishList = useSelector((state) => state.wishlist);

  return (
    <div className='favorite_wrapper h-full'>
      {wishList?.items.length > 0 ?
        <div className='grid gap-[15px] grid-cols-4'>
          {wishList?.items.map((item, index) => (
            <Product key={index} product={item} />
          ))}
        </div>
        :
        <div className='relative w-full h-full  flex items-center justify-center'>
          <Image
            src={emptybag}
            alt="Empty Image"
            priority={true}
            className='max-w-[150px] relative left-[-100px] top-[-50px]'
          />
        </div>
      }
    </div>
  );
}
