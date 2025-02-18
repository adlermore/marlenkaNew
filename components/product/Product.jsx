'use client';

import Image from "next/image";
import Link from "next/link";

import { addToCart } from "@/redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "@/redux/wishlistSlice";

import IconHeartFill2 from "@/public/icons/IconHeartFill2";
import IconProductHeart from "@/public/icons/IconProductHeart";
import IconShop from "@/public/icons/IconShop";
import newLook from "@/public/images/newLook.svg";

function Product({ product, onClick }) {
  const dispatch = useDispatch();
  const wishlist = useSelector(state => state.wishlist.items);

  // Check if the product is in the wishlist
  const isInWishlist = wishlist.some(item => item.id === product.id);
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  const handleAddToCart = (e) => {
    e.preventDefault();
    const productToAdd = {
      ...product,
      quantity: 1
    };
    dispatch(addToCart(productToAdd));
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

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    if (isAuth) {
      isInWishlist ? dispatch(removeFromWishlist(product)) : dispatch(addToWishlist(product))
    } else {
      loginPopupOpen()
    }
  };

  return (
    <div className="slider_block">
      <Link

        href={`/product/${product.id}`}
        onClick={onClick}
        className="relative product_wrapp_link z-[999] cursor-pointer !opacity-1"
      >
        {product.isNew === 1 &&
          <span className="new_look">
            <Image
              src={newLook}
              unoptimized
              alt={product.name || "Ricardo portrait"}
              priority
              width={107}
              height={107}
              className="object-contain"
            />
          </span>
        }
        <div className="product_image z-0 h-[289px] laptopHorizontal:h-[350px] overflow-hidden laptop:h-[260px] mobile:h-[240px] w-full flex justify-center items-center relative">
          {product?.images &&
            <span

              className="w-full h-full flex justify-center items-center relative !opacity-1"
            >
              <span className="product_inner">
                <Image
                  src={process.env.NEXT_PUBLIC_DATA + product?.images[0]?.image_path}
                  alt={product.name || "Ricardo portrait"}
                  unoptimized
                  priority
                  fill
                  className="product_inner_img object-contain"
                />
              </span>
            </span>
          }
          <span className="product_links z-[999] flex flex-col items-center absolute top-[5px] right-[5px] mobile:top-[15px] mobile:right-[15px]">
            <button
              className={`block`}
              aria-label={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
              onClick={(e)=>handleAddToWishlist(e)}
            >
              {isInWishlist ? <IconHeartFill2 className='!w-[20px] mobile:!w-[16px] h-auto' /> : <IconProductHeart className='[&>path]:fill-[#e0be96] mobile:w-[18px] w-[22px]' />}
            </button>
            <button
              className="mt-[15px] mobile:mt-[8px] block"
              onClick={handleAddToCart}
              aria-label="Add to Cart"
            >
              <IconShop className='[&>path]:fill-[#e0be96] mobile:w-[20px]' />
            </button>
          </span>
        </div>
        <div className="flex items-center text-center text-[#B62025] mobile:text-base font-medium mt-[10px] text-xl justify-center gap-[5px]">
          {product.name}
        </div>
        <div className="font-medium product_price mt-[5px] flex items-center gap-[5px] justify-center mobile:text-[14px] text-[18px] text-black">
          <span></span>
          ${product.price}
          <span></span>
        </div>
      </Link>
    </div>
  );
}

export default Product;
