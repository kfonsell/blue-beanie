"use strict";

/* Game logic for level 1 */
class level_1_State
{
    create()
    {
        this.map = game.add.tilemap('map');
        this.map.addTilesetImage('landscape');
        this.map.addTilesetImage('key');

        this.layer_0 = this.map.createLayer('background_layer');
        this.layer_0.resizeWorld();

        /* Player with objects collisions */
        this.map.setCollision(33);
        this.map.setCollision(44);

        this.player = game.add.sprite(game.world.centerX + 30, game.world.centerY, 'player');

        this.player_controller = new gameUtils(this.player);

        this.beanie = game.add.sprite(256, 256, 'beanie');
        game.physics.arcade.enable(this.beanie);
        
        this.keys = game.add.group();
        this.keys.enableBody = true;

        this.map.createFromObjects('collectables_layer', 65, 'key', 0, true, false, this.keys);
        this.collected_keys = 0;

        this.enemies = game.add.group();
        this.enemies.enableBody = true;
        
        this.map.createFromObjects('enemies_layer', 67, 'bat', 1, true, false, this.enemies);

        this.enemies.callAll('animations.add', 'animations', 'fly', [1, 2, 3], 10, true);
        this.enemies.callAll('animations.play', 'animations', 'fly');
    }

    update()
    {
        game.physics.arcade.collide(this.player, this.layer_0);
        game.physics.arcade.overlap(this.player, this.beanie, this.level_2_state, null, this);
        game.physics.arcade.overlap(this.player, this.keys, this.collect_key, null, this);

        /* Stop player from going outside the map through the wall */

        this.player_controller.set_main_player_movements();
    }

    /* Collect keys, destroy and count collected keys. */
    collect_key(player, key)
    {
        this.collected_keys += 1;
        key.kill();
        console.log(this.collected_keys);
    }
    
    /* Proceed to level 2. */
    level_2_state()
    {

        if (this.collected_keys === 3)
        {

            /* TODO Implement level 2.
             *
             * Temporary placeholder for level 2
             */
            game.state.start('win');
        }
    }
}
