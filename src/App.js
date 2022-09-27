// import logo from './logo.svg';
import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import {
  HomePage,
  ProjectsPage,
  ArticlesPage,

  // Site
  AboutPage,
  PoliciesPage,
  ContactPage,

  // Auth
  LoginPage,
  SignupPage,
  VerificationPage,
  SettingsPage,
  PasswordChangePage,
  PasswordResetPage,
} from 'pages/exports';
import NavigationDrawer from 'layout/navigationDrawer';
import { useAuthData } from 'hooks/exports';
// import { useEffect } from 'react';
import LoadingScreen from 'LoadingScreen';


export default function App() {
  
  const { isLoading, isLoggedIn } = useAuthData();
  
  // useEffect( () => console.log("Logged In:", isLoggedIn), [isLoggedIn]);

  if (isLoading) return <LoadingScreen />;

  return (
    <>
      {/* <NavigationDrawer /> */}
      <NavigationDrawer />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="projects" element={<ProjectsPage />}/>
        <Route path="articles" element={<ArticlesPage />}/>
        <Route path="about" element={<AboutPage />}/>
        <Route path="policies" element={<PoliciesPage />}/>
        <Route path="contact" element={<ContactPage />}/>

        { isLoggedIn
          ? <>
              <Route path="settings" element={<SettingsPage />}/>
              <Route path="password-change" element={<PasswordChangePage />}/>
            </>
          :
            <>
              <Route path="login" element={<LoginPage />}/>
              <Route path="signup" element={<SignupPage />}/>
              <Route path="verify" element={<VerificationPage />}/>
              <Route path="password-reset" element={<PasswordResetPage />}/>
            </>
        }
        <Route path="*" element={<Navigate to="/" replace /> }/>
      </Routes>
    </>
  );
}