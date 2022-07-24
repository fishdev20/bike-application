import React from 'react'
import './App.scss';
import Home from './components/Home';
import Menu from './components/Menu';
import Stations from './components/Stations';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Journeys from './components/Journeys';
function App() {

  
  return (
    <div className="App">
      <BrowserRouter>
            <Menu />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='journeys' element={<Journeys />} />
              <Route path='stations' element={<Stations />} />
            </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
