import Pong from './Pong';

var game = new Pong('game', 'handle', 'disc');

game.init();

window.addEventListener('resize', function () {
    game.resizeScreen();
});