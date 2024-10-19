'use client'

import Image from "next/image"
import Link from "next/link"
import footerImg1 from '@/public/images/footerImg1.png'
import footerImg2 from '@/public/images/footerImg2.png'
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

const Footer = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: ''
  });

  const [errors, setErrors] = useState({
    fullName: '',
    email: ''
  });

  const [constacts , setContacts] = useState(null);

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

        const response = await fetch(process.env.NEXT_PUBLIC_DATA_API + '/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name : formData.fullName,
            email : formData.email
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
      }
    }
  };


  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await request(process.env.NEXT_PUBLIC_DATA_API +'/getContactUs');
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
        <div className='flex footer_menu  mt-[50px] items-center gap-20 justify-between tablet:grid-cols-2 laptop:grid laptop:grid-cols-3 laptop:gap-40 mobile:grid-cols-1'>
          <div className="menu_block">
            <h2 className="text-xl  text-siteCrem pb-[2px]">Shortcuts</h2>
            <Link href="/">Home</Link>
            <Link href="/">About us</Link>
            <Link href="/">Awards </Link>
            <Link href="/">Latest News</Link>
            <Link href="/">FAQ</Link>
          </div>
          <div className="menu_block">
            <h2 className="text-xl  text-siteCrem pb-[2px]">Legal</h2>
            <Link href="/">Privacy policy</Link>
            <Link href="/">Terms & conditions</Link>
            <Link href="/">Delivery & returns</Link>
            <Link href="/">Wholesale</Link>
            <Link href="/">Media library</Link>
          </div>
          <div className="menu_block contact-block">
            <h2 className="text-xl text-siteCrem pb-[2px]">Contact us</h2>
            <a href={`tel:${constacts?.phone_number}`}  className="!flex items-center  gap-20"><IconCall />{constacts?.phone_number}</a>
            <a href="/" className="!flex items-center  gap-20"> <IconWhatsap /> {constacts?.whatsapp}</a>
            <a href="/" className="!flex items-center  gap-20"><IconMail /> {constacts?.email}</a>
            <div className="flex gap-[20px] footer_links items-center">
              <a href={constacts?.gmail_link}><IconGoogle /></a>
              <a href={constacts?.instagram_link}>
                <IconInsta />
                <span className="insta_fill"><IconInstaFill /></span>
              </a>
              <a href={constacts?.facebook_link}>
                <IconFb />
                <span className="insta_fill"><IconFbFill /></span>
              </a>
              <a href={constacts?.linkedin_link}><IconIn /></a>
              <a href={constacts?.twitter_link}><IconTwit /></a>
              <a href={constacts?.youtube_link}><IconYou /></a>
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

                <button type="submit">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer