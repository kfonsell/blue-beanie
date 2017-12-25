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

        game.load.tilemap('map', 'assets/graphics/tilemaps/tiled_1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.spritesheet('player', 'assets/graphics/sprites/MainGuySpriteSheet.png', 41, 36, 12);
        game.load.image('beanie', 'assets/graphics/miscs/beanie.png');
        game.load.image('landscape', 'assets/graphics/tiles/landscape.png');
        game.load.image('key', 'assets/graphics/tiles/key.png');
    }

    create()
    {
        game.state.start('menu');
    }
}
