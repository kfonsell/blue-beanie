"use strict";

/* Initializes game canvas */
let game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game_canvas');

/* Initializes game states and levels */
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);

game.state.add('level_1', level_1_State);
game.state.add('level_2', level_2_State);
game.state.add('level_3', level_3_State);

/* Game over screen for each level */
game.state.add('game_restart_1', gameRestart_1);
game.state.add('game_restart_2', gameRestart_2);
game.state.add('game_restart_3', gameRestart_3);

game.state.add('win', winState);
game.state.start('boot');
