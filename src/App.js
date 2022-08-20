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
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: { mode: "dark" }
})

function App() {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline /> {/* To apply the above theme */}
        <NavigationDrawer />
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="projects" element={<ProjectsPage />}/>
          <Route path="articles" element={<ArticlesPage />}/>
          <Route path="about" element={<AboutPage />}/>
          <Route path="policies" element={<PoliciesPage />}/>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
