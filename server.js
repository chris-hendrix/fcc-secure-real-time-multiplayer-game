require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const expect = require('chai');
const socket = require('socket.io');
const helmet = require('helmet');

const fccTestingRoutes = require('./routes/fcctesting.js');
const runner = require('./test-runner.js');

const app = express();

// helmet
app.use(helmet())
app.use(helmet.noSniff());
app.use(helmet.xssFilter());
app.use(helmet.noCache());
app.use(helmet.hidePoweredBy({ setTo: 'PHP 7.4.3' }));

app.use('/public', express.static(process.cwd() + '/public'));
app.use('/assets', express.static(process.cwd() + '/assets'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  }); 

//For FCC testing purposes
fccTestingRoutes(app);
    
// 404 Not Found Middleware
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

const portNum = process.env.PORT || 3000;

// Set up server and tests
const server = app.listen(portNum, () => {
  console.log(`Listening on port ${portNum}`);
  if (process.env.NODE_ENV==='test') {
    console.log('Running Tests...');
    setTimeout(function () {
      try {
        runner.run();
      } catch (error) {
        console.log('Tests are not valid:');
        console.error(error);
      }
    }, 1500);
  }
});


// random avatar generator
// https://github.com/maiconfriedel/random-avatar-generator
const {AvatarGenerator} = require('random-avatar-generator')
const generator = new AvatarGenerator()

// require objects
const Collectible = require('./public/Collectible');
const Player = require('./public/Player');

// set default field dimensions
const fieldWidth = 640;
const fieldHeight = 440;

// setup player list
let players = [];
let collectibles = [createCollectible()];

// setup socket
const io = socket(server)

// user connecting
io.on("connection", (socket) => {
  

  // connected
  let id = socket.id.substr(-4)
  console.log('Player ' + id + ' connected')

  // create player and start game
  let player = createPlayer(id)
  players.push(player)

  // start client
  socket.emit('start', {
    player: player, 
    players: players, 
    collectibles: collectibles,
    fieldWidth: fieldWidth, 
    fieldHeight: fieldHeight
    });
  
  //io.emit('update', {players: players, collectibles: collectibles})

  // update from client moving
  socket.on('move', (player) => {
    player = new Player(player)

    // check for collision
    let hit = null
    collectibles.forEach(c => {
      if (player.collision(c)){
        hit = c
        player.score += hit.value
      }
    })

    // remove collectible if hit and add new
    if(hit) {
      collectibles = collectibles.filter(c => c.id !== hit.id)
      collectibles.push(createCollectible())
    }

    // update player in server list
    players.forEach(p => p.id === player.id ? p = Object.assign(p, player) : p = p)
    player = players.filter(p => p.id===player.id)[0]

    // emit update
    io.emit('update', {players: players, collectibles: collectibles})
  })

  //user disconnecting
  socket.on('disconnect', () =>{
    let id = socket.id.substr(-4)
    console.log('Player ' + id + ' disconnected')
    players = players.filter(p => p.id !== socket.id)
    //console.log(players)
    io.emit('update', {players: players, collectibles: collectibles})
  })
});

function createCollectible(){
  return new Collectible({
    x: Math.floor(getRandomBetween(0.1,0.9)*fieldWidth),
    y: Math.floor(getRandomBetween(0.1,0.9)*fieldHeight),
    value: Math.floor(Math.random()*100), 
    id: Math.random().toString(36).substr(2, 9),
    radius: Math.floor(getRandomBetween(10,50)),
    avatar: 'https://freeiconshop.com/wp-content/uploads/edd/star-curved-flat.png'
  })
}

function createPlayer(id) {
  return new Player({
    x: Math.floor(getRandomBetween(0.1,0.9)*fieldWidth),
    y: Math.floor(getRandomBetween(0.1,0.9)*fieldHeight),
    score: 0, 
    id:id,
    avatar: generator.generateRandomAvatar()
  })
}

function getRandomBetween(min, max) {
  return Math.random() * (max - min) + min;
}


module.exports = app; // For testing
