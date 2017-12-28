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


/* Game over (win) screen and state */
class winState
{
    create()
    {
        let win_label = game.add.text(
            80,
            80,
            'YOU WON!',
            {font: '50px Arial', fill: '#00FF00'}
        );

        let start_label = game.add.text(
            80,
            game.world.height - 80,
            'Press the "T" key to restart',
            {font: '25px Arial', fill: '#ffffff'}
        );

        let t_key = game.input.keyboard.addKey(Phaser.Keyboard.T);
        t_key.onDown.addOnce(this.restart, this);

        let game_win_music = game.add.audio('game_win');
        game_win_music.play();
    }

    restart()
    {
        game.state.start('menu');
    }
}
