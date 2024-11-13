/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        5: "5px",
        8: "8px",
        10: "10px",
        15: "15px",
        16: "16px",
        20: "20px",
        32: "32px",
        35: "35px",
        40: "40px",
        45: "45px",
        50: "50px",
      },
      strokeWidth: {
        '2': '2px',
      },
      borderRadius: {
        20: "20px",
      },
      boxShadow: {
        'custom': '4px 4px 50px 0px rgba(2, 28, 65, 0.20)',
        'inner': '5px 5px 30px 0px rgba(78, 79, 102, 0.40)',
        'review': '3px 3px 0px 0px #021C41;'
      },
    },
    screens: {
      'desktop': { 'max': '1600px' },
      'noteBook': { 'max': '1440px' },
      'laptopHorizontal': { 'max': '1199px' },
      'laptop': { 'max': '991px' },
      'tablet': { 'max': '768px' },
      'mobile': { 'max': '575px' },
    },

    fontFamily: {
      qwigley: "QwigleyRegular",
      regular: "MontserratRegular",
      light: "MontserratLight",
      medium: "MontserratMedium",
      bold: "MontserratBold",
    },

    colors: {
      transparent: "transparent",
      white: "#ffffff",
      siteCrem : '#FFF6E6',
      blueDark1: "#191A2A",
      blueDark2: "#021C41",
      siteBlue: "#0071DC",
      siteBlueDark: "#1027C6",
      siteGreen: "#22A121",
      siteOrange: "#FDA018",
      black: "#000000",
      siteRed: "#D8201D",
      siteGray: "#ACACB0",
      beckopacity: 'rgba(0, 29, 74, 0.80)',
      bgGray: 'rgba(183, 219, 253, 0.15)',
    },

  },
  plugins: [
    plugin(function ({ addBase, addComponents, addUtilities, theme }) {
      addBase({
        h1: {
          fontSize: theme("fontSize.2xl"),
        },
        h2: {
          fontSize: theme("fontSize.xl"),
        },
      });
      addComponents({
        ".card": {
          backgroundColor: theme("colors.siteColor"),
          borderRadius: theme("borderRadius.lg"),
          fontFamily: theme("fontFamily.bold"),
          padding: theme("spacing.6"),
          boxShadow: theme("boxShadow.xl"),
        }
      });
      addUtilities({
        ".content-auto": {
          contentVisibility: "auto",
        },
      });
    }),
  ],
};


