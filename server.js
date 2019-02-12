var app = require('express')();
var cors = require('cors')
var server = require('http').Server(app);
var io = require('socket.io')(server);


const bodyParser = require('body-parser');
const axios = require("axios");
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
const mongoose  = require ('mongoose');

require('dotenv').config()


const port = process.env.PORT || 4001;

var Rooms = require('./Models/Rooms')


server.listen(port, () => console.log(`Listening on port ${port}`));


// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Rooms {
    _id: ID!
    name:String!
    description:String!
  }
  input RoomsInput {
    name:String!
    description:String!
  }
  type RootQuery {
    rooms: [Rooms!]!
  }
  type RootMutation {
      createRooms(roomsInput : RoomsInput): Rooms
  }
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
// The root provides a resolver function for each API endpoint
var root = {
  rooms: () =>{
    return Rooms.find()
          .then(rooms => {
            return rooms.map(room => {
              return { ...room._doc, _id: room.id };
            });
          })
          .catch(err => {
            throw err;
          });;
  },
  createRooms: args => {
       var room = new Rooms({
         name: args.roomsInput.name,
         description: args.roomsInput.description,
       });
       return room
         .save()
         .then(result => {
           console.log(result);
           return { ...result._doc, _id: result._doc._id.toString() };
         })
         .catch(err => {
          console.log("error happened")
           console.log(err);
           throw err;
         });
     }
};

app.use(cors())

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.use(bodyParser.json());

console.log(process.env.DBURL)
mongoose.connect(process.env.DBURL, {useNewUrlParser: true})
.then(function (){

  console.log('connected');


})
.catch(function (err){
  console.log(err)
})





io.origins((origin, callback) => {

  if (origin !== process.env.REACTURL) {
    return callback('origin not allowed', false);
  }
  console.log("allowed")
  callback(null, true);

});

io.on("connection", socket => {
  socket.on('hello',() =>{console.log('hello')})
  socket.on('tick',(playState) =>{

              io.emit('tick-on',playState)
            })
  socket.on('gameOver',(gameState) =>{

              io.emit('applyGameOver',gameState)
            })
  socket.on('reset',() =>{

              io.emit('applyReset')
            })
  console.log("New client connected")
  socket.on("disconnect", () => console.log("Client disconnected"));
});
