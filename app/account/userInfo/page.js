'use client';
// import userImg from '@/public/images/userImg.png';
import Image from 'next/image';
import { userScheme } from '@/validation/userScheme';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputMask from "react-input-mask";
import { useSelector } from 'react-redux';
import visa from "@/public/images/icons/visa.png";
import arca from "@/public/images/icons/arca.png";
import discover from "@/public/images/icons/discover.png";
import amex from "@/public/images/icons/amex.png";
import paypal from "@/public/images/icons/paypal.png";
import { useEffect, useState } from 'react';
import { toast } from "react-hot-toast";

export default function UserInfoPage() {

  const user = useSelector((state) => state.auth.user);

  const [profileData, setProfileData] = useState(null);
	const [loading, setLoading] = useState(true);
  const [phone, setPhone] = useState(profileData?.phone_number || '');

  
  //validation init
  const { register: userInfo, handleSubmit: handleSubmitForm, reset, watch, formState: { errors: errorUser } } = useForm({
    resolver: zodResolver(userScheme)
  });

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
        surname: data.data.profile.surname || ''
      });

		} catch (error) {
			console.error('Error fetching profile:', error);
		} finally {
			setLoading(false)
		}
	};

  //sumbition Data
  const userInfoSubmit = async () => {    
    await saveInfo()
  };

  const saveInfo = async () => {
		setLoading(true)
		const formData = {
			name: `${watch("namefirst")}` || profileData.name,
			surname: `${watch("surname")}` || profileData.surname,
			email: watch("email") || profileData.email,
			phone_number: watch("phone") || profileData.phone_number,
			company_name: watch("company") || profileData.company_name,
			country: watch("region") || profileData.country,
			city: watch("city") || profileData.city,
			address: watch("address") || profileData.address,
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
			apartment: watch("apartament") || profileData.apartment,
			state: watch("treet") || profileData.state,
			zip_code: watch("postalCode") || profileData.zip_code,
			notes: watch("notes") || profileData.notes,
			type: "car" || profileData.type,
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
			toast.success("Profile Information Edited");
		} catch (error) {
			console.error('Error saving profile:', error);
		} finally {
			setLoading(false)
		}
	};

  useEffect(() => {
    fetchProfileData();
    setPhone(profileData?.phone_number)
	}, []);

  return (
    <div className='user_wrapper w-full'>
      <div className='text-2xl text-black'>
        Profile Information
      </div>
      <form onSubmit={handleSubmitForm(userInfoSubmit)} className="w-full">
        <div className='mt-[30px] text-2xl flex items-center  justify-between gap-20'>User Details
          <button
            type="submit"
            className={`w-[100px] h-[40px] !duration-0 !bg-siteCrem !max-w-[100px] !text-black border site_btn mb-[10px] text-opacity-1 [&>svg]:opacity-0 ${loading && "[&>svg]:opacity-100 pointer-events-none opacity-80 !text-opacity-0"}`}
          >
            <svg
              aria-hidden="true"
              role="status"
              className="absolute inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
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
            {loading ? " " : " Update"}
          </button>

        </div>

        <div className='userInfoForm'>
          <div className={errorUser?.namefirst ? "form_block has_error" : "form_block"}>
            <div className="userInfo_label text-sm font-light">
              Name
            </div>
            <input
              placeholder="Enter name"
              autoComplete="on"
              defaultValue={profileData?.name || ''}
              className="form-control"
              name="name"
              {...userInfo("namefirst", { required: true })}
            />
            <p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
              {errorUser?.namefirst?.message}
            </p>
          </div>
          <div className={errorUser?.surname ? "form_block has_error" : "form_block"}>
            <div className="userInfo_label text-sm font-light mb-[10px]">
              Surname
            </div>
            <input
              placeholder="Enter surname"
              autoComplete="on"
              defaultValue={profileData?.surname || ''}
              className="form-control"
              name="name"
              {...userInfo("surname", { required: true })}
            />
            <p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
              {errorUser?.surname?.message}
            </p>
          </div>
          <div className={errorUser?.email ? "form_block has_error" : "form_block"}  >
            <div className="userInfo_label text-sm font-light mb-[10px]">
              Email
            </div>
            <input
              placeholder="Enter your email address"
              autoComplete="on"
              className="form-control"
              defaultValue={profileData?.email || ''}
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
            <div className="userInfo_label text-sm font-light mb-[10px]">
              Phone
            </div>
            <InputMask
              {...userInfo("phone", { required: true })}
              placeholder="Enter Phone Number"
              type="tel"
              autoComplete="on"
              className="form-control"
              mask="(999)-999-999"
              value={phone || ''}
              // value={profileData?.phone_number || ''}
              onChange={(e) => {
                setPhone(e.target.value);
                userInfo("phone").onChange(e); // Call react-hook-form's onChange
            }} 
            />
            <p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
              {errorUser?.phone?.message}
            </p>
          </div>
        </div>
        <div className='mt-[30px] text-2xl'>Delivery Address</div>
        <div className='userInfoForm'>
          <div className={errorUser?.address ? "form_block has_error" : "form_block"}>
            <div className="userInfo_label text-sm font-light mb-[10px]">
              Address
            </div>
            <input
              placeholder="Enter address"
              autoComplete="on"
              className="form-control"
              name="name"
              {...userInfo("address", { required: true })}
              defaultValue={profileData?.address || ''}
            />
            <p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
              {errorUser?.address?.message}
            </p>
          </div>
          <div className={errorUser?.postalCode ? "form_block has_error" : "form_block"}>
            <div className="userInfo_label text-sm font-light mb-[10px]">
              Postal Code
            </div>
            <input
              placeholder="Enter postalCode"
              autoComplete="on"
              className="form-control"
              name="name"
              {...userInfo("postalCode", { required: true })}
              defaultValue={profileData?.zip_code}
            />
            <p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
              {errorUser?.postalCode?.message}
            </p>
          </div>
          <div className={errorUser?.city ? "form_block has_error" : "form_block"}>
            <div className="userInfo_label text-sm font-light mb-[10px]">
              city
            </div>
            <input
              placeholder="Enter city"
              autoComplete="on"
              className="form-control"
              name="name"
              {...userInfo("city", { required: true })}
              defaultValue={profileData?.city || ''}
            />
            <p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
              {errorUser?.city?.message}
            </p>
          </div>
        </div>
        <div className='mt-[30px] text-2xl'>Delivery Address</div>
        <div className="flex justify-between items-center gap-[10px] mb-[30px] mt-[30px] max-w-fit" >
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

      </form>
    </div>
  );
}
