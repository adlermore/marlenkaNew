'use client';

import Image from 'next/image';
import { userScheme } from '@/validation/userScheme';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputMask from "react-input-mask";
import { useDispatch, useSelector } from 'react-redux';
import visa from "@/public/images/icons/visa.png";
import arca from "@/public/images/icons/arca.png";
import discover from "@/public/images/icons/discover.png";
import amex from "@/public/images/icons/amex.png";
import paypal from "@/public/images/icons/paypal.png";
import { useEffect, useState } from 'react';
import { toast } from "react-hot-toast";
import { fetchUserInfo } from '@/redux/authSlice';
import IconAddCard from '@/public/icons/IconAddCard';
import IconEdit from '@/public/icons/IconEdit';
import IconRemoveCard from '@/public/icons/IconRemoveCard';
import IconChecked from '@/public/icons/IconChecked';
import { cardSchema } from '@/validation/cardSchema';

const cardTypes = [
  { src: visa, alt: 'Visa' },
  { src: arca, alt: 'Arca' },
  { src: discover, alt: 'Discover' },
  { src: amex, alt: 'Amex' },
  { src: paypal, alt: 'PayPal' },
];

export default function UserInfoPage() {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [phone, setPhone] = useState(profileData?.phone_number || '');
  const [cardNumber, setCardNumber] = useState('');
  const [cardDate, setCardDate] = useState('');
  const [popupOpened, setPopupOpened] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  // Fetch saved cards

  const fetchCards = async () => {
    setLoading(true);
    const response = await fetch(`${process.env.NEXT_PUBLIC_DATA_API}/getCards`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    if (data.success) {
      setCards(data.data.cards);
    }
    setLoading(false);
  };

  // Add or update a card
  const cardSave = async (formData) => {

    const updatedFromData = {
      number: formData?.cardNumber,
      holder: formData?.cardName,
      date: formData?.cardExperationDate,
      cvv: formData?.cardCvv
    }
    setLoading(true);
    const method = selectedCard ? 'POST' : 'POST';
    const response = await fetch(`${process.env.NEXT_PUBLIC_DATA_API}/storeCard`, {
      method,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...updatedFromData, id: selectedCard?.id }),
    });
    await response.json();
    fetchCards();
    setPopupOpened(false);
    setSelectedCard(null);
    setLoading(false);
  };

  // Delete a card
  const deleteCard = async (id) => {
    setLoading(true);
    await fetch(`${process.env.NEXT_PUBLIC_DATA_API}/deleteCard`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    fetchCards();
    setLoading(false);
  };

  // Set default card
  const setDefaultCard = async (id) => {
    setLoading(true);
    await fetch(`${process.env.NEXT_PUBLIC_DATA_API}/cards/setDefault`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    fetchCards();
    setLoading(false);
  };

  //validation init
  const { register: userInfo, handleSubmit: handleSubmitForm, reset, watch, formState: { errors: errorUser } } = useForm({
    resolver: zodResolver(userScheme)
  });

  const { register: cardInfo, handleSubmit: handleCardSubmitForm, formState: { errors: errorCard } } = useForm({
    resolver: zodResolver(cardSchema)
  });

  const fetchProfileData = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_DATA_API}/getProfile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch profile data');
      const data = await response.json();
      setProfileData(data.data.profile);
      setPhone(data.data.profile?.phone_number)
      reset({
        namefirst: data.data.profile.name || '',
        surname: data.data.profile.surname || ''
      });

    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false)
    }
  };

  //sumbition Data
  const userInfoSubmit = async () => {
    await saveInfo()
    dispatch(fetchUserInfo())
  };

  const saveInfo = async () => {
    setLoading(true)
    const formData = {
      name: `${watch("namefirst")}` || profileData.name,
      surname: `${watch("surname")}` || profileData.surname,
      email: watch("email") || profileData.email,
      phone_number: watch("phone") || profileData.phone_number,
      company_name: watch("company") || profileData.company_name,
      country: watch("region") || profileData.country,
      city: watch("city") || profileData.city,
      address: watch("address") || profileData.address,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      apartment: watch("apartament") || profileData.apartment,
      state: watch("treet") || profileData.state,
      zip_code: watch("postalCode") || profileData.zip_code,
      notes: watch("notes") || profileData.notes,
      type: "car" || profileData.type,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_DATA_API}/storeProfile`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to save profile data');
      toast.success("Profile Information Edited");
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchProfileData();
    fetchCards();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupOpened && !event.target.closest('.popup_inner')) {
        setPopupOpened(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popupOpened]);

  return (
    <div className='user_wrapper w-full'>
      <div className='text-2xl text-black'>
        Profile Information
      </div>
      <form onSubmit={handleSubmitForm(userInfoSubmit)} className="w-full">
        <div className='mt-[30px] text-2xl flex items-center  justify-between gap-20'>User Details
          <button
            type="submit"
            className={`w-[100px] h-[40px] !duration-0 !bg-siteCrem !max-w-[100px] !text-black border site_btn mb-[10px] text-opacity-1 [&>svg]:opacity-0 ${loading && "[&>svg]:opacity-100 pointer-events-none opacity-80 !text-opacity-0"}`}
          >
            <svg
              aria-hidden="true"
              role="status"
              className="absolute inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
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
            {loading ? " " : " Update"}
          </button>
        </div>
        <div className='userInfoForm'>
          <div className={errorUser?.namefirst ? "form_block has_error" : "form_block"}>
            <div className="userInfo_label text-sm font-light">
              Name
            </div>
            <input
              placeholder="Enter name"
              autoComplete="on"
              defaultValue={user?.name.split(' ')[0] || ''}
              className="form-control "
              name="name"
              {...userInfo("namefirst", { required: true })}
            />
            <p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
              {errorUser?.namefirst?.message}
            </p>
          </div>
          <div className={errorUser?.surname ? "form_block has_error" : "form_block"}>
            <div className="userInfo_label text-sm font-light mb-[10px]">
              Surname
            </div>
            <input
              placeholder="Enter surname"
              autoComplete="on"
              defaultValue={user?.name.split(' ')[1] || ''}
              className="form-control "
              name="name"
              {...userInfo("surname", { required: true })}
            />
            <p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
              {errorUser?.surname?.message}
            </p>
          </div>
          <div className={errorUser?.email ? "form_block has_error" : "form_block"}  >
            <div className="userInfo_label text-sm font-light mb-[10px]">
              Email
            </div>
            <input
              placeholder="Enter your email address"
              autoComplete="on"
              className="form-control"
              defaultValue={profileData?.email || ''}
              name="email"
              {...userInfo("email", {
                required: true,
                pattern: /^\S+@\S+$/i,
              })}
            />
            <p className="form_error form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
              {errorUser?.email?.message}
            </p>
          </div>
          <div
            className={errorUser.phone ? "form_block has_error" : "form_block"}
          >
            <div className="userInfo_label text-sm font-light mb-[10px]">
              Phone
            </div>
            <InputMask
              {...userInfo("phone", { required: true })}
              placeholder="Enter Phone Number"
              type="tel"
              autoComplete="on"
              className="form-control"
              mask="(999)-999-999"
              value={phone || ''}
              onChange={(e) => {
                setPhone(e.target.value);
                userInfo("phone").onChange(e); 
              }}
            />
            <p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
              {errorUser?.phone?.message}
            </p>
          </div>
        </div>
        <div className='mt-[30px] text-2xl'>Delivery Address</div>
        <div className='userInfoForm'>
          <div className={errorUser?.address ? "form_block has_error" : "form_block"}>
            <div className="userInfo_label text-sm font-light mb-[10px]">
              Address
            </div>
            <input
              placeholder="Enter address"
              autoComplete="on"
              className="form-control"
              name="name"
              {...userInfo("address", { required: true })}
              defaultValue={profileData?.address || ''}
            />
            <p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
              {errorUser?.address?.message}
            </p>
          </div>
          <div className={errorUser?.postalCode ? "form_block has_error" : "form_block"}>
            <div className="userInfo_label text-sm font-light mb-[10px]">
              Postal Code
            </div>
            <input
              placeholder="Enter postalCode"
              autoComplete="on"
              className="form-control"
              name="name"
              {...userInfo("postalCode", { required: true })}
              defaultValue={profileData?.zip_code}
            />
            <p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
              {errorUser?.postalCode?.message}
            </p>
          </div>
          <div className={errorUser?.city ? "form_block has_error" : "form_block"}>
            <div className="userInfo_label text-sm font-light mb-[10px]">
              city
            </div>
            <input
              placeholder="Enter city"
              autoComplete="on"
              className="form-control"
              name="name"
              {...userInfo("city", { required: true })}
              defaultValue={profileData?.city || ''}
            />
            <p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
              {errorUser?.city?.message}
            </p>
          </div>
        </div>
        <div className='mt-[45px] text-2xl'>Payment Methods</div>
        <div className="flex justify-between items-center gap-[10px] mb-[30px] mt-[30px] max-w-fit" >
          {cardTypes.map((card, index) => (
            <span key={index} className="relative flex items-center justify-center">
              <Image
                src={card.src}
                alt={card.alt}
                priority={true}
                unoptimized={true}
                width={70}
                height={40}
              />
            </span>
          ))}

        </div>
      </form>
      <div className='cards_wrapper'>
        <div className='card_list'>
          {loading ? (
            <div className='card_block disabled_card_animation'></div>
          ) : (
            cards.map(card => (
              <div key={card.id} className='card_block'>
                <div className='card_image'>
                  <Image src={visa} alt="Card type" priority={true} unoptimized={true} width={60} height={30} />
                </div>
                <div className='card_number'>{card.number}</div>
                <div className='card_actions'>
                  <button onClick={() => { setSelectedCard(card); setPopupOpened(true); }}>edit <IconEdit /></button>
                  <button onClick={() => deleteCard(card.id)}>delete <IconRemoveCard /></button>
                  <div className="checkbox_line card_checkbox mt-[30px] mb-[30px]">
                    <label htmlFor={`checkbox-${card.id}`}>
                      <input type="checkbox" id={`checkbox-${card.id}`} checked={card.default === 1} onChange={() => setDefaultCard(card.id)} />
                      <span className="square_block"><IconChecked className='[&>path]:fill-black' /></span>
                      <span className="check_label">Make default</span>
                    </label>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className='add_card_btn' onClick={() => { setPopupOpened(true); setSelectedCard(null); }}>
          <IconAddCard className='w-[40px]' />
          <div className='card_number'>Add new card</div>
        </div>
        {
          popupOpened &&
          <div className='add_card_popup'>
            <div className='popup_inner'>
              <div className='popup_header'>
                <div className='popup_title'>
                  Add Payment
                </div>
                <div className='card_types'>
                  {cardTypes.map((card, index) => (
                    <label key={index} className="relative flex items-center justify-center">
                      <input
                        type="radio"
                        name="cardType"
                        value={card.value}
                        defaultChecked={index === 0}
                        className="absolute opacity-0 w-0 h-0"
                      />
                      <Image
                        src={card.src}
                        alt={card.alt}
                        priority={true}
                        unoptimized={true}
                        width={70}
                        height={40}
                      />
                    </label>
                  ))}
                </div>
              </div>
              <div className='popup_form'>
                <form onSubmit={handleCardSubmitForm(cardSave)} className="w-full">
                  <div className='cardInfoForm'>
                    <div className={errorCard?.cardNumber ? "form_block has_error" : "form_block"}>
                      <div className="cardInfo_label text-sm font-light">
                        Card Number*
                      </div>
                      <InputMask
                        {...cardInfo("cardNumber", { required: true })}
                        placeholder="Enter Card Number"
                        type="tel"
                        autoComplete="on"
                        name="cardNumber"
                        className="form-control"
                        mask="9999 9999 9999 9999"
                        value={cardNumber || ''}
                        onChange={(e) => {
                          setCardNumber(e.target.value);
                          userInfo("cardNumber").onChange(e);
                        }}
                      />
                      <p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
                        {errorCard?.cardNumber?.message}
                      </p>
                    </div>
                    <div className='inline_block'>
                      <div className={errorCard?.cardExperationDate ? "form_block has_error" : "form_block"}>
                        <div className="cardInfo_label text-sm font-light mb-[10px]">
                          Expiration Date*
                        </div>
                        <InputMask
                          {...cardInfo("cardExperationDate", { required: true })}
                          placeholder="Enter cardExperationDate"
                          type="tel"
                          autoComplete="on"
                          name="cardExperationDate"
                          className="form-control"
                          mask="99/99"
                          value={cardDate || ''}
                          onChange={(e) => {
                            setCardDate(e.target.value);
                            userInfo("cardExperationDate").onChange(e);
                          }}
                        />
                        <p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
                          {errorCard?.cardExperationDate?.message}
                        </p>
                      </div>
                      <div className={errorCard?.cardCvv ? "form_block has_error" : "form_block"}  >
                        <div className="cardInfo_label text-sm font-light mb-[10px]">
                          CVV
                        </div>
                        <input
                          placeholder="Enter your cardCvv address"
                          autoComplete="on"
                          className="form-control"
                          defaultValue={profileData?.cardCvv || ''}
                          name="cardCvv"
                          maxLength={3}
                          {...cardInfo("cardCvv", {
                            required: true,
                            pattern: /^\S+@\S+$/i,
                          })}
                        />
                        <p className="form_error form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
                          {errorCard?.cardCvv?.message}
                        </p>
                      </div>
                    </div>
                    <div className={errorCard?.cardName ? "form_block has_error" : "form_block"}  >
                      <div className="cardInfo_label text-sm font-light mb-[10px]">
                        Name od card*
                      </div>
                      <input
                        placeholder="Enter your cardName address"
                        autoComplete="on"
                        className="form-control"
                        defaultValue={profileData?.cardName || ''}
                        name="cardName"
                        {...cardInfo("cardName", {
                          required: true,
                          pattern: /^\S+@\S+$/i,
                        })}
                      />
                      <p className="form_error form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
                        {errorCard?.cardName?.message}
                      </p>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className={`w-[100px] card_save h-[40px] !duration-0 !bg-siteCrem !max-w-[100px] !text-black border site_btn mb-[10px] text-opacity-1 [&>svg]:opacity-0 ${loading && "[&>svg]:opacity-100 pointer-events-none opacity-80 !text-opacity-0"}`}
                  >
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="absolute inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
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
                    {loading ? " " : " Add"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
}
