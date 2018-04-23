// Enemies our player must avoid
let enemyW = 97, enemyH = 67;
// DETERMINE ENEMIES POSITION:
class Enemy {
  constructor(horizontal, vertical, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = horizontal;
    this.y = vertical;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
  }
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

// ENEMIES MOVEMENET AND CHANGE THEY SPEED RANDOMLY WHEN THEY GET OUT THE CONTAINER:
  update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > 540) {
      this.x = -70;
      this.speed = Math.random() * 700;
    } else {
      this.x += this.speed*dt;
    }

  // WHEN ENEMIES HIT THE PLAYER:
  // https://developer.mozilla.org/kab/docs/Games/Techniques/2D_collision_detection
    if (player.plyHorizontal < this.x + enemyW &&
      player.plyHorizontal + enemyW > this.x &&
      player.plyVertical < this.y + enemyH && 
      enemyH + player.plyVertical > this.y) {

      player.plyHorizontal = 200;
      player.plyVertical = 400;
    }
  }

// Draw the enemy on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };
}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// DETERMINE PLAYER POSITION:
class Ply {
  constructor (plyHorizontal, plyVertical) { 
    this.plyHorizontal = plyHorizontal;
    this.plyVertical = plyVertical;
    this.sprite = 'images/char-boy.png';
  }
  // WHEN THE PLAYER TOUCHES THE EDGES
  update(dt) {
    if (this.plyHorizontal > 405) {this.plyHorizontal = 400}; //RIGHT
    if (this.plyHorizontal < 0) { this.plyHorizontal = 0}; //LEFT
    if (this.plyVertical < -50) { this.plyVertical = 400}; //UP
    if (this.plyVertical > 400) { this.plyVertical = 400}; //DOWN
  };

  render() {
      ctx.drawImage(Resources.get(this.sprite), this.plyHorizontal, this.plyVertical);
  };
  // ACTICATE DIRECTIONS:
  handleInput(key) {
    switch (key) {
      case 'left':
        this.plyHorizontal -=  100;
        break;

      case 'up':
        this.plyVertical -= 85;
        break;

      case 'right':
        this.plyHorizontal +=  100;
        break;

      case 'down':
        this.plyVertical += 85;
        break;
    }
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [], player = new Ply (200, 400), y = 65;
// 
for (let i = 1; i <= 3 ; i++) {
    let speed = Math.random() * 500;
    let bugs = new Enemy( 0, y, speed);
    allEnemies.push(bugs);
    y = y + 80;
}
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});