import Image from "next/image";
import awards1 from '@/public/images/awards1.png'

async function Awards() {

  // About Data Fetching
  // const res = await fetch(process.env.NEXT_PUBLIC_DATA_API + '/about-us', { cache: 'no-cache' })
  // const { data } = await res.json()

  return (
    <div className='!mt-[120px] !min-h-[100vh] mobile:!mt-[150px]'>
      <div className=' text-2xl uppercase bg-siteCrem '>
        <div className='custom_container text-center mx-auto justify-center h-[120px] laptopHorizontal:h-[80px] laptopHorizontal:text-base  flex items-center  text-[#B62025] font-medium'>
          AWARDS
        </div>
      </div>
      <div className="custom_container awards_secton">
        <div className="py-[40px]">
          <div className="mt-[20px] flex items-center gap-[30px]">
            <span>
              <Image
                src={awards1}
                alt="Ricardo portrait"
                priority={true}
                unoptimized={true}
                className="object-contain"
              />
            </span>
            <span>
              <Image
                src={awards1}
                alt="Ricardo portrait"
                priority={true}
                unoptimized={true}
                className="object-contain"
              />
            </span>
          </div>
          <div className="awards_history">
            <div className="year_block">
              <div className="awards_year text-xl text-[#AE8839]">2008</div>
              <div className="awards_title mt-[20px] text-[#525252] text-base ">The First <span>KLASA</span> national quality cerificate</div>
              <ul className="awards_inner_list">
                <li> Gevorg Avetisjan – <span> Special award of the jury EY Businessman of the Czech Republic</span></li>
              </ul>
            </div>
            <div className="year_block">
              <div className="awards_year text-xl text-[#AE8839]">2009</div>
              <div className="awards_title mt-[20px] text-[#525252] text-base ">The First <span>KLASA</span> national quality cerificate</div>
              <ul className="awards_inner_list">
                <li> Gevorg Avetisjan – <span> Special award of the jury EY Businessman of the Czech Republic</span></li>
              </ul>
            </div>
            <div className="year_block">
              <div className="awards_year text-xl text-[#AE8839]">2010</div>
              <div className="awards_title mt-[20px] text-[#525252] text-base ">The First <span>KLASA</span> national quality cerificate</div>
              <ul className="awards_inner_list">
                <li> Gevorg Avetisjan – <span> Special award of the jury EY Businessman of the Czech Republic</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Awards;