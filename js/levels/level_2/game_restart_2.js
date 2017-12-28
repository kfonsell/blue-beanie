"use strict";

/* Game over (lose) screen menu */
class gameRestart_2
{
    create()
    {
        let lose_label = game.add.text(
            80,
            80,
            'GAME OVER\nYOU LOST!',
            {font: '50px Arial', fill: '#00FF00'}
        );

        let start_label = game.add.text(
            80,
            game.world.height - 80,
            'Press the "T" key to restart level 2.',
            {font: '25px Arial', fill: '#ffffff'}
        );

        let t_key = game.input.keyboard.addKey(Phaser.Keyboard.T);
        t_key.onDown.addOnce(this.restart, this);
    }

    restart()
    {
        game.state.start('level_2');
    }
}
