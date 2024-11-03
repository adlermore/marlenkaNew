

const SingleNews = async ({ params }) => {

  const res = await fetch(process.env.NEXT_PUBLIC_DATA_API + `/getNews`, { cache: 'no-cache' })
  const { data } = await res.json()

  const news = data?.newses.find(item => item.id === Number(params.id));
  const youtubeCodes = news.youtube_codes.split(',').map(code => code.trim());

  return (
    <div className='mt-[120px] news_page mobile:mt-[150px]'>
      <div className=' text-2xl uppercase bg-siteCrem '>
        <div className='custom_container text-center mx-auto justify-center h-[120px] laptopHorizontal:h-[80px] laptopHorizontal:text-base  flex items-center  text-[#B62025] font-medium'>
          Latest News
        </div>
      </div>
      <div className='custom_container'>
        <div className="space-y-16 mt-[50px] laptop:mt-[30px] laptop:space-y-[20px]">
          <p className=" text-center text-neutral-300 text-xs font-medium text-[#BEBEBE]">
            {news.created_at.split('T')[0]}
          </p>
          <h1 className="text-3xl text-center pt-[15px] max-w-[550px] mx-auto">
            {news.title}
          </h1>
          <div className="grid grid-cols-2 space-x-11 youtuble_line !mt-[80px] laptop:!mt-[40px] tablet:grid-cols-1">
            {youtubeCodes.slice(0,2).map((code, index) => (
              <div key={index} className="h-96 laptop:h-[350px] w-full bg-center margin-0 bg-cover relative" >
                <iframe
                  key={index}
                  src={`https://www.youtube.com/embed/${code}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="YouTube Video"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    margin: 0,
                    padding :0,
                    height: '100%',
                  }}
                />
              </div>
            ))}
          </div>
          <div className="!my-[50px]" dangerouslySetInnerHTML={{ __html: news.long_description}} />
        
        </div>
      </div>
    </div>
  );
};

export default SingleNews;