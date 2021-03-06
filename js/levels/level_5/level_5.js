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
        this.map.addTilesetImage('bat');
        this.map.addTilesetImage('wm');

        this.layer_0 = this.map.createLayer('background_layer');
        this.layer_0.resizeWorld();

        this.map.setCollision(45);
        this.map.setCollision(44);
        this.map.setCollision(34);
        this.map.setCollision(38);

        this.player = game.add.sprite(game.world.centerX + 30, game.world.centerY, 'player');
        this.player_controller = new gameUtils(this.player);

        /* Lose if player touched lava */
        let player_controller = this.player_controller;
        this.map.setTileIndexCallback([69], function() {
            game.state.start('game_restart_5');
            player_controller.kill_theme_music();
            player_controller.play_gmover_sfx();
        });

        this.keys = game.add.group();
        this.keys.enableBody = true;

        this.map.createFromObjects('collectables_layer', 74, 'key', 0, true, false, this.keys);
        this.collected_keys = 0;

        this.enemies1 = game.add.group();
        this.enemies1.enableBody = true;

        this.map.createFromObjects('enemies_layer1', 76, 'bat', 1, true, false, this.enemies1);
        this.enemies1.callAll('animations.add', 'animations', 'fly', [1, 2, 3], 10, true);
        this.enemies1.callAll('animations.play', 'animations', 'fly');

        this.enemies2 = game.add.group();
        this.enemies2.enableBody = true;

        this.map.createFromObjects('enemies_layer2', 91, 'wm', 0, true, false, this.enemies2);

        this.door = game.add.group();
        this.door.enableBody = true;

        /* FIXME Fix corrupted door texture. */
        this.map.createFromObjects('exit_layer', 164, 'door', 0, true, false, this.door);
    }

    update()
    {
        /* Block player & enemies from going outside the walls */
        game.physics.arcade.collide(this.player, this.layer_0);
        game.physics.arcade.collide(this.enemies2, this.layer_0);

        game.physics.arcade.overlap(this.player, this.enemies1, this.restart_level, null, this);
        game.physics.arcade.overlap(this.player, this.enemies2, this.restart_level, null, this);
        game.physics.arcade.overlap(this.player, this.keys, this.collect_key, null, this);
        game.physics.arcade.overlap(this.player, this.door, this.win_game, null, this);

        if (game.device.desktop) {
            this.player_controller.set_main_player_movements();
        }
        
        else {
            this.player_controller.set_gamepad();
        }

        /* Make bats follow player */
        let player = this.player;
        this.enemies1.forEachAlive(function(enemy)
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
        });
    }

    collect_key(player, key)
    {
        this.player_controller.collect_key_sfx();
        this.collected_keys += 1;
        key.kill();
    }

    restart_level()
    {
        game.state.start('game_restart_5');
        this.player_controller.kill_theme_music();
        this.player_controller.play_gmover_sfx();
    }

    win_game()
    {
        if (this.collected_keys === 6)
        {
            game.state.start('win');
            this.player_controller.kill_theme_music();
        }
    }
}
