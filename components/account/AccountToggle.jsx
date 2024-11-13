"use client";

import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthenticated } from "@/redux/authSlice";
import IconUser from "@/public/icons/IconUser";
import useOnClickOutside from "@/utils/hooks/useOnClickOutside";
import Link from "next/link";
import { resetWishlist } from "@/redux/wishlistSlice";

function AccountToggle() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const [dropActive, setDropActive] = useState(false);
  const accountRef = useRef();
  const dispatch = useDispatch();

  const detectScrollBarWidth = () => {
    const documentWidth = document.documentElement.clientWidth;
    const windowWidth = window.innerWidth;
    const scrollBarWidth = windowWidth - documentWidth;
    return scrollBarWidth;
  };

  //Login Popup Open
  const loginPopupOpen = () => {
    // e.preventDefault();
    const scrollBarWidth = detectScrollBarWidth();
    document.body.style.overflow = "hidden";
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }
    document.body.classList.add("login_opened");
    const fixedElements = document.querySelectorAll(".fixed-element");
    fixedElements.forEach((el) => {
      el.style.paddingRight = `${scrollBarWidth}px`;
    });

    setDropActive(false);
  };

  //Registr Popup Open
  const registerPopupOpen = (e) => {
    e.preventDefault();
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

    setDropActive(false);
  };

  // Handle logout
  const handleLogout = () => {
    setDropActive(false);
    setTimeout(() => {
      dispatch(setAuthenticated(false));
      dispatch(resetWishlist());
      localStorage.removeItem("token");
      window.location.reload();
    }, 300);
  };

  const dropToggle = () => {
    if (isAuth) {
      setDropActive(!dropActive);
    } else {
      loginPopupOpen()
    }
  };

  useOnClickOutside(accountRef, () => {
    if (dropActive) {
      setDropActive(false);
    }
  });

  return (
    <div className="account_toggle flex justify-center items-center">
      <div
        className={`${dropActive && "drop_opened"} account_drop`}
        ref={accountRef}
      >
        <div className="drop_btn cursor-pointer" onClick={dropToggle}>
          <div className="flex relative text-white acc_btn items-center gap-10">
            <IconUser className="text" />
            <span className='whitespace-nowrap'> {isAuth ? `${user?.name.split(' ')[0] || 'Profile' }` : 'Sign in'}</span>
          </div>
        </div>
        <div className="account_drop">
          {isAuth ? (
            <div className="drop_ist" onClick={(e) => e.stopPropagation()}>
              <div className="drop_inner">
                <div className="border-[#b46126] border-b-2 pb-[5px]">{`Hi ${user?.name.split(' ')[0] || "User"}`}</div>
                <Link href='/account/userInfo' className="mt-[10px]"> My Account</Link>
                <div
                  className="mt-[12px]  duration-300 cursor-pointer hover:opacity-50"
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </div>
            </div>
          ) : (
            <div className="drop_ist">
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AccountToggle;
