// random avatar generator
// https://github.com/maiconfriedel/random-avatar-generator

class Player {
  constructor({x, y, score, id, avatar}) {
    this.x = x;
    this.y = y;
    this.score = score;
    this.id = id
    this.radius = 20;
    this.avatar = avatar
  }

  movePlayer(dir, speed, xMax, yMax) {
    let dirs = moves[dir]
    if(dirs == null) { return }

    var x = this.x + dirs[0]*speed;
    var y = this.y + dirs[1]*speed;
    
    // cancel move if out of bounds
    if (x < 0 + this.radius) {x = this.x}
    if (y < 0 + this.radius) {y = this.y}
    if (x > xMax - this.radius) {x = this.x}
    if (y > yMax - this.radius) {y = this.y}

    // set new positions
    this.x = x
    this.y = y
  }

  collision(item) {
    var dx = this.x - item.x
    var dy = this.y - item.y
    var distance = Math.sqrt(dx * dx + dy * dy);
    return distance < this.radius + item.radius
  }

  calculateRank(arr) {
    let rank = 1;
    let players = arr.length
    // count number of players with higher scores
    arr.forEach(p=>{
      if(p.score > this.score) {rank+=1}
    })
    
    return `Rank: ${rank}/${players}`
  }

  playerNo(arr) {
    return arr.findIndex(p => this.id === p.id) + 1
  }

  
}

const moves = {
  'left': [-1,0],
  'right': [1,0],
  'up': [0,1],
  'down': [0,-1]
}

try {
  module.exports = Player;
} catch(e) {}

export default Player;
