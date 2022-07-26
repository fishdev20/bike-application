import React, { useEffect } from 'react'
import './App.scss';
import Home from './components/Home';
import Menu from './components/Menu';
import Stations from './components/Stations';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Journeys from './components/Journeys';
import { useGlobal } from 'reactn';
import { fetchData } from './data/fetchData';
function App() {
  const [stations, setStations] = useGlobal('stations');
  const [journeys, setJourneys] = useGlobal('journeys');
  const stationsUrl = `http://localhost:9000/api/stations`
  const journeyUrl = `http://localhost:9000/api/journeys`

  useEffect(() => {
    fetchData(setStations,stationsUrl);
    fetchData(setJourneys,journeyUrl);
  },[])
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
