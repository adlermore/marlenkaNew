'use client'

import Image from "next/image";
import contacts from '@/public/images/contacts.png'
import wholesale2 from '@/public/images/wholesale2.png'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import IconFb from "@/public/icons/IconFb";
import IconInsta from "@/public/icons/IconInsta";
import IconAmazon from "@/public/icons/IconAmazon";
import IconIn from "@/public/icons/IconIn";
import IconYou from "@/public/icons/IconYou";
import { contactsSchema } from "@/validation/contactsSchema";
import { useState } from "react";
import toast from "react-hot-toast";

function Contacts() {

  const[loading , setLoading] = useState(false);

  const { register: wholeSale, handleSubmit: handleSubmitForm, reset, formState: { errors: contactsErrors } } = useForm({
    resolver: zodResolver(contactsSchema)
  });

  //sumbition Data
  const contactsSubmit = async (data) => {
    setLoading(true);
    const response = await fetch(process.env.NEXT_PUBLIC_DATA_API + '/new_message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.namefirst,
        email: data.email,
        message: data.detalis,
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
      <div className=' text-2xl uppercase bg-siteCrem  relative w-fill h-[700px] laptopHorizontal:h-[500px] laptop:h-[400px]'>
        <Image
          src={contacts}
          alt="WhoImg2"
          unoptimized
          fill
          priority
          className="object-cover"
        />
      </div>
      <div className='relative w-fill h-[60px] mt-[-100px]'>
        <Image
          src={wholesale2}
          alt="Whwholesale2oImg2"
          unoptimized
          fill
          priority
          className="object-contain"
        />
      </div>
      <div className="custom_container">
        <div className="text-center pt-[120px] laptop:pt-[60px] text-base font-medium max-w-[1037px] mx-auto">
          Whether you are interested in retail or wholesale simply fill out the form with your questions. We will get right back with you via email. Write today & start profiting from our quality products.
        </div>
        <div className="text-center mt-[60px] laptop:mt-[40px] text-sm">
          <span className="font-bold">Address : </span> 400 Renaissance Center Suite 2600 Detroit, MI 48243
        </div>
        <div className="flex justify-center gap-[30px] mobile:flex-col items-center mt-10">
          <a href="tel:8446275365" className="text-center text-sm">
            <span className="font-bold">Phone : </span> (844) 627-5365
          </a>
          <a href="mailito:info@marlenka.us" className="text-centertext-sm">
            <span className="font-bold">Email : </span> info@marlenka.us
          </a>
        </div>
        <div className="flex justify-center flex-wrap max-w-[810px] mx-auto items-center mt-[50px] gap-[30px]">
          <a href='/' className="flex items-center gap-20 mobile:flex-col font-medium">
            <span className="flex  bg-[#B62025]  rounded-full w-[50px] h-[50px] items-center justify-center">
              <IconFb />
            </span>
            Follow us on Facebook
          </a>
          <a href='/' className="flex items-center gap-20 mobile:flex-col font-medium">
            <span className="flex  bg-[#B62025]  rounded-full w-[50px] h-[50px] items-center justify-center">
              <IconInsta />
            </span>
            Follow us on Instagram
          </a>
          <a href='/' className="flex items-center gap-20 mobile:flex-col font-medium">
            <span className="flex  bg-[#B62025]  rounded-full w-[50px] h-[50px] items-center justify-center">
              <IconAmazon />
            </span>
            Follow us on Amazon
          </a>
          <a href='/' className="flex items-center gap-20 mobile:flex-col font-medium">
            <span className="flex  bg-[#B62025]  rounded-full w-[50px] h-[50px] items-center justify-center">
              <IconIn />
            </span>
            Follow us on LinkedIn
          </a>
          <a href='/' className="flex items-center gap-20 mobile:flex-col font-medium">
            <span className="flex  bg-[#B62025]  rounded-full w-[50px] h-[50px] items-center justify-center">
              <IconYou />
            </span>
            Follow us on YouTube
          </a>
        </div>
        <div className="relative">
          <form onSubmit={handleSubmitForm(contactsSubmit)} className="w-full">
            <div className='wholeSaleForm'>
              <div className="form_inlin">
                <div className={contactsErrors?.namefirst ? "form_block has_error" : "form_block"}>
                  <div className="wholeSale_label text-sm font-light">
                    Name
                  </div>
                  <input
                    placeholder="Enter name"
                    autoComplete="on"
                    className="form-control"
                    name="namefirst"
                    {...wholeSale("namefirst", { required: true })}
                  />
                  <p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
                    {contactsErrors?.namefirst?.message}
                  </p>
                </div>
              </div>
              <div className="form_inlin">
                <div className={contactsErrors?.email ? "form_block has_error" : "form_block"}  >
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
                    {contactsErrors?.email?.message}
                  </p>
                </div>
              </div>
              <div className={contactsErrors?.detalis ? "form_block  has_error" : "form_block"}>
                <div className="wholeSale_label text-sm font-light">
                  Message
                </div>
                <textarea
                  placeholder="Enter Message"
                  autoComplete="on"
                  className="form-control"
                  name="detalis"
                  {...wholeSale("detalis", { required: true })}
                />
                <p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
                  {contactsErrors?.detalis?.message}
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
export default Contacts;

