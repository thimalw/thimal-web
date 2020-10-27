import Disc from './Disc';
import Handle from './Handle';

function Pong(screenId, handleId, discId) {
    this.score = `Still going strong ${String.fromCodePoint(0x1F389)} Keep it up!`;
    this.scoreInt = 0;
    
    this.screenElement = document.getElementById(screenId);
    this.handle = new Handle(handleId);
    this.disc = new Disc(discId, 5, 5);

    this.speedX = 5;
    this.speedY = 5;
    this.deltaY = 0;

    this.screenTop = 0;
    this.screenBottom = this.screenElement.clientHeight;
    this.screenLeft = 0;
    this.screenRight = this.screenElement.clientWidth;

    this.mouseY = 0;
    this.mouseYPrev = 0;
}

Pong.prototype.init = function() {
    document.onmousemove = this.handleMouseInput.bind(this);
    document.ontouchmove = this.handleTouchInput.bind(this);
    
    window.requestAnimationFrame(this.gameLoop.bind(this));
}

Pong.prototype.resizeScreen = function() {
    this.screenBottom = this.screenElement.clientHeight;
    this.screenRight = this.screenElement.clientWidth;
}

Pong.prototype.handleMouseInput = function(e) {
    this.updateInput(e.clientY);
}

Pong.prototype.handleTouchInput = function(e) {
    this.updateInput(e.touches[0].clientY);
}

Pong.prototype.updateInput = function(y) {
    this.mouseYPrev = this.mouseY;
    this.mouseY = y;

    this.deltaY = Math.floor((this.mouseY - this.mouseYPrev) / 2);
    
    if (this.deltaY > 10) {
        this.deltaY = 10;
    }

    if (this.deltaY < -10) {
        this.deltaY = -10;
    }
}

Pong.prototype.computerScored = function() {
    this.scoreInt++;

    this.score = `You've let the disc through ${this.scoreInt} times ${String.fromCodePoint(0x1F92D)}`;
    window.score = this.score;
    
    this.resetDisc();
}

Pong.prototype.resetDisc = function() {
    this.speedX = 5;
    this.speedY = Math.floor(Math.random() * (6 - -6 + 1) + -6);

    if (this.speedY == 0) {
        this.speedY = 1;
    }

    this.disc.setPosition(Math.floor(this.screenRight / 2), Math.floor(this.screenBottom / 2));
}

Pong.prototype.gameLoop = function() {
    // Check bounds
    if (this.disc.y + 50 >= this.screenBottom) {
        this.speedY = -Math.abs(this.speedY);
    }
    
    if (this.disc.y <= this.screenTop) {
        this.speedY = Math.abs(this.speedY);
    }

    if (this.disc.x + 50 >= this.screenRight) {
        this.speedX = -Math.abs(this.speedX);
    }

    if (this.disc.x <= this.screenLeft) {
        this.computerScored();
    }

    // Update handle position
    var handleY = this.mouseY - 50;

    if (handleY < this.screenTop) {
        handleY = 0;
    }

    if (handleY + 100 > this.screenBottom) {
        handleY = this.screenBottom - 100;
    }
    
    this.handle.setPosition(handleY);
    
    // Update disc position
    var discX = this.disc.x + this.speedX;
    var discY = this.disc.y + this.speedY;
    this.disc.setPosition(discX, discY);

    // Check if handle hits the disc
    if (this.disc.x <= 42 && this.disc.x >= 32) {
        if (this.disc.y + 50 >= this.handle.y && this.disc.y <= this.handle.y + 100) {
            this.speedX = Math.abs(this.speedX);

            if (this.speedX < 20) {
                this.speedX++;
            }

            this.speedY += this.deltaY;

            if (this.speedY > 20) {
                this.speedY = 20;
            }
        }
    }

    window.requestAnimationFrame(this.gameLoop.bind(this));
}

export default Pong;