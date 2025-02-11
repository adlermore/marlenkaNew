'use client';

import "@/styles/product_inner.scss";
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
import { toast } from "react-hot-toast";
import { fetchUserInfo } from "@/redux/authSlice";

const Checkout = () => {
	const cart = useSelector((state) => state.cart);
	const router = useRouter();
	const dispatch = useDispatch();
	const isAuth = useSelector((state) => state.auth.isAuthenticated);
	const [isAuthChecked, setIsAuthChecked] = useState(false);
	const [profileData, setProfileData] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (typeof isAuth !== 'undefined') {
			setIsAuthChecked(true);
		}
	}, [isAuth]);

	useEffect(() => {
		if (isAuthChecked && !isAuth) {
			// router.push('/');
			return
		} else if (isAuthChecked && isAuth) {
			fetchProfileData();
		}
	}, [isAuthChecked, isAuth, router]);


	const fetchProfileData = async () => {
		setLoading(true)
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_DATA_API}/getProfile`, {
				method: 'GET',
				headers: {
					'Authorization': `Bearer ${localStorage.getItem("token")}`,
				},
			});
			if (!response.ok) throw new Error('Failed to fetch profile data');
			const data = await response.json();
			setProfileData(data.data.profile);

			reset({
				namefirst: data.data.profile.name || '',
				surname: data.data.profile.surname || '',
				company: data.data.profile.company_name || '',
				region: data.data.profile.country || '',
			});

		} catch (error) {
			console.error('Error fetching profile:', error);
		} finally {
			setLoading(false)
		}
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		reset
	} = useForm(
		{ mode: "blur" }
	);

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
		console.log('Submitted form data:', dataForm);
	};

	const saveInfo = async () => {
		setLoading(true)
		const formData = {
			name: `${watch("namefirst")}` || profileData?.name,
			surname: `${watch("surname")}` || profileData?.surname,
			email: watch("email") || profileData?.email,
			phone_number: watch("phone") || profileData?.phone_number,
			company_name: watch("company") || profileData?.company_name,
			country: watch("region") || profileData?.country,
			city: watch("city") || profileData?.city,
			address: watch("street") || profileData?.address,
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
			apartment: watch("apartament") || profileData?.apartment,
			state: watch("state") || profileData?.state,
			zip_code: watch("zip") || profileData?.zip_code,
			notes: watch("notes") || profileData?.notes,
			type: "car" || profileData?.type,
		};

		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_DATA_API}/storeProfile`, {
				method: 'POST',
				headers: {
					'Authorization': `Bearer ${localStorage.getItem("token")}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			if (!response.ok) throw new Error('Failed to save profile data');
			toast.success("Profile Information saved");
			dispatch(fetchUserInfo())
		} catch (error) {
			console.error('Error saving profile:', error);
		} finally {
			setLoading(false)
		}
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
		const regex = /^[0-9]{3,4}$/;
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
									<button type="button" onClick={saveInfo}
										className={`w-[100px] h-[40px] !duration-0  !max-w-[100px] border site_btn mb-[10px] text-opacity-1 [&>svg]:opacity-0 ${loading && "[&>svg]:opacity-100 pointer-events-none opacity-80 !text-[#B62025] !text-opacity-0"}`}
									>
										<svg
											aria-hidden="true"
											role="status"
											className="absolute inline w-4 h-4 text-gray-200 animate-spin [&>path]:fill-white"
											viewBox="0 0 100 101"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
												fill="currentColor"
											></path>
											<path
												d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
												fill="#1C64F2"
											></path>
										</svg>
										{loading ? " " : " Save Info"}
									</button>
								</div>
								<div className="checkout_form mt-[30px]">
									<div className="inline">
										<div className={errors.namefirst ? "form_block has_error" : "form_block"}>
											<div className="label text-base font-light mb-[10px]">Name*</div>
											<input
												placeholder="Enter name"
												autoComplete="on"
												// defaultValue={profileData?.name || ''}
												className="form-control"
												{...register("namefirst", { required: "Name is required" })}
											/>
											{errors.namefirst &&
												<p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
													{errors.namefirst?.message}
												</p>
											}
										</div>

										<div className={errors.surname ? "form_block has_error" : "form_block"}>
											<div className="label text-base font-light mb-[10px]">Surname*</div>
											<input
												placeholder="Enter surname"
												autoComplete="on"
												// defaultValue={profileData?.surname || ''}
												className="form-control"
												{...register("surname", { required: "Surname is required" })}
											/>
											{errors.surname &&
												<p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
													{errors.surname?.message}
												</p>
											}
										</div>
									</div>
									<div className={errors.company ? "form_block has_error" : "form_block"}>
										<div className="label text-base font-light mb-[10px]">Company name (optional)</div>
										<input
											placeholder="Type here..."
											autoComplete="on"
											className="form-control"
											// defaultValue={profileData?.company_name || ''}
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
											defaultValue={profileData?.country || ''}
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
											defaultValue={profileData?.address || ''}
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
											defaultValue={profileData?.apartment || ''}
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
												defaultValue={profileData?.city || ''}
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
												defaultValue={profileData?.state || ''}
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
												defaultValue={profileData?.zip_code || ''}
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
												mask="(999) 999-999"
												value={profileData?.phone_number || ''}
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
											defaultValue={profileData?.email || ''}
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
											defaultValue={profileData?.notes || ''}
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
