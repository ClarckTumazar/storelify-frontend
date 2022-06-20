import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HeroPage from './components/heroPage/HeroPage';
import Home from './components/Home/Home';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route index element={<HeroPage />} />
        <Route path='/welcome' element={<HeroPage />} />
        <Route path='/home/:userEmail' element={<Home />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
