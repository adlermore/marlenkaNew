'use client';

import Image from 'next/image';
import "@/styles/product_inner.scss";
import { bestProducts } from '@/utils/data/homeData';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import emptybag from '@/public/images/emptybag.png';
import Product from '@/components/product/Product';
import { removeFromCart, updateCartQuantity } from '@/redux/cartSlice';
import IconTrash from '@/public/icons/IconTrash';

const CardPage = () => {

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
							<div className='grid grid-cols-5 text-center gap-[10px] py-[18px] border-b border-[#CCC]'>
								<div>Product</div>
								<div></div>
								<div>Quantity</div>
								<div>Total</div>
								<div>Action</div>
							</div>
							{cart?.items.length > 0 ?
								<div className='block gap-[15px] grid-cols-4'>
									{cart.items.map((item, index) => (
										<div key={index} className='grid grid-cols-5 text-center gap-[10px] py-[25px] last:border-none items-center border-b border-[#CCC]'>
											<div className='relative flex items-center justify-center'>
												<Image
													src={item.image}
													unoptimized
													alt={item.title}
													priority
													width={120}
													height={96}
													className="object-contain"
												/>
											</div>
											<div className='font-medium text-xl'>{item.title}</div>
											<div className='mx-auto'>
												<div className='flex items-center justify-between h-[35px] bg-[#D9D9D9] bg-opacity-40 rounded-[5px] max-w-[110px]'>
													<button onClick={() => decrementQuantity(item.id)} className='py-[10px] text-2xl w-[40px] h-full flex items-center justify-center'>-</button>
													<span>{item?.quantity || 1}</span>
													<button onClick={() => incrementQuantity(item.id)} className='py-[10px] text-2xl w-[40px] h-full flex items-center justify-center'>+</button>
												</div>
											</div>
											<div>{item?.totalPrice.toFixed(1)}$</div>
											<div>
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
						<div className='w-[360px] py-[7px] px-[20px] flex flex-col rounded-[30px] border border-[#CCCCCC] min-h-[400px]'>
							<div className='grid grid-cols-1 mb-[30px] gap-[10px] py-[18px] border-b border-[#CCC]'>
								Order summary
							</div>
							<div className='flex items-center justify-between text-[#525252] mb-20'>Sub total <span className='ml-auto text-black text-xl font-medium'>${cart?.totalAmount.toFixed(1)}</span></div>
							<div className='flex items-center justify-between text-[#525252] mb-20'>Delivery<span className='ml-auto text-black  text-xl font-medium'>$5</span></div>
							<div className='flex items-center justify-between text-[#525252] border-t  border-[#CCC] pt-20 font-bold'>Total<span className='ml-auto text-black  text-xl font-medium'>${cart?.totalAmount.toFixed(1) + 5}</span></div>
							<div className='flex flex-1 items-end pb-[13px]'>
							<button className='bg-[#CE090F] duration-300 hover:opacity-70 text-white rounded-[30px]  w-full h-[46px] border-none'>Checkout Now</button>

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

export default CardPage;
