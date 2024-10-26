'use client';

import { useState, useRef, useEffect } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import "@/styles/product_inner.scss";
// import { bestProducts } from '@/utils/data/homeData';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/cartSlice';
import Product from '@/components/product/Product';
import Link from 'next/link';
import PageLoader from '@/components/PageLoader';
import AlsoLike from '@/components/alsoLikeProducts/AlsoLike';
import newLook from "@/public/images/newLookInner.png";

const ProductPage = ({ params }) => {

	const smallSliderRef = useRef(null);
	const bigSliderRef = useRef(null);
	const fullDetailsRef = useRef(null);

	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);
	const [product, setProduct] = useState(null);
	const [showFullDetails, setShowFullDetails] = useState(false);


	const [selectedImageIndex, setSelectedImageIndex] = useState(0);
	const [productCount, setProductCount] = useState(1);

	const incrementCount = () => {
		setProductCount((prevCount) => prevCount + 1);
	};

	const decrementCount = () => {
		setProductCount((prevCount) => (prevCount > 1 ? prevCount - 1 : 1));
	};

	const handleFullDetailsClick = () => {
		setShowFullDetails((prev) => !prev);
		if (!showFullDetails) {
			setTimeout(() => {
				if (fullDetailsRef.current) {
					fullDetailsRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
				}
			}, 0);
		}
	};

	const smallImagesOpts = {
		centerPadding: 0,
		infinite: false,
		slidesToShow: 3,
		arrows: false,
		focusOnSelect: true,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					vertical: false,
					slidesToShow: 2,
				}
			}
		]
	};

	const bigImagesOpts = {
		centerPadding: 0,
		infinite: false,
		touchMove: false,
		draggable: false,
		swipe: false,
		arrows: true,
		fade: true,
		beforeChange: (oldIndex, newIndex) => {
			setSelectedImageIndex(newIndex);
			if (smallSliderRef.current) {
				smallSliderRef.current.slickGoTo(newIndex);
			}
		},
	};

	const handleSmallImageClick = (index) => {
		bigSliderRef.current.slickGoTo(index);
		setSelectedImageIndex(index);
	};

	const handleAddToCart = (e) => {
		e.preventDefault();
		const productToAdd = {
			...product,
			quantity: productCount
		};
		dispatch(addToCart(productToAdd));
	};

	const fetchProduct = async () => {
		setLoading(true);
		const response = await fetch(`${process.env.NEXT_PUBLIC_DATA_API}/getProducts?product_id=${params?.id}`);
		const data = await response.json();
		setProduct(data.data.products[0])
	};

	useEffect(() => {
		fetchProduct();
	}, [params?.id]);

	if (loading && !product) {
		return <PageLoader />
	}

	return (
		<div className='product_inner_page !mt-[120px] mobile:!mt-[150px] !min-h-[100vh]'>
			<div className=' text-[24px] uppercase bg-siteCrem '>
				<div className='custom_container h-[120px] laptopHorizontal:h-[80px] laptopHorizontal:text-base flex items-center text-xl text-[#B62025] font-medium'>
					Menue/{product?.category?.name}/{product?.name}
				</div>
			</div>
			<div className="product_section">
				<div className='custom_container flex'>
					<div className="product_images">
						<div className="big_images">
							<div className="images_slider">
								<Slider {...bigImagesOpts} ref={bigSliderRef}>
									{product.images.map((image, index) => (
										<div className="slide_block" key={index}>
											<div className="img_block">
												<Image
													src={process.env.NEXT_PUBLIC_DATA + image.image_path}
													alt={`Product ${index}`}
													fill
													sizes="50vw, 100vw"
													style={{
														objectFit: 'contain',
													}}
												/>
											</div>
										</div>
									))}
								</Slider>
							</div>
						</div>
						<div className="small_images">
							<div className="images_slider">
								<Slider {...smallImagesOpts} ref={smallSliderRef} >
									{product.images.map((image, index) => (
										<div className="slide_block" key={index}>
											<div
												className={`img_block ${selectedImageIndex === index ? 'selected' : ''}`}
												onClick={() => handleSmallImageClick(index)}
											>
												<Image
													src={process.env.NEXT_PUBLIC_DATA + image.image_path}
													alt={`Product ${index}`}
													fill
													sizes="50vw, 100vw"
													style={{
														objectFit: 'contain',
													}}
												/>
											</div>
										</div>
									))}
								</Slider>
							</div>
						</div>
					</div>
					<div className='product_info pl-[80px] w-full flex flex-col justify-between laptopHorizontal:pl-[30px]'>
						{product.id === 5 &&
							<span className="new_look">
								<Image
									src={newLook}
									unoptimized
									alt={product.name || "Ricardo portrait"}
									priority
									width={184}
									height={184}
									className="object-contain"
								/>
							</span>
						}
						<div className='text-[#B62025] text-2xl'>{product.name}</div>
						<div className='mt-[30px] text-xl text-black font-medium max-w-[420px]:'>
							{product.description}
						</div>
						<div className='w-full my-[50px] laptopHorizontal:my-[30px]'>
							{product.technicals.length > 0 &&
								product.technicals.map((item, index) => (
									<div key={index} className='pb-[18px] mb-[18px] border-b-2 border-[#AE8839] flex items-center justify-between'>
										<div className='font-xl text-black font-medium'>{item.technical}</div>
										<div>{item.value}</div>
									</div>
								))
							}
							<button
								className='text-[#B62025] duration-300 ml-auto text-xl block uppercase'
								onClick={handleFullDetailsClick}
							>
								{showFullDetails ? 'Hide details' : 'Full details'}
							</button>
						</div>
						<div className='flex  mt-[50px] laptop:mt-[30px] items-center gap-[20px] justify-between laptopHorizontal:justify-center'>
							<div className='text-black text-[36px] font-bold laptopHorizontal:text-2xl'>${product.price}</div>
							<div className='flex items-center justify-between h-[35px] bg-[#D9D9D9] bg-opacity-40 rounded-[5px] max-w-[110px]'>
								<button onClick={decrementCount} className='py-[10px] text-2xl w-[40px] h-full flex items-center justify-center'>-</button>
								<span>{productCount}</span>
								<button onClick={incrementCount} className='py-[10px] text-2xl w-[40px] h-full flex items-center justify-center'>+</button>
							</div>
							<button className='site_btn !ml-0 px-[15px] ' onClick={handleAddToCart} >Add to Cart</button>
						</div>
					</div>
				</div>
			</div>
			<div className='!mt-[50px] custom_container'>
				<div className='flex gap-[80px] laptop:gap-[40px] mobile:gap-[20px] pt-[30px]'>
					<div className='text-[#AE8839] text-2xl mobile:text-base font-medium'>Details</div>
					<div className='pb-[30px] text-xl mobile:text-base  text-black'>
						{product.details_one !== 'null' && product.details_one}
						<br />
						<br />
						{product.details_two !== 'null' && product.details_two}
						<br />
						<br />
						{product.details_three !== 'null' && product.details_three}
					</div>
				</div>
				<div className='flex gap-[80px] tablet:flex-col laptop:gap-[40px] mobile:gap-[20px] pt-[30px] mb-[40px] '
					ref={fullDetailsRef}
					style={{ display: showFullDetails ? 'flex' : 'none' }}
					id="full-details"
				>
					<div className='w-full'>
						<div className='text-[#AE8839] text-2xl mobile:text-base font-medium mb-[30px] laptop:text-xl'>Single box</div>
						{product.technicals.length > 0 &&
							product.technicals.map((item, index) => (
								<div key={index} className='pb-[18px] mb-[18px] border-b-2 border-[#AE8839] flex items-center justify-between'>
									<div className='font-xl text-black font-medium'>{item.technical}</div>
									<div>{item.value}</div>
								</div>
							))
						}
					</div>
					<div className='w-full'>
						<div className='text-[#AE8839] text-2xl mobile:text-base font-medium mb-[30px] laptop:text-xl'>MASS PACKAGING</div>
						{product.package_technicals.length > 0 &&
							product.package_technicals.map((item, index) => (
								<div key={index} className='pb-[18px] mb-[18px] border-b-2 border-[#AE8839] flex items-center justify-between'>
									<div className='font-xl text-black font-medium'>{item.technical}</div>
									<div>{item.value}</div>
								</div>
							))
						}
					</div>
				</div>
			</div>
			<AlsoLike sectionTitle='Additional flavors' start={2} end={5} />
		</div>
	);
};

export default ProductPage;
