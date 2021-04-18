class Collectible {
  constructor({x, y, value, id, avatar}) {
    this.x = x
    this.y = y
    this.value = value
    this.id = id
    this.radius = Math.floor(Math.random() * (50 - 10) + 10),
    this.avatar = avatar
  }

}

/*
  Note: Attempt to export this for use
  in server.js
*/
try {
  module.exports = Collectible;
} catch(e) {}

export default Collectible;

