import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { clearAllApplicationSliceErrors, deleteSoftwareApplication, getAllSoftwareApplications, resetApplicationSlice } from '@/store/slice/softwareApplicationSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SpecilalLoadingButton from '../SpecilalLoadingButton';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const { user } = useSelector((state) => state.user);
  const { projects } = useSelector((state) => state.project);
  const { skills } = useSelector((state) => state.skill);
  const { softwareApplications, loading, error, message } = useSelector((state) => state.application)
  const { timeline } = useSelector((state) => state.timeline);
  const dispatch = useDispatch()

  const [appId, setAppId] = useState('');

  const handleDeleteSoftwareApp = (id) => {
    setAppId(id);
    dispatch(deleteSoftwareApplication(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationSliceErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
      dispatch(getAllSoftwareApplications());
    }
  }, [dispatch, error, message]);

  return (
    <div className='flex flex-col gap-4 sm:py-4 sm:pl-14'>
      <main className='grid flex-1 items-start gap-4 p-4 sm:px-4 sm:py-6 md:gap-6 lg:grid-cols-2 xl:grid-cols-2'>
        <div className='grid auto-rows items-start gap-4 md:gap-8 lg:col-span-2 '>
          <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4'>
            <Card className='sm:col-span-2'>
              <CardHeader className='pb-3'>
                <CardDescription className='max-w-lg text-balance leading-relaxed'>{user.aboutMe}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Link to={user.portfolioURL && user.portfolioURL} target='_blank'>
                  <Button>Visit Portfolio</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className='flex flex-col justify-center'>
              <CardHeader className='pb-2'>
                <CardTitle>Project Completed</CardTitle>
                <CardTitle className='text-6xl'>{projects && projects.length}</CardTitle>
              </CardHeader>
              <CardFooter>
                <Link to={'/manage/projects'}>
                  <Button>Manage Projects</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className='flex flex-col justify-center'>
              <CardHeader className='pb-2'>
                <CardTitle>Skills</CardTitle>
                <CardTitle className='text-6xl'>{skills && skills.length}</CardTitle>
              </CardHeader>
              <CardFooter>
                <Link to={'/manage/skills'}>
                  <Button>Manage Skills</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>

          <Tabs>
            <CardContent>
              <Card>
                <CardHeader className='px-7'>
                  <CardTitle>Projects</CardTitle>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead className='hidden md:table-cell'>Stack</TableHead>
                          <TableHead className='hidden md:table-cell'>Deployed</TableHead>
                          <TableHead className='md:table-cell'>Update</TableHead>
                          <TableHead className='text-right'>Visit</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {projects && projects.length > 0 ? (
                          projects.map((element) => (
                            <TableRow className='bg-accent' key={element._id}>
                              <TableCell>
                                <div>{element.title}</div>
                              </TableCell>
                              <TableCell className='hidden md:table-cell'>{element.stack}</TableCell>
                              <TableCell className='hidden md:table-cell'>{element.deployed}</TableCell>

                              <TableCell className='text-right'>
                                <Link to={`/update/project/${element._id}`}>
                                  <Button>Update</Button>
                                </Link>
                              </TableCell>
                              <TableCell>
                                <Link to={element.projectLink ? `${element.projectLink}` : ''} target='_blank'>
                                  <Button>Visit</Button>
                                </Link>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell className='text-3xl overflow-y-hidden'>
                              You have not added any project
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </CardHeader>
              </Card>
            </CardContent>
          </Tabs>
          <Tabs>
  <TabsContent>
    <Card>
      <CardHeader className='px-7 gap-3'>
        <CardTitle>SKILLS</CardTitle>
      </CardHeader>
      <CardContent className='grid sm:grid-cols-2 gap-4'>
        {
          skills && skills.length > 0 ? (
            skills.map(element => {
              return (
                <Card key={element._id}>
                  <CardHeader>{element.title}</CardHeader>
                  <CardFooter>
                    <Progress value={element.proficiency} />
                  </CardFooter>
                </Card>
              );
            })
          ) : (
            <CardTitle className='text-3xl'>
              You have not added any skill
            </CardTitle>
          )
        }
      </CardContent>
    </Card>
  </TabsContent>
</Tabs>
          <Tabs>
            <TabsContent className='grid min-[1050px]:grid-cols-2 gap-4'>
              <Card>
                <CardHeader>
                  <CardTitle>Software Applications</CardTitle>
                  <CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead className='md:table-cell'>Icon</TableHead>
                            <TableHead className='md:table-cell'>Action</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {softwareApplications && softwareApplications.length > 0 ? (
                            softwareApplications.map((element) => (
                              <TableRow className='bg-accent' key={element._id}>
                                <TableCell>{element.name}</TableCell>
                                <TableCell>
                                  <img src={element.svg && element.svg.url} alt={element.name} className='w-7 h-7' />
                                </TableCell>
                                <TableCell>
                                  {loading && appId === element._id ? (
                                    <SpecilalLoadingButton content={'Deleting'} width={'w-fit'} />
                                  ) : (
                                    <Button onClick={() => handleDeleteSoftwareApp(element._id)}>Delete</Button>
                                  )}
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                              <TableRow>

                                <TableCell className='text-3xl overflow-y-hidden'>You have add no software application </TableCell>
                              </TableRow>)
                            }
                          </TableBody>
                        </Table>
                      </CardContent>
                    </CardHeader>
                    </CardHeader>
              </Card>

              <Card>
                <CardHeader className='px-7 flex items-center justify-between flex-row'>
                  <CardTitle>Timeline </CardTitle>
                  <Link to={'/manage/timeline'}>
                    <Button>Manage Timeline</Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>From</TableHead>
                        <TableHead>To</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {
                        timeline && timeline.length > 0 ? (
                          timeline.map(element => {
                            return (
                              <TableRow className='bg-accent' key={element._id}>
                                <TableCell className=' font-medium'>{element.title}</TableCell>
                                <TableCell className='md:table-cell' >{element.timeline.from}</TableCell>
                                <TableCell className='md:table-cell text-right'>{element.timeline.to ? `${element.timeline.to}` : "Present"}</TableCell>
                              </TableRow>
                            )
                          })
                        ) : (
                          <TableRow>
                            <TableCell className='text-3xl overflow-y-hidden'>
                              You have no timeline
                            </TableCell>
                          </TableRow>
                        )
                      }
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;


