import React, { useEffect } from 'react'
import './App.scss';
import Home from './pages/Home';
import Menu from './components/Menu';
import Stations from './pages/Stations';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Journeys from './pages/Journeys';
import { useGlobal } from 'reactn';
import { fetchAllJourneys, fetchJourneys, fetchStations } from './data/fetchData';

function App() {
  const [, setStations] = useGlobal('stations');
  const [, setAllJourneys] = useGlobal('allJourneys');


  useEffect(() => {
    fetchDataStations();
    fetchAllJourneysData();
  },[])

  const fetchAllJourneysData = async () => {
    const fetchedJourneys = await  fetchAllJourneys()
    setAllJourneys(fetchedJourneys) 
    localStorage.setItem("Total Journeys",JSON.stringify(fetchedJourneys.journeys))
  }
  const fetchDataStations = async () => {
    const fetchedStations = await fetchStations()
    setStations(fetchedStations)
    localStorage.setItem("Total Stations",JSON.stringify(fetchedStations))
  }
  
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
