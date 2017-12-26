"use strict";

/* Under development */
/* Level 2 game logic */
class level_2_State
{
    create()
    {
        this.map = game.add.tilemap('map_2');
        this.map.addTilesetImage('landscape');

        this.layer_0 = this.map.createLayer('background_layer');
        this.layer_0.resizeWorld();

        /* FIll in sprite */
        this.player = game.add.sprite(game.world.centerX + 30, game.world.centerY, 'player');
        this.player_controller = new gameUtils(this.player);
    }

    update()
    {
        this.player_controller.set_main_player_movements();
    }
}