import Ball from './Ball';
import Handle from './Handle';

function Pong(screenId, handleId, ballId) {
    this.screenElement = document.getElementById(screenId);
    this.handle = new Handle(handleId);
    this.ball = new Ball(ballId, 0, 0);

    this.speedX = 5;
    this.speedY = 5;

    this.screenTop = 0;
    this.screenBottom = this.screenElement.clientHeight;
    this.screenLeft = 0;
    this.screenRight = this.screenElement.clientWidth;
}

Pong.prototype.init = function() {
    window.requestAnimationFrame(this.gameLoop.bind(this));
}

Pong.prototype.resetBall = function() {
    this.speedX = 5;
    this.speedY = Math.floor(Math.random() * (6 - -6 + 1) + -6);

    if (this.speedY == 0) {
        this.speedY = 1;
    }

    this.ball.setPosition(this.screenBottom / 2, this.screenRight / 2);
}

Pong.prototype.gameLoop = function() {
    // Check bounds
    if (this.ball.y + 50 >= this.screenBottom) {
        this.speedY = -Math.abs(this.speedY);
    }
    
    if (this.ball.y <= this.screenTop) {
        this.speedY = Math.abs(this.speedY);
    }

    if (this.ball.x + 50 >= this.screenRight) {
        this.speedX = -Math.abs(this.speedX);
    }

    if (this.ball.x <= this.screenLeft) {
        this.resetBall();
    }
    
    // Update ball position
    var ballX = this.ball.x + this.speedX;
    var ballY = this.ball.y + this.speedY;
    this.ball.setPosition(ballX, ballY);

    window.requestAnimationFrame(this.gameLoop.bind(this));
}

export default Pong;