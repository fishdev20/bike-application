import React, { useEffect, useState } from 'react'
import axios from 'axios';
import EnvironmentTwoTone from '@ant-design/icons/EnvironmentTwoTone'

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

    console.log(stationInfo)
  return (
    <div>
        {!Boolean(stationInfo.name) ? 
        'Loading...' : 
        <div>
            <h4>Total number of journeys starting from the station: {stationInfo.journeysStart} journeys</h4>
            <h4>Total number of journeys ending at the station: {stationInfo.journeysEnd} journeys</h4>
            <h4> <EnvironmentTwoTone /> Location: </h4>
        </div>
        
        }</div>
  )
}
