"use strict";

/*
    blue-beanie - A 2D run-and-collect web video game.
    Copyright (C) 2017 faraco <skelic3@gmail.com>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/


/* Initializes game canvas */
let game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game_canvas');

/* Initializes game states and levels */
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);

game.state.add('level_1', level_1_State);
game.state.add('level_2', level_2_State);
game.state.add('level_3', level_3_State);
game.state.add('level_4', level_4_State);

/* Game over screen for each level */
game.state.add('game_restart_1', gameRestart_1);
game.state.add('game_restart_2', gameRestart_2);
game.state.add('game_restart_3', gameRestart_3);
game.state.add('game_restart_4', gameRestart_4);

game.state.add('win', winState);
game.state.start('boot');
