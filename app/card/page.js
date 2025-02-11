'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import "@/styles/product_inner.scss";
import { useDispatch, useSelector } from 'react-redux';
import emptybag from '@/public/images/emptybag2.png';
import { removeFromCart, updateCartQuantity } from '@/redux/cartSlice';
import IconTrash from '@/public/icons/IconTrash';
import AlsoLike from '@/components/alsoLikeProducts/AlsoLike';

const CardPage = () => {

	const router = useRouter();
	const isAuth = useSelector((state) => state.auth.isAuthenticated);
	const cart = useSelector((state) => state.cart);
	const dispatch = useDispatch();

	const handleRemoveFromCart = (product) => {
		dispatch(removeFromCart(product));
	};

	const incrementQuantity = (productId) => {
		dispatch(updateCartQuantity({ productId, amount: 1 }));
	};

	const decrementQuantity = (productId) => {
		dispatch(updateCartQuantity({ productId, amount: -1 }));
	};

	const detectScrollBarWidth = () => {
		const documentWidth = document.documentElement.clientWidth;
		const windowWidth = window.innerWidth;
		const scrollBarWidth = windowWidth - documentWidth;
		return scrollBarWidth;
	};

	//Login Popup Open
	const loginPopupOpen = () => {
		const scrollBarWidth = detectScrollBarWidth();
		document.body.style.overflow = "hidden";
		if (scrollBarWidth > 0) {
			document.body.style.paddingRight = `${scrollBarWidth}px`;
		}
		document.body.classList.add("login_opened");
		const fixedElements = document.querySelectorAll(".fixed-element");
		fixedElements.forEach((el) => {
			el.style.paddingRight = `${scrollBarWidth}px`;
		});
	};

	const handleCheckout = () => {
		if (cart?.totalAmount > 1 && isAuth) {
			router.push('/checkout');
		} else {
			loginPopupOpen()
		}
	}

	return (
		<div className='product_card_page !mt-[120px] !min-h-[100vh] mobile:!mt-[150px]'>
			<div className=' text-[24px] uppercase bg-siteCrem '>
				<div className='custom_container h-[120px] laptopHorizontal:h-[80px] laptopHorizontal:text-base  flex items-center text-xl text-[#B62025] font-medium'>
					Menu / Card
				</div>
			</div>
			<div className='pt-[70px] pb-[118px] laptopHorizontal:py-[60px] laptop:py-[30px] tablet:px-0'>
				<div className='custom_container'>
					<div className='flex justify-between gap-[50px] laptop:flex-col laptopHorizontal:gap-20'>
						<div className=' flex-1 p-[7px] px-[20px] tablet:px-0 rounded-[30px] min-h-[400px]'>
							<div className={`${cart?.items.length === 0 && 'opacity-0'} grid grid-cols-5  mobile:grid-cols-4 text-center gap-[10px] py-[18px]`}>
								<div>Product</div>
								<div></div>
								<div className='mobile:opacity-0'>Quantity</div>
								<div className='hidden'>Total</div>
								<div>Action</div>
							</div>
							{cart?.items.length > 0 ?
								<div className='block gap-[15px] grid-cols-4'>
									{cart.items.map((item, index) => (
										<div key={index} className='grid  relative grid-cols-5 mobile mobile:grid-cols-3 mobile:items-center text-center gap-[10px] py-[25px] laptopHorizontal:py-[10px] last:border-none items-center border-b border-[#CCC]'>
											<div className='relative flex items-center justify-center'>
												<Image
													src={process.env.NEXT_PUBLIC_DATA + item?.images[0].image_path || ''}
													unoptimized
													alt={item.name || "Ricardo portrait"}
													priority
													width={120}
													height={96}
													className="object-contain"
												/>
											</div>
											<div className='font-medium text-xl laptopHorizontal:text-base'>{item.name}</div>
											<div className='mx-auto'>
												<div className='flex items-center justify-between h-[35px] bg-[#D9D9D9] bg-opacity-40 rounded-[5px] max-w-[110px]'>
													<button onClick={() => decrementQuantity(item.id)} className='py-[10px] text-2xl w-[40px] h-full flex items-center justify-center'>-</button>
													<span>{item?.quantity || 1}</span>
													<button onClick={() => incrementQuantity(item.id)} className='py-[10px] text-2xl w-[40px] h-full flex items-center justify-center'>+</button>
												</div>
											</div>
											<div>{item?.totalPrice.toFixed(1)}$</div>
											<div className='mobile:absolute mobile:right-[30px] mobile:bottom-[20px]'>
												<button className="remove_btn duration-300 hover:opacity-45" onClick={() => handleRemoveFromCart(item)}>
													<IconTrash />
												</button>
											</div>
										</div>
									))}
								</div>
								:
								<div className='relative w-full h-full top-[-45px] flex items-center justify-center'>
									<Image
										src={emptybag}
										alt="Empty Image"
										priority={true}
									/>
								</div>
							}
						</div>
						<div className='w-[360px] laptopHorizontal:w-[320px] laptop:w-full py-[7px] px-[20px] flex flex-col rounded-[30px]  min-h-[400px]'>
							<div className='grid grid-cols-1 mb-[30px] gap-[10px] py-[18px] mobile:mb-0 text-xl'>
								Order summary
							</div>
							<div className='flex items-center justify-between text-[#525252] mb-20'>Sub total <span className='ml-auto text-black text-xl font-medium'>${cart?.totalAmount.toFixed(1)}</span></div>
							<div className='flex items-center justify-between text-[#525252] mb-[40px]'>Delivery<span className='ml-auto text-black  text-xl font-medium'>$5</span></div>
							<div className='flex items-center justify-between text-[#525252] border-t  border-[#CCC] pt-20 font-bold'>Total<span className='ml-auto text-black  text-xl font-medium'>  ${(cart?.totalAmount + 5).toFixed(1)}</span></div>
							<div className='flex items-end mt-40'>
								<button onClick={handleCheckout} className={`bg-[#CE090F] duration-300 hover:opacity-70 text-white rounded-[30px] uppercase  w-full h-[46px] border-none ${cart?.totalAmount < 1 && 'opacity-50 cursor-no-drop pointer-events-none'}`}>Checkout</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<AlsoLike sectionTitle='YOU MAY ALSO LIKE' start={5} end={8} />
		</div>
	);
};

export default CardPage;
