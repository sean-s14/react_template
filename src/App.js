// import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import { HomePage } from './pages/homePage';
import { AboutPage } from './pages/aboutPage';

function App() {
  return (
    <div>
      <h1>Welcome</h1>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="about" element={<AboutPage />}/>
      </Routes>
    </div>
  );
}

export default App;
