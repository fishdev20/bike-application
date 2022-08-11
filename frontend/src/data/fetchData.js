import { default as axios } from "axios"
import {STATION_URL, JOURNEYS_URL, ADDJOURNEY_URL} from "../config"

export async function fetchData(setState, url) {
    try {
        const response = await axios.get(url)
        setState(response.data)
    } catch (e) {
        throw new Error(e)
    }
}


export async function fetchAddress(setState, url) {
    try {
        const response = await axios.get(url)
        setState(response.data)
    } catch (e) {
        throw new Error(e)
    }
}


 export async function getStationAndId(setList) {

    const url = "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql";
    const QUERY = `
    {
      bikeRentalStations {
        name
        stationId
      }
    }
  `;
    fetch(url, {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({
        query: QUERY
        })
    })
        .then((response) => response.json())
        .then((data) => setList(data.data.bikeRentalStations));
    
}


export async function addJourneys(body) {
    fetch ( ADDJOURNEY_URL, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
}

export async function fetchStationInfo(stationId)  {
    try {
        const response = await axios.get(`${STATION_URL}/${stationId}`)
        const data = await response.data
        return data
    } catch (e) {
        throw new Error(e)
    }
}
