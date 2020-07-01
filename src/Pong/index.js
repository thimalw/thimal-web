import Ball from './Ball';
import Handle from './Handle';

function Pong() {
    this.handle = new Handle('handle');
    this.ball = new Ball('ball', 0, 0);

    this.speedX = 5;
    this.speedY = 5;
}

Pong.prototype.init = function() {
    window.requestAnimationFrame(this.gameLoop.bind(this));
}

Pong.prototype.gameLoop = function() {
    // Update ball position
    var ballX = this.ball.x + this.speedX;
    var ballY = this.ball.y + this.speedY;
    this.ball.setPosition(ballX, ballY);

    window.requestAnimationFrame(this.gameLoop.bind(this));
}

export default Pong;