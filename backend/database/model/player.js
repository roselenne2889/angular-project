const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Player = new Schema({
  player_name: {
    type: String
  },
  player_rank: {
    type: Array
  },
  score: {
    type: Number
  },
  time: {
    type: String
  },
  favorite_game: {
    type: Array
  },
  status: {
    type: Array
  }
}, {
  collection: 'players'
})

module.exports = mongoose.model('Player', Player)