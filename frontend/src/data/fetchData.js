import { default as axios } from "axios"
import React from 'react';
import {useGlobal} from 'reactn';

export async function fetchData(setState, url) {
    try {
        const response = await axios.get(url)
        setState(response.data)
    } catch (e) {
        throw new Error(e)
    }
}


export const useFetchStationsInfo = ({stations}) => {
    const [url] = useGlobal('url')
    const [stationInfoList, setStationInfoList] = React.useState(null)

    const promsies = React.useMemo(() => {
        return stations.map( station => axios.get(`${url}/api/stations/${station._id}`))
    }, [stationInfoList])

    React.useEffect(() => {
        Promise.all(promsies).then(setStationInfoList)
    },[])
    console.log(stationInfoList)
    return stationInfoList;
}

