const mongoose = require('mongoose')

var Schema = mongoose.Schema

const roomsSchema = new Schema ({
    name:{
      type: String,
      required:true
    },
    description:{
      type: String,
      required:true
    }
})

module.exports = mongoose.model('Rooms',roomsSchema)
