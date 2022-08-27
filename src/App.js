// import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import {
  HomePage,
  ProjectsPage,
  ArticlesPage,
  AboutPage,
  PoliciesPage,
} from 'pages/exports';
import NavigationDrawer from 'layout/navigationDrawer';


export default function App() {
  return (
    <>
      <NavigationDrawer />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="projects" element={<ProjectsPage />}/>
        <Route path="articles" element={<ArticlesPage />}/>
        <Route path="about" element={<AboutPage />}/>
        <Route path="policies" element={<PoliciesPage />}/>
      </Routes>
    </>
  );
}