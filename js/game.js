"use strict";

/* Initializes game canvas */
let game = new Phaser.Game(640, 480, Phaser.CANVAS, 'game_canvas');

/* Initializes game states */
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('win', winState);

game.state.start('boot');
