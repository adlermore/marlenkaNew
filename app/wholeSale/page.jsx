'use client'

import Image from "next/image";
import wholesale1 from '@/public/images/wholesale1.png'
import wholesale2 from '@/public/images/wholesale2.png'
import wholesale3 from '@/public/images/wholesale3.png'
import { useForm } from "react-hook-form";
import { wholeSaleSchema } from "@/validation/wholeSaleSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import ReactInputMask from "react-input-mask";
import { useState } from "react";
import { email, namefirst } from "@/validation/common";
import toast from "react-hot-toast";

function WholeSale() {

  const [loading, setLoading] = useState(false);

  const { register: wholeSale, handleSubmit: handleSubmitForm, reset, formState: { errors: wholeSaleErrors } } = useForm({
    resolver: zodResolver(wholeSaleSchema)
  });

  //sumbition Data
  const wholeSaleSubmit = async (data) => {
    setLoading(true);
    const response = await fetch(process.env.NEXT_PUBLIC_DATA_API + '/new_partner', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.namefirst,
        company_name: data.email,
        phone_number: data.detalis,
        email: data.email,
        address: data.address,
        description: data.detalis
      }),
    });

    if (response.ok) {
      setLoading(false)
      toast.success("Form Data Sending");
      reset();
    } else {
      console.error('Submission failed');
      setLoading(false)
    }
  };

  return (
    <div className='!mt-[120px] !min-h-[100vh] mobile:!mt-[150px]'>
      <div className=' text-2xl uppercase bg-siteCrem '>
        <div className='custom_container uppercase text-center mx-auto justify-center h-[120px] laptopHorizontal:h-[80px] laptopHorizontal:text-base  flex items-center  text-[#B62025] font-medium'>
          Wholesale
        </div>
      </div>
      <div className="custom_container">
        <div className="pt-[60px] laptop:text-center">
          <div className="text-3xl uppercase"><span className="text-[#B62025]">SWEET</span> Partners</div>
        </div>
        <div className="flex laptop:flex-col laptop:items-center laptop:text-center justify-between gap-[30px] h-full mt-[40px]">
          <div className="max-w-[503px] font-medium text-base">
            Whether you own a catering services, a cafe, a restaurant, a hotel and/or a food market/store, this section is dedicated to you! We provide a competitive edge for your business to succeed in ever changing food scene and it would be our pleasure to offer you the following:
            <br />
            <br />
            <br />
            <ul className="pl-[40px] laptop:pl-0 laptop:list-none">
              <li>• Top-quality products</li>
              <li> • Extremely long Ambient shelf-life (up to 90 days)</li>
              <li> • International delicacy (40+ countries worldwide)</li>
              <li> • Direct manufacturer pricing</li>
              <li> • Dedicated Account Manager</li>
            </ul>
            <br />
            <br />
            We seek to work with establishmets who want to partner with us in branding and building our name in the market place. MARLENKA.US always welcome new partners nationwide who are motivated and have a desire in marketing and selling our products to potential end users in all posible markets.
            <br />
            <br />
            Our marketing and point of sales provide a vital FREE 24/7 support for our partners.
            <br />
            <br />
            MARLENKA.US is growing into a thriving organization; we want you to be a part of our success!
          </div>
          <div className="flex-1 max-w-[500px] laptop:max-w-none laptop:w-full h-full">
            <div className="relative w-full h-[500px]">
              <Image
                src={wholesale1}
                alt="WhoImg1"
                unoptimized
                fill
                priority
                className="object-contain"
              />
            </div>
            <div className="relative w-full h-[90px] mt-20 laptopHorizontal:h-[60px]">
              <Image
                src={wholesale2}
                alt="WhoImg2"
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>
        </div>
        <div className="mt-[120px] flex laptop:justify-center laptop:items-center laptop:text-center laptop:flex-col laptop:mt-[70px] mobile:mt-[40px]">
          <div className="relative w-[50%] mobile:w-[80%]">
            <div className="text-3xl mobile:text-xl uppercase"><span className="text-[#B62025]">application</span> form</div>
            <div className="relative w-full h-[288px] mt-[60px] mobile:mt-[10px] left-[-60px] laptop:left-0">
              <Image
                src={wholesale3}
                alt="WhoImg3"
                unoptimized
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>
          <div className="flex-1 max-w-[460px] laptop:ml-0 font-medium ml-auto">
            MARLENKA.US will not share any information you provide with any third parties and also we will hold the details you have entered on this form for the purposes of processing your request only.
          </div>
        </div>
        <div>
          <form onSubmit={handleSubmitForm(wholeSaleSubmit)} className="w-full">
            <div className='wholeSaleForm'>
              <div className="form_inline">
                <div className={wholeSaleErrors?.namefirst ? "form_block has_error" : "form_block"}>
                  <div className="wholeSale_label text-sm font-light">
                    Contact Name
                  </div>
                  <input
                    placeholder="Enter name"
                    autoComplete="on"
                    className="form-control"
                    name="namefirst"
                    {...wholeSale("namefirst", { required: true })}
                  />
                  <p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
                    {wholeSaleErrors?.namefirst?.message}
                  </p>
                </div>
                <div className={wholeSaleErrors?.business ? "form_block has_error" : "form_block"}>
                  <div className="wholeSale_label text-sm font-light mb-[10px]">
                    Business Name
                  </div>
                  <input
                    placeholder="Enter business"
                    autoComplete="on"
                    className="form-control"
                    name="business"
                    {...wholeSale("business", { required: true })}
                  />
                  <p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
                    {wholeSaleErrors?.business?.message}
                  </p>
                </div>
              </div>
              <div className="form_inline">
                <div
                  className={wholeSaleErrors.phone ? "form_block has_error" : "form_block"}
                >
                  <div className="wholeSale_label text-sm font-light mb-[10px]">
                    Phone Number
                  </div>
                  <ReactInputMask
                    {...wholeSale("phone", { required: true })}
                    placeholder="Enter Phone Number"
                    type="tel"
                    autoComplete="on"
                    className="form-control"
                    mask="(999)-999-999"
                  />
                  <p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
                    {wholeSaleErrors?.phone?.message}
                  </p>
                </div>
                <div className={wholeSaleErrors?.email ? "form_block has_error" : "form_block"}  >
                  <div className="wholeSale_label text-sm font-light mb-[10px]">
                    Email
                  </div>
                  <input
                    placeholder="Enter email"
                    autoComplete="on"
                    className="form-control"
                    name="email"
                    {...wholeSale("email", {
                      required: true,
                      pattern: /^\S+@\S+$/i,
                    })}
                  />
                  <p className="form_error form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
                    {wholeSaleErrors?.email?.message}
                  </p>
                </div>
              </div>
              <div className={wholeSaleErrors?.address ? "form_block has_error" : "form_block"}>
                <div className="wholeSale_label text-sm font-light">
                  Business Address
                </div>
                <input
                  placeholder="Enter Address"
                  autoComplete="on"
                  className="form-control"
                  name="address"
                  {...wholeSale("address", { required: true })}
                />
                <p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
                  {wholeSaleErrors?.address?.message}
                </p>
              </div>
              <div className={wholeSaleErrors?.detalis ? "form_block  has_error" : "form_block"}>
                <div className="wholeSale_label text-sm font-light">
                  Details of Your Enquiry
                </div>
                <textarea
                  placeholder="Enter detalis"
                  autoComplete="on"
                  className="form-control"
                  name="detalis"
                  {...wholeSale("detalis", { required: true })}
                />
                <p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
                  {wholeSaleErrors?.detalis?.message}
                </p>
              </div>
              <button type="submit" className="site_btn mx-auto">
                {loading ?
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="absolute inline  w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
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
                  :
                  'Submit'
                }</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default WholeSale;

