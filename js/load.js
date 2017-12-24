"use strict";

/* Load games assets (except for everything in icons directory) and load 'menuState' */
class loadState
{
    preload()
    {
        let loading_label = game.add.text(
                80,
                150,
                'loading...',
                {font: '30px Courier', fill: '#ffffff'}
        );

        game.load.image('player', 'assets/graphics/sprites/player.png');
        game.load.image('win', 'assets/graphics/miscs/win.png');
    }

    create()
    {
        game.state.start('menu');
    }
}
