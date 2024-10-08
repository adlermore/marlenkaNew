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
						<div className=' flex-1 p-[20px] px-[20px] min-h-[400px]'>
							<div className="flex items-center justify-between">
								<div className="form_title text-2xl text-black">Checkout for items and shipping</div>
								<button className="site_btn !text-[12px] !max-w-[100px] ">Save Info</button>
							</div>
							<div className="checkout_form mt-[30px]">
								<form onSubmit={handleSubmitForm(userInfoSubmit)} className="w-full">
									<div className='block relative'>
										<div className="inline">
											<div className={errorUser?.namefirst ? "form_block has_error" : "form_block"}>
												<div className="label text-base font-light mb-[10px]">
													Name*
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
												<div className="label text-base font-light mb-[10px]">
													Surname*
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
										</div>
										<div className={errorUser?.company ? "form_block has_error" : "form_block"}>
											<div className="label text-base font-light mb-[10px]">
												Company name (optional)
											</div>
											<input
												placeholder="Type here..."
												autoComplete="on"
												className="form-control"
												name="company"
												{...userInfo("company", { required: true })}
											/>
											<p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
												{errorUser?.company?.message}
											</p>
										</div>

										<div className={errorUser?.region ? "form_block has_error" : "form_block"}>
											<div className="label text-base font-light mb-[10px]">
												Country / Region*
											</div>
											<input
												placeholder="United States (US)"
												autoComplete="on"
												className="form-control"
												name="region"
												{...userInfo("region", { required: true })}
											/>
											<p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
												{errorUser?.region?.message}
											</p>
										</div>

										<div className={errorUser?.street ? "form_block has_error" : "form_block"}>
											<div className="label text-base font-light mb-[10px]">
												Street address*
											</div>
											<input
												placeholder="House number and street name "
												autoComplete="on"
												className="form-control"
												name="street"
												{...userInfo("street", { required: true })}
											/>
											<p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
												{errorUser?.street?.message}
											</p>
										</div>

										<div className={errorUser?.apartament ? "form_block has_error" : "form_block"}>
											<input
												placeholder="Apartment, suite, unit, etc. (optional )"
												autoComplete="on"
												className="form-control"
												name="apartament"
												{...userInfo("apartament", { required: true })}
											/>
											<p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
												{errorUser?.apartament?.message}
											</p>
										</div>
										<div className="inline">
											<div className={errorUser?.city ? "form_block has_error" : "form_block"}>
												<div className="label text-base font-light mb-[10px]">
													Town / City*
												</div>
												<input
													placeholder="Type here..."
													autoComplete="on"
													className="form-control"
													name="city"
													{...userInfo("city", { required: true })}
												/>
												<p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
													{errorUser?.city?.message}
												</p>
											</div>

											<div className={errorUser?.state ? "form_block has_error" : "form_block"}>
												<div className="label text-base font-light mb-[10px]">
													State*
												</div>
												<input
													placeholder="Type here..."
													autoComplete="on"
													className="form-control"
													name="state"
													{...userInfo("state", { required: true })}
												/>
												<p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
													{errorUser?.state?.message}
												</p>
											</div>

										</div>

										<div className="inline">
											<div className={errorUser?.zip ? "form_block has_error" : "form_block"}>
												<div className="label text-base font-light mb-[10px]">
												ZIP Code*
												</div>
												<input
													placeholder="Type here..."
													autoComplete="on"
													className="form-control"
													name="zip"
													{...userInfo("zip", { required: true })}
												/>
												<p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
													{errorUser?.zip?.message}
												</p>
											</div>
											<div
											className={errorUser.phone ? "form_block has_error" : "form_block"}
										>
											<div className="label text-base font-light mb-[10px]">
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
										</div>
										<div className={errorUser?.email ? "form_block has_error" : "form_block"}  >
											<div className="label text-base font-light mb-[10px]">
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
										
										<div className={errorUser?.notes ? "form_block has_error" : "form_block"}>
											<div className="label text-base font-light mb-[10px]">
											Additional notes / comments
											</div>
											<input
												placeholder="Enter notes"
												autoComplete="on"
												className="form-control"
												name="name"
												{...userInfo("notes", { required: true, minLength: 5 })}
											/>
											<p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
												{errorUser?.notes?.message}
											</p>
										</div>
									</div>
								</form>
							</div>
						</div>
						<div className='w-[360px] py-[7px] px-[20px]  min-h-[400px]'>
							<div className='grid grid-cols-1 mb-[30px] gap-[10px] py-[18px] border-b border-[#CCC]'>
								Order summary
							</div>
							<div className='flex items-center justify-between text-[#525252] mb-20'>Sub total <span className='ml-auto text-black text-xl font-medium'>${cart?.totalAmount.toFixed(1)}</span></div>
							<div className='flex items-center justify-between text-[#525252] mb-20'>Delivery<span className='ml-auto text-black  text-xl font-medium'>$5</span></div>
							<div className='flex items-center justify-between text-[#525252] border-t  border-[#CCC] pt-20 font-bold'>Total<span className='ml-auto text-black  text-xl font-medium'>${cart?.totalAmount.toFixed(1) + 5}</span></div>
							<div className='flex items-end mt-[40px]'>
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
