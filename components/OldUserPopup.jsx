'use client'
import IconChecked from '@/public/icons/IconChecked';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

function OldUserPopup() {

  const [isOldUser, setIsOldUser] = useState(false);
  const [activeBtn, setActiveBtn] = useState(false);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      if (user.is_show === 0) {
        setIsOldUser(true)
        document.body.style.overflow = "hidden";
      }
    }
  }, [user])

  const handleActiveChange = (e) => {
    if (e.target.checked) {
      setActiveBtn(true)
    } else {
      setActiveBtn(false)
    }
  }

  const contactsSubmit = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_DATA_API + '/acceptShowModal', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
      }
    });
    if (response.ok) {
      console.log('true');
    } else {
      console.error('Submission failed');
    }
  };

  const handlePopupAction = () => {
    if (activeBtn) {
      contactsSubmit()
      document.body.style.overflow = "visible";
      setIsOldUser(false)
    }
  }

  if (!user || !isOldUser) {
    return null
  }

  return (
    <div className='old_user_popup'>
      <div className='popup_container'>
        <div className='popup_title'>
          Welcome to the <span className='text-[#A8894A]'>NEW</span> Marlenka.us!
        </div>
        <div className='popup_desc'>
          We’re thrilled to unveil our redesigned website, crafted to serve you better with enhanced features and improved functionality.
          <br />
          <br />
          <b>Need a copy of your user history from the old website?</b>
          <br />
          Rest assured, all your activities and history from our previous website are securely saved? Simply reach out to us, and we’ll email you a detailed PDF!
          <br />
          <br />
          <br />
          <span className='text-[#A9271C]'>Enjoy exploring the new Marlenka.us experience!</span>
        </div>
        <div className='relative'>
          <div className="old_popup_checkbox checkbox_line mt-[30px] mb-[30px]">
            <label htmlFor="checkbox5">
              <input type="checkbox" onChange={handleActiveChange} id="checkbox5" />
              <span className="square_block"><IconChecked className='[&>path]:fill-white' /></span>
              <span className="check_label ">I have a read and understood the above notification</span>
            </label>
          </div>
        </div>
        <button onClick={handlePopupAction} className={`${activeBtn && 'active'} popup_btn`}>Close</button>
      </div>
    </div>
  )
}

export default OldUserPopup