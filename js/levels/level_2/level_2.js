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


/* Level 2 game logic */
class level_2_State
{
    create()
    {
        this.map = game.add.tilemap('map_2');
        this.map.addTilesetImage('landscape');
        this.map.addTilesetImage('lava');
        this.map.addTilesetImage('key');
        this.map.addTilesetImage('bat');
        this.map.addTilesetImage('door');

        this.layer_0 = this.map.createLayer('background_layer');
        this.layer_0.resizeWorld();

        /* Outer wall */
        this.map.setCollision(22);

        /* Decorator around lava tile */
        this.map.setCollision(33);

        /* Temporary hack for game.physics.arcade.overlap() which doesn't won't work different layers */
        /* If player overlap/collide with lava, restart level 2 */

        this.player = game.add.sprite(game.world.centerX - 100, game.world.centerY, 'player');
        this.player_controller = new gameUtils(this.player);

        let player_controller = this.player_controller;
        this.map.setTileIndexCallback([69], function() {
            game.state.start('game_restart_2');
            player_controller.kill_theme_music();
            player_controller.play_gmover_sfx();
        });

        this.keys = game.add.group();
        this.keys.enableBody = true;

        this.map.createFromObjects('collectables_layer', 74, 'key', 0, true, false, this.keys);
        this.collected_keys = 0;

        this.enemies = game.add.group();
        this.enemies.enableBody = true;

        this.map.createFromObjects('enemies_layer', 76, 'bat', 1, true, false, this.enemies);
        this.enemies.callAll('animations.add', 'animations', 'fly', [1, 2, 3], 10, true);
        this.enemies.callAll('animations.play', 'animations', 'fly');

        this.door = game.add.group();
        this.door.enableBody = true;

        this.map.createFromObjects('exit_layer', 1001, 'door', 33, true, false, this.door);
    }

    update()
    {   
        game.physics.arcade.collide(this.player, this.layer_0);
        game.physics.arcade.overlap(this.player, this.keys, this.collect_key, null, this);
        game.physics.arcade.overlap(this.player, this.door, this.goto_level_3, null, this);
        game.physics.arcade.overlap(this.player, this.enemies, this.restart_level, null, this);

        if (game.device.desktop) {
            this.player_controller.set_main_player_movements();
        }
        
        else {
            this.player_controller.set_gamepad();
        }

        /* Enemies follow player */
        let player = this.player;
        this.enemies.forEachAlive(function(enemy)
        {
            if (enemy.visible && enemy.inCamera)
            {
                game.physics.arcade.moveToObject(enemy, player, enemy.speed);
            }

        });
    }

    /* Destroy key after player got it */
    collect_key(player, key)
    {
        this.player_controller.collect_key_sfx();
        this.collected_keys += 1;
        key.kill();
    }

    /* Restart level 2 */
    restart_level()
    {
        game.state.start('game_restart_2');
        this.player_controller.kill_theme_music();
        this.player_controller.play_gmover_sfx();
    }

    /* Proceed to level 3 */
    goto_level_3()
    {
        if (this.collected_keys === 4)
        {
            game.state.start('level_3');
            this.player_controller.kill_theme_music();
        }
    }
}
