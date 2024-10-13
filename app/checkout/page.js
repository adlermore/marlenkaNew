'use client';

import "@/styles/product_inner.scss";
import { useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import InputMask from "react-input-mask";
import visa from "@/public/images/icons/visa.png";
import arca from "@/public/images/icons/arca.png";
import discover from "@/public/images/icons/discover.png";
import amex from "@/public/images/icons/amex.png";
import paypal from "@/public/images/icons/paypal.png";
import IconChecked from "@/public/icons/IconChecked";
import IconTruch from "@/public/icons/IconTruch";
import IconAir from "@/public/icons/IconAir";
import Image from "next/image";

const Checkout = () => {
	const cart = useSelector((state) => state.cart);
	const user = useSelector((state) => state.auth.user);
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm();

	const validateEmail = (value) => {
		const regex = /^\S+@\S+$/i;
		if (!regex.test(value)) {
			return "Invalid email address";
		}
		return true;
	};

	const validatePhone = (value) => {
		if (!value) {
			return "Phone number is required";
		}
		if (!/^(\(\d{3}\) \d{3}-\d{3})$/.test(value)) {
			return "Invalid phone number format"
		}
		return true;
	};

	const userInfoSubmit = async (dataForm) => {
		// console.log('Submitted form data:', dataForm);
	};

	const saveInfo = () => {
		const formData = {
			name: `${watch("namefirst")} ${watch("surname")}`,
			company: watch("company"),
			region: watch("region"),
			street: watch("street"),
			apartment: watch("apartament"),
			city: watch("city"),
			state: watch("state"),
			zip: watch("zip"),
			phone: watch("phone"),
			email: watch("email"),
			notes: watch("notes"),
		};
		// console.log('Saved Info:', formData);
	};

	const validateCardNumber = (value) => {
		const regex = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9]{2})[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|2(?:014|149)[0-9]{10})$/;
		if (!regex.test(value)) {
			return "Invalid credit card number";
		}
		return true;
	};

	const validateExpirationDate = (value) => {
		const regex = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;
		if (!regex.test(value)) {
			return "Invalid expiration date (MM/YY)";
		}
		return true;
	};

	const validateCVV = (value) => {
		const regex = /^[0-9]{3,4}$/; // CVV can be 3 or 4 digits
		if (!regex.test(value)) {
			return "Invalid CVV";
		}
		return true;
	};

	return (
		<div className='product_card_page !mt-[120px] !min-h-[100vh] mobile:!mt-[150px]'>
			<div className='text-[24px] uppercase bg-siteCrem mobile:text-base'>
				<div className='custom_container h-[120px] flex items-center text-xl mobile:h-[80px] mobile:text-base text-[#B62025] font-medium'>
					Menu / Card
				</div>
			</div>
			<div className='pt-[50px] pb-[118px] laptop:pt-20'>
				<div className='custom_container'>
					<form onSubmit={handleSubmit(userInfoSubmit)} className="w-full">
						<div className='flex justify-between gap-[50px] laptop:gap-[30px] laptop:flex-col'>
							<div className='flex-1 py-[20px] min-h-[400px] pr-[60px] laptopHorizontal:pr-[0px]'>
								<div className="flex items-center justify-between">
									<div className="form_title text-2xl text-black laptop:text-base">Checkout for items and shipping</div>
									<button type="button" onClick={saveInfo} className="site_btn !text-[12px] !max-w-[100px]">Save Info</button>
								</div>
								<div className="checkout_form mt-[30px]">
									<div className="inline">
										<div className={errors.namefirst ? "form_block has_error" : "form_block"}>
											<div className="label text-base font-light mb-[10px]">Name*</div>
											<input
												placeholder="Enter name"
												autoComplete="on"
												defaultValue={user?.name.split(' ')[0]}
												className="form-control"
												{...register("namefirst", { required: "Name is required" })}
											/>
											<p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
												{errors.namefirst?.message}
											</p>
										</div>

										<div className={errors.surname ? "form_block has_error" : "form_block"}>
											<div className="label text-base font-light mb-[10px]">Surname*</div>
											<input
												placeholder="Enter surname"
												autoComplete="on"
												defaultValue={user?.name.split(' ')[1]}
												className="form-control"
												{...register("surname", { required: "Surname is required" })}
											/>
											<p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
												{errors.surname?.message}
											</p>
										</div>
									</div>
									<div className={errors.company ? "form_block has_error" : "form_block"}>
										<div className="label text-base font-light mb-[10px]">Company name (optional)</div>
										<input
											placeholder="Type here..."
											autoComplete="on"
											className="form-control"
											{...register("company")}
										/>
										<p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
											{errors.company?.message}
										</p>
									</div>

									<div className={errors.region ? "form_block has_error" : "form_block"}>
										<div className="label text-base font-light mb-[10px]">Country / Region*</div>
										<input
											placeholder="United States (US)"
											autoComplete="on"
											className="form-control"
											{...register("region", { required: "Country/Region is required" })}
										/>
										<p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
											{errors.region?.message}
										</p>
									</div>

									<div className={errors.street ? "form_block has_error" : "form_block"}>
										<div className="label text-base font-light mb-[10px]">Street address*</div>
										<input
											placeholder="House number and street name"
											autoComplete="on"
											className="form-control"
											{...register("street", { required: "Street address is required" })}
										/>
										<p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
											{errors.street?.message}
										</p>
									</div>

									<div className={errors.apartament ? "form_block has_error" : "form_block"}>
										<input
											placeholder="Apartment, suite, unit, etc. (optional)"
											autoComplete="on"
											className="form-control"
											{...register("apartament")}
										/>
										<p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
											{errors.apartament?.message}
										</p>
									</div>

									<div className="inline">
										<div className={errors.city ? "form_block has_error" : "form_block"}>
											<div className="label text-base font-light mb-[10px]">Town / City*</div>
											<input
												placeholder="Type here..."
												autoComplete="on"
												className="form-control"
												{...register("city", { required: "City is required" })}
											/>
											<p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
												{errors.city?.message}
											</p>
										</div>

										<div className={errors.state ? "form_block has_error" : "form_block"}>
											<div className="label text-base font-light mb-[10px]">State*</div>
											<input
												placeholder="Type here..."
												autoComplete="on"
												className="form-control"
												{...register("state", { required: "State is required" })}
											/>
											<p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
												{errors.state?.message}
											</p>
										</div>
									</div>

									<div className="inline">
										<div className={errors.zip ? "form_block has_error" : "form_block"}>
											<div className="label text-base font-light mb-[10px]">ZIP Code*</div>
											<input
												placeholder="Type here..."
												autoComplete="on"
												className="form-control"
												{...register("zip", { required: "ZIP Code is required" })}
											/>
											<p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
												{errors.zip?.message}
											</p>
										</div>

										<div className={errors.phone ? "form_block has_error" : "form_block"}>
											<div className="label text-base font-light mb-[10px]">Phone*</div>
											<InputMask
												{...register("phone", { validate: validatePhone })}
												placeholder="(XXX) XXX-XXX"
												type="tel"
												autoComplete="on"
												className="form-control"
												defaultValue={user?.phone}
												mask="(999) 999-999"
											/>
											<p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
												{errors.phone?.message}
											</p>
										</div>
									</div>

									<div className={errors.email ? "form_block has_error" : "form_block"}>
										<div className="label text-base font-light mb-[10px]">Email*</div>
										<input
											placeholder="Enter your email address"
											autoComplete="on"
											className="form-control"
											defaultValue={user?.email}
											{...register("email", { required: "Email is required", validate: validateEmail })}
										/>
										<p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
											{errors.email?.message}
										</p>
									</div>

									<div className={errors.notes ? "form_block has_error" : "form_block"}>
										<div className="label text-base font-light mb-[10px]">Order notes (optional)</div>
										<input
											placeholder="Notes about your order, e.g. special notes for delivery."
											autoComplete="on"
											className="form-control"
											{...register("notes")}
										/>
										<p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
											{errors.notes?.message}
										</p>
									</div>

									<div className={errors.delivery ? "form_block has_error" : "form_block"}>
										<div className="label text-base font-light mb-[10px]">Delivery method*</div>
										<div className="flex items-center mt-[15px]">
											<label className="custom-radio flex items-center gap-[10px]">
												<input
													type="radio"
													value="ground"
													defaultChecked
													{...register("delivery", { required: "Delivery method is required" })}
												/>
												<span className="checkmark"><IconChecked /></span>
												<span><IconTruch /></span>
												by ground
											</label>
											<label className="custom-radio ml-4 flex items-center gap-[10px]">
												<input
													type="radio"
													value="plane"
													{...register("delivery", { required: "Delivery method is required" })}
												/>
												<span className="checkmark"><IconChecked /></span>
												<span><IconAir /></span>
												by air
											</label>
										</div>
										<p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
											{errors.delivery?.message}
										</p>
									</div>

								</div>
							</div>
							<div className='w-[390px] py-[10px] laptop:w-full  min-h-[400px] checkout_form'>
								<div className='grid grid-cols-1 text-2xl gap-[10px] laptop:text-base pl-0 p-[20px] border-b border-[#CCC]'>
									Order summary
								</div>
								<div className="py-[30px] border-b border-[#CCC] ">
									<div className="relative w-full form_block !mb-0">
										<input
											className="!border-none !bg-[#FAFAFA]"
											type="text"
											placeholder="Enter Coupon Code"
										/>
										<button className="absolute right-0 site_btn top-[2px] !text-sm !max-w-[130px]">Apply Coupon</button>
									</div>
								</div>
								<div className='grid grid-cols-1 text-2xl mb-[30px] gap-[10px] pl-0 p-[20px] border-b border-[#CCC]'>
									Payment Detail
								</div>
								<div className="flex justify-between items-center gap-[10px] mb-[30px]">
									<span className="relative flex items-center justify-center">
										<Image
											src={visa}
											alt="Ricardo portrait"
											priority={true}
											unoptimized={true}
											width={70}
											height={40}
										/>
									</span>
									<span className="relative flex items-center justify-center">
										<Image
											src={arca}
											alt="Ricardo portrait"
											priority={true}
											unoptimized={true}
											width={70}
											height={40}
										/>
									</span>
									<span className="relative flex items-center justify-center">
										<Image
											src={discover}
											alt="Ricardo portrait"
											priority={true}
											unoptimized={true}
											width={70}
											height={40}
										/>
									</span>
									<span className="relative flex items-center justify-center">
										<Image
											src={amex}
											alt="Ricardo portrait"
											priority={true}
											unoptimized={true}
											width={70}
											height={40}
										/>
									</span>
									<span className="relative flex items-center justify-center">
										<Image
											src={paypal}
											alt="Ricardo portrait"
											priority={true}
											unoptimized={true}
											width={70}
											height={40}
										/>
									</span>
								</div>

								<div className={errors.cardNumber ? "form_block has_error" : "form_block"}>
									<div className="label text-base font-light mb-[10px]">Card Number*</div>
									<input
										placeholder="Enter your card number"
										autoComplete="off"
										className="form-control"
										{...register("cardNumber", { required: "Card number is required", validate: validateCardNumber })}
									/>
									<p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
										{errors.cardNumber?.message}
									</p>
								</div>

								<div className="inline">
									<div className={errors.expirationDate ? "form_block has_error" : "form_block"}>
										<div className="label text-base font-light mb-[10px]">Expiration Date*</div>
										<input
											placeholder="MM/YY"
											autoComplete="off"
											className="form-control"
											{...register("expirationDate", { required: "Expiration date is required", validate: validateExpirationDate })}
										/>
										<p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
											{errors.expirationDate?.message}
										</p>
									</div>

									<div className={errors.cvv ? "form_block has_error" : "form_block"}>
										<div className="label text-base font-light mb-[10px]">CVV*</div>
										<input
											placeholder="CVV"
											type="password"
											autoComplete="off"
											className="form-control"
											{...register("cvv", { required: "CVV is required", validate: validateCVV })}
										/>
										<p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
											{errors.cvv?.message}
										</p>
									</div>
								</div>

								<div className='flex text-[12px] items-center justify-between text-[#525252] mb-20'>Sub total <span className='ml-auto text-black text-sm font-medium'>${cart?.totalAmount.toFixed(1)}</span></div>
								<div className='flex text-[12px] items-center justify-between text-[#525252] mb-20'>
									Coupon Discount
									<span className='ml-auto text-black text-sm font-medium'>
										$0
									</span>
								</div>
								<div className='flex text-[12px] items-center justify-between text-[#525252] mb-20'>Delivery<span className='ml-auto text-black  text-sm font-medium'>$5</span></div>
								<div className='flex text-[12px] items-center justify-between text-[#525252] border-t  border-[#CCC] pt-20 font-bold'>Total<span className='ml-auto text-black  text-sm font-medium'>${cart?.totalAmount + 5}</span></div>
								<div className='flex items-end mt-[40px] max-w-[320px] mx-auto'>
									<button type='submit' className='bg-[#CE090F] duration-300 hover:opacity-70 text-white rounded-[30px] text-sm  w-full h-[46px] border-none'>Pay ${cart?.totalAmount + 5}</button>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Checkout;
