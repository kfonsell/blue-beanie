"use strict";

/* Game logic for level 1 */
class level_1_State
{
    create()
    {
        this.map = game.add.tilemap('map');
        this.map.addTilesetImage('landscape');

        this.layer_0 = this.map.createLayer('background_layer');
        this.layer_0.resizeWorld();

        /* Player with objects collisions */
        this.map.setCollision(33);
        this.map.setCollision(44);

        this.player = game.add.sprite(game.world.centerX + 30, game.world.centerY, 'player');

        this.player_controller = new gameUtils(this.player);

        this.beanie = game.add.sprite(256, 256, 'beanie');
        game.physics.arcade.enable(this.beanie);

        this.player.collideWorldBounds = true;
    }

    update()
    {
        game.physics.arcade.collide(this.player, this.layer_0);
        game.physics.arcade.overlap(this.player, this.beanie, this.win_state, null, this);

        /* Stop player from going outside the map through the wall */

        this.player_controller.set_main_player_movements();
    }

    win_state()
    {
        game.state.start('win');
    }
}
