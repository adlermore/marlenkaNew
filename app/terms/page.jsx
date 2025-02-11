async function Terms() {

  // About Data Fetching
  const res = await fetch(process.env.NEXT_PUBLIC_DATA_API + '/getTerm', { cache: 'no-cache' })
  const { data } = await res.json()
  
  return (
    <div className=' !mt-[120px] !min-h-[100vh] mobile:!mt-[150px]'>
      <div className=' text-2xl uppercase bg-siteCrem '>
        <div className='custom_container text-center mx-auto justify-center h-[120px] laptopHorizontal:h-[80px] laptopHorizontal:text-base  flex items-center  text-[#B62025] font-medium'>
        Terms and Conditions
        </div>
      </div>
      <div className=" custom_container">
      <div className="py-[40px]"
          dangerouslySetInnerHTML={{ __html:  data.term[0].description }} 
        />
      </div>
    </div>
  )
}
export default Terms;