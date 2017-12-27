"use strict";

/* Under development */
/* Level 2 game logic */
class level_2_State
{
    create()
    {
        this.map = game.add.tilemap('map_2');
        this.map.addTilesetImage('landscape');
        this.map.addTilesetImage('lava');
        this.map.addTilesetImage('key');

        this.layer_0 = this.map.createLayer('background_layer');
        this.layer_0.resizeWorld();

        /* Outer wall */
        this.map.setCollision(22);

        /* Decorator block */
        this.map.setCollision(33);

        this.player = game.add.sprite(game.world.centerX + 30, game.world.centerY, 'player');
        this.player_controller = new gameUtils(this.player);

        this.keys = game.add.group();
        this.keys.enableBody = true;

        this.map.createFromObjects('collectables_layer', 74, 'key', 0, true, false, this.keys);
        this.collected_keys = 0;
    }

    collect_key(player, key)
    {
        this.collected_keys += 1;
        key.kill();
    }

    update()
    {
        game.physics.arcade.collide(this.player, this.layer_0);

        this.player_controller.set_main_player_movements();
    }
}
