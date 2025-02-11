'use client'

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
// import { useEffect, useState } from 'react';
import "@/styles/account.scss";
import IconUser from '@/public/icons/IconUser';
import IconHeart from '@/public/icons/IconHeart';
import IconLogOut from '@/public/icons/IconLogOut';
import { setAuthenticated } from '@/redux/authSlice';
import IconShop from '@/public/icons/IconShop';
import { resetWishlist } from '@/redux/wishlistSlice';

export default function AccountLayout({ children }) {

  const pathname = usePathname();
  const router = useRouter();
  // const isAuth = useSelector((state) => state.auth.isAuthenticated);
  // const [isAuthChecked, setIsAuthChecked] = useState(false);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (typeof isAuth !== 'undefined') {
  //     setIsAuthChecked(true);
  //   }
  // }, [isAuth]);

  // useEffect(() => {
  //   if (isAuthChecked && !isAuth) {
  //     router.push('/');
  //   }
  // }, [isAuthChecked, isAuth, router]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(setAuthenticated(false));
    dispatch(resetWishlist());
    localStorage.removeItem("token");
    router.push('/');
  };

  return (
    <div className='mt-[120px] account_section mobile:mt-[150px]'>
      <div className=' text-[24px] uppercase bg-siteCrem '>
        <div className='custom_container h-[120px] laptopHorizontal:h-[80ox] mobile:text-xl mobile:h-[80px]  text-center justify-center flex items-center text-2xl text-[#B62025] font-medium'>
          My account
        </div>
      </div>
      <div className="custom_container !bg-white !py-[50px]">
        <div className='account_line'>
          <nav>
            <ul>
              <li>
                <Link href="/account/userInfo" className={pathname === '/account/userInfo' ? 'active-link' : ''}>
                  <IconUser /> Profile Info
                </Link>
              </li>
              <li>
                <Link href="/account/wishList" className={pathname === '/account/wishList' ? 'active-link' : ''}>
                  <IconHeart /> Wishlist
                </Link>
              </li>
              <li>
                <Link href="/account/orderHistory" className={pathname === '/account/orderHistory' ? 'active-link' : ''}>
                  <IconShop /> My Orders
                </Link>
              </li>
              <li className='log_out'>
                <a href="/" className='logout' onClick={(e) => handleLogout(e)}>
                  <IconLogOut /> Log Out
                </a>
              </li>
            </ul>
          </nav>
          <main className='inner_wrapper w-full pr-[60px] laptopHorizontal:pr-[30px] laptop:pr-0 account_wrapper'>{children}</main>
        </div>
      </div>
    </div>
  );
}