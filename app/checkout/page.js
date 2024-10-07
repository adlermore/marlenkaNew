'use client';

import "@/styles/product_inner.scss";
import { useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { userScheme } from "@/validation/userScheme";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import InputMask from "react-input-mask";

const Checkout = () => {

	const cart = useSelector((state) => state.cart);
	const user = useSelector((state) => state.auth.user);
	const router = useRouter();

	//validation init
	const { register: userInfo, handleSubmit: handleSubmitForm, formState: { errors: errorUser } } = useForm({
		resolver: zodResolver(userScheme)
	});

	//sumbition Data
	const userInfoSubmit = async (dataForm) => {
		console.log('dataForm', dataForm);
	};

	useEffect(() => {
		if (cart?.totalAmount < 1) {
			router.push('/');
		}
	}, [cart?.totalAmount]);

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
						<div className=' flex-1 p-[20px] px-[20px] rounded-[30px] border border-[#CCCCCC] min-h-[400px]'>
							<div className="form_title text-xl text-black">Checkout</div>
							<div className="checkout_form">

								<form onSubmit={handleSubmitForm(userInfoSubmit)} className="w-full">
									<div className='grid grid-cols-3 gap-[30px] userInfoForm'>
										<div className={errorUser?.namefirst ? "form_block has_error" : "form_block"}>
											<div className="userInfo_label text-base font-light mb-[10px]">
												Name
											</div>
											<input
												placeholder="Enter name"
												autoComplete="on"
												defaultValue={user?.name.split(' ')[0]}
												className="form-control"
												name="name"
												{...userInfo("namefirst", { required: true, minLength: 5 })}
											/>
											<p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
												{errorUser?.namefirst?.message}
											</p>
										</div>
										<div className={errorUser?.surname ? "form_block has_error" : "form_block"}>
											<div className="userInfo_label text-base font-light mb-[10px]">
												Surname
											</div>
											<input
												placeholder="Enter surname"
												autoComplete="on"
												defaultValue={user?.name.split(' ')[1]}
												className="form-control"
												name="name"
												{...userInfo("surname", { required: true, minLength: 5 })}
											/>
											<p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
												{errorUser?.surname?.message}
											</p>
										</div>
										<div className={errorUser?.email ? "form_block has_error" : "form_block"}  >
											<div className="userInfo_label text-base font-light mb-[10px]">
												Email
											</div>
											<input
												placeholder="Enter your email address"
												autoComplete="on"
												className="form-control"
												defaultValue={user?.email}
												name="email"
												{...userInfo("email", {
													required: true,
													pattern: /^\S+@\S+$/i,
												})}
											/>
											<p className="form_error form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
												{errorUser?.email?.message}
											</p>
										</div>
										<div
											className={errorUser.phone ? "form_block has_error" : "form_block"}
										>
											<div className="userInfo_label text-base font-light mb-[10px]">
												Phone
											</div>
											<InputMask
												{...userInfo("phone", { required: true })}
												placeholder="Enter your password"
												type="tel"
												autoComplete="on"
												className="form-control"
												value={user?.phone}
												mask="(999)-999-9999"

											/>
											<p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
												{errorUser?.phone?.message}
											</p>
										</div>
										<div className={errorUser?.address ? "form_block has_error" : "form_block"}>
											<div className="userInfo_label text-base font-light mb-[10px]">
												Address
											</div>
											<input
												placeholder="Enter address"
												autoComplete="on"
												className="form-control"
												name="name"
												{...userInfo("address", { required: true, minLength: 5 })}
											/>
											<p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
												{errorUser?.address?.message}
											</p>
										</div>
										<div className={errorUser?.postalCode ? "form_block has_error" : "form_block"}>
											<div className="userInfo_label text-base font-light mb-[10px]">
												Postal Code
											</div>
											<input
												placeholder="Enter postalCode"
												autoComplete="on"
												className="form-control"
												name="name"
												{...userInfo("postalCode", { required: true, minLength: 5 })}
											/>
											<p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
												{errorUser?.postalCode?.message}
											</p>
										</div>
									</div>
								</form>
							</div>
						</div>
						<div className='w-[360px] py-[7px] px-[20px] flex flex-col rounded-[30px] border border-[#CCCCCC] min-h-[400px]'>
							<div className='grid grid-cols-1 mb-[30px] gap-[10px] py-[18px] border-b border-[#CCC]'>
								Order summary
							</div>
							<div className='flex items-center justify-between text-[#525252] mb-20'>Sub total <span className='ml-auto text-black text-xl font-medium'>${cart?.totalAmount.toFixed(1)}</span></div>
							<div className='flex items-center justify-between text-[#525252] mb-20'>Delivery<span className='ml-auto text-black  text-xl font-medium'>$5</span></div>
							<div className='flex items-center justify-between text-[#525252] border-t  border-[#CCC] pt-20 font-bold'>Total<span className='ml-auto text-black  text-xl font-medium'>${cart?.totalAmount.toFixed(1) + 5}</span></div>
							<div className='flex flex-1 items-end pb-[13px]'>
								<button className='bg-[#CE090F] duration-300 hover:opacity-70 text-white rounded-[30px] text-sm  w-full h-[46px] border-none'>Pay ${cart?.totalAmount.toFixed(1) + 5}</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Checkout;
