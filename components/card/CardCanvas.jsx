"use client";

import React from "react";
import "@/styles/card.scss";
import IconShop from "@/public/icons/IconShop";
import { useSelector } from "react-redux";
import Link from "next/link";

function CardCanvas() {
  
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <>
      <Link href="/card" className="duration-300 card_button cursor-pointer hover:opacity-70 relative">
        <IconShop className="text-white" />
        {cartItems.length > 0 && 
           <span className="red_count">{cartItems.length}</span>
        }
      </Link>
    </>
  );
}

export default CardCanvas;
