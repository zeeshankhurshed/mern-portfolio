import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SpecilalLoadingButton from '../SpecilalLoadingButton';
import { clearAllUserErrors, getUser, resetProfile, updateProfile } from '@/store/slice/userSlices.js';
import { toast } from 'react-toastify';

const UpdateProfile = () => {
  const { user, loading, error, isUpdated, message } = useSelector((state) => state.user);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [profileURL, setProfileURL] = useState('');
  const [linkedInURL, setLinkedInURL] = useState('');
  const [githubURL, setGithubURL] = useState('');
  const [instagramURL, setInstagramURL] = useState('');
  const [twitterURL, setTwitterURL] = useState('');
  const [facebookURL, setFacebookURL] = useState('');
  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('');
  const [resume, setResume] = useState('');
  const [resumePreview, setResumePreview] = useState('');

  useEffect(() => {
    if (user) {
      setFullName(user.fullName || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      setAboutMe(user.aboutMe || '');
      setProfileURL(user.profileURL || '');
      setLinkedInURL(user.linkedInURL !== 'undefined' ? user.linkedInURL : '');
      setGithubURL(user.githubURL !== 'undefined' ? user.githubURL : '');
      setInstagramURL(user.instagramURL !== 'undefined' ? user.instagramURL : '');
      setTwitterURL(user.twitterURL !== 'undefined' ? user.twitterURL : '');
      setFacebookURL(user.facebookURL !== 'undefined' ? user.facebookURL : '');
      setAvatar(user.avatar && user.avatar.url);
      setAvatarPreview(user.avatar && user.avatar.url);
      setResume(user.resume && user.resume.url);
      setResumePreview(user.resume && user.resume.url);
    }
  }, [user]);

  const dispatch = useDispatch();

  const avatarHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setAvatarPreview(reader.result);
      setAvatar(file);
    };
  };

  const resumeHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setResumePreview(reader.result);
      setResume(file);
    };
  };

  const handleUpdateProfile = () => {
    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('profileURL', profileURL);
    formData.append('aboutMe', aboutMe);
    formData.append('linkedInURL', linkedInURL);
    formData.append('githubURL', githubURL);
    formData.append('instagramURL', instagramURL);
    formData.append('twitterURL', twitterURL);
    formData.append('facebookURL', facebookURL);
    formData.append('avatar', avatar);
    formData.append('resume', resume);

    console.log('FormData values:');
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    dispatch(updateProfile(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isUpdated) {
      dispatch(getUser());
      dispatch(resetProfile());
    }
    if (message) {
      toast.success(message);
    }
  }, [dispatch, error, isUpdated, message]);

  return (
    <div className="w-full h-full p-6">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <h2 className="text-3xl font-bold">Update Profile</h2>
          <p className="my-5">Profile Preview</p>
        </div>
      </div>
      <div className="grid gap-6">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-5">
          <div className="grid gap-2 w-full lg:w-1/2">
            <Label>Profile Image</Label>
            <img
              src={avatarPreview || './vite.svg'}
              alt="avatar"
              className="w-full h-auto rounded-2xl"
            />
            <div className="relative">
              <Input type="file" className="avatar-update-btn" onChange={avatarHandler} />
            </div>
          </div>
          <div className="grid gap-2 w-full lg:w-1/2">
            <Label>Resume</Label>
            <Link to={resume} target="_blank">
              <img
                src={resumePreview || './vite.svg'}
                alt="resume"
                className="w-full h-auto rounded-2xl"
              />
            </Link>
            <div className="relative">
              <Input type="file" className="avatar-update-btn" onChange={resumeHandler} />
            </div>
          </div>
        </div>
        <div className="grid gap-2">
          <Label>Full Name</Label>
          <Input
            type="text"
            placeholder="Your Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label>Phone</Label>
          <Input
            type="text"
            placeholder="Your Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label>About Me</Label>
          <Textarea
            placeholder="About Me"
            value={aboutMe}
            onChange={(e) => setAboutMe(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label>Portfolio URL</Label>
          <Input
            placeholder="Your Portfolio URL"
            value={profileURL}
            onChange={(e) => setProfileURL(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label>Github URL</Label>
          <Input
            placeholder="Your Github URL"
            value={githubURL}
            onChange={(e) => setGithubURL(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label>LinkedIn URL</Label>
          <Input
            placeholder="Your LinkedIn URL"
            value={linkedInURL}
            onChange={(e) => setLinkedInURL(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label>Instagram URL</Label>
          <Input
            placeholder="Your Instagram URL"
            value={instagramURL}
            onChange={(e) => setInstagramURL(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label>Twitter (X) URL</Label>
          <Input
            placeholder="Your Twitter URL"
            value={twitterURL}
            onChange={(e) => setTwitterURL(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label>Facebook URL</Label>
          <Input
            placeholder="Your Facebook URL"
            value={facebookURL}
            onChange={(e) => setFacebookURL(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          {!loading ? (
            <Button className="w-full" onClick={handleUpdateProfile}>
              Update Profile
            </Button>
          ) : (
            <SpecilalLoadingButton content="updating" />
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
