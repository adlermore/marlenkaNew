'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { HeaderLinks } from '@/utils/routes'
import { usePathname, useSearchParams } from 'next/navigation'
import { Twirl as Hamburger } from "hamburger-react";
import IconHeart from '@/public/icons/IconHeart'
import mainLogo from '@/public/images/logoImage.png'
import logoHover from '@/public/images/logoHover.png'
import AccountToggle from '../account/AccountToggle'
import { useDispatch, useSelector } from 'react-redux'
import { initializeAuth } from '@/redux/authSlice'
import SearchToggle from '../search/SearchToggle'
import CardCanvas from '../card/CardCanvas'
import Image from 'next/image'
import { initializeCart } from '@/redux/cartSlice'
import { useRouter } from 'next/navigation';
import { initializeWishlist } from '@/redux/wishlistSlice'
import request from '@/utils/hooks/request'

function Header() {

  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const wishListItems = useSelector((state) => state.wishlist.items);

  const [isOpen, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [categories, setCategories] = useState(null);

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
      document.body.style.overflow = "visible";
    }

    dispatch(initializeAuth());
    dispatch(initializeCart());
    dispatch(initializeWishlist());

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else if (pathname == '/') {
        setIsScrolled(false);
      }
    };

    if (pathname !== '/' || window.scrollY > 10) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };

  }, [isOpen, pathname, dispatch]);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await request(process.env.NEXT_PUBLIC_DATA_API + '/getCategories');
        setCategories(data.data.categories);
      } catch (error) {
        console.error('Failed to fetch categories', error);
      }
    };
    fetchCategories();
  }, []);


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

  const handelFavoriteDirect = () => {
    if (isAuth) {
      router.push('/account/wishList');
    } else {
      loginPopupOpen()
    }
  }

  return (
    <header className={`fixed fixed-element duration-500 transition-colors ${isScrolled && 'bg-[#520e11]'} laptopHorizontal:bg-[#520e11] top-0 h-[120px] left-0 right-0 z-[99999] mobile:h-[150px] laptop:bg-[#520e11]`}>
      <div className='cover_container h-full justify-between flex items-center  mobile:mt-[-20px] gap-20 '  >
        <Link href='/' className='z-20 header_logo relative top-[-7px]'>
          <Image
            src={mainLogo}
            alt="Ricardo portrait"
            priority={true}
            unoptimized={true}
            width={180}
            className='mobile:w-[140px]'
          />
          <span className='logo_hover'>
            <Image
              src={logoHover}
              alt="Ricardo portrait"
              priority={true}
              unoptimized={true}
              width={180}
            />
          </span>
        </Link>
        <div className={`laptop:fixed  flex gap-[30px] laptop:overflow-hidden justify-around w-full max-w-[1100px] items-center z-20 ml-auto laptop:z-0 laptop:h-full laptop:bottom-0 laptop:right-0 duration-[0.7s] mobile:duration-[0.5s] ${isOpen ? 'menu-open laptop:w-full' : 'laptop:w-0'}`}>
          <div className="ml-auto w-full laptop:w-full laptop:m-0 laptop:flex laptop:justify-end tablet:w-[calc(100vw)] z-20 relative laptop:left-0 laptop:h-full laptop:bg-blueDark1 laptop:bg-opacity-35 laptop:z-[-1] laptop:top-[120px] tablet:bg-white mobile:bg-transparent tablet:text-black mobile:top-[150px]">
            <div className={`${isScrolled && 'isScrolled'} header_links laptop:!w-0 ml-[-40px] noteBook:ml-0 mobile_container relative flex justify-center mobile:h-[calc(100vh-150px)] items-center gap-[38px] laptop:min-w-[350px] tablet:min-w-[calc(100%-0px)] laptop:overflow-y-auto mobile:w-full   laptop:bg-[#f4faff] mobile:bg-siteCrem laptopHorizontal:gap-20 laptop:flex-col laptop:pt-[70px] laptop:mr-0  laptop:justify-start laptop:gap-[30px]`}>
              {categories ?
                categories.slice(0, 7).map((category) => (
                  <Link
                    key={category.id}
                    href={`/productListing?category=${category.id}`}
                    className={`${searchParams.get('category') === `${category.id}` && ' !text-[#AE8839] pointer-events-none'}  tablet:w-[calc(100%-16px)]  laptop:text-[16px] flex justify-center items-center gap-[38px] laptop:text-center laptop:w-[350px] whitespace-nowrap laptop:font-bold laptop:text-black laptopHorizontal:text-sm text-siteCrem text-[18px] `}
                  >
                    {category.name}
                  </Link>
                ))
                :
                HeaderLinks.map((link, i) => (
                  <Link
                    key={i}
                    href={link.href}
                    className={`${pathname === link.href && ' pointer-events-none'}  tablet:w-[calc(100%-16px)]  laptop:text-[16px] flex justify-center items-center gap-[38px] laptop:text-center laptop:w-[350px] whitespace-nowrap laptop:font-bold laptop:text-black laptopHorizontal:text-sm text-siteCrem text-[18px] `}
                  >
                    {link.title}
                  </Link>
                ))
              }
            </div>
          </div>
          <div className='flex items-center  header_icons ml-auto gap-[15px] laptop:absolute laptop:top-[119px] mobile:top-[148px] laptop:right-0 tablet:w-full laptop:bg-[#520e11] laptop:p-10 laptop:w-[350px] laptop:justify-center laptop:border-t border-siteCrem'>
            <div><SearchToggle /> </div>
            <div onClick={handelFavoriteDirect} className='favorite_btn duration-300 relative cursor-pointer hover:opacity-70'>
              <IconHeart className='text-white' />
              {wishListItems.length > 0 && <span className="red_count">{wishListItems.length}</span>}
            </div>
            <CardCanvas />
            <AccountToggle />
          </div>
        </div>
        <div className="hidden z-20 hamburger_btn laptop:flex  items-center justify-center color-black relative before:absolute before:w-40 before:bg-siteCrem before:h-40 mobile:right-[-5px]">
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