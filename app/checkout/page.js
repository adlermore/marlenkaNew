'use client';

import "@/styles/product_inner.scss";
import { bestProducts } from '@/utils/data/homeData';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import Product from '@/components/product/Product';

const Checkout = () => {

	const cart = useSelector((state) => state.cart);

	return (
		<div className='product_card_page !mt-[120px] !min-h-[100vh]'>
			<div className=' text-[24px] uppercase bg-siteCrem '>
				<div className='custom_container h-[120px] flex items-center text-xl text-[#B62025] font-medium'>
					Menu / Card
				</div>
			</div>
			<div className='pt-[70px] pb-[118px]'>
				<div className='custom_container'>
					<div className='flex justify-between gap-[50px]'>
						<div className=' flex-1 p-[7px] px-[20px] rounded-[30px] border border-[#CCCCCC] min-h-[400px]'>
				
					
						</div>
						<div className='w-[360px] py-[7px] px-[20px] flex flex-col rounded-[30px] border border-[#CCCCCC] min-h-[400px]'>
							<div className='grid grid-cols-1 mb-[30px] gap-[10px] py-[18px] border-b border-[#CCC]'>
								Order summary
							</div>
							<div className='flex items-center justify-between text-[#525252] mb-20'>Sub total <span className='ml-auto text-black text-xl font-medium'>${cart?.totalAmount.toFixed(1)}</span></div>
							<div className='flex items-center justify-between text-[#525252] mb-20'>Delivery<span className='ml-auto text-black  text-xl font-medium'>$5</span></div>
							<div className='flex items-center justify-between text-[#525252] border-t  border-[#CCC] pt-20 font-bold'>Total<span className='ml-auto text-black  text-xl font-medium'>${cart?.totalAmount.toFixed(1) + 5}</span></div>
							<div className='flex flex-1 items-end pb-[13px]'>
							<button className='bg-[#CE090F] duration-300 hover:opacity-70 text-white rounded-[30px] text-sm  w-full h-[46px] border-none'>Pay ${cart?.totalAmount.toFixed(1) + 5}</button>

							</div>
				
						</div>
					</div>
				</div>
			</div>
			<div className="bg-siteCrem !py-[80px] mt-[30px]">
				<div className="custom_container">
					<div className="text-[32px] text-center uppercase">YOU MAY ALSO LIKE</div>
					<div className="grid grid-cols-3 gap-[25px] mt-[80px] pb-[60px]">
						<div>
							<Product product={bestProducts[0]} />
							<Link href="/" className='site_btn !mx-auto mt-[30px]'>Buy now</Link>
						</div>
						<div>
							<Product product={bestProducts[1]} />
							<Link href="/" className='site_btn !mx-auto mt-[30px]'>Buy now</Link>
						</div>
						<div>
							<Product product={bestProducts[2]} />
							<Link href="/" className='site_btn !mx-auto mt-[30px]'>Buy now</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Checkout;
