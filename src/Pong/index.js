import Disc from './Disc';
import Handle from './Handle';

function Pong(screenId, handleId, discId) {
    this.screenElement = document.getElementById(screenId);
    this.handle = new Handle(handleId);
    this.disc = new Disc(discId, 0, 0);

    this.speedX = 5;
    this.speedY = 5;

    this.screenTop = 0;
    this.screenBottom = this.screenElement.clientHeight;
    this.screenLeft = 0;
    this.screenRight = this.screenElement.clientWidth;

    this.mouseY = 0;
}

Pong.prototype.init = function() {
    document.onmousemove = this.updateMouse.bind(this);
    
    window.requestAnimationFrame(this.gameLoop.bind(this));
}

Pong.prototype.updateMouse = function(e) {
    this.mouseY = e.clientY;
}

Pong.prototype.resetDisc = function() {
    this.speedX = 5;
    this.speedY = Math.floor(Math.random() * (6 - -6 + 1) + -6);

    if (this.speedY == 0) {
        this.speedY = 1;
    }

    this.disc.setPosition(this.screenBottom / 2, this.screenRight / 2);
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
        this.resetDisc();
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

    window.requestAnimationFrame(this.gameLoop.bind(this));
}

export default Pong;