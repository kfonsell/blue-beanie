"use strict";

/* Load games assets (except for everything in icons directory) and load 'menuState' */
class loadState
{
    preload()
    {
        let loading_label = game.add.text(
                150,
                150,
                'loading game...',
                {font: '30px Courier', fill: '#ffffff'}
        );

        game.load.spritesheet('player', 'assets/graphics/sprites/MainGuySpriteSheet.png', 41, 36, 12);
        game.load.image('beanie', 'assets/graphics/miscs/beanie.png');

    }

    create()
    {
        game.state.start('menu');
    }
}
