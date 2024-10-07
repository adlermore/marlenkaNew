'use client'

import React, { useEffect, useState } from 'react'
import Product from '../product/Product'
import Link from 'next/link'

function AlsoLike({ sectionTitle, start, end }) {

	const [likeProducts, setLikeProducts] = useState(null);

	const fetchLikeProduct = async () => {
		const response = await fetch(`${process.env.NEXT_PUBLIC_DATA_API}/getProducts`);
		const data = await response.json();
		setLikeProducts(data.data.products)
	};

	useEffect(() => {
		fetchLikeProduct();
	}, [sectionTitle, start, end]);

	return (
		<div className="bg-siteCrem !py-[80px] mt-[30px] laptopHorizontal:!py-[50px] laptop:!py-[30px]">
			<div className="custom_container">
				<div className="text-[32px] text-center uppercase laptopHorizontal:text-xl">{sectionTitle}</div>
				<div className="grid grid-cols-3 tablet:gap-[30px] tablet:grid-cols-1 gap-[25px] mt-[80px] pb-[60px] laptopHorizontal:mt-[40px] laptopHorizontal:pb-[30px]">
					{likeProducts ? (
						likeProducts?.slice(start, end).map((product, index) => (
							<div key={index}>
								<Product product={product} />
								<Link href={`/product/${product.id}`} className='site_btn !mx-auto mt-[30px]'>Buy now</Link>
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