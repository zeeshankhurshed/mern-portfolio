import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');
  const [viewAll, setViewAll] = useState(false);
  useEffect(() => {
    const getMyProjects = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/vi/project/getAll",
          { withCredentials: true }
        );
        setProjects(data.projects);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching projects:", err);
      }
    };
    getMyProjects();
  }, []);
  return (
    <div className='p-6'>
      <div className='relative mb-12'>
        <h2 className='hidden sm:flex gap-4 items-center text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] tracking-[15px] mx-auto w-fit font-extrabold' style={{background: "hsl(222.2 84% 4.9%)"}}>
          My
          <span className='text-tubeLight-effect font-extrabold'>PORTFOLIO</span>
        </h2>
        <h2 className='flex sm:hidden gap-4 items-center text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] tracking-[15px] mx-auto w-fit font-extrabold' style={{background: "hsl(222.2 84% 4.9%)"}}>
          My
          <span className='text-tubeLight-effect font-extrabold'>WORK</span>
        </h2>
        <span className='absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200'></span>
      </div>
      {error && <p className='text-red-500'>Error: {error}</p>}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {viewAll ? projects.map((element) => (
          <Link key={element._id} to={`/project/${element.id}`}>
            <img src={element.projectBanner?.url} alt='project banner' className='w-full h-48 object-cover'/>
            <h3 className='mt-2 text-lg font-semibold'>{element.title}</h3>
          </Link>
        )) : projects.slice(0, 6).map((element) => (
          <Link key={element._id} to={`/project/${element.id}`}>
            <img src={element.projectBanner?.url} alt='project banner' className='w-full h-48 object-cover'/>
            <h3 className='mt-2 text-lg font-semibold'>{element.title}</h3>
          </Link>
        ))}
      </div>
      <div className='text-center mt-8'>
        <button onClick={() => setViewAll(!viewAll)} className='bg-blue-500 text-white px-4 py-2 rounded-md'>
          {viewAll ? 'Show Less' : 'View All'}
        </button>
      </div>
    </div>
  )
}

export default Portfolio;
