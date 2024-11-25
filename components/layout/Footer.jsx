'use client'

import Image from "next/image"
import Link from "next/link"
import footerImg1 from '@/public/images/footerImg1.svg'
import footerImg2 from '@/public/images/footerImg2.svg'
import IconCall from "@/public/icons/IconCall"
import IconWhatsap from "@/public/icons/IconWhatsap"
import IconMail from "@/public/icons/IconMail"
import IconGoogle from "@/public/icons/IconGoogle"
import IconInsta from "@/public/icons/IconInsta"
import IconFb from "@/public/icons/IconFb"
import IconIn from "@/public/icons/IconIn"
import IconTwit from "@/public/icons/IconTwit"
import IconYou from "@/public/icons/IconYou"
import { useEffect, useState } from "react"
import request from "@/utils/hooks/request"
import { email } from "@/validation/common"
import toast from "react-hot-toast"
import IconInstaFill from "@/public/icons/IconInstaFill"
import IconFbFill from "@/public/icons/IconFbFill"
import IconAmazon from "@/public/icons/IconAmazon"

const Footer = () => {

  const [isOverlayVisible, setOverlayVisible] = useState(true);

  const toggleBodyStyles = () => {
    const body = document.body;
    if (isOverlayVisible) {
      body.classList.remove('overlay'); 
    } else {
      body.classList.add('overlay'); 
    }
    setOverlayVisible(!isOverlayVisible);
  };

  const handleKeyUp = (event) => {
    if (event.ctrlKey && event.key === 'o') {
      toggleBodyStyles();
    }
  };

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isOverlayVisible]);


  const [formData, setFormData] = useState({
    fullName: '',
    email: ''
  });

  const [errors, setErrors] = useState({
    fullName: '',
    email: ''
  });

  const [constacts, setContacts] = useState(null);
  const [loading, setLoading] = useState(false);

  const validateField = (name, value) => {
    let error = '';

    if (name === 'fullName') {
      if (!value) {
        error = 'Full name is required';
      }
    }

    if (name === 'email') {
      if (!value) {
        error = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        error = 'Email is invalid';
      }
    }

    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

    // Validate the field on change
    const error = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error
    }));
  };

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    // Validate full name
    formErrors.fullName = validateField('fullName', formData.fullName);
    if (formErrors.fullName) isValid = false;

    // Validate email
    formErrors.email = validateField('email', formData.email);
    if (formErrors.email) isValid = false;

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setLoading(true)
        const response = await fetch(process.env.NEXT_PUBLIC_DATA_API + '/new_message', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: formData.fullName,
            email: formData.email
            
          })
        });

        if (response.ok) {
          toast.success("Thank you for subscribing!");
          setFormData({ fullName: '', email: '' });
        } else {
          alert('Something went wrong. Please try again.');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      } finally {
        setLoading(false)
      }
    }
  };


  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await request(process.env.NEXT_PUBLIC_DATA_API + '/getContactUs');
        setContacts(data.data.contactUs[0]);

      } catch (error) {
        console.error('Failed to fetch categories', error);
      }
    };
    fetchContacts();
  }, []);

  return (
    <div className='footer pt-[60px] laptopHorizontal:pt-[30px] pb-[140px] bg-[#520E11] text-white relative laptopHorizontal:py-[80px] mobile:py-[40px]'>
      <div className='custom_container '>
        <div className="flex items-center justify-between gap-20">
          <Image
            src={footerImg1}
            alt="Ricardo portrait"
            priority={true}
            unoptimized={true}
            className="laptopHorizontal:max-w-[160px] mobile:hidden"
          />
          <Image
            src={footerImg2}
            alt="Ricardo portrait"
            priority={true}
            unoptimized={true}
            className="laptopHorizontal:max-w-[160px]"
          />
        </div>
        <div className='flex footer_menu  mt-[70px] mobile:mt-[30px] items-center gap-20 justify-between tablet:grid-cols-2 laptop:grid laptop:grid-cols-3 laptop:gap-40 mobile:flex mobile:flex-wrap'>
          <div className="menu_block">
            <h2 className="text-xl  text-siteCrem pb-[2px]">Shortcuts</h2>
            <Link href="/">Home</Link>
            <Link href="/about">About us</Link>
            <Link href="/awards">Awards </Link>
            <Link href="/news">Latest News</Link>
            <Link href="/faq">FAQ</Link>
          </div>
          <div className="menu_block">
            <h2 className="text-xl  text-siteCrem pb-[2px]">Legal</h2>
            <Link href="/policy">Privacy policy</Link>
            <Link href="/terms">Terms & conditions</Link>
            <Link href="/contacts">Contact Us</Link>
            <Link href="/wholeSale">Wholesale</Link>
            <Link href="/">Media library</Link>
          </div>
          <div className="menu_block contact-block">
            <h2 className="text-xl text-siteCrem pb-[2px]">Contact us</h2>
            <a href={`tel:${constacts?.phone_number}`} className="!flex items-center  gap-20"><IconCall />{constacts ? constacts?.phone_number : '1-(844)-627-5365'}</a>
            <a href="/" className="!flex items-center  gap-20"> <IconWhatsap /> {constacts ? constacts?.whatsapp : '1-(844)-627-5365'}</a>
            <a href="/" className="!flex items-center  gap-20"><IconMail /> {constacts ? constacts?.email : 'email@gmail.com'}</a>
            <div className="flex gap-[20px] footer_links items-center">
              {/* <a href={constacts?.gmail_link}><IconGoogle /></a> */}
              <a href={constacts?.instagram_link}>
                <IconInsta />
              </a>
              <a href={constacts?.facebook_link}>
                <IconFb />
              </a>
              <a href={constacts?.youtube_link}><IconYou /></a>
              <a href={constacts?.linkedin_link}><IconIn /></a>
              <a href={constacts?.linkedin_link}><IconAmazon /></a>
              {/* <a href={constacts?.twitter_link}><IconTwit /></a> */}
            </div>
          </div>
          <div className="menu_block">
            <h2 className="text-xl  text-siteCrem pb-[2px]">Subscribe for latest</h2>
            <div className="footer_form">
              <form onSubmit={handleSubmit} noValidate>
                <div >
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    placeholder="Name Surname"
                    onChange={handleInputChange}
                    required
                  />
                  {errors.fullName && <span className="error">{errors.fullName}</span>}
                </div>
                <div>
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    autoComplete="off"
                  />
                  {errors.email && <span className="error">{errors.email}</span>}
                </div>

                <button type="submit" className="flex items-center justify-center" disabled={loading}>
                  {loading ?
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="absolute inline   h-4 animate-spin dark:text-gray-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="#1C64F2"
                      ></path>
                    </svg>
                   :
                  'Subscribe'
                  }
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer