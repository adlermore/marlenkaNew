'use client'

import React, { useEffect, useState } from 'react'
import Product from '../product/Product'
import Link from 'next/link'

function AlsoLike({ sectionTitle, parentProductId, category_id }) {

	const [likeProducts, setLikeProducts] = useState(null);

	const fetchLikeProduct = async () => {
		const response = await fetch(`${process.env.NEXT_PUBLIC_DATA_API}/getProducts?category_id=${category_id || '0'}`);
		const data = await response.json();

		const filteredProducts = data.data.products.filter(product => product.id !== parentProductId || '');
		setLikeProducts(filteredProducts);

	};

	useEffect(() => {
		fetchLikeProduct();
	}, [sectionTitle, category_id]);

	return (
		<div className="bg-siteCrem !py-[50px] mt-[30px] laptopHorizontal:!py-[30px] also_like">
			<div className="custom_container">
				<div className="text-[24px] text-center uppercase laptopHorizontal:text-xl">{sectionTitle}</div>
				<div className="grid grid-cols-3 tablet:gap-[30px] tablet:grid-cols-1 gap-[25px] mt-[50px] pb-[40px] laptopHorizontal:mt-[40px] laptopHorizontal:pb-[30px]">
					{likeProducts ? (
						likeProducts?.slice(0, 3).map((product, index) => (
							<div key={index}>
								<Product product={product} />
								<Link href={`/product/${product.id}`} className='site_btn normal_btn !mx-auto mt-[30px]'>Buy now</Link>
							</div>
						))
					) :
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
					}
				</div>
			</div>
		</div>
	)
}

export default AlsoLike