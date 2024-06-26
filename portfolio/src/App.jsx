// @ts-nocheck
import React from 'react'
import { ThemeProvider } from './components/ui/theme-Provider'
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Layout from './components/Layout';
import ProjectView from './pages/ProjectView';
import Home from './pages/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/project/:id" element={<ProjectView />} />
        </Route>
    )
  );
  return (
    <>
     <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router}/>
      <ToastContainer position='bottom-right' theme='dark'/>
      </ThemeProvider> 
    </>
  )
}

export default App
//14:40