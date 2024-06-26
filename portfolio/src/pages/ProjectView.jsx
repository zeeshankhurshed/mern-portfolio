// @ts-nocheck
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

const ProjectView = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [projectBanner, setProjectBanner] = useState('');
  const [gitRepoLink, setGitRepoLink] = useState('');
  const [projectLink, setProjectLink] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [stack, setStack] = useState('');
  const [deployed, setDeployed] = useState('');

  const { id } = useParams();

  useEffect(() => {
    const getProject = async () => {
      await axios.get(`http://localhost:4000/api/vi/project/getProject/${id}`, {
        withCredentials: true,
      }).then((res) => {
        // console.log(res);
        setTitle(res.data.project.title);
        setDescription(res.data.project.description);
        setStack(res.data.project.stack);
        setDeployed(res.data.project.deployed);
        setTechnologies(res.data.project.technologies);
        setGitRepoLink(res.data.project.gitRepoLink);
        setProjectLink(res.data.project.projectLink);
        setProjectBanner(res.data.project.projectBanner && res.data.project.projectBanner.url);
      }).catch((error) => {
        toast.error(error.response.data.message);
      })
    };
    getProject();
  }, [id]);

  const descriptionInListFortmat = description.split(".");
  const technologiesInListFortmat = technologies.split(",");
  return (
    <div className="flex justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14">
      <div className="w-[100%] px-5 md:w-[1000px]">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 flex flex-col gap-5">

              <div className="w-full sm:col-span-4">
                <h2 className='text-2xl font-bold mb-4'>{title}</h2>
                <img
                  src={projectBanner ? projectBanner : '/vite.svg'}
                  alt={title}
                  className='w-full h-auto'
                />
              </div>

              <div className="w-full sm:col-span-4">
             <p className='text-2xl mb-2'>Description</p>
             <ul className='list-disc'>
              {
                descriptionInListFortmat.map((item,index)=>{
                  return <li key={index}>{item}</li>
                  
                })
              }
             </ul>
             
              </div>

              <div className="w-full sm:col-span-4">
             <p className='text-2xl mb-2'>Technologies</p>
             <ul className='list-disc'>
              {
                technologiesInListFortmat.map((item,index)=>{
                  return <li key={index}>{item}</li>
                  
                })
              }
             </ul>
             
              </div>

              <div className="w-full sm:col-span-4">
             <p className='text-2xl mb-2'>Stack</p>
           <p>{stack}</p>
             
              </div>

              <div className="w-full sm:col-span-4">
             <p className='text-2xl mb-2'>Deployed</p>
           <p>{deployed}</p>
             
              </div>

              <div className="w-full sm:col-span-4">
             <p className='text-2xl mb-2'>GithubRepo</p>
              <Link to={gitRepoLink} target='_blank' className='text-sky-700'>
              {deployed}
              </Link>
              </div>

              <div className="w-full sm:col-span-4">
             <p className='text-2xl mb-2'>Project Link:</p>
              <Link to={projectLink ? projectLink:"/"} target='_blank' className='text-sky-700'>
             { projectLink ? projectLink:"Still Not Deployed"}
              </Link>
              </div>
     
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProjectView
