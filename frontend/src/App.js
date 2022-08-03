import React, { useEffect } from 'react'
import './App.scss';
import Home from './pages/Home';
import Menu from './components/Menu';
import Stations from './pages/Stations';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Journeys from './pages/Journeys';
import { useGlobal } from 'reactn';
import { fetchData } from './data/fetchData';
function App() {
  const [stations, setStations] = useGlobal('stations');
  const [journeys, setJourneys] = useGlobal('journeys');
  const [STATION_URL] = useGlobal('STATION_URL')
  const [JOURNEYS_URL] = useGlobal('JOURNEYS_URL')

  useEffect(() => {
    fetchData(setStations,STATION_URL);
    fetchData(setJourneys,JOURNEYS_URL);
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
