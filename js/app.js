// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // set initial location and speed of the enemy
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x > 505) {
        // if enemy has reached the end of the board, it should loop back around
        this.x = -101;  // set x to -101 so bug is off-screen
    }
    else {
        this.x = this.x + (this.speed * dt);
        this.checkCollisions();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Detect collision with player
Enemy.prototype.checkCollisions = function() {
   if((Math.abs(this.x - player.x) < 50) && (Math.abs(this.y - player.y) < 65)) {
        // reset player to start square upon collision
        player.x = 200;
        player.y = 404;
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.sprite = 'images/char-princess-girl.png';
    this.x = x;
    this.y = y;
}

Player.prototype.update = function(step) {

}

Player.prototype.handleInput = function(key_pressed) {
    // move player in correct direction based on key press
    // but also check that the player isn't at the edge so
    // they can't run off the screen
    switch(key_pressed) {
        case 'up':
            if(this.y <= -11) {
                this.y;
                // end game
                endGame();
            }
            else {
                this.y -= 83;
            }
            break;
        case 'down':
            if(this.y >= 404) {
                this.y;
            }
            else {
                this.y += 83;
            }
            break;
        case 'left':
            if(this.x <= -2) {
                this.x;
            }
            else {
                this.x -= 101;
            }
            break;
        case 'right':
            if(this.x >= 402) {
                this.x;
            }
            else {
                this.x += 101;
            }
            break;
    }
    // console.log(this.x, this.y);
}

// Draw player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(60, 60, 140), new Enemy(0, 140, 200), new Enemy(-60, 220, 180)];
var player = new Player(200, 404);


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

// function to end game when player reaches water
function endGame() {
    player.x = 200;
    player.y = 404;
}