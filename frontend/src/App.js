import React, {useEffect, useState} from 'react'
import './App.scss';
import Stations from './components/Stations';
import StationsTable from './components/StationsTable';
function App() {

  
  return (
    <div className="App">
      <StationsTable />
    </div>
  );
}

export default App;
