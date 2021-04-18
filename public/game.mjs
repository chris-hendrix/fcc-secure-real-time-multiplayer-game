import Player from './Player.mjs';
import Collectible from './Collectible.mjs';

const socket = io();
const canvas = document.getElementById('game-window');
const context = canvas.getContext('2d');

const keyMap = {
  'ArrowLeft': 'left',
  'ArrowUp': 'up',
  'ArrowRight': 'right',
  'ArrowDown': 'down'
}

let myPlayers = null;
let myPlayer = null;
let myCollectibles = null;
let fieldWidth = 640;
let fieldHeight = 440;
let topBuffer = 40

const start = () => {
  socket.on('start', ({player, players, collectibles, fieldWidth, fieldHeight})=>{

    // refresh every 0.5s
    setInterval(refresh, 0.5*1000)
    
    // setup
    myPlayer = new Player(player)
    myPlayers = players
    myCollectibles = collectibles
    topBuffer = canvas.height - fieldHeight
    refresh()

    // refresh on move
    socket.on('update',({players, collectibles})=>{
      myPlayer = new Player(players.filter(p => myPlayer.id === p.id)[0])
      myPlayers = players
      myCollectibles = collectibles
      refresh()
    })
    
    // moving player
    document.onkeydown = e =>{
      let dir = keyMap[e.key]
      if( dir==undefined ) {return}
      myPlayer.movePlayer(dir,30, fieldWidth, fieldHeight)
      socket.emit('move', myPlayer)
    }
  })
  refresh()
}



const refresh = () => {

  // draw playing field
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = 'lightGrey';
  context.fillRect(0, 0, canvas.width, canvas.height);

  // draw border
  context.fillStyle = 'black';
  context.fillRect(0, 0, canvas.width, topBuffer);
  context.strokeStyle = 'black'
  context.strokeRect(0, topBuffer, fieldWidth, fieldHeight)

  // display info
  var playerText = 'Player: ' + myPlayer.id
  var scoreText = 'Score: ' + myPlayer.score
  var rankText = myPlayer.calculateRank(myPlayers)

  context.fillStyle = 'white';
  context.font = '20px Arial'
  context.textAlign = 'center';
  context.fillText(playerText, canvas.width*0.25, topBuffer*0.75);
  context.textAlign = 'center';
  context.fillText(scoreText, canvas.width*0.50, topBuffer*0.75);
  context.textAlign = 'center';
  context.fillText(rankText, canvas.width*0.75, topBuffer*0.75);

  // draw players
  myPlayers.forEach(p => draw(p))

  // draw collectibles
  myCollectibles.forEach(c => draw(c))
}


function draw(item) {
  let x = item.x - item.radius
  let y = canvas.height - item.y - item.radius

  if (item.avatar) {
    var img = new Image
    img.src = item.avatar
    context.drawImage(img, x, y, 2*item.radius, 2*item.radius);
  } else {
    context.beginPath();
    context.arc(x, y, item.radius, 0, 2 * Math.PI);
    context.stroke();
  }
  
}

//setInterval(refresh(players),0.5*1000)

start();