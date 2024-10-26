'use client'

import Image from "next/image";
import contacts from '@/public/images/contacts.png'
import wholesale2 from '@/public/images/wholesale2.png'
import { useForm } from "react-hook-form";
import { wholeSaleSchema } from "@/validation/wholeSaleSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import ReactInputMask from "react-input-mask";
import IconTwit from "@/public/icons/IconTwit";
import IconFb from "@/public/icons/IconFb";

function Contacts() {

  const { register: wholeSale, handleSubmit: handleSubmitForm, formState: { errors: contactsErrors } } = useForm({
    resolver: zodResolver(wholeSaleSchema)
  });

  //sumbition Data
  const contactsSubmit = async (data) => {
    console.log('data', data);
  };

  return (
    <div className='!mt-[120px] !min-h-[100vh] mobile:!mt-[150px]'>
      <div className=' text-2xl uppercase bg-siteCrem  relative w-fill h-[700px]'>
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
        <div className="text-center pt-[120px] text-base font-medium max-w-[1037px] mx-auto">
          Whether you are interested in retail or wholesale simply fill out the form with your questions. We will get right back with you via email. Write today & start profiting from our quality products.
        </div>
        <div className="text-center mt-[60px] text-sm">
          <span className="font-bold">Address : </span> 400 Renaissance Center Suite 2600 Detroit, MI 48243
        </div>
        <div className="flex justify-center gap-[30px] items-center mt-10">
          <a href="tel:8446275365" className="text-center text-sm">
            <span className="font-bold">Phone : </span> (844) 627-5365
          </a>
          <a href="mailito:info@marlenka.us" className="text-centertext-sm">
            <span className="font-bold">Email : </span> info@marlenka.us
          </a>
        </div>
        <div className="flex justify-center items-center mt-[50px] gap-[30px]">
          <a href='/' className="flex items-center gap-20">
            <span className="flex  bg-[#B62025]  rounded-full w-[50px] h-[50px] items-center justify-center">
              <IconTwit className='[&>path]:fill-white' />
            </span>
            Follow us on Twitter
          </a>
          <a href='/' className="flex items-center gap-20">
            <span className="flex  bg-[#B62025]  rounded-full w-[50px] h-[50px] items-center justify-center">
              <IconFb className='[&>path]:fill-white' />
            </span>
            Follow us on Facebook
          </a>
        </div>
        <div className="pt-560px]">
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
              <button type="submit" className="site_btn mx-auto">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default Contacts;

