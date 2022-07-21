import { Space, Table, Tag } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useGlobal } from 'reactn';
import { fetchData, useFetchStationsInfo } from '../data/fetchData';



export default function StationsTable() {
    const column = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
          },
          {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
          },
          {
            title: 'Number of journeys starting from the station',
            dataIndex: 'journeysStart',
            key: 'journeysStart',
          },
          {
            title: 'Number of journeys ending at the station',
            dataIndex: 'journeysEnd',
            key: 'journeysEnd',
          },
    ]
    
    const [stations, setStations] = useGlobal('stations');
    const [stationInfoList, setStationInfoList] = useGlobal([])
    const [url] = useGlobal('url')

    const stationsUrl = `http://localhost:9000/api/stations`
    const journeysUrl = `http://localhost:9000/api/journeys`
    // const fetchStations = async () => {
    //     try {
    //     const response = await axios.get(baseUrl)
    //     setDataStations(response.data)
    //     } catch (e) {
    //     throw new Error(e)
    //     }
    // }

    useEffect(() => {
        fetchData(setStations,stationsUrl);
    },[])

    useEffect(() => {

    })

    const promsies = React.useMemo(() => {
      return stations.map( station => axios.get(`${url}/api/stations/${station._id}`))
    }, [])

    useEffect(() => {
        Promise.all(promsies).then(setStationInfoList)
    },[])

    console.log(stationInfoList)


    

    // console.log(stations)
    // const obj = stations.reduce((x,y)=>{
    //     if(x[y.departureStationName]) {
    //         x[y.departureStationName]++;
    //         return x;
    //     } else {
    //         let z={};
    //         z[y.departureStationName]=1;
    //         return Object.assign(x,z);
    //     }},{})
    // console.log(obj)

    // const sort = Object.entries(obj).map(value => value)
    // console.log(sort)
    // console.log(sort.map(e => ({ name: e[0], amount: e[1] }))
    // )

    console.log(stations)
    
    
    const stationsData = stations.map((station,index) => ({
      key: index + 1,
      name: station.name,
      address: `${station.address}, ${station.kaupunki}`,

    }))
  return (
    <div>
      {JSON.stringify(stations)}
    </div>
  )
}

