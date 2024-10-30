'use client'
import React , { useEffect, useState } from 'react';

function Faq() {

  const [activeIndex, setActiveIndex] = useState(null);
  const [faqData, setFaqData] = useState([]); 

  const getFaqData = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_DATA_API}/getFAQ`);
    const data = await response.json();
    return data;
  };

  useEffect(()=>{
      const fetchData = async () => {
      const data = await getFaqData();
      console.log('Fetched FAQ Data:', data.data);
      setFaqData(data.data); 
    };
    
    fetchData();
  },[])

  const faqs = [
    {
      question: "How soon will we receive our cakes?",
      answer: "We use UPS ground shipping which usually takes 2 to 4 business days, taking into consideration that there is no delivery on Saturdays and Sundays."
    },
    {
      question: "Can we customize our cake?",
      answer: "Yes, we offer customization options for all our cakes. Please contact us for details."
    },
    {
      question: "What ingredients do you use?",
      answer: "We use high-quality ingredients sourced locally. Please check our website for a full list of ingredients."
    }
  ];

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };


  return (
    <div className=' !mt-[120px] !min-h-[5s0vh] mobile:!mt-[150px]'>
      <div className=' text-2xl uppercase bg-siteCrem '>
        <div className='custom_container uppercase text-center mx-auto justify-center h-[120px] laptopHorizontal:h-[80px] laptopHorizontal:text-base  flex items-center  text-[#B62025] font-medium'>
          Faq
        </div>
      </div>
      <div className=" custom_container">
        <div className="py-[40px]">
          <div className="uppercase text-2xl text-center">Frequently Asked Qustions</div>
          <div className="faq_list">
            {faqs.map((faq, index) => (
              <div key={index} className={`faq_block ${activeIndex === index ? 'active' : ''}`}>
                <div className="faq_btn" onClick={() => handleToggle(index)}>
                  <div className="faq_title">{faq.question}</div>
                  <span>{activeIndex === index ? '-' : '+' }</span>
                </div>
                {activeIndex === index && (
                  <div className="faq_description">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Faq;