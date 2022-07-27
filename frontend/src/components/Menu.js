import React, { useState } from 'react'
import '../styles/menu.scss'
import PedalBike from '@mui//icons-material/PedalBike';
import { Link } from 'react-router-dom';
import { Twirl  as Hamburger } from 'hamburger-react'

export default function Menu() {
  const [active, setActive] = useState(false)

  const activeStyle = active ? 'active' : ''
  return (
    
      <div className='root'>
        <div className='nav-container'>
            <div className='logo'><PedalBike fontSize='large'/> THE BIKE</div>
            <div className='menu'> 
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="stations">Stations</Link>
                    <Link to="journeys">Journeys</Link>
                    
                </nav>
            </div>
            <Hamburger 
              toggled={active} 
              toggle={setActive} 
            />
        </div>
        <div className={`nav-mobile ${activeStyle}`}>
          <div className='menu-mobile'>
            <nav>
                  <Link to="/" onClick={() => {setActive(false)}}>Home</Link>
                  <Link to="stations" onClick={() => {setActive(false)}}>Stations</Link>
                  <Link to="journeys" onClick={() => {setActive(false)}}>Journeys</Link>
                  
            </nav>
          </div>
        </div>  
      </div>
      
    
    
  )
}
