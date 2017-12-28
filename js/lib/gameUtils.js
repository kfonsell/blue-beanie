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


/* Common and repetitive boilerplates for game levels usage (such as movement keys mapping) */
class gameUtils
{
    /* param: player - A player instance. */
    constructor(player)
    {
        this.keyboard = game.input.keyboard;
        this.cursors = this.keyboard.createCursorKeys();
        this.player = player;

        this.player.animations.add('left', [9, 10, 11], 10, true);
        this.player.animations.add('right', [3, 4, 5], 10, true);
        this.player.animations.add('up', [6, 7, 8], 10, true);
        this.player.animations.add('down', [0, 1, 2], 10, true);
        this.player.animations.add('still', [1], null, true);

        game.physics.arcade.enable(this.player);

        game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
    }

    /**
     * Set main player keys mapping for movement (wasd, and arrow keys)
     * 
     * @return void
     * */
    set_main_player_movements()
    {
        if (this.cursors.left.isDown || this.keyboard.isDown(Phaser.Keyboard.A))
        {
            this.player.animations.play('left');
            this.player.body.velocity.x = -175;
        }

        else if (this.cursors.right.isDown || this.keyboard.isDown(Phaser.Keyboard.D))
        {
            this.player.animations.play('right');
            this.player.body.velocity.x = 175;
        }

        else if (this.cursors.up.isDown || this.keyboard.isDown(Phaser.Keyboard.W))
        {
            this.player.animations.play('up');
            this.player.body.velocity.y = -175;

        }

        else if (this.cursors.down.isDown || this.keyboard.isDown(Phaser.Keyboard.S))
        {
            this.player.body.velocity.y = 175;
            this.player.animations.play('down');
        }
        
        else
        {
            this.player.body.velocity.x = 0;
            this.player.body.velocity.y = 0;
            this.player.animations.play('still');
        }
    }
}
