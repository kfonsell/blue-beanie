"use strict";

/* Common and repetitive boilerplates for game levels usage (such as movement keys mapping) */
class gameUtils
{
    constructor(player)
    {
        this.keyboard = game.input.keyboard;
        this.cursors = this.keyboard.createCursorKeys();
        this.player = player;

        this.player.animations.add('left', [9, 10, 11], 10, true);
        this.player.animations.add('right', [3, 4, 5], 10, true);
        this.player.animations.add('up', [6, 7, 8], 10, true);
        this.player.animations.add('down', [0, 1, 2], 10, true);
        this.player.animations.add('still', [1], 10, true);

    }

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
