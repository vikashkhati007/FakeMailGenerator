import React from 'react';

const Page = () => {
  return (
    <div className='w-full h-screen bg-[#0099FF] flex justify-center items-center'>
      <div className="mailboxcontainer w-[80%] bg-white h-[80%] rounded-2xl overflow-y-scroll overflow-x-hidden shadow-md custom-scrollbar p-2">
        <div className="fromcontainer m-5">
          <span className='text-sm opacity-70 font-medium'>From: gamerworld471@gmail.com</span>
        </div>
        <hr></hr>
        <div className="fromcontainer m-5">
          <span className='text-md opacity-70 font-medium'>Subject: Your OTP</span>
        </div>
        <hr></hr>
        <div className="fromcontainer m-5">
          <span className='text-lg opacity-70 font-medium'>Body: Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates nobis sit a placeat atque possimus labore magnam ullam consectetur nemo asperiores nam amet adipisci repudiandae, sequi architecto saepe enim odit dolorum eveniet quae modi sunt nesciunt natus. Tempora, eligendi placeat veniam porro dolor consequuntur, earum fugiat eaque, assumenda consequatur iusto!</span>
        </div>
      </div>
    </div>
  );
}

export default Page;
