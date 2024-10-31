import about1 from '@/public/images/about1.png';
import about2 from '@/public/images/about2.png';
import blog3 from '@/public/images/blog3.png';
import Image from 'next/image';

async function About() {

  // About Data Fetching
  // const res = await fetch(process.env.NEXT_PUBLIC_DATA_API + '/about-us', { cache: 'no-cache' })
  // const { data } = await res.json()

  return (
    <div className=' !mt-[120px] !min-h-[100vh] mobile:!mt-[150px]'>
      <div className='relative w-full about_bg h-[590px] flex items-center  justify-center'>
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
          <div className='max-w-[740px] text-center text-xl mx-auto text-siteCrem mt-[30px]'>
          The story of the Marlenka honey cakes is closely connected with its founder Gevorg Avetisyan, who came to the Czech Republic, specifically to Frýdek-Místek, from Armenia in 1995. The story of his life is a story of the miracle from honey, the story of MARLENKA.
          </div>
          </div>
      </div>
      <div className='custom_container'>
        <div className='blog_list'>
          <div className='blog_block'>
            <div className='blog_line'>
              <div className='blog_info'>
                <div className='blog_title'>OUR STORY</div>
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
                    priority
                    className='object-cover'
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='blog_block'>
            <div className='blog_line'>
              <div className='blog_info'>
                <div className='blog_title'>OUR STORY</div>
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
                    priority
                    className='object-cover'
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='blog_block'>
            <div className='blog_line'>
              <div className='blog_info'>
                <div className='blog_title'>OUR STORY</div>
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
                    priority
                    className='object-cover'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default About;