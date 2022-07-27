import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '../styles/stations.scss'

import { Col, Row } from 'antd';
import EnvironmentTwoTone from '@ant-design/icons/EnvironmentTwoTone'

//map implement
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { fetchAddress } from '../data/fetchData';

export default function ExpandData({stationId}) {
    const [stationInfo,setStationInfo] = useState({})
    const [address, setAddress] = useState('')

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

    useEffect(() => {
      const url = `https://api.digitransit.fi/geocoding/v1/reverse?point.lat=${position[0]}&point.lon=${position[1]}&size=1"`
      fetchAddress(setAddress,url)
    },[position[0], position[1]])
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
                <Marker position={position} icon={L.icon({ iconUrl: "/images/hsllogo.png", iconSize: [20,20] })}>
                <Popup>
                    {address?.features?.[0].properties.label}
                </Popup>
                </Marker>
              </MapContainer>
            }
                        
              
          </Col>
            
            
            
           
        </Row>
        
        }</div>
  )
}
