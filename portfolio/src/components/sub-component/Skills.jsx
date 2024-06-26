import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card } from '../ui/card';

const Skills = () => {
  const [skills,setSkills]=useState([]);

  useEffect(() => {
    const getMySkills = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/vi/skill/getAll",
          { withCredentials: true }

        );
          setSkills(data.skills);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching skills:", err);
      }
    };
    getMySkills();
  }, []);
  return (
    <div className='w-full flex flex-col gap-8 sm:gap-8'>
      <h2 className='text-tubeLight-effect overflow-x-hidden text-[1.3rem] sm:text-[1.7rem] md:text-[2.2rem] lg:text-[2.8rem] tracking-[15px] flex justify-center font-bold dancing_text'>
        Skills
        </h2>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
        {
          skills && skills.map(element=>{
            return (
              <Card className='h-fit p-7 flex flex-col justify-center items-center gap-3' key={element._id}>
                  <img src={element.svg && element.svg.url}
                   alt={element.title}
                   className='h-12 sm:h-24 w-auto'
                   />
                   <p className='text-muted-foreground text-center'>{element.title}</p>
              </Card>
            )
          })
        }
      
        </div>
    </div>
  )
}

export default Skills
