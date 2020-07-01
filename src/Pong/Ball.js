function Ball(elementId, x, y) {
    this.element = document.getElementById(elementId);

    this.x = x;
    this.y = y;
}

Ball.prototype.setPosition = function(x, y) {
    this.x = x,
    this.y = y,
    
    this.element.style.top = `${y}px`;
    this.element.style.left = `${x}px`;
}

export default Ball;