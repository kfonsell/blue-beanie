"use strict";

/* Game logic for level 1 */
class level_1_State
{
    create()
    {
        this.map = game.add.tilemap('map');
        this.map.addTilesetImage('landscape');

        this.layer = this.map.createLayer(0);
        this.layer.resizeWorld();

        this.player = game.add.sprite(16, 16, 'player');

        this.player_controller = new gameUtils(this.player);

        game.physics.enable(this.player, Phaser.Physics.ARCADE);

        this.beanie = game.add.sprite(256, 256, 'beanie');
        game.physics.enable(this.beanie, Phaser.Physics.ARCADE);
    }

    update()
    {
        game.physics.arcade.overlap(this.player, this.beanie, this.win_state, null, this);

        this.player_controller.set_main_player_movements();
    }

    win_state()
    {
        game.state.start('win');
    }
}
