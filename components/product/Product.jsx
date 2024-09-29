'use client';

import IconHeart from "@/public/icons/IconHeart";
import IconHeartFill from "@/public/icons/IconHeartFill";
import IconProductCard from "@/public/icons/IconProductCard";
import IconProductHeart from "@/public/icons/IconProductHeart";
import IconShop from "@/public/icons/IconShop";
import { addToCart } from "@/redux/cartSlice";
import { addToWishlist, removeFromWishlist } from "@/redux/wishlistSlice";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

function Product({ product, onClick }) {
  const dispatch = useDispatch();
  const wishlist = useSelector(state => state.wishlist.items);

  // Check if the product is in the wishlist
  const isInWishlist = wishlist.some(item => item.id === product.id);
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

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

  const handleAddToWishlist = () => {
    if(isAuth){
      if (isInWishlist) {
        dispatch(removeFromWishlist(product));
      } else {
        dispatch(addToWishlist(product));
      }
    }else{
      loginPopupOpen()
    }
  };

  return (
    <div className="slider_block">
      <div className="product_image h-[289px] laptopHorizontal:h-[350px] tablet:h-[300px] overflow-hidden laptop:h-[320px] w-full flex justify-center items-center relative">
        <Link
          href={`/product/${product.id}`}
          onClick={onClick}
          className="w-full h-full flex justify-center items-center relative !opacity-1"
        >
          <Image
            src={product.image}
            unoptimized
            alt={product.title} 
            priority
            fill
            className="object-contain"
          />
          <span className="product_inner">
            <Image
              src={product.innerImage}
              unoptimized
              alt={product.title}
              priority
              fill
              className="product_inner_img object-contain"
            />
          </span>
        </Link>
        <span className="product_links z-[999] flex flex-col items-center absolute top-0 right-0">
          <button
            className={`block`}
            aria-label={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
            onClick={handleAddToWishlist}
          >
            {isInWishlist ? <IconHeartFill className='!w-[22px] h-auto'  />  : <IconProductHeart className='[&>path]:fill-[#C17E2E] w-[22px]' />  }
          </button>
          <button
            className="mt-[15px] block"
            onClick={handleAddToCart}
            aria-label="Add to Cart"
          >
            <IconShop  className='[&>path]:fill-[#C17E2E]' />
          </button>
        </span>
      </div>
      <div className="flex items-center text-[#B62025] font-medium text-xl justify-center gap-[5px]">
        <span>Classic</span>-<span>Large</span>
      </div>
      <div className="font-medium mt-[5px] flex items-center gap-[5px] justify-center text-[18px] text-black"><span>-</span>{product.price}<span>-</span></div>
    </div>
  );
}

export default Product;
