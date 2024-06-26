import axios from 'axios';
import { ExternalLink, Facebook, Github, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';
import { Button } from '../ui/button';

const Hero = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState('');

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
    <div className='w-full'>
      {error ? (
        <div className='text-red-500'>
          <p>Error: {error}</p>
        </div>
      ) : (
        <>
          <div className='flex items-center gap-2 mb-2'>
            <span className='bg-green-400 rounded-full h-2 w-2'></span>
            <p>Online</p>
          </div>
          <h2 className='overflow-x-hidden text-[1.3rem] sm:text-[1.7rem] md:text-[2.2rem] lg:text-[2.8rem] tracking-[2px] mb-4'>Hi, I'm {user.fullName}</h2>
          <h2 className='text-tubeLight-effect overflow-x-hidden text-[1.3rem] sm:text-[1.7rem] md:text-[2.2rem] lg:text-[2.8rem] tracking-[15px]'>
          <Typewriter words={['FULLSTACK DEVELOPER', "WORDPRESS DEVELOPER", "MERN DEVELOPER"]} loop={50} cursor typeSpeed={70} deleteSpeed={70} delaySpeed={100}/>
          </h2>
            </>
      )}
        <div className='w-fit px-5 py-2 bg-slate-50 rounded-[20px] flex gap-5 items-center mt-4 md:mt-10'>
          <Link to={'/'} target='_blank'><Youtube className='text-red-500 w-7 h-7'/></Link>
          <Link to={user.instagramURL} target='_blank' className='text-pink-500 w-7 h-7'><Instagram/></Link>
          <Link to={user.facebookURL} target='_blank' className='text-blue-800 w-7 h-7'><Facebook/></Link>
          <Link className='text-sky-500 w-7 h-7' to={user.linkedInURL}><Linkedin/></Link>
          <Link to={'/'} target='_blank' className='text-blue-600 w-7 h-7'><Twitter/></Link>
         
          </div>
          <div className='mt-4 md:mt-8 lg:mt-10 flex gap-3'>
          <Link to={user.githubURL} target='_blank' className='text-yellow-600 w-7 h-7'>
          <Button className='rounded-[30px] flex items-center gap-2 flex-row'>
          <span><Github/></span>
          <span>Github</span>
          </Button>
          </Link>
          <Link to={user.resume && user.resume.url} target='_blank' className='text-yellow-600 w-7 h-7 ms-20'>
          <Button className='rounded-[30px] flex items-center gap-2 flex-row'>
          <span><ExternalLink/></span>
          <span>Resume</span>
          </Button>
          </Link>
          </div>
          <p className='mt-8 text-xl tracking-[2px]'>{user.aboutMe}</p>
          <hr  className='my-8 md:my-10'/>
    </div>
  );
};
export default Hero;
