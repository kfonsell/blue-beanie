"use strict";

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
        // temporary level 2 
        game.state.start('level_2');
    }
}
