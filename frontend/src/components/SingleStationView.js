/* eslint-disable default-case */
import { EnvironmentTwoTone } from '@ant-design/icons';
import { Col, Row, Tooltip } from 'antd';
import { sumBy } from 'lodash';
import React, { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useGlobal } from 'reactn';
import { fetchAddress, fetchStationInfo } from '../data/fetchData';
import bikeLoading from "../bikeLoading.json"
import arrowUp from "../arrowUp.json"
import '../styles/singleStationView.scss'

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Lottie from 'react-lottie';

const loadingOptions = {
  loop: true,
  autoplay: true, 
  animationData: bikeLoading,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

const arrowOptions = {
  loop: true,
  autoplay: true, 
  animationData: arrowUp,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}

export default function SingleStationView() {
    const [stationId] = useGlobal('stationId')
    const [stationInfo,setStationInfo] = useState({})
    const [address, setAddress] = useState('')
    const [ isLoading, setIsLoading ] = useState(false);
    const [journeys] = useGlobal('journeys')
    const [position, setPosition] = useState([])

    const fetchData = async () => {
      const fetchedInfo = await  fetchStationInfo(stationId)
      setIsLoading(false);
      setStationInfo(fetchedInfo)
      const coordinates = [parseFloat(fetchedInfo?.y), parseFloat(fetchedInfo?.x)]
      setPosition(coordinates) 
    }

    useEffect(() => {
        setIsLoading(true);
        stationId !== null && fetchData();
    },[stationId])

    useEffect(() => {
        const url = `https://api.digitransit.fi/geocoding/v1/reverse?point.lat=${position[0]}&point.lon=${position[1]}&size=1"`
        position[0] && fetchAddress(setAddress,url)
    },[position[0], position[1], stationId])

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
      return (averageDistance / 1000).toFixed(2)
    }
  return (
    <div
        className='expand-data'
        id='expand-data'
    >
      {stationId === null ? 
        <h1>This is the infomation of a single station, please click a staion on the table!</h1>
        : <div className='station'>
            {isLoading ? 
              <Lottie options={loadingOptions}
                  height={350}
                  width={350}
              /> : 
              <div>
                <div className='station-heading'>
                  <div>
                    <h1>{stationInfo.name}</h1>
                    <h4>{stationInfo.address}, {stationInfo.kaupunki}</h4>
                  </div>
                  <div 
                  className='arrow-btn'
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  >
                    <Tooltip 
                      title="See the station table!" 
                      placement="topRight"
                    >
                      <div>
                        <Lottie options={arrowOptions}
                              height={70}
                              width={70}
                        />
                      </div>
                    </Tooltip>
                  </div>
                </div>
              <Row >
                <Col md={12} xs={24} className='station-info'>
                  <h4>- Total number of journeys starting from the station: <span>{stationInfo.journeysStart}</span> journeys</h4>
                  <h4>- Total number of journeys ending at the station: <span>{stationInfo.journeysEnd}</span> journeys</h4>
                  <h4>- The average distance of a journey starting from the station: { !isNaN(calculateAverageDistance('START')) ? calculateAverageDistance('START') : 0} km</h4>
                  <h4>- The average distance of a journey ending at the station: {!isNaN(calculateAverageDistance('END')) ? calculateAverageDistance('END') : 0} km</h4>
                    
                </Col>
                <Col md={12} xs={24}>
                    {position[0] !== undefined && 
                    <MapContainer style={{width: '100%',height: 400, borderRadius: 20}} center={position} zoom={10}>
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
              </div>
            }
          </div>
      }
    </div>
  )
}
