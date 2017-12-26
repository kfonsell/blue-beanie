"use strict";

/* Initializes game canvas */
let game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game_canvas');

/* Initializes game states and levels */
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);

game.state.add('level_1', level_1_State);
game.state.add('level_2', level_2_State);

game.state.add('win', winState);
game.state.add('lose', loseState);
game.state.start('boot');
