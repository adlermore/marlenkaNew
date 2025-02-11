"use client";

import React, { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/validation/loginSchema";
import { initializeAuth, login } from "@/redux/authSlice";

import useOnClickOutside from "@/utils/hooks/useOnClickOutside";
import IconClose from "@/public/icons/IconClose.jsx";
import loginLogo from '@/public/images/reverseLogo.svg'
import eye from '@/public/images/eye.png'

import Image from "next/image";
import IconChecked from "@/public/icons/IconChecked";

function LoginPopup() {

  const ref = useRef();
  const dispatch = useDispatch();

  const [showPass, setShowPass] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const { status } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth.user);

  //validation init
  const {
    register: loginForm,
    reset,
    handleSubmit: handleSubmitForm,
    formState: { errors: errorsLogin },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  //Close Popup after outside click
  useOnClickOutside(ref, () => {
    if (document.body.classList.contains("login_opened")) {
      closeLogin();
    }
  });

  const closeLogin = () => {
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
    document.body.classList.remove("login_opened");
    const fixedElements = document.querySelectorAll(".fixed-element");
    fixedElements.forEach((el) => {
      el.style.paddingRight = "";
    });
  };

  //sumbition Data
  const loginSubmit = async (dataForm) => {
    dispatch(login(dataForm));
    reset();
  };

  useEffect(() => {
    if (status === "succeeded" && !initialized && !user) {
      dispatch(initializeAuth()); 
      setInitialized(true); 
    }
  }, [status, initialized, dispatch]);

  const detectScrollBarWidth = () => {
    const documentWidth = document.documentElement.clientWidth;
    const windowWidth = window.innerWidth;
    const scrollBarWidth = windowWidth - documentWidth;
    return scrollBarWidth;
  };

  const passToggle = () => {
    setShowPass(!showPass);
  };

  //Registr Popup Open
  const registerPopupOpen = () => {
    const scrollBarWidth = detectScrollBarWidth();
    document.body.style.overflow = "hidden";
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }
    document.body.classList.add("register_opened");
    const fixedElements = document.querySelectorAll(".fixed-element");
    fixedElements.forEach((el) => {
      el.style.paddingRight = `${scrollBarWidth}px`;
    });
  };

  const registerSwitch = () => {
    closeLogin()
    setTimeout(() => {
      registerPopupOpen()
    }, 500);
  }
  
  return (
    <div className="login_popup">
      <div
        className="popup_container"
        ref={ref}
      >
        <div className="popup_inner">
          <div className="title_line  w-full gap-10">
            <span className="logo_block">
              <Image
                src={loginLogo}
                alt="Ricardo portrait"
                priority={true}
                unoptimized={true}
                sizes="80vw"
                style={{
                  objectFit: "contain",
                }}
              />
            </span>
            <div className="popup_title">Sign in</div>
            {status === "failed" && (
              <div className="text-siteRed text-center">
                Incorrect Email or Password
              </div>
            )}
            <a
              href="/#"
              className="popup_close absolute right-[20px] top-[20px] cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                closeLogin();
              }}
            >
              <IconClose />
            </a>
          </div>
          <div className="login_form mt-[25px]">
            <form onSubmit={handleSubmitForm(loginSubmit)} className="w-full">
              <div
                className={
                  errorsLogin?.email ? "form_block has_error" : "form_block"
                }
              >
                <div className="loginForm_label">Your email<span>*</span></div>
                <input
                  placeholder="name.surname@mail.ru"
                  autoComplete="on"
                  className="form-control"
                  name="email"
                  {...loginForm("email", {
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                />
                <p className="form_error">
                  {errorsLogin?.email?.message}
                </p>
              </div>
              <div
                className={
                  errorsLogin?.password ? "form_block has_error" : "form_block"
                }
              >
                <div className="loginForm_label text-base font-light mb-[10px]">
                  Your password<span>*</span>
                </div>
                <input
                  placeholder="Enter password"
                  autoComplete="on"
                  className="form-control"
                  name="password"
                  type={showPass ? "text " : "password"}
                  {...loginForm("password", { required: true, minLength: 5 })}
                />
                <button className={`pass_show ${showPass && 'avtive'}`} onClick={passToggle}>
                  <Image
                    src={eye}
                    alt="Ricardo portrait"
                    priority={true}
                    unoptimized={true}
                    sizes="80vw"
                    style={{
                      objectFit: "contain",
                    }}
                  />
                </button>
                <p className="form_error ">
                  {errorsLogin?.password?.message}
                </p>
              </div>
              <a href="/" className="mt-[-20px] text-[12px] text-right block">
                Forgot password?
              </a>
              <div className="checkbox_line mt-[30px] mb-[30px]">
                <label htmlFor="checkbox2">
                  <input type="checkbox" id="checkbox2" />
                  <span className="square_block"><IconChecked className='[&>path]:fill-black' /></span>
                  <span className="check_label ">Remember Me</span>
                </label>
              </div>
              <button
                type="submit"
                className={
                  status === "loading"
                    ? " !opacity-50 submit_btn  normal_btn flex items-center justify-center"
                    : " [&>svg]:opacity-0 submit_btn normal_btn  flex items-center justify-center"
                }
              >
                <svg
                  aria-hidden="true"
                  role="status"
                  className="absolute inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
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
                {status !== "loading" && " Sign in"}
              </button>
            </form>
          </div>
          <div className="register_link">
            <div className="reg_title">NO ACCOUNT YET ?</div>
            <button className="site_btn normal_btn" onClick={registerSwitch}>Register</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPopup;
