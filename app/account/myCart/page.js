// app/account/userInfo.tsx

'use client'; // This makes the component a client component
import Product from '@/components/product/Product';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import emptybag from '@/public/images/emptybag.png';

export default function Page() {

  const cart = useSelector((state) => state.cart);

  return (
    <div className='card_wrapper h-full'>
      {cart?.items.length > 0 ?
        <div className='grid gap-[15px] grid-cols-4'>
          {cart.items.map((item, index) => (
            <Product key={index} product={item} />
          ))}
        </div>
        :
        <div className='relative w-full h-full flex items-center justify-center'>
          <Image
            src={emptybag}
            alt="Empty Image"
            priority={true}
          />
        </div>
      }
    </div>
  );
}
