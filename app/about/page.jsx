import about1 from '@/public/images/about1.png';
import about2 from '@/public/images/about2.png';
import about5 from '@/public/images/about5.png';
import about6 from '@/public/images/about6.png';
import about7 from '@/public/images/about7.png';
import blog3 from '@/public/images/blog3.png';
import Image from 'next/image';
import Link from 'next/link';

async function About() {

  // About Data Fetching
  const res = await fetch(process.env.NEXT_PUBLIC_DATA_API + '/getAboutUsData', { cache: 'no-cache' })
  const { data } = await res.json()

  return (
    <div className=' !mt-[120px] !min-h-[100vh] mobile:!mt-[150px]'>
      <div className='relative w-full about_bg h-[590px] laptopHorizontal:h-[450px] laptop:h-[400px] flex items-center  justify-center'>
        <Image
          src={about1}
          alt='about-1'
          unoptimized
          fill
          className='object-cover'
          priority
        />
        <div className='about_content z-[99] absolute pt-[50px]'>
          <Image
            src={about2}
            alt='about-2'
            unoptimized
            width={306}
            height={150}
            className='object-contain mx-auto'
            priority
          />
          <div className='max-w-[740px] text-center text-xl mx-auto text-siteCrem mt-[30px] laptop:p-20 tablet:text-base mobile:mt-[10px]'>
            The story of the Marlenka honey cakes is closely connected with its founder Gevorg Avetisyan, who came to the Czech Republic, specifically to Frýdek-Místek, from Armenia in 1995. The story of his life is a story of the miracle from honey, the story of MARLENKA.
          </div>
        </div>
      </div>
      <div className='custom_container'>
        <div className='blog_list'>
          <div className='blog_block'>
            <div className='blog_line'>
              <div className='blog_info'>
                <div className='blog_title'><span className='text-[#B62025]'>OUR</span> STORY</div>
                <div className='blog_desc'>
                  The story of MARLENKA begins in 2003. Back then, a small business with
                  just one employee was established. Currently, the MARLENKA products are
                  exported to 44 countries and their unique taste has won countless
                  lifetime customers all over the world.
                </div>
              </div>
              <div className='blog_image'>
                <div className='relative'>
                  <Image
                    src={blog3}
                    alt='blog-3'
                    fill
                    unoptimized
                    priority
                    className='object-cover'
                  />
                </div>
              </div>
            </div>
          </div>
          {data.aboutUsData && data.aboutUsData.map((item, index) => (
            <div className='blog_block' key={index}>
              <div className='blog_line'>
                <div className='blog_info'>
                  <div className='blog_title text-[#B62025]'>{item.title}</div>
                  <div className='blog_desc'>
                    {item.description}
                  </div>
                </div>
                <div className='blog_image'>
                  <div className='relative'>
                    <Image
                      src={process.env.NEXT_PUBLIC_DATA + item.image_path}
                      alt='blog-3'
                      fill
                      unoptimized
                      priority
                      className='object-cover'
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='pt-[40px]'>
          <div className='text-[32px] uppercase text-[#B62025]'>Achievements</div>
          <div className='mt-[40px] text-base max-w-[1100px]' >We continue to develop, modernize our technologies and production lines, and innovate our products. At the end of the day we are awarded with the fact that you like our products, but also with actual prizes at prestigious competitions in the Czech Republic and abroad.</div>
          <div className='grid grid-cols-3 gap-[45px]  tablet:grid-cols-1 mt-[60px] laptop:gap-[20px]'>
            <div>
              <div className='relative h-[288px] laptop:h-[200px] rounded-[10px] overflow-hidden'>
                <Image
                  src={about5}
                  alt='about-5'
                  fill
                  className='object-cover'
                  priority
                />
              </div>
              <div className='text-xl mt-[25px]  laptop:text-base  font-medium'>Aznavour Foundation Award</div>
            </div>
            <div>
              <div className='relative h-[288px] laptop:h-[200px] rounded-[10px] overflow-hidden'>
                <Image
                  src={about6}
                  alt='about-6'
                  fill
                  className='object-cover'
                  priority
                />
              </div>
              <div className='text-xl mt-[25px]  laptop:text-base  font-medium'>Award from the President of the Czech Republic</div>
            </div>
            <div>
              <div className='relative h-[288px] laptop:h-[200px] rounded-[10px] overflow-hidden'>
                <Image
                  src={about7}
                  alt='about-7'
                  fill
                  className='object-cover'
                  priority
                />
              </div>
              <div className='text-xl mt-[25px]  laptop:text-base  font-medium'>MARLENKA wins two more awards</div>
            </div>
          </div>
          <div className='flex items-center justify-center my-[60px]'>
            <Link href="/awards" className='site_btn mx-auto'>Archived Awards</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
export default About;