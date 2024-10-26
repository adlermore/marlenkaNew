'use client';

import React, { useEffect, useState, lazy, Suspense } from 'react';
import cover1 from "@/public/images/cover1.png";
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import PageLoader from '@/components/PageLoader';

const Product = lazy(() => import('@/components/product/Product'));

const ProductGrid = () => {
	const searchParams = useSearchParams();
	const categoryId = searchParams.get('category') || '';
	const router = useRouter();

	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]); 
	const [loading, setLoading] = useState(true);
	const [offset, setOffset] = useState(0);
	const [hasMore, setHasMore] = useState(true);
	const search = searchParams.get('filter') || '';

	const fetchCategories = async () => {
		const response = await fetch(process.env.NEXT_PUBLIC_DATA_API + '/getCategories');
		const data = await response.json();
		setCategories(data.data.categories);
	};

	const fetchProducts = async (newOffset = 0, selectedCategory = '') => {
		setLoading(true);
		const response = await fetch(`${process.env.NEXT_PUBLIC_DATA_API}/getProducts?offset=${newOffset}&limit=10&filter=${search}&${selectedCategory ? `&category_id=${selectedCategory}` : ''}`);
		const data = await response.json();

		if (newOffset === 0) {
			setProducts(data.data.products);
		} else {
			setProducts(prev => [...prev, ...data.data.products]);
		}
		setLoading(false);
		setHasMore(data.data.products.length === 10);
	};

	useEffect(() => {
		fetchCategories();
		fetchProducts(0, categoryId);
	}, [categoryId , router , search]);

	const loadMore = (category = '') => {
		if (category) {
			setOffset(0);
			fetchProducts(0, category);
		} else {
			const newOffset = offset + 10;
			setOffset(newOffset);
			fetchProducts(newOffset, categoryId); 
		}
	};

	const changeFilterType = (filter) => {
		router.push(`?category=${filter}`, { scroll: false });
	};

	return (
		<>
			<div className='bg-[#FFEED9] py-[50px] laptopHorizontal:py-[30px] tablet:py-[20px]'>
				<div className='custom_container !mt-[130px] mobile:!mt-[150px] text-[32px] laptopHorizontal:text-2xl laptop:text-xl tablet:text-base text-[#B62025] uppercase text-center'>
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
			<div className='cover_container flex laptop:block gap-[25px] !mt-[70px] laptop:!mt-[40px] laptopHorizontal:gap-20'>
				<div className='filter_block border border-1 border-[#F8F6F5] p-[25px] max-w-[290px] laptop:max-w-none laptopHorizontal:max-w-[230px] laptopHorizontal:p-[15px] h-fit w-full'>
					<div className='mb-[30px]'>
						<div className='text-[#B62025] text-[32px] laptopHorizontal:text-2xl mb-20 border-b-2 laptop:mx-auto laptop:mb-[40px] text-center max-w-fit'>Categories</div>
						<div className='laptop:flex laptop:items-center tablet:flex-wrap tablet:gap-[20px] laptop:justify-between'>
							<div className="mb-[10px] filter_line">
								<label htmlFor='filter'>
									<input type="radio" name='category'
										onChange={() => changeFilterType('')}
										id='filter'
										defaultChecked={categoryId === ''}
									/>
									<span className="check_label font-medium">All Products</span>
								</label>
							</div>
							{categories?.map((filter) => (
								<div key={filter.id} className="mb-[10px] filter_line">
									<label htmlFor={`filter${filter.id}`}>
										<input type="radio" name='category'
											onChange={() => changeFilterType(filter.id)}
											id={`filter${filter.id}`}
											checked={categoryId === filter.id.toString()} 
										/>
										<span className="check_label font-medium">{filter.name}</span>
									</label>
								</div>
							))}
						</div>
					</div>
				</div>
				<div className='w-full pb-[60px]'>
					<div className='grid grid-cols-3 tablet:grid-cols-2 mobile:block gap-[20px]'>
						{loading ? (
							<>
								<div className="card is-loading">
									<div className="image"></div>
									<div className="content">
										<h2></h2>
									</div>
								</div>
								<div className="card is-loading">
									<div className="image"></div>
									<div className="content">
										<h2></h2>
									</div>
								</div>
								<div className="card is-loading">
									<div className="image"></div>
									<div className="content">
										<h2></h2>
									</div>
								</div>
							</>
						) : products && products.length > 0 ? (
							products.map((product, index) => (
								<Product key={index} product={product} />
							))
						) : (
							<div className="no-results">
								<h2 className='mt-[40px]'>No results found.</h2>
							</div>
						)}
					</div>
					{hasMore && <button className='more_btn' onClick={() => loadMore()}>Load More Products</button>}
				</div>
			</div>
		</>
	);
};

export default function Page() {
	return (
		<div className='product_page bg-white'>
			<Suspense fallback={<PageLoader />}>
				<ProductGrid />
			</Suspense>
		</div>
	);
}
