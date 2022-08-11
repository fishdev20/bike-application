/* eslint-disable default-case */
import { EnvironmentTwoTone } from '@ant-design/icons';
import { Col, Row } from 'antd';
import { sumBy } from 'lodash';
import React, { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useGlobal } from 'reactn';
import { fetchAddress, fetchStationInfo } from '../data/fetchData';
import bikeLoading from "../bikeLoading.json"
import '../styles/singleStationView.scss'

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Lottie from 'react-lottie';

export default function SingleStationView() {
    const [stationId] = useGlobal('stationId')
    const [stationInfo,setStationInfo] = useState({})
    const [address, setAddress] = useState('')
    const [ isLoading, setIsLoading ] = useState(false);
    const [journeys] = useGlobal('journeys')
    const [position, setPosition] = useState([])

    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: bikeLoading,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    };

    useEffect(() => {
        setIsLoading(true);
        fetchData();
    },[stationId])

    useEffect(() => {
        const url = `https://api.digitransit.fi/geocoding/v1/reverse?point.lat=${position[0]}&point.lon=${position[1]}&size=1"`
        position[0] && fetchAddress(setAddress,url)
    },[position[0], position[1], stationId])

    const fetchData = async () => {
        const fetchedInfo = await  fetchStationInfo(stationId)
        setIsLoading(false);
        setStationInfo(fetchedInfo)
        const coordinates = [parseFloat(fetchedInfo?.y), parseFloat(fetchedInfo?.x)]
        setPosition(coordinates)
        
    }

    const calculateAverageDistance = (kind) => {
      let filteredInfo
      switch(kind) {
        case 'START':
          filteredInfo = journeys?.filter(journey => journey.departureStationName === stationInfo.name)
          break;
        case 'END': 
          filteredInfo = journeys?.filter(journey => journey.returnStationName === stationInfo.name)
          break;
      }
      const averageDistance = sumBy(filteredInfo, (item) => {return item.distance}) / filteredInfo?.length
      return averageDistance.toFixed(2)
    }
  return (
    <div
        className='expand-data'
        id='expand-data'
    >
         {isLoading ? 
            <Lottie options={defaultOptions}
                height={350}
                width={350}
            /> : 
            <Row>
            <Col md={12} xs={24}>
                <h4>- Total number of journeys starting from the station: <span>{stationInfo.journeysStart}</span> journeys</h4>
                <h4>- Total number of journeys ending at the station: <span>{stationInfo.journeysEnd}</span> journeys</h4>
                <h4>- The average distance of a journey starting from the station: { !isNaN(calculateAverageDistance('START')) ? calculateAverageDistance('START') : 0} km</h4>
                <h4>- The average distance of a journey ending at the station: {!isNaN(calculateAverageDistance('END')) ? calculateAverageDistance('END') : 0} km</h4>
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
        }
      </div>
  )
}
