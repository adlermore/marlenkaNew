'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { HeaderLinks } from '@/utils/routes'
import { usePathname } from 'next/navigation'
import { Twirl as Hamburger } from "hamburger-react";
import IconHeart from '@/public/icons/IconHeart'
import mainLogo from '@/public/images/logoImage.png'
import AccountToggle from '../account/AccountToggle'
import { useDispatch, useSelector } from 'react-redux'
import { initializeAuth } from '@/redux/authSlice'
import SearchToggle from '../search/SearchToggle'
import CardCanvas from '../card/CardCanvas'
import Image from 'next/image'
import { initializeCart } from '@/redux/cartSlice'
import { useRouter } from 'next/navigation';
import { initializeWishlist } from '@/redux/wishlistSlice'

function Header() {

  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const wishListItems = useSelector((state) => state.wishlist.items);
  const [isOpen, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (document.body.classList.contains('menu_opened')) {
      setOpen(false)
    }
    if (window.scrollY > 10) {
      setIsScrolled(true);
    } 
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add('menu_opened');
    } else {
      document.body.classList.remove('menu_opened');
    }

    dispatch(initializeAuth());
    dispatch(initializeCart());
    dispatch(initializeWishlist());

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else if(pathname == '/'){
        setIsScrolled(false);
      }
    };

    if (pathname !== '/' || window.scrollY > 10){
      setIsScrolled(true);
    }else{
      setIsScrolled(false);
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };

  }, [isOpen, pathname, dispatch]);


  const detectScrollBarWidth = () => {
    const documentWidth = document.documentElement.clientWidth;
    const windowWidth = window.innerWidth;
    const scrollBarWidth = windowWidth - documentWidth;
    return scrollBarWidth;
  };

  //Login Popup Open
  const loginPopupOpen = () => {
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
  };


  const handelFavoriteDirect = () =>{
    if(isAuth){
      router.push('/account/wishList');
    }else{
      loginPopupOpen()
    }
  }

  return (
    <header className={`fixed fixed-element duration-500 transition-colors ${isScrolled && 'bg-[#520e11]'} top-0 h-[120px] left-0 right-0 z-[9999] laptop:bg-[#520e11]`}>
      <div className='cover_container h-full justify-between flex items-center  gap-20 '  >
        <Link href='/' className='z-20 relative top-[-7px]'>
          <Image
            src={mainLogo}
            alt="Ricardo portrait"
            priority={true}
            unoptimized={true}
            width={170}
          />
        </Link>
        <div className={isOpen ? 'menu-open laptop:fixed  z-20 ml-auto  laptop:z-0 laptop:w-full laptop:ml-0   laptop:h-full laptop:bottom-0 overflow-hidden  laptop:right-0  duration-[0.7s] mobile:duration-[0.5s]  ' : ' mobile:duration-[0.5s] duration-[0.7s] laptop:right-0 laptop:fixed  z-20 ml-auto  laptop:z-0 laptop:w-0 laptop:ml-0   laptop:h-full laptop:bottom-0 overflow-hidden  '}>
          <div className='ml-auto laptop:w-full  w-full laptop:m-0 laptop:flex laptop:justify-end laptop:z-[-1] tablet:w-[calc(100vw)] laptop:left-0 laptop:h-full z-20 laptop:bg-blueDark1 laptop:bg-opacity-35   tablet:bg-white mobile:bg-transparent tablet:text-black laptop:top-[86px] relative  '>
            <div className={`${isScrolled && 'isScrolled'} mobile_container relative flex items-center gap-[38px] laptop:min-w-[350px] tablet:min-w-[calc(100%-32px)] laptop:overflow-y-auto mobile:w-full   laptop:bg-[#f4faff] laptopHorizontal:gap-20 laptop:flex-col laptop:pt-[30px] laptop:mr-0  laptop:gap-[30px]`}>
              {HeaderLinks.map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  className={`${pathname === link.href && ' pointer-events-none'}  tablet:w-[calc(100%-16px)]  laptop:text-[16px] flex justify-center items-center gap-[38px] laptop:text-center laptop:w-[350px] whitespace-nowrap laptop:font-bold laptop:text-black laptopHorizontal:text-sm text-white text-[18px] `}
                >
                  {link.title}
                  <span className='laptop:block hidden'>
                    {'>'}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className='flex items-center ml-auto gap-[30px] tablet:hidden'>
          <div><SearchToggle /> </div>
          <div onClick={handelFavoriteDirect} className='favorite_btn duration-300 relative cursor-pointer hover:opacity-70'>
            <IconHeart
              className='text-white'
            />
                  {wishListItems.length > 0 && 
           <span className="red_count">{wishListItems.length}</span>
          }
          </div>
          <CardCanvas />
          <AccountToggle />
        </div>
        <div className="hidden z-20 laptop:flex  items-center justify-center relative before:absolute before:w-40 before:bg-blueDark1 before:h-40 mobile:right-[-5px]">
          <Hamburger
            toggled={isOpen}
            toggle={setOpen}
            size={22}
            color="#fff"
          />
        </div>
      </div>
    </header>
  )
}

export default Header