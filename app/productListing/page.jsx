'use client'

import Product from '@/components/product/Product'
import Productnew from '@/components/product/Productnew'
import IconChecked from '@/public/icons/IconChecked'
import { filterCategory, filterColors, filterStyle, productListing } from '@/utils/data/productList'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import cover1 from "@/public/images/cover1.png"
import Image from 'next/image'
import { bestProducts } from '@/utils/data/homeData'
import { useSearchParams, useRouter } from 'next/navigation'

export default function page() {

  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || '';
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products based on category from API or local data
    // const fetchProducts = async () => {
    //   const response = await fetch(`/api/products?category=${category}`);
    //   const data = await response.json();
    //   setProducts(data);
    // };

    // fetchProducts();
  }, [category , searchParams]);

  const changeFilterType = (filter) => {
    router.push(`?category=${filter}`);
  };
	
	return (
		<div className='product_page  bg-white'>
			<div className='bg-[#FFEED9] py-[50px]'>
				<div className='custom_container !mt-[130px] text-[32px]  text-[#B62025] uppercase text-center'>
					Products
				</div>
			</div>
			<div className='cover_bg w-full '>
				<Image
					src={cover1}
					alt="Ricardo portrait"
					priority={true}
					unoptimized={true}
					sizes="90vw"
					style={{
						objectFit: "cover",
					}}
				/>
			</div>
			<div className='cover_container flex gap-[25px] !mt-[70px]'>
				<div className='filter_block border border-1 border-[#F8F6F5] p-[25px] max-w-[290px] h-fit w-full'>
					<div className='mb-[30px]' >
						<div className='text-[#B62025] text-[32px] mb-20 border-b-2 max-w-fit'>Categories</div>
						{filterCategory.map((filter, index) => (
							<div key={index} className="mb-[10px] filter_line">
								<label htmlFor={`filter${index}`}>
									<input type="radio" name='category'    
										onChange={() => changeFilterType(filter)}  
										id={`filter${index}`} 
										defaultChecked={category===filter.toLowerCase() || index===0} 
									/>
									<span className="check_label font-medium">{filter}</span>								
								</label>
							</div>
						))}
					</div>
				</div>
				<div className='w-full pb-[60px]'>
					<div className='grid grid-cols-3 gap-[20px]'>
						{productListing.map((product, index) => (
            <Product key={index} product={bestProducts[0]} />
					))}
					</div>
					<button className='more_btn'>Load More Products</button>
				</div>
			</div>
		</div>
	)
}