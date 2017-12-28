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

        game.load.tilemap('map_1', 'assets/graphics/tilemaps/tiled_1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('map_2', 'assets/graphics/tilemaps/tiled_2.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('map_3', 'assets/graphics/tilemaps/tiled_3.json', null, Phaser.Tilemap.TILED_JSON);
        
        game.load.spritesheet('player', 'assets/graphics/sprites/MainGuySpriteSheet.png', 41, 36, 12);
        game.load.image('landscape', 'assets/graphics/tiles/landscape.png');
        game.load.image('lava', 'assets/graphics/tiles/lava.png');
        game.load.image('door', 'assets/graphics/tiles/door.png');
        game.load.image('key', 'assets/graphics/tiles/key.png');
        game.load.spritesheet('bat', 'assets/graphics/tiles/bat-sprite32x32.png', 32, 32, 16);
    }

    create()
    {
        game.state.start('menu');
    }
}
