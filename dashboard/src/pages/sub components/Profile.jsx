import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@radix-ui/react-dropdown-menu';
import React from 'react';
import { useSelector } from 'react-redux';
const Profile = () => {
  const { user } = useSelector((state) => state.user);
    return (
    <div className="w-full h-full p-6">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <h2 className="text-3xl font-bold">Profile</h2>
          <p className="my-5">Full Profile Previous</p>
        </div>
      </div>
      <div className="grid gap-6">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-5">
          <div className="grid gap-2 w-full lg:w-1/2">
            <Label>Profile Image</Label>
            <img
              src={user && user.avatar && user.avatar.url}
              alt="avatar"
              className="w-full h-auto rounded-2xl"
            />
          </div>
          <div className="grid gap-2 w-full lg:w-1/2">
            <Label>Resume</Label>
            <img
              src={user && user.resume && user.resume.url}
              alt="resume"
              className="w-full h-auto rounded-2xl"
            />
          </div>
        </div>
        <div className='grid gap-2'>
          <Label>Full Name</Label>
          <Input type='text' defaultValue={user.fullName} disabled/>
        </div>
        <div className='grid gap-2'>
          <Label>Email Name</Label>
          <Input type='email' defaultValue={user.email} disabled/>
        </div>
        <div className='grid gap-2'>
          <Label>Phone</Label>
          <Input type='text' defaultValue={user.phone} disabled/>
        </div>
        <div className='grid gap-2'>
          <Label>About Me</Label>
          <Textarea  defaultValue={user.aboutMe} disabled/>
        </div>
        <div className='grid gap-2'>
          <Label>Portfolio URL</Label>
          <Input  defaultValue={user.portfolioURL} disabled/>
        </div>
        <div className='grid gap-2'>
          <Label>Github URL</Label>
          <Input defaultValue={user.githubURL} disabled/>
        </div>
        <div className='grid gap-2'>
          <Label>LinkedIn URL</Label>
          <Input defaultValue={user.linkedInURL} disabled/>
        </div>
        <div className='grid gap-2'>
          <Label>LinkedIn URL</Label>
          <Input  defaultValue={user.linkedInURL} disabled/>
        </div>
        <div className='grid gap-2'>
          <Label>Instagram URL</Label>
          <Input  defaultValue={user.instagramURL} disabled/>
        </div>
        <div className='grid gap-2'>
          <Label>Twitter(X) URL</Label>
          <Input  defaultValue={user.twitterURL} disabled/>
        </div>
      </div>
    </div>
  );
};

export default Profile;
//7:58