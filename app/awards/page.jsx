import Image from "next/image";
import awards1 from '@/public/images/awards1.png'
import awards2 from '@/public/images/awards2.png'
import awards3 from '@/public/images/awards3.png'
import awards4 from '@/public/images/awards4.png'
import awards5 from '@/public/images/awards5.png'
import awards6 from '@/public/images/awards6.png'

async function Awards() {

  // About Data Fetching
  const res = await fetch(process.env.NEXT_PUBLIC_DATA_API + '/getAwards', { cache: 'no-cache' })
  const { data } = await res.json()

  return (
    <div className='!mt-[120px] !min-h-[100vh] mobile:!mt-[150px]'>
      <div className=' text-2xl uppercase bg-siteCrem '>
        <div className='custom_container text-center mx-auto justify-center h-[120px] laptopHorizontal:h-[80px] laptopHorizontal:text-base  flex items-center  text-[#B62025] font-medium'>
          AWARDS
        </div>
      </div>
      <div className="custom_container awards_secton">
        <div className="py-[40px]">
          <div className="mt-[20px] awards_images flex tablet:grid tablet:grid-cols-3 mobile:grid-cols-2 tablet:items-center items-cente justify-between gap-[30px]">
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
                src={awards2}
                alt="Ricardo portrait"
                priority={true}
                unoptimized={true}
                className="object-contain"
              />
            </span>
            <span>
              <Image
                src={awards3}
                alt="Ricardo portrait"
                priority={true}
                unoptimized={true}
                className="object-contain"
              />
            </span>
            <span>
              <Image
                src={awards4}
                alt="Ricardo portrait"
                priority={true}
                unoptimized={true}
                className="object-contain"
              />
            </span>
            <span>
              <Image
                src={awards5}
                alt="Ricardo portrait"
                priority={true}
                unoptimized={true}
                className="object-contain"
              />
            </span>
            <span>
              <Image
                src={awards6}
                alt="Ricardo portrait"
                priority={true}
                unoptimized={true}
                className="object-contain"
              />
            </span>
          </div>
          <div className="awards_history">

            {data.awards && data.awards.map((item, index) => (
              <div className="year_block" key={index}>
                <div className="awards_year text-xl text-[#AE8839]">{item.title}</div>
                <div className="awards_title mt-[20px] text-[#525252]"  
                dangerouslySetInnerHTML={{ __html:  item.description }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Awards;