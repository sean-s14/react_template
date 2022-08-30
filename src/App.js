// import logo from './logo.svg';
import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import {
  HomePage,
  ProjectsPage,
  ArticlesPage,
  AboutPage,
  PoliciesPage,

  LoginPage,
  SignupPage,
  VerificationPage,
  SettingsPage,
} from 'pages/exports';
import NavigationDrawer from 'layout/navigationDrawer';
import { useAuth } from 'contexts/exports';
import { useEffect, useState } from 'react';


export default function App() {
  
  const auth = useAuth();
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect( () => {
    console.log("Auth:", auth);
    console.log("Logged In:", !!auth?.tokens?.access);
    setLoggedIn(!!auth?.tokens?.access);
  }, [auth])

  if (loggedIn === null) return null;

  return (
    <>
      <NavigationDrawer />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="projects" element={<ProjectsPage />}/>
        <Route path="articles" element={<ArticlesPage />}/>
        <Route path="about" element={<AboutPage />}/>
        <Route path="policies" element={<PoliciesPage />}/>
        <Route path="settings" element={<SettingsPage />}/>

        { !loggedIn && 
          <>
            <Route path="login" element={<LoginPage />}/>
            <Route path="signup" element={<SignupPage />}/>
            <Route path="verify" element={<VerificationPage />}/>
          </>
        }
        <Route path="*" element={<Navigate to="/" replace /> }/>
      </Routes>
    </>
  );
}