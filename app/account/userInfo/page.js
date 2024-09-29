'use client';
import userImg from '@/public/images/userImg.png';
import Image from 'next/image';
import { userScheme } from '@/validation/userScheme';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputMask from "react-input-mask";
import { useSelector } from 'react-redux';

export default function UserInfoPage() {


  const { status } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth.user);

  //validation init
  const { register: userInfo, handleSubmit: handleSubmitForm, formState: { errors: errorUser } } = useForm({
    resolver: zodResolver(userScheme)
  });

  //sumbition Data
  const userInfoSubmit = async (dataForm) => {
    console.log('dataForm', dataForm);
  };

  console.log('user' , user);
  

  return (
    <div className='user_wrapper w-full'>
      <div className='flex gap-[30px] items-center'>
        <div className='relative'>
          <Image
            src={userImg}
            alt="User Image"
            priority={true}
          />
        </div>
        <div>
          <div className='text-[18px] color-black font-medium'>Name Surname</div>
          <div className='text-sm font-light mt-[2px] text-[#949494]'>Yerevan, Armenia</div>
        </div>
      </div>
      <div className='mt-[30px] text-xl text-black'>
        Personal Information
      </div>

      <form onSubmit={handleSubmitForm(userInfoSubmit)} className="w-full">
        <div className='grid grid-cols-3 gap-[30px] userInfoForm'>
        <div className={errorUser?.namefirst ? "form_block has_error" : "form_block"}>
          <div className="userInfo_label text-base font-light mb-[10px]">
            Name
          </div>
          <input
            placeholder="Enter name"
            autoComplete="on"
            defaultValue={user?.name.split(' ')[0]}
            className="form-control"
            name="name"
            {...userInfo("namefirst", { required: true, minLength: 5 })}
          />
          <p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
            {errorUser?.namefirst?.message}
          </p>
        </div>
        <div className={errorUser?.surname ? "form_block has_error" : "form_block"}>
          <div className="userInfo_label text-base font-light mb-[10px]">
            Surname
          </div>
          <input
            placeholder="Enter surname"
            autoComplete="on"
            defaultValue={user?.name.split(' ')[1]}
            className="form-control"
            name="name"
            {...userInfo("surname", { required: true, minLength: 5 })}
          />
          <p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
            {errorUser?.surname?.message}
          </p>
        </div>
        <div className={errorUser?.email ? "form_block has_error" : "form_block"}  >
          <div className="userInfo_label text-base font-light mb-[10px]">
            Email
          </div>
          <input
            placeholder="Enter your email address"
            autoComplete="on"
            className="form-control"
            defaultValue={user?.email}
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
          <div className="userInfo_label text-base font-light mb-[10px]">
            Phone
          </div>
          <InputMask
            {...userInfo("phone", { required: true })}
            placeholder="Enter your password"
            type="tel"
            autoComplete="on"
            className="form-control"
            value={user?.phone}
            mask="(999)-999-9999"

          />
          <p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
            {errorUser?.phone?.message}
          </p>
        </div>
        <div className={errorUser?.address ? "form_block has_error" : "form_block"}>
          <div className="userInfo_label text-base font-light mb-[10px]">
            Address
          </div>
          <input
            placeholder="Enter address"
            autoComplete="on"
            className="form-control"
            name="name"
            {...userInfo("address", { required: true, minLength: 5 })}
          />
          <p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
            {errorUser?.address?.message}
          </p>
        </div>
        <div className={errorUser?.postalCode ? "form_block has_error" : "form_block"}>
          <div className="userInfo_label text-base font-light mb-[10px]">
            Postal Code
          </div>
          <input
            placeholder="Enter postalCode"
            autoComplete="on"
            className="form-control"
            name="name"
            {...userInfo("postalCode", { required: true, minLength: 5 })}
          />
          <p className="form_error text-xs absolute right-0 text-siteRed font-semibold duration-300 opacity-0">
            {errorUser?.postalCode?.message}
          </p>
        </div>
        </div>
        <button
          type="submit"
        className={
          status === 'loading'
            ? " mt-[35px] max-w-fit min-w-[160px] px-[30px] !opacity-50 pointer-events-none [&>svg]:opacity-100 relative submit_btn h-[40px] w-full bg-siteCrem text-base font-semibold text-white duration-300 hover:opacity-70 ml-auto justify-center flex items-center"
            : " mt-[35px] max-w-fit min-w-[160px] px-[30px] relative [&>svg]:opacity-0 submit_btn h-[40px] w-full bg-siteCrem text-base font-semibold text-white duration-300 hover:opacity-70 ml-auto justify-center flex items-center"
        }
        >
          <svg
            aria-hidden="true"
            role="status"
            className="absolute left-[-calc(50%-60px)] inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
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
          {status === 'loading' ? " " : " Save Changes"}
        </button>
      </form>

    </div>
  );
}
