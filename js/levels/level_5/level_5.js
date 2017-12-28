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


/* Level 5 game logic */
class level_5_State
{
    create()
    {
        this.map = game.add.tilemap('map_5');
        this.map.addTilesetImage('landscape');
        this.map.addTilesetImage('lava');
        this.map.addTilesetImage('key');

        this.layer_0 = this.map.createLayer('background_layer');
        this.layer_0.resizeWorld();

        this.map.setCollision(45);
        this.map.setCollision(44);
        this.map.setCollision(34);
        this.map.setCollision(35);

        this.player = game.add.sprite(game.world.centerX + 30, game.world.centerY, 'player');
        this.player_controller = new gameUtils(this.player);

        this.keys = game.add.group();
        this.keys.enableBody = true;

        this.map.createFromObjects('collectables_layer', 74, 'key', 0, true, false, this.keys);
        this.collected_keys = 0;
    }

    update()
    {
        /* Block player from going outside the map */
        game.physics.arcade.collide(this.player, this.layer_0);

        this.player_controller.set_main_player_movements();
    }
}