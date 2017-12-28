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


/* Level 3 game logic */
class level_3_State
{
    create()
    {
        this.map = game.add.tilemap('map_3');
        this.map.addTilesetImage('landscape');
        this.map.addTilesetImage('key');
        this.map.addTilesetImage('bat');
        this.map.addTilesetImage('door');
        this.map.addTilesetImage('wm');

        this.layer_0 = this.map.createLayer('background_layer');
        this.layer_0.resizeWorld();

        this.map.setCollision(22);

        this.player = game.add.sprite(game.world.centerX + 30, game.world.centerY, 'player');
        this.player_controller = new gameUtils(this.player);

        this.keys = game.add.group();
        this.keys.enableBody = true;

        this.map.createFromObjects('collectables_layer', 65, 'key', 0, true, false, this.keys);
        this.collected_keys = 0;

        this.enemies = game.add.group();
        this.enemies.enableBody = true;
        
        this.map.createFromObjects('enemies_layer', 67, 'bat', 1, true, false, this.enemies);

        this.enemies.callAll('animations.add', 'animations', 'fly', [1, 2, 3], 10, true);
        this.enemies.callAll('animations.play', 'animations', 'fly');

        /* Land enemies (collision with walls applies) */
        this.enemies2 = game.add.group();
        this.enemies2.enableBody = true;

        this.map.createFromObjects('enemies_layer2', 1618, 'wm', 0, true, false, this.enemies2);

        this.door = game.add.group();
        this.door.enableBody = true;

        /* FIXME Fix corrupted door texture. */
        this.map.createFromObjects('exit_layer', 159, 'door', 0, true, false, this.door);

    }

    update()
    {
        /* Block player from going outside the map */
        game.physics.arcade.collide(this.player, this.layer_0);
        game.physics.arcade.collide(this.enemies2, this.layer_0);
        game.physics.arcade.overlap(this.player, this.keys, this.collect_key, null, this);
        game.physics.arcade.overlap(this.player, this.enemies, this.restart_level, null, this);
        game.physics.arcade.overlap(this.player, this.enemies2, this.restart_level, null, this);

        /* Proceed to next level if objectives successfully completed */
        game.physics.arcade.overlap(this.player, this.door, this.goto_level_4, null, this);

        this.player_controller.set_main_player_movements();

        /* Make bats follow player */
        let player = this.player;
        this.enemies.forEachAlive(function(enemy)
        {
            if (enemy.visible && enemy.inCamera)
            {
                game.physics.arcade.moveToObject(enemy, player, enemy.speed);
            }

        });

        /* Make land monsters follow player (collision applies ) */
        this.enemies2.forEachAlive(function(enemy)
        {
            if (enemy.visible && enemy.inCamera)
            {
                game.physics.arcade.moveToObject(enemy, player, enemy.speed);
            }
        })
    }

    collect_key(player, key)
    {
        this.player_controller.collect_key_sfx();
        this.collected_keys += 1;
        key.kill();
    }

    restart_level()
    {
        game.state.start('game_restart_3');
        this.player_controller.kill_theme_music();
    }

    goto_level_4()
    {
        if (this.collected_keys === 3)
        {
            game.state.start('level_4');
            this.player_controller.kill_theme_music();
        }
    }
}
