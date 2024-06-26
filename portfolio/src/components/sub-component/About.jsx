import axios from 'axios';
import React, { useEffect, useState } from 'react'

const About = () => {
  const [user,setUser]=useState({});
  useEffect(() => {
    const getMyProfile = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/vi/user/me/portfolio",
          { withCredentials: true }
        );
        // console.log(data);
        setUser(data.user);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching profile:", err);
      }
    };
    getMyProfile();
  }, []);
  return (
    <div className='w-full flex flex-col overflow-x-hidden'>
      <div className='relative'>
      <h2 className='flex gap-4 items-center text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8re] leading-[56px] md:leading-[67px] lg:leading-[90px] tracking-[15px] mx-auto w-fit font-extrabold' style={{background:"hsl(222.2 84% 4.9%"}}>
        ABOUT
        <span className='text-tubeLight-effect font-extrabold'>ME</span>
      </h2>
      <span className='absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200'></span>
      </div>
      <div>
        <div className='grid md:grid-cols-2 my-8 sm:my-20 gap-14'> 
        <div className='flex justify-center items-center'>
        <img src={user.avatar && user.avatar.url} alt={user.fullName} className='bg-white p-2 sm:p-4 rotate-[30deg] h-[240px] sm:h-[340px] md:h-[350px] lg:h-[450px] ' />
        </div>
        <div className='flex justify-center flex-col tracking-[1px] text-xl gap-5 '>
        <p>Hello! My name is Zeeshan. I hold a degree in web development and have a passion for creating dynamic, user-friendly websites. When I'm not coding, I enjoy watching movies and series, experimenting with welding projects, and occasionally whipping up delicious meals in the kitchen. I'm always eager to learn new things and take on exciting challenges. Nice to meet you!</p>
        </div>
        </div>
        <p className='tracking-[1px] '>
        My dedication and perseverance in delivering work on time are integral to who I am. I consistently maintain the courage to face any challenge, no matter how long it takes.
        </p>
      </div>
    </div>
  )
}

export default About
