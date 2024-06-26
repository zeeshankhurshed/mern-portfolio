import React, { useEffect } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ManageSkills from './pages/ManageSkills';
import ManageTimeline from './pages/ManageTimeline';
import ManageProjects from './pages/ManageProjects';
import ViewProject from './pages/ViewProject';
import UpdateProject from './pages/UpdateProject';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import "./App.css";
import { getUser } from './store/slice/userSlices';
import { getAllMessages } from './store/slice/messagesSlice.js';
import { getAllTimeline } from './store/slice/timelineSlice.js';
import { getAllSkills } from './store/slice/skillSlice';
import { getAllSoftwareApplications } from './store/slice/softwareApplicationSlice';
import { getAllProjects } from './store/slice/projectSlice';
const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="password/forgot" element={<ForgotPassword />} />
        <Route path="password/reset/:token" element={<ResetPassword />} />
        <Route path="manage/skills" element={<ManageSkills />} />
        <Route path="manage/timeline" element={<ManageTimeline />} />
        <Route path="manage/projects" element={<ManageProjects />} />
        <Route path="view/project/:id" element={<ViewProject />} />
        <Route path="update/project/:id" element={<UpdateProject />} />
      </Route>
    )
  );
const dispatch=useDispatch();
useEffect(()=>{
dispatch(getUser());
dispatch(getAllMessages());
dispatch(getAllTimeline());
dispatch(getAllSkills());
dispatch(getAllSoftwareApplications());
dispatch(getAllProjects());
},[])
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="bottom-right" theme="dark" />
    </>
  );
};

export default App;
