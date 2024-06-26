import { clearAllSkillSliceErrors } from '@/store/slice/skillSlice';
import { addNewSkill, getAllSkills, resetSkillSlice } from '@/store/slice/skillSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SpecilalLoadingButton from '../SpecilalLoadingButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Image } from 'lucide-react';

const AddSkill = () => {
  const [title, setTitle] = useState("");
  const [proficiency, setProficiency] = useState("");
  const [svg, setSvg] = useState(null);
  const [svgPreview, setSvgPreview] = useState("");

  const handleSvg = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setSvg(file);
      setSvgPreview(reader.result);
    };
  };

  const { loading, message, error } = useSelector((state) => state.skill);
  const dispatch = useDispatch();

  const handleAddNewSkill = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("proficiency", proficiency);
    formData.append("svg", svg); // Ensure this matches backend's expected key
    dispatch(addNewSkill(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllSkillSliceErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetSkillSlice());
      dispatch(getAllSkills());
    }
  }, [error, message, dispatch]);

  return (
    <div className="flex justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14">
      <form onSubmit={handleAddNewSkill} className="w-[100%] px-5 md:w-[650px]">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="font-semibold leading-7 text-gray-900 text-3xl text-center">ADD NEW SKILL</h2>
            <div className="mt-10 flex flex-col gap-5">

              <div className="w-full sm:col-span-4">
                <Label className="block text-sm font-medium leading-6 text-gray-900">Title</Label>
                <div className="mt-2">
                  <div className="flex rouned-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-inset focus-within:ring-indigo-600">
                    <Input
                      type="text"
                      placeholder="Skill Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-4 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="w-full sm:col-span-4">
                <Label className="block text-sm font-medium leading-6 text-gray-900">Proficiency</Label>
                <div className="mt-2">
                  <div className="flex rouned-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-inset focus-within:ring-indigo-600">
                    <Input
                      type="number"
                      placeholder="30"
                      value={proficiency}
                      onChange={(e) => setProficiency(e.target.value)}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-4 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <Label className="block text-sm font-medium leading-6 text-gray-900">
                  Skill Svg
                </Label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    {
                      svgPreview ? <img className='mx-auto h-12 w-12 text-gray-300'
                      src={svgPreview} alt="svg" /> : <Image className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
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
            loading ? <SpecilalLoadingButton content={"Adding"} /> : <Button type="submit" className="w-full">Add Skill</Button>
          }
        </div>
      </form>
    </div>
  )
}

export default AddSkill;
//10:34