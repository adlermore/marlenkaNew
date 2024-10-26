'use client'

import Image from "next/image";
import wholesale1 from '@/public/images/wholesale1.png'
import wholesale2 from '@/public/images/wholesale2.png'
import wholesale3 from '@/public/images/wholesale3.png'
import { useForm } from "react-hook-form";
import { wholeSaleSchema } from "@/validation/wholeSaleSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import ReactInputMask from "react-input-mask";

function WholeSale() {

  const { register: wholeSale, handleSubmit: handleSubmitForm, formState: { errors: wholeSaleErrors } } = useForm({
    resolver: zodResolver(wholeSaleSchema)
  });

  //sumbition Data
  const wholeSaleSubmit = async (data) => {
    console.log('data', data);
  };

  return (
    <div className='!mt-[120px] !min-h-[100vh] mobile:!mt-[150px]'>
      <div className=' text-2xl uppercase bg-siteCrem '>
        <div className='custom_container uppercase text-center mx-auto justify-center h-[120px] laptopHorizontal:h-[80px] laptopHorizontal:text-base  flex items-center  text-[#B62025] font-medium'>
          Wholesale
        </div>
      </div>
      <div className="custom_container">
        <div className="pt-[60px]">
          <div className="text-3xl uppercase"><span className="text-[#B62025]">SWEET</span> Partners</div>
        </div>
        <div className="flex justify-between gap-[30px] h-full mt-[40px]">
          <div className="max-w-[503px] font-medium text-base">
            Whether you own a catering services, a cafe, a restaurant, a hotel and/or a food market/store, this section is dedicated to you! We provide a competitive edge for your business to succeed in ever changing food scene and it would be our pleasure to offer you the following:
            <br />
            <br />
            <br />
            <ul className="pl-[40px]">
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
          <div className="flex-1 max-w-[500px] h-full">
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
            <div className="relative w-full h-[90px] mt-20">
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
        <div className="mt-[120px] flex">
          <div className="relative w-[50%]">
            <div className="text-3xl uppercase"><span className="text-[#B62025]">application</span> form</div>
            <div className="relative w-full h-[288px] mt-[60px] left-[-60px]">
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
          <div className="flex-1 max-w-[460px] font-medium ml-auto">
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
                <button type="submit" className="site_btn mx-auto">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default WholeSale;

