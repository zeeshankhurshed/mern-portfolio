import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useEffect, useState } from 'react';
import SpecilalLoadingButton from '../SpecilalLoadingButton';
import { Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { addNewProject, clearAllProjectSliceErrors, getAllProjects, resetProjectSlice } from '@/store/slice/projectSlice';
import { toast } from 'react-toastify';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AddProject = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [projectBanner, setProjectBanner] = useState('');
  const [projectBannerPreview, setProjectBannerPreview] = useState('');
  const [gitRepoLink, setGitRepoLink] = useState('');
  const [projectLink, setProjectLink] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [stack, setStack] = useState('');
  const [deployed, setDeployed] = useState('');

  const handleSvg = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProjectBanner(file);
      setProjectBannerPreview(reader.result);
    };
  };

  const { loading, error, message } = useSelector((state) => state.project);
  const dispatch = useDispatch();

  const handleAddNewProject = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("gitRepoLink", gitRepoLink);
    formData.append("projectLink", projectLink);
    formData.append("technologies", technologies);
    formData.append("stack", stack);
    formData.append("deployed", deployed);
    formData.append("projectBanner", projectBanner);
    dispatch(addNewProject(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllProjectSliceErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetProjectSlice());
      dispatch(getAllProjects());
    }
  }, [error, message, dispatch]);

  return (
    <div className="flex justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14">
      <form onSubmit={handleAddNewProject} className="w-[100%] px-5 md:w-[1000px]">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="font-semibold leading-7 text-gray-900 text-3xl text-center">ADD NEW Project</h2>
            <div className="mt-10 flex flex-col gap-5">
             
                  <div className="w-full sm:col-span-4">
                <Label className="block text-sm font-medium leading-6 text-gray-900">Title</Label>
                <div className="mt-2">
                  <div className="flex rouned-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-inset focus-within:ring-indigo-600">
                    <Input
                      type="text"
                      placeholder="Porject Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-4 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

                  <div className="w-full sm:col-span-4">
                <Label className="block text-sm font-medium leading-6 text-gray-900">Description</Label>
                <div className="mt-2">
                  <div className="flex rouned-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-inset focus-within:ring-indigo-600">
                    <Textarea
                      placeholder="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-4 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="w-full sm:col-span-4">
                <Label className="block text-sm font-medium leading-6 text-gray-900">Technologies used in this project</Label>
                <div className="mt-2">
                  <div className="flex rouned-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-inset focus-within:ring-indigo-600">
                    <Textarea
                      placeholder="HTML,CSS, JAVASCRIPT, BOOTSTRAP"
                      value={technologies}
                      onChange={(e) => setTechnologies(e.target.value)}
                      
                    />
                  </div>
                </div>
              </div>

              <div className="w-full sm:col-span-4">
                <Label className="block text-sm font-medium leading-6 text-gray-900">Stack</Label>
                <div className="mt-2">
                  <div className="flex rouned-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-inset focus-within:ring-indigo-600">
                    <Select value={stack} onValueChange={(selectedValued)=>{
                      setStack(selectedValued);
                    }}>
                      <SelectTrigger>
                        <SelectValue placeholder='Seclect Project Stack'/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='Full Stack'>Full Stack</SelectItem>
                        <SelectItem value='Mern'>Mern</SelectItem>
                        <SelectItem value='Next-js'>Next-js</SelectItem>
                        <SelectItem value='React-js'>React-js</SelectItem>
                        <SelectItem value='Word-Press'>Word-Press</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>


              <div className="w-full sm:col-span-4">
                <Label className="block text-sm font-medium leading-6 text-gray-900">Project Link</Label>
                <div className="mt-2">
                  <div className="flex rouned-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-inset focus-within:ring-indigo-600">
                    <Input
                      type="text"
                      placeholder="Paste your deloy link"
                      value={projectLink}
                      onChange={(e) =>setProjectLink(e.target.value)}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-4 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>


              <div className="w-full sm:col-span-4">
                <Label className="block text-sm font-medium leading-6 text-gray-900">Deployed</Label>
                <div className="mt-2">
                  <div className="flex rouned-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-inset focus-within:ring-indigo-600">
                    <Select value={deployed} onValueChange={(selectedValued)=>{
                      setDeployed(selectedValued);
                    }}>
                      <SelectTrigger>
                        <SelectValue placeholder='Is this porject deployed'/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='Yes'>Yes</SelectItem>
                        <SelectItem value='No'>No</SelectItem>
                      
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="w-full sm:col-span-4">
                <Label className="block text-sm font-medium leading-6 text-gray-900">Github Repository Link</Label>
                <div className="mt-2">
                  <div className="flex rouned-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-inset focus-within:ring-indigo-600">
                    <Input
                      type="text"
                      placeholder="Paste you github repository here"
                      value={gitRepoLink}
                      onChange={(e) => setGitRepoLink(e.target.value)}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-4 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <Label className="block text-sm font-medium leading-6 text-gray-900">
                  Project Banner
                </Label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    {
                      projectBannerPreview ? <img className='mx-auto h-250px w-full text-gray-300'
                        src={projectBannerPreview} alt="svg" /> : <Image className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                    }
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <Label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <Input
                          type="file"
                          id="file-upload"
                          name='file-upload'
                          onChange={handleSvg}
                          className="sr-only"
                        />
                      </Label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">SVG, PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {
            loading ? <SpecilalLoadingButton content={"Adding"} className='w-56'/> : <Button type="submit" className="w-56">Add Project</Button>
          }
        </div>
      </form>
    </div>
  )
}

export default AddProject;
//11:39