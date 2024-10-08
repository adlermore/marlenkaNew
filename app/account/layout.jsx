'use client'

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import "@/styles/account.scss";
import IconUser from '@/public/icons/IconUser';
import IconHeart from '@/public/icons/IconHeart';
import IconProductCard from '@/public/icons/IconProductCard';
import IconLogOut from '@/public/icons/IconLogOut';
import { setAuthenticated } from '@/redux/authSlice';

export default function AccountLayout({ children }) {

  const pathname = usePathname();
  const router = useRouter();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof isAuth !== 'undefined') {
      setIsAuthChecked(true);
    }
  }, [isAuth]);

  useEffect(() => {
    if (isAuthChecked && !isAuth) {
      router.push('/');
    }
  }, [isAuthChecked, isAuth, router]);


  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(setAuthenticated(false));
    localStorage.removeItem("token");
    router.push('/');
  };

  return (
    <div className='mt-[120px] account_section mobile:mt-[150px]'>
      <div className=' text-[24px] uppercase bg-siteCrem '>
        <div className='custom_container h-[120px]  text-center justify-center flex items-center text-2xl text-[#B62025] font-medium'>
          My account
        </div>
      </div>
      <div className="custom_container !py-[90px]">
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
                <Link href="/account/orderHistory" className={pathname === '/account/myCart' ? 'active-link' : ''}>
                  <IconProductCard /> My Orders
                </Link>
              </li>
              
              <li className='log_out'>
                <a href="/" onClick={(e) => handleLogout(e)}>
                  <IconLogOut /> Log Out
                </a>
              </li>
            </ul>
          </nav>
          <main className='inner_wrapper w-full pr-[60px] account_wrapper'>{children}</main>
        </div>
      </div>
    </div>
  );
}