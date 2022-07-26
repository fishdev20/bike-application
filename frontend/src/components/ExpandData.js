import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '../styles/stations.scss'

import { Col, Row } from 'antd';
import EnvironmentTwoTone from '@ant-design/icons/EnvironmentTwoTone'

//map implement
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

export default function ExpandData({stationId}) {
    const [stationInfo,setStationInfo] = useState({})
    useEffect(() => {
        fetchStationInfo(stationId)
    },[])

    const fetchStationInfo = async (stationId) => {
        try {
            const response = await axios.get(`http://localhost:9000/api/stations/${stationId}`)
            setStationInfo(response.data)
        } catch (e) {
            throw new Error(e)
        }
    }
    const position = [parseFloat(stationInfo.y), parseFloat(stationInfo.x)]

  return (
    <div>
        {!Boolean(stationInfo.name) ? 
        'Loading...' : 
        <Row>
          <Col md={12} xs={24}>
            <h4>- Total number of journeys starting from the station: <span style={{color: '#007ac9'}}>{stationInfo.journeysStart}</span> journeys</h4>
            <h4>- Total number of journeys ending at the station: <span style={{color: '#007ac9'}}>{stationInfo.journeysEnd}</span> journeys</h4>
          </Col>
          <Col md={12} xs={24}>
            <h4> <EnvironmentTwoTone /> Location </h4>
              
            {position[0] !== undefined && 
              <MapContainer style={{width: '100%',height: 150}} center={position} zoom={10}>
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position} icon={L.icon({ iconUrl: "/images/marker-icon.png" })}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
                </Marker>
              </MapContainer>
            }
                        
              
          </Col>
            
            
            
           
        </Row>
        
        }</div>
  )
}
