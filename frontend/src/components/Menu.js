import React from 'react'
import '../styles/menu.scss'
import PedalBike from '@mui//icons-material/PedalBike';
import { Link } from 'react-router-dom';

export default function Menu() {
  return (
    <div className='root'>
        <div className='nav-container'>
            <div className='logo'><PedalBike fontSize='large'/> THE BIKE</div>
            <div className='menu'> 
                <nav>
                    {/* <Link to="/">Home</Link> |{" "} */}
                    <Link to="journeys">Journeys</Link>
                    <Link to="stations">Stations</Link>
                </nav>
            </div>
        </div>
        
    </div>
  )
}
