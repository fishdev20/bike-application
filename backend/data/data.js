const mongodb = require("mongodb").MongoClient;
const csvtojson = require("csvtojson");
const stationsModel = require("../models/stationsModel");
const journeysModel = require("../models/journeysModel");


//import stations
const importStations = () => {
    csvtojson()
  .fromFile("stations.csv")
  .then(csvData => {
    sendStations(csvData)
    // mongodb.connect(
    //   url,
    //   { useNewUrlParser: true, useUnifiedTopology: true },
    //   (err, client) => {
    //     if (err) throw err;
    //     client
    //       .db("bike-app")
    //       .collection("stations")
    //       .insertMany(csvData, (err, res) => {
    //         if (err) throw err;
    //         console.log(`Inserted: ${res.insertedCount} rows`);
    //         client.close();
    //       });
    //   }
    // );
});
}
// importStations();


const sendStations = async (stations) => {
    for (const obj of stations) {
      if (obj.Kaupunki === '') {
        const station = new stationsModel({
          nimi: obj.Nimi,
          namn: obj.Namn,
          name: obj.Name,
          osoite: obj.Osoite,
          address: obj.Adress,
          kaupunki: 'Helsinki',
          stad: 'Helsingfors',
          x: obj.x,
          y: obj.y,
        })
        station.save()
      } else {
        const station = new stationsModel({
          nimi: obj.Nimi,
          namn: obj.Namn,
          name: obj.Name,
          osoite: obj.Osoite,
          address: obj.Adress,
          kaupunki: obj.Kaupunki,
          stad: obj.Stad,
          x: obj.x,
          y: obj.y,
        })
        station.save()
      }
    }
  }



//import Journey
const journeyFiles = ["2021-05.csv","2021-06.csv","2021-07.csv"]
const headers = [
  'departureAt',
  'returnAt',
  'departureStationId',
  'departureStationName',
  'returnStationId',
  'returnStationName',
  'distance',
  'duration',
]
const readJourneys = async (file) => {
  csvtojson({
      ignoreEmpty: true,
      headers: headers
    }
  )
  .fromFile(file)
  .then(csvData => {
    const filteredData = csvData.filter((obj) => {
      return Number(obj.distance) >= 10 && Number(obj.duration) >= 10
    })
    filteredData.splice(1000, filteredData.length)
    sendJourneys(filteredData)
  });
}

const sendJourneys = async (journeys) => {
    journeysModel.insertMany(journeys, (err, res) => {
      if (err) throw err;
      console.log(`added in db`);
    })
}

const getJourneyData = async () => {
  for(const file of journeyFiles) {
    await readJourneys(file)
  }
}

// getJourneyData()

  