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


/* Load games assets (except for everything in icons directory) and load 'menuState' */
class loadState
{
    preload()
    {
        let bar = game.add.graphics();
        bar.beginFill(0x000000, 0.2);
        bar.drawRect(0, 100, 800, 100);

        let style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

        let text = game.add.text(0, 0, "Loading game..", style);
        text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

        //  We'll set the bounds to be from x0, y100 and be 800px wide by 100px high
        text.setTextBounds(0, 100, 800, 100);
        
        /*let loading_label = game.add.text(
                150,
                150,
                'loading game...',
                {font: '30px Courier', fill: '#ffffff'}
        );*/

        game.load.tilemap('map_1', 'assets/graphics/tilemaps/tiled_1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('map_2', 'assets/graphics/tilemaps/tiled_2.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('map_3', 'assets/graphics/tilemaps/tiled_3.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('map_4', 'assets/graphics/tilemaps/tiled_4.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('map_5', 'assets/graphics/tilemaps/tiled_5.json', null, Phaser.Tilemap.TILED_JSON);
        
        game.load.spritesheet('player', 'assets/graphics/sprites/MainGuySpriteSheet.png', 41, 36, 12);
        game.load.spritesheet('gamepad', 'assets/graphics/sprites/gamepad_spritesheet.png', 100, 100);
        game.load.image('landscape', 'assets/graphics/tiles/landscape.png');
        game.load.image('lava', 'assets/graphics/tiles/lava.png');
        game.load.image('door', 'assets/graphics/tiles/door.png');
        game.load.image('key', 'assets/graphics/tiles/key.png');
        game.load.image('wm', 'assets/graphics/tiles/wm.png');
        game.load.spritesheet('bat', 'assets/graphics/tiles/bat-sprite32x32.png', 32, 32, 16);
        game.load.image('water_bg', 'assets/graphics/sprites/bg.jpg');

        /* Audio */
        game.load.audio('theme_music1', 'assets/audio/theme_music1.mp3');
        game.load.audio('pick', 'assets/audio/pick.wav');
        game.load.audio('gmover_sfx', 'assets/audio/game_over_sfx.wav');
        game.load.audio('game_win', 'assets/audio/game_win.mp3');
        game.load.audio('calm_synth', 'assets/audio/calm_synth.mp3');
    }

    create()
    {
        game.state.start('menu');
    }
}
