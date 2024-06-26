import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card } from '../ui/card';

const MyApps = () => {
  const [apps, setApps] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const getMyApps = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/vi/softwareApplication/getAll",
          { withCredentials: true }
        );
        // console.log(data);
        setApps(data.application);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching apps:", err);
      }
    };
    getMyApps();
  }, []);

  return (
    <div className='w-full flex flex-col gap-8 sm:gap-8 p-6'>
      <h2 className='text-tubeLight-effect overflow-x-hidden text-[1.3rem] sm:text-[1.7rem] md:text-[2.2rem] lg:text-[2.8rem] tracking-[15px] flex justify-center font-bold dancing_text'>
        My Apps
      </h2>

      {error && <p className='text-red-500'>Error: {error}</p>}

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
        {
          apps && apps.map(element => (
            <Card className='h-fit p-7 flex flex-col justify-center items-center gap-3' key={element._id}>
              <img 
                src={element.svg && element.svg.url}
                alt={element.name}
                className='h-12 sm:h-24 w-auto'
              />
              <p className='text-muted-foreground text-center'>{element.title}</p>
            </Card>
          ))
        }
      </div>
    </div>
  );
};

export default MyApps;
//15:53