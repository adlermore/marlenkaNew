import "@/styles/globals.scss";
import Header from "@/components/layout/Header.jsx";
import Footer from "@/components/layout/Footer.jsx";
import SuccessPopup from "@/components/layout/SuccessPopup.jsx";
import LoginPopup from "./(auth)/components/login/LoginPopup";
import RegisterPopup from "./(auth)/components/register/RegisterPopup";
import { Providers } from "../redux/providers";
import { Toaster } from "react-hot-toast";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Suspense } from "react";
import PageLoader from "@/components/PageLoader";

export const metadata = {
  title: "Marlenka",
  description: "Generated by Next Js",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col siteBody overlay">
        <Toaster 
          containerStyle={{ zIndex: 99999 }} 
          position="bottom-right" 
          toastOptions={{
            style: {
              background: '#520e11',
              color: 'white',
              padding: '16px 20px'
            }
          }}
        />
        <Providers>
        <Suspense fallback={<PageLoader />}>
          <Header />
        </Suspense>
          <SuccessPopup />
          <div className="flex-1 main-wrapper">{children}</div>
          <LoginPopup />
          <RegisterPopup />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
