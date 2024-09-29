import category1 from "@/public/images/category1.png";
import category2 from "@/public/images/category2.png";
import category3 from "@/public/images/category3.png";
import category4 from "@/public/images/category4.png";
import category5 from "@/public/images/category5.png";
import category6 from "@/public/images/category6.png";
import category7 from "@/public/images/category7.png";
import category8 from "@/public/images/category8.png";
import product1 from "@/public/images/product1.png";
import product2 from "@/public/images/product2.png";
import product3 from "@/public/images/product3.png";
import product4 from "@/public/images/product4.png";
import product5 from "@/public/images/product5.png";
import product6 from "@/public/images/product6.png";
import productInner1 from "@/public/images/productInner1.webp";
import productInner2 from "@/public/images/productInner2.webp";
import productInner3 from "@/public/images/productInner3.webp";
import productInner4 from "@/public/images/productInner4.webp";
import silverCategory1 from "@/public/images/silverCategory1.png";
import silverCategory2 from "@/public/images/silverCategory2.png";
import silverCategory3 from "@/public/images/silverCategory3.png";
import silverCategory4 from "@/public/images/silverCategory4.png";
import silverCategory5 from "@/public/images/silverCategory5.png";
import silverCategory6 from "@/public/images/silverCategory6.png";
import silverCategory7 from "@/public/images/silverCategory7.png";
import silverCategory8 from "@/public/images/silverCategory8.png";
import shop1 from "@/public/images/shop1.png";
import shop2 from "@/public/images/shop2.png";
import shop3 from "@/public/images/shop3.png";
import marlenka1 from '@/public/images/marlenka1.png';
import mainbannerSilver1 from '@/public/images/mainbannerSilver1.png';
import mainbannerInner1 from '@/public/images/mainbannerInner1.png';
import mainSlider2 from '@/public/images/mainBanner2.webp';
import mainSlider3 from '@/public/images/mainBanner3.webp';
import categoryHero from '@/public/images/categoryHero.png';

export const categoryGrid = [
  {
    image: category1,
    imageSilver : silverCategory1,
    title: "Rings",
  },
  {
    image: category2,
    imageSilver : silverCategory2,
    title: "Earrings",
  },
  {
    image: category3,
    imageSilver : silverCategory3,
    title: "Necklace",
  },
  {
    image: category4,
    imageSilver : silverCategory4,
    title: "Bracelets",
  },
  {
    image: category5,
    imageSilver : silverCategory5,
    title: "Sets",
  },
  {
    image: category6,
    imageSilver : silverCategory6,
    title: "Pendants",
  },
  {
    image: category7,
    imageSilver : silverCategory7,
    title: "Accessories",
  },
  {
    image: category8,
    imageSilver : silverCategory8,
    title: "Bulions",
  },
];

export const bestProducts = [
  {
    id: 1,
    image: marlenka1,
    innerImage: marlenka1,
    title: "Jewelry Gold Woman Rings",
    price: "25.99$",
  },
  {
    id: 2,
    image: marlenka1,
    innerImage: marlenka1,
    title: "Jewelry Gold Woman Rings",
    price: "25.99$",
  },
  {
    id: 3,
    image: marlenka1,
    innerImage: marlenka1,
    title: "Jewelry Gold Woman Rings",
    price: "25.99$",
  },
  {
    id: 4,
    image: marlenka1,
    innerImage: marlenka1,
    title: "Jewelry Gold Woman Rings",
    price: "35.99$",
  },
  {
    id: 5,
    image: marlenka1,
    innerImage: marlenka1,
    title: "Jewelry Gold Woman Rings",
    price: "2.99$",
  },
  {
    id: 6,
    image: marlenka1,
    innerImage: marlenka1,
    title: "Jewelry Gold Woman Rings",
    price: "25$",
  },
];

export const belongsProducts = [
  {
    id: 104,
    image: product1,
    innerImage: productInner1,
    title: "ASDewelry Gold Woman Rings",
    price: "119.00$",
  },
  {
    id: 222,
    image: product2,
    innerImage: productInner2,
    title: "Jewelry Gold Woman Necklaces",
    price: "235.00$",
  },
  {
    id: 330,
    image: product3,
    innerImage: productInner3,
    title: "Jewelry Gold Woman Rings",
    price: "40.00$",
  },
];

export const newStores = [
  {
    title: "Store name 01",
    gallery: [{ image: shop1 }, { image: product1 }, { image: productInner1 }],
  },
  {
    title: "Store name 02",
    gallery: [{ image: shop2 }, { image: product2 }, { image: productInner2 }],
  },
  {
    title: "Store name 03",
    gallery: [{ image: shop3 }, { image: product3 }, { image: productInner3 }],
  },
  {
    title: "Store name 01",
    gallery: [{ image: shop1 }, { image: product1 }, { image: productInner1 }],
  },
];


export const homeSliderData = [
  {
    image : mainbannerSilver1,
    imageInner : mainbannerInner1,
    description : 'Marlenka Eclairs offers an original culinary experience in a mini dessert based on choux pastry with delicious milky cream filling.'
  },
  {
    image : mainbannerSilver1,
    imageInner : mainbannerInner1,
    description : 'Marlenka Eclairs offers an original culinary experience in a mini dessert based on choux pastry with delicious milky cream filling.'
  },
]

export const categorySliderData = [
  {
    image : categoryHero,
    title  : 'Variety of SETS for all occasions',
    description : 'express yourself by gifting your beloved one a character matching set'
  },
  {
    image : mainSlider2,
    title  : 'The Lotus Of New Beginnings',
    description : 'Discover our most-loved style. A character matching set'
  }
]