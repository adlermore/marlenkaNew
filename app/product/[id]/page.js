'use client';

import { useState, useRef, useEffect } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import "@/styles/product_inner.scss";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, updateCartQuantity } from '@/redux/cartSlice';
import Link from 'next/link';
import PageLoader from '@/components/PageLoader';
import AlsoLike from '@/components/alsoLikeProducts/AlsoLike';
import newLook from "@/public/images/newLookInner.png";
import Select from 'react-select';
import IconClose from '@/public/icons/IconClose';
import IconZoom from '@/public/icons/IconZoom';
import toast from 'react-hot-toast';

const ProductPage = ({ params }) => {

	const customStyles = {
		control: (provided, state) => ({
			...provided,
			backgroundColor: '#fff',
			borderRadius: '30px',
			padding: '5px 20px',
			borderColor: '#A8894A',
			boxShadow: state.isFocused ? null : null,
		}),
		menu: (provided) => ({
			...provided,
			backgroundColor: '#fff',
			borderRadius: '10px',
			padding: '5px 10px',
		}),

		option: (provided, state) => ({
			...provided,
			backgroundColor: state.isSelected ? '#eeeeee' : '#fff',
			color: '#000',
			padding: 10,
			boxShadow: state.isFocused ? null : null,
			borderRadius: '5px',
			':hover': {
				backgroundColor: '#eeeeee',
				color: '#000',
			},
		}),
		multiValue: (provided) => ({
			...provided,
			backgroundColor: '#B62025',
			color: '#fff',
			borderRadius: '10px',
			padding: '2px',
		}),
		multiValueLabel: (provided) => ({
			...provided,
			color: '#fff',
		}),
		multiValueRemove: (provided) => ({
			...provided,
			color: '#fff',
			':hover': {
				backgroundColor: '#d32f2f',
				color: '#fff',
			},
		}),
	};

	const [options, setOptions] = useState([]);
	const [selectedOption, setSelectedOption] = useState(null);
	const zoomInnerRef = useRef(null);
	const smallSliderRef = useRef(null);
	const bigSliderRef = useRef(null);
	const fullDetailsRef = useRef(null);

	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);
	const [product, setProduct] = useState(null);
	const [showFullDetails, setShowFullDetails] = useState(false);

	const [selectedImageIndex, setSelectedImageIndex] = useState(0);
	const [productCount, setProductCount] = useState(1);
	const items = useSelector((state) => state.cart.items);
	const [zoomUrl, setZommUrl] = useState(null);

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
		arrows: true,
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

	const closeZoom = () => {
		setZommUrl(null)
	}

	// Handle click outside of popup to close it
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (zoomInnerRef.current && !zoomInnerRef.current.contains(event.target)) {
				closeZoom();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const handleAddToCart = (e) => {
		e.preventDefault();
		const productToAdd = {
			...product,
			quantity: 1
		};

		const existingItemIndex = items.findIndex(item => item.id === product.id);

		if (existingItemIndex >= 0) {
			dispatch(updateCartQuantity({ productId: product.id, amount: productCount }));
			setProductCount((prevCount) => prevCount + 1);
			toast.success(`${product.name} quantity updated in your cart.`);
		} else {
			dispatch(addToCart(productToAdd));
		}

		setProductCount(1);
	};

	const fetchProduct = async () => {
		setLoading(true);
		const response = await fetch(`${process.env.NEXT_PUBLIC_DATA_API}/getProducts?product_id=${params?.id}`);
		const data = await response.json();
		setProduct(data.data.products[0])
		setLoading(false);
	};

	const fetchFlavors = async () => {
		if (product) {
			const response = await fetch(`${process.env.NEXT_PUBLIC_DATA_API}/getFlavors?category_id=${product.category_id}`);
			const data = await response.json();
			const flavorOptions = data.data.flavors.map(option => ({ value: option.id, label: option.name }));
			setOptions(flavorOptions);
			const defaultOption = flavorOptions.find(option => option.value === product.flavors[0].flavor_id);
			setSelectedOption(defaultOption || null);
		}
	};

	useEffect(() => {
		fetchProduct();
	}, [params]);


	useEffect(() => {
		if (product) {
			fetchFlavors();
		}
	}, [product]);

	if (loading) {
		return <PageLoader />
	}

	const handleZommActive = (url) => {
		setZommUrl(url)
	}

	const handleSelectChange = async (selected) => {
		setLoading(true);
		setSelectedOption(selected);

		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_DATA_API}/getProductByFlavor?category_id=${product.category_id}&flavor=${selected.value}`, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' }
			});
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const data = await response.json();

			if (data.data.product) {
				setProduct(data.data.product);
			}
		} catch (error) {
			console.error('Error fetching product by flavor:', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='product_inner_page !mt-[120px] mobile:!mt-[150px] !min-h-[100vh]'>
			<div className=' text-[24px] uppercase bg-siteCrem '>
				<div className='custom_container h-[120px] mobile:h-[60px] laptopHorizontal:h-[80px] laptopHorizontal:text-base mobile:text-[11px] flex items-center text-xl mobile:whitespace-nowrap text-[#B62025] font-medium'>
					<Link className='pr-[5px]' href='/productListing'>All Products</Link>/ <Link className='pl-[5px] pr-[5px]' href={`/productListing?category=${product?.category_id}`}> {product?.category?.name}</Link> / {product?.name}
				</div>
			</div>
			{zoomUrl &&
				<div className='zoom_popup'>
					<div className='zoom_inner' ref={zoomInnerRef}>
						<a
							href="/#"
							className="popup_close absolute right-[20px] top-[20px] cursor-pointer"
							onClick={(e) => {
								e.preventDefault();
								closeZoom();
							}}
						>
							<IconClose />
						</a>
						<div className='absolute inner_div'>
							<Image
								src={`${process.env.NEXT_PUBLIC_DATA}${zoomUrl}`}
								fill
								unoptimized
								sizes="50vw, 100vw"
								style={{
									objectFit: 'cover',
								}}
							/>
						</div>
					</div>
				</div>
			}
			<div className="product_section">
				<div className='custom_container flex'>
					<div className="product_images">
						<div className="big_images">
							<div className="images_slider">
								<Slider {...bigImagesOpts} ref={bigSliderRef}>
									{product.images.map((image, index) => (
										<div className="slide_block" key={index}>
											<div className="img_block"
												onClick={() => handleZommActive(image.image_path)}
											>
												<Image
													src={process.env.NEXT_PUBLIC_DATA + image.image_path}
													alt={`Product ${index}`}
													fill
													unoptimized
													sizes="50vw, 100vw"
													style={{
														objectFit: 'contain',
													}} />
											</div>
											{/* <div className='zoom_btn'
												onClick={() => handleZommActive(image.image_path)}
											>
												<IconZoom />
											</div> */}
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
													unoptimized
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
					<div className='product_info relative z-0 pl-[80px] w-full flex flex-col justify-between laptopHorizontal:pl-[30px]'>
						{product.isNew === 1 &&
							<span className="new_look mobile:hidden">
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
						<div className='text-[#B62025] text-2xl mobile:text-xl'>{product.name}</div>
						<div className='mt-[30px] mobile:mt-[15px] text-base text-black font-medium max-w-[500px]'>
							{product.description}
						</div>
						<div className='w-full my-[40px] laptopHorizontal:my-[30px]'>
							{product.technicals.length > 0 &&
								product.technicals.map((item, index) => (
									<div key={index} className='pb-[18px] mb-[18px] border-b-2 border-[#AE8839] flex items-center justify-between'>
										<div className='font-xl mobile:text-[12px] text-black font-bold'>{item.technical}</div>
										<div className='font-medium mobile:text-[12px]'>{item.value}</div>
									</div>
								))
							}
							<button
								className='text-[#B62025] duration-300 ml-auto text-[20px] mobile:text-base block uppercase'
								onClick={handleFullDetailsClick}
							>
								{showFullDetails ? 'Hide details' : 'Full details'}
							</button>
						</div>
						<Select
							name="options"
							options={options}
							styles={customStyles}
							value={selectedOption}
							onChange={handleSelectChange}
							placeholder="Select options..."
							className="basic-multi-select"
							classNamePrefix="select"
						/>
						<div className='flex  mt-[50px] mobile:flex-col laptop:mt-[30px] items-center gap-[20px] justify-between laptopHorizontal:justify-center'>
							<div className='text-black text-[36px] font-medium laptopHorizontal:text-2xl'>
								<span className='font-regular'>$</span>{product.price}
							</div>
							<div className='flex items-center justify-between h-[35px] bg-[#D9D9D9] bg-opacity-40 rounded-[5px] max-w-[110px]'>
								<button onClick={decrementCount} className='py-[10px] text-2xl w-[40px] h-full flex items-center justify-center'>-</button>
								<span>{productCount}</span>
								<button onClick={incrementCount} className='py-[10px] text-2xl w-[40px] h-full flex items-center justify-center'>+</button>
							</div>
							<button className='site_btn normal_btn !ml-0 px-[15px] !mobile:px-[10px] ' onClick={handleAddToCart} >Add to Cart</button>
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
									<div className='font-xl text-black font-bold'>{item.technical}</div>
									<div className='font-medium'>{item.value}</div>
								</div>
							))
						}
					</div>
					<div className='w-full'>
						<div className='text-[#AE8839] text-2xl mobile:text-base font-medium mb-[30px] laptop:text-xl'>Mass Packaging</div>
						{product.package_technicals.length > 0 &&
							product.package_technicals.map((item, index) => (
								<div key={index} className='pb-[18px] mb-[18px] border-b-2 border-[#AE8839] flex items-center justify-between'>
									<div className='font-xl text-black font-bold'>{item.technical}</div>
									<div className='font-medium'>{item.value}</div>
								</div>
							))
						}
					</div>
				</div>
			</div>
			<AlsoLike sectionTitle='Additional flavors' parentProductId={product?.id} category_id={product?.category_id} />
		</div>
	);
};

export default ProductPage;
