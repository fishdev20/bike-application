import { default as axios } from "axios"

export async function fetchData(setState, url) {
    try {
        const response = await axios.get(url)
        setState(response.data)
    } catch (e) {
        throw new Error(e)
    }
}

export async function fetchJourneysByStationName(setState, url) {
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
    const url = `http://localhost:9000/api/addJourneys`
    fetch ( url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
}

