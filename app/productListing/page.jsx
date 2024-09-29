'use client';

import { filterCategory } from '@/utils/data/productList';
import React, { useEffect, useState, lazy, Suspense } from 'react';
import cover1 from "@/public/images/cover1.png";
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import PageLoader from '@/components/PageLoader';
import { bestProducts } from '@/utils/data/homeData';

const Product = lazy(() => import('@/components/product/Product'));

const ProductGrid = ({ loading, products }) => {

	const searchParams = useSearchParams();
	const category = searchParams.get('category') || '';
	const router = useRouter();
	
	const changeFilterType = (filter) => {
		router.push(`?category=${filter}`, { scroll: false });
	};

	if (loading) {
		return <PageLoader />;
	}
	return (
		<>
			<div className='bg-[#FFEED9] py-[50px]'>
				<div className='custom_container !mt-[130px] text-[32px] text-[#B62025] uppercase text-center'>
					Products
				</div>
			</div>
			<div className='cover_bg w-full'>
				<Image
					src={cover1}
					alt="Cover image"
					priority={true}
					unoptimized={true}
					sizes="90vw"
					style={{ objectFit: "cover" }}
				/>
			</div>

			<div className='cover_container flex gap-[25px] !mt-[70px]'>
				<div className='filter_block border border-1 border-[#F8F6F5] p-[25px] max-w-[290px] h-fit w-full'>
					<div className='mb-[30px]'>
						<div className='text-[#B62025] text-[32px] mb-20 border-b-2 max-w-fit'>Categories</div>
						{filterCategory.map((filter, index) => (
							<div key={index} className="mb-[10px] filter_line">
								<label htmlFor={`filter${index}`}>
									<input type="radio" name='category'
										onChange={() => changeFilterType(filter)}
										id={`filter${index}`}
										defaultChecked={category === filter.toLowerCase() || index === 0}
									/>
									<span className="check_label font-medium">{filter}</span>
								</label>
							</div>
						))}
					</div>
				</div>

				<div className='w-full pb-[60px]'>


					<div className='grid grid-cols-3 gap-[20px]'>
						{products?.catalog?.map((product, index) => (
							<Product key={index} product={bestProducts[0]} />
						))}
					</div>
					<button className='more_btn'>Load More Products</button>
				</div>
			</div>
		</>
	);
};

export default function Page() {
	const router = useRouter();

	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProducts = async () => {
			setLoading(true);
			const response = await fetch(`https://api.goldcenter.am/v1/products/catalog?metal=gold&type=earring&subcategory=women&limit=30&offset=10`);
			const data = await response.json();
			setProducts(data);
			setLoading(false);
		};

		fetchProducts();
	}, [router]);



	return (
		<div className='product_page bg-white'>
			<Suspense fallback={<PageLoader />}>
				<ProductGrid loading={loading} products={products} />
			</Suspense>
		</div>
	);
}
