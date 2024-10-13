'use client'

import React, {useRef, useState } from "react";
import IconChack from "@/public/icons/IconChack.jsx";
import useOnClickOutside from "../../utils/hooks/useOnClickOutside";
import IconFail from "@/public/icons/IconFail";
import Link from "next/link";

function SuccessPopup() {

  const ref = useRef();
  const [success , setSuccess] = useState(true)

  //Close popup after Outside Click
  useOnClickOutside(ref, () => {
    if( document.body.classList.contains("success_opened")){
      document.body.classList.remove("success_opened");
      document.body.style.overflow = "visible";
    }
  });

  return (
    <div className="success_popup fixed left-0  right-0 bottom-0 flex items-center justify-center pl-[17px] duration-500 transition-[top] top-[-100%] w-full h-full z-[9999] overflow-x-hidden overflow-y-auto bg-black bg-opacity-50 mobile:!p-20">
      <div
        className="popup_container  bg-white relative rounded-[15px] shadow-custom p-[20px] w-full mobile:p-[15px] max-w-[360px] z-30 mx-auto"
        ref={ref}
      >
        <div className="flex  items-center w-full h-full p-20 mobile:p-[15px]  flex-col justify-center text-center">
          {success ? 
          <IconChack />
          :
          <IconFail />
          }
          <div className=" mt-[10px] text-2xl mobile:text-base  text-center font-bold">
          {success ?  'Success!' : 'Oops!'}
          </div>
          {/* <span className="block mt-[6px] text-sm">Order Number:2220307</span> */}
          <p className="block mt-[6px] text-sm">  {success ? 'Thank you for Registration' : 'Payment Failed, Please Try Again.' }</p>
        </div>
        <Link
          href="/account/userInfo"
          className="duration-300  hover:opacity-50 w-full h-[36px] rounded-20 mx-auto max-w-[130px] flex items-center justify-center bg-[#B62025] text-white mt-[0] font-semibold text-base"
          onClick={(e) => {
            e.preventDefault(); 
            document.body.classList.remove("success_opened");
            document.body.style.overflow = "visible";
          }}
        >My Account
        </Link>
      </div>
    </div>
  );
}

export default SuccessPopup;
