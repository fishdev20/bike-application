import React, { setGlobal } from 'reactn';

setGlobal({
    STATION_URL: 'http://localhost:9000/api/stations',
    JOURNEYS_URL: 'http://localhost:9000/api/journeys',
    ADDJOURNEY_URL: '',
    stations: [],
    journeys: [],
    stationInfoList: []
});