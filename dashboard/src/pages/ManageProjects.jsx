import { Button } from '@/components/ui/button';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { deleteProject, getAllProjects, resetProjectSlice } from '@/store/slice/projectSlice';
import { Eye, Pen, Trash2 } from 'lucide-react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const ManageProjects = () => {
  const { loading, message, error, projects } = useSelector((state) => state.project);
  const dispatch = useDispatch();

  const handleDeleteProject = (id) => {
    dispatch(deleteProject(id));
  };

  useEffect(() => {
    dispatch(getAllProjects());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetProjectSlice());
    }
    if (message) {
      toast.success(message);
      dispatch(resetProjectSlice());
    }
  }, [dispatch, error, message]);

  return (
    <div className='flex min-h-screen w-full flex-col bg-muted/40'>
      <Tabs>
        <TabsContent>
          <CardContent>
            <CardHeader className='flex gap-4 sm:justify-between sm:flex-row sm:items-center'>
              <CardTitle>Manage Your Projects</CardTitle>
              <Link to='/'>
                <Button>Return to Dashboard</Button>
              </Link>
            </CardHeader>
            <CardContent className='grid grid-cols-1 gap-4'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Banner</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Stack</TableHead>
                    <TableHead>Deployed</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects && projects.length > 0 ? (
                    projects.map((element) => (
                      <TableRow className='bg-accent' key={element._id}>
                        <TableCell className='font-medium'>
                          <div>
                            <img src={element.projectBanner?.url || ''} alt="" />
                          </div>
                        </TableCell>
                        <TableCell className='font-medium'>{element.title}</TableCell>
                        <TableCell className='hidden md:table-cell'>{element.stack}</TableCell>
                        <TableCell className='hidden md:table-cell'>{element.deployed}</TableCell>
                        <TableCell className='flex flex-row items-center gap-3 h-24'>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Link to={`/view/project/${element._id}`}>
                                  <button className='border-green-600 border-2 rounded-full h-8 w-8 flex justify-center items-center text-green-800 hover:text-slate-950 hover:bg-green-600'>
                                    <Eye />
                                  </button>
                                </Link>
                              </TooltipTrigger>
                              <TooltipContent side='bottom'>
                                View
                              </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Link to={`/update/project/${element._id}`}>
                                  <button className='border-yellow-600 border-2 rounded-full h-8 w-8 flex justify-center items-center text-yellow-800 hover:text-slate-950 hover:bg-yellow-600'>
                                    <Pen />
                                  </button>
                                </Link>
                              </TooltipTrigger>
                              <TooltipContent side='bottom'>
                                Edit
                              </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                              <TooltipTrigger asChild>
                                
                                  <button 
                                  onClick={()=>handleDeleteProject(element._id)}
                                  className='border-red-600 border-2 rounded-full h-8 w-8 flex justify-center items-center text-red-800 hover:text-slate-50 hover:bg-red-600'>
                                    <Trash2 />
                                  </button>
                             
                              </TooltipTrigger>
                              <TooltipContent side='bottom'>
                                Delete
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell className='text-3xl overflow-y-hidden'>You have not any project</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </CardContent>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageProjects;
//14:24