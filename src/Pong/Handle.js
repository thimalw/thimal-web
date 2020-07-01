function Handle(elementId) {
    this.element = document.getElementById(elementId);

    this.y = 0;
}

Handle.prototype.setPosition = function(y) {
    this.y = y;

    this.element.style.top = `${y}px`;
}

export default Handle;