"use strict";

/* Common and repetitive boilerplates for game levels usage (such as movement keys mapping) */
class gameUtils
{
    constructor(player)
    {
        this.keyboard = game.input.keyboard;
        this.cursors = this.keyboard.createCursorKeys();
        this.player = player;

    }

    set_main_player_movements()
    {
        if (this.cursors.left.isDown || this.keyboard.isDown(Phaser.Keyboard.A))
        {
            this.player.body.velocity.x = -175;
        }

        else if (this.cursors.right.isDown || this.keyboard.isDown(Phaser.Keyboard.D))
        {
            this.player.body.velocity.x = 175;
        }

        else
        {
            this.player.body.velocity.x = 0;
        }

        if (this.cursors.up.isDown || this.keyboard.isDown(Phaser.Keyboard.W))
        {
            this.player.body.velocity.y = -175;

        }

        else if (this.cursors.down.isDown || this.keyboard.isDown(Phaser.Keyboard.S))
        {
            this.player.body.velocity.y = 175;
        }

        else
        {
            this.player.body.velocity.y = 0;
        }
    }
}