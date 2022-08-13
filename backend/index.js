const dotenv = require('dotenv').config({ path: '../backend/.env' })
const express = require('express')
const cors = require('cors')
const dbConnection = require ('./db');
const Stations = require('./models/stationsModel')


const importStations = require('./data/data');
const Journeys = require('./models/journeysModel');


const app = express()
app.use(express.json());
app.use(cors())

const url = process.env.PORT

const PORT = process.env.PORT || 9000;





app.get('/', (req, res) => {
    res.send('<h1>Welcome Minh<h1>')
})

// app.get('/api/stations', async (req, res) => {
//   const skip = req.query.skip ? Number(req.query.skip) : 0;
//   const search = new ApiSearch(stations.find(), req.query)
//   let searchQuery = {};
//   if(req.query.search) {
    
//   }
//   const default_limit = 10;
//   stations
//   .find()
//   .skip(skip)
//   .limit(default_limit)
//   .then((stations) => {
//     res.json(stations)
//   })
// })

//STATIONS ENDPOINT
app.get('/api/stations', async (req, res) => {
  try {
    const features = new Apifeatures(Stations.find(), req.query)
    // .paginating()
    .searching()
    const stationsRes = await features.query

    return res.status(200).json(stationsRes)
  } catch (err) {
    return res.status(500).json({msg: err.message})
  }
})

app.get('/api/stations/:id', async (req, res) => {
  const station = await Stations.findById(req.params.id)
  const journeysStart = await Journeys.countDocuments({
    departureStationName: station.name,
  })
  const journeysEnd = await Journeys.countDocuments({
    returnStationName: station.name,
  })
  const stationInfo = {
    journeysStart: journeysStart,
    journeysEnd: journeysEnd,
    nimi: station.nimi,
    namn: station.namn,
    name: station.name,
    osoite: station.osoite,
    address: station.address,
    kaupunki: station.kaupunki,
    stad: station.stad,
    x: station.x,
    y: station.y,
  }
  res.json(stationInfo)
})

app.post('/api/addStation', (req, res) => {
  console.log(req.body)
  // const doc = new Stations({})
})

//JOURNEYS ENDPOINT
app.get('/api/journeys', async (req, res) => {
  try {
    const features = new Apifeatures(Journeys.find(), req.query)
    // .paginating()
    // .searching()
    const journeysRes = await features.query

    return res.status(200).json(journeysRes)
  } catch (err) {
    return res.status(500).json({msg: err.message})
  }
})



// app.get('/api/journeys', async (req, res) => {
//   const PAGE_SIZE = req.query.size || 50
//   const page = parseInt(req.query.page || "0")
//   const total = await Journeys.countDocuments({})
//   const journeys = await Journeys.find({}).limit(PAGE_SIZE).skip(PAGE_SIZE * page)

//   return res.json({
//     total: Math.ceil(total / PAGE_SIZE),
//     journeys
//   })
// })


app.get('/api/journeys/:id', (req, res) => {
  Journeys.findById(req.params.id).then((journey) => {
    res.json(journey)
  })
})
  

app.post('/api/addJourneys', (req, res) => {
  if (!req.body.departure) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  const newJourney = new Journeys({
    departureAt: req.body.departureAt,
    returnAt: req.body.returnAt,
    departureStationId: req.body.departureId,
    departureStationName: req.body.departure,
    returnStationId: req.body.returnId,
    returnStationName: req.body.return,
    distance: req.body.distance,
    duration: req.body.duration,
  })
  newJourney.save()
})
  
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

//API feature
function Apifeatures(query, queryString) {
  this.query = query;
  this.queryString = queryString;

  this.paginating = () => {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 50;
    const skip = limit * (page - 1)
    this.query = this.query.limit(limit).skip(skip)
    return this;
  }

  this.searching = () => {
    const search = this.queryString.search
    if(search) {
      this.query = this.query.find({
        $text: { $search: search}
      })
    } else {
      this.query = this.query.find()
    }
    return this;
  }

  this.filtering = () => {
    const search = this.queryString.search
    if(search) {
      this.query = this.query.find({
        $text: { $search: search}
      })
    } else {
      this.query = this.query.find()
    }
    return this;
  }
}
