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


/* Display instructions and wait for user input to start game. */
class menuState
{
    create()
    {
        let name_label = game.add.text(
                game.height / 2,
                game.width / 2,
                'Blue Beanie',
                {font: '50px Arial', fill: '#ffffff'}
        );

        let start_label = game.add.text(
                80,
                game.world.height - 80,
                'Press the "T" key to start',
                {font: '25px Arial', fill: '#ffffff'}
        );

        let t_key = game.input.keyboard.addKey(Phaser.Keyboard.T);
        t_key.onDown.addOnce(this.start, this);
    }

    start()
    {
        // temporary level 3
        game.state.start('level_3');
    }
}
