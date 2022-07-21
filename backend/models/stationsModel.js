const mongoose = require('mongoose')

const stationsSchema = new mongoose.Schema({
  nimi: String,
  namn: String,
  name: String,
  osoite: String,
  address: String,
  kaupunki: String,
  stad: String,
  x: String,
  y: String,
})

stationsSchema.index({name: 'text'})


mongoose.model('stations', stationsSchema).createIndexes({name: 'text'})

module.exports = mongoose.model('stations', stationsSchema)