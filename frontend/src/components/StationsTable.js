import { Space, Table, Tag } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';



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
            dataIndex: 'number of journeys starting from the station',
            key: 'number of journeys starting from the station',
          },
          {
            title: 'Number of journeys ending at the station',
            dataIndex: 'number of journeys ending at the station',
            key: 'number of journeys ending at the station',
          },
    ]

    const [dataStations, setDataStations] = useState([])
    const baseUrl = `http://localhost:5000/api/journeys`

    const fetchStations = async () => {
        try {
        const response = await axios.get(baseUrl)
        // console.log(response.data)
        // return response.data
        setDataStations(response.data)
        } catch (e) {
        throw new Error(e)
        }
    }

    useEffect(() => {
        fetchStations()
    },[])

    console.log(dataStations)
    const obj = dataStations.reduce((x,y)=>{
        if(x[y.departureStationName]) {
            x[y.departureStationName]++;
            return x;
        } else {
            let z={};
            z[y.departureStationName]=1;
            return Object.assign(x,z);
        }},{})
    console.log(obj)

    const sort = Object.entries(obj).map(value => value)
    console.log(sort)
    console.log(sort.map(e => ({ name: e[0], amount: e[1] }))
    )
  return (
    <div>{JSON.stringify(dataStations)}</div>
  )
}

