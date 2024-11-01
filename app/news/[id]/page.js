
import React from 'react';

// async function fetchSingleNews(id) {
//   const res = await fetch(`https://api.thenewsapi.com/v1/news/uuid/${id}?api_token=${API_TOKEN}`);
//   if (!res.ok) {
//     throw new Error('Failed to fetch news');
//   }
//   return res.json();
// }

const SingleNews = async ({ params }) => {
  // const newsArticle = await fetchSingleNews(params.id);

  return (
    <div className='mt-[120px] news_page'>
      {/* <div className=' text-2xl uppercase bg-siteCrem '>
        <div className='custom_container text-center mx-auto justify-center h-[120px] laptopHorizontal:h-[80px] laptopHorizontal:text-base  flex items-center  text-[#B62025] font-medium'>
          Latest News
        </div>
      </div>
      <div className='custom_container'>
        <div className="space-y-16 mt-[50px]">
          <p className=" text-center text-neutral-300 text-xs font-medium text-[#BEBEBE]">
            February 18, 2020
          </p>
          <h1 className="text-3xl text-center pt-[15px] max-w-[550px] mx-auto">
            2018 EY Entrepreneur Of The Year Award in Czech Republic
          </h1>
          <div className="flex items-center space-x-11">
            <div className="h-96 w-[562px] shrink-0 bg-center bg-cover" >
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube Video"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                }}
              />
            </div>
            <div className="h-96 w-[561px] shrink-0 bg-center bg-cover" />
          </div>
          <p className="ml-4 font-medium leading-normal pb-[50px]">
            7. March 2019, 08:45 | Owner of MARLENKA international s.r.o. was
            nominated among the 5 finalists of the international
            competition of 2018 EY Entrepreneur of the Year of the Czech
            Republic. In the gala evening in the Slovanský dům, the Special
            Jury Prize for Business Inspiration of the Decade was
            awarded to him by an expert jury.
            <br />
            <br />
            After many years, the main jury decided to award a special prize
            again, this time for business inspiration of the decade, for
            Gevorg Avetisjan, the founder and owner of MARLENKA international
            s.r.o. In 2013 and 2014, Gevorg Avetisjan was awarded the
            title of Regional Winner and Best EY Entrepreneur of the
            Moravian-Silesian Region, and this year he was also among the
            finalists of the competition.
            <br />
            <br />
            “This award means a lot to me. It gives me a feeling of even
            greater responsibility, incentive to continue our work and produce
            more products, thanks to which we can continue to promote the
            town of Frýdek-Místek and the Czech Republic“, said Gevorg
            Avetisjan from MARLENKA international s.r.o., the
            winner of the Jury Prize for Business Inspiration of the Decade.
            <br />
            <br />
            The nineteenth annual EY Entrepreneur Of The Year competition
            presented a number of prominent entrepreneurial characters who are
            inspiring not only for their surroundings but also for
            beginners or established entrepreneurs. “Through honest work and
            effort, courage to take a risk and to innovate,
            thanks to all-society responsibility and employee care approach
            they are models for all of us. This year, the main jury of the
            competition has awarded six regional titles and one special
            prize“, says Magdalena Souček, EY’s leading partner in the Czech
            Republic and in the Central and Southeast European region.
            <br />
            <br />
            This year, the main jury decided to award a special
            prize to Gevorg Avetisjan, the owner and founder of MARLENKA
            International s.r.o. for business inspiration of the
            decade. By his life story, Gevorg Avetisjan proves that everyone
            has a chance to change his or her life – to take root in a foreign
            country, to find a new home, but also not to be afraid to trust
            your idea to start a business from scratch and build a successful
            and internationally renowned company. His business intention came
            into being in his head by coincidence when his sister arrived from
            Armenia and baked a honey cake according to an old family recipe.
            The honey delicacy, which he named after his mother and daughter,
            was quickly popularized by all his friends and Avetisjan’s sister
            was not able to bake enough of them. Therefore, he bought
            second-hand equipment, rented small premises, and the company
            Marlenka international was established in 2003. Today, Gevorg’s
            Marlenka employs 265 people and has an annual turnover of almost
            CZK 600 million. The flagship of the company is still the Marlenka
            honey cake, of which they normally produce around 50,000 pieces
            per week. The overall assortment includes more than 30 products.
            All production takes place at the factory in Frýdek-Místek and
            Marlenka company exports to 43 countries all over the world
            including China, the USA or the entire Arabian
            Peninsula. A third of the production remains in the Czech
            Republic. The secret of the success of these honey products made
            according to the family recipe is an exceptional taste, high
            quality and almost impossible durability, while the only
            preservative is the best-quality honey. In 2018, they
            produced a total of 8 million products. For the future, Avetisjan
            plans not only to recruit new employees and launch new products,
            but also to build a larger production hall and a network of cafes.
            For this he was inspired, among other things, by the
            success of his own tourist center within the Marlenka premises.
            Marlenka is more than just a business for him, not only
            because he still manufactures his products according to the family
            recipes. He is proud of the opportunity he has received in the
            Czech Republic and of being able to successfully represent this
            country in the world by this high-quality Czech-Armenian
            product. He believes that someday his son will take over the
            company and will lead it in the same spirit.
          </p>
        </div>
      </div> */}
    </div>
  );
};

export default SingleNews;