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


/* Level 4 game logic */
class level_4_State
{
    create()
    {
        this.map = game.add.tilemap('map_4');
        this.map.addTilesetImage('landscape');

        this.layer_0 = this.map.createLayer('background_layer');
        this.layer_0.resizeWorld();

        this.player = game.add.sprite(game.world.centerX + 30, game.world.centerY, 'player');
        this.player_controller = new gameUtils(this.player);
    }

    update()
    {
        this.player_controller.set_main_player_movements();
    }
}