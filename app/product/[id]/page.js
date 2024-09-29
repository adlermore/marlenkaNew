'use client';

import { useState, useRef } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import "@/styles/product_inner.scss";
import { bestProducts } from '@/utils/data/homeData';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/cartSlice';
import Product from '@/components/product/Product';
import Link from 'next/link';

const ProductPage = () => {
	const smallSliderRef = useRef(null);
	const bigSliderRef = useRef(null);
	const [selectedImageIndex, setSelectedImageIndex] = useState(0);


	const [productCount, setProductCount] = useState(1); 

	const incrementCount = () => {
		setProductCount((prevCount) => prevCount + 1);
	};

	const decrementCount = () => {
		setProductCount((prevCount) => (prevCount > 1 ? prevCount - 1 : 1)); 
	};


	const smallImagesOpts = {
		centerPadding: 0,
		infinite: false,
		slidesToShow: 3,
		arrows: false,
		focusOnSelect: true,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 768,
				settings: {
					vertical: false,
					slidesToShow: 3,
				}
			},
			{
				breakpoint: 576,
				settings: {
					vertical: false,
					verticalSwiping: false,
					slidesToShow: 1,
					dots: true,
					arrows: false,
				}
			}
		],
		afterChange: (index) => {
			setSelectedImageIndex(index);
			if (bigSliderRef.current) {
				bigSliderRef.current.slickGoTo(index);
			}
		}
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

	const dispatch = useDispatch();

	const handleAddToCart = (e) => {
    e.preventDefault();
    const productToAdd = {
        ...bestProducts[0],
        quantity: productCount 
    };
    dispatch(addToCart(productToAdd));
	};


	return (
		<div className='product_inner_page !mt-[120px] !min-h-[100vh]'>
			<div className=' text-[24px] uppercase bg-siteCrem '>
				<div className='custom_container h-[120px] flex items-center text-xl text-[#B62025] font-medium'>
					Menue / Cakes / Classic-Large
				</div>
			</div>
			<div className="product_section">
				<div className='custom_container flex'>
					<div className="product_images">
						<div className="big_images">
							<div className="images_slider">
								<Slider {...bigImagesOpts} ref={bigSliderRef}>
									{bestProducts.map((image, index) => (
										<div className="slide_block" key={index}>
											<div className="img_block">
												<Image
													src={image.image}
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
									{bestProducts.map((image, index) => (
										<div className="slide_block" key={index}>
											<div
												className={`img_block ${selectedImageIndex === index ? 'selected' : ''}`}
												onClick={() => handleSmallImageClick(index)}
											>
												<Image
													src={image.image}
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
					<div className='product_info pl-[40px]'>
						<div className='text-[#B62025] text-2xl'>Classic - Large</div>
						<div className='mt-[30px] text-xl text-black font-medium max-w-[420px]:'>
							Our Classic Honey Cake is scrumptious and healthy.
						</div>
						<div className='mt-[30px] text-black text-2xl  font-bold'>$25.99</div>
						<div className='mt-[50px] flex items-center justify-between h-[35px] bg-[#D9D9D9] bg-opacity-40 rounded-[5px] max-w-[110px]'>
							<button onClick={decrementCount} className='py-[10px] text-2xl w-[40px] h-full flex items-center justify-center'>-</button>
							<span>{productCount}</span>
							<button onClick={incrementCount} className='py-[10px] text-2xl w-[40px] h-full flex items-center justify-center'>+</button>
						</div>
						<button className='site_btn !ml-0 mt-[50px]'   onClick={handleAddToCart} >Add to Cart</button>
					</div>
				</div>
			</div>
			<div className='!mt-[50px] custom_container'>
				<div className='flex gap-[80px] pt-[30px]'>
					<div className='text-[#AE8839] text-2xl font-medium'>Details</div>
					<div className='pb-[30px] text-xl text-black'>
						Let yourself be carried away by the sounds of the Viennese waltz and enjoy this year’s first new product from Marlenka: the Viennese honey Cake. Based on a traditional recipe, we bring you a combination of fluffy honey dough, delicious apricot cream filling and rich cocoa icing.
						<br />
						<br />
						This premium cake is perfect for special occasions as well as with your afternoon coffee. You can serve it with whipped cream or pieces of apricots. This combination of two traditional desserts, the classic Viennese cake and Armenian honey cake, is sure to delight you.
					</div>
				</div>
				<div className='flex gap-[80px] pt-[30px]'>
					<div className='text-[#AE8839] text-2xl font-medium'>Technical</div>
					<div className='w-full'>
						<div className='pb-[18px] mb-[18px] border-b-2 border-[#AE8839] flex items-center justify-between'>
							<div className='font-xl text-black font-medium'>Weight:</div>
							<div>1 g</div>
						</div>
						<div className='pb-[18px] mb-[18px] border-b-2 border-[#AE8839] flex items-center justify-between'>
							<div className='font-xl text-black font-medium'>Box dimensions::</div>
							<div>220 x 225 x 50 mm</div>
						</div>
						<div className='pb-[18px] mb-[18px] border-b-2 border-[#AE8839] flex items-center justify-between'>
							<div className='font-xl text-black font-medium'>Package EAN:</div>
							<div>859407165263</div>
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

export default ProductPage;
