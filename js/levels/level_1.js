"use strict";

/* Game logic for level 1 */
class level_1_State
{
    create()
    {
        this.map = game.add.tilemap('map_1');
        this.map.addTilesetImage('landscape');
        this.map.addTilesetImage('door');
        this.map.addTilesetImage('key');

        this.layer_0 = this.map.createLayer('background_layer');
        this.layer_0.resizeWorld();

        /* Player with objects collisions */
        this.map.setCollision(33);
        this.map.setCollision(44);

        this.player = game.add.sprite(game.world.centerX + 30, game.world.centerY, 'player');

        this.player_controller = new gameUtils(this.player);
        
        this.keys = game.add.group();
        this.keys.enableBody = true;

        this.map.createFromObjects('collectables_layer', 65, 'key', 0, true, false, this.keys);
        this.collected_keys = 0;

        this.enemies = game.add.group();
        this.enemies.enableBody = true;
        
        this.map.createFromObjects('enemies_layer', 67, 'bat', 1, true, false, this.enemies);

        this.enemies.callAll('animations.add', 'animations', 'fly', [1, 2, 3], 10, true);
        this.enemies.callAll('animations.play', 'animations', 'fly');

        this.door = game.add.group();
        this.door.enableBody = true;

        /* FIXME Fix corrupted door texture. */
        this.map.createFromObjects('exit_layer', 1312, 'door', 0, true, false, this.door);

        /*
         * Enemies children objects.
        this.bat_1 = this.enemies.children[0];
        this.bat_2 = this.enemies.children[1];
        this.bat_3 = this.enemies.children[2];
        */
    }

    update()
    {
        /* Block player from going outside the map */
        game.physics.arcade.collide(this.player, this.layer_0);

        /* Proceed to next level if objectives successfully completed */
        game.physics.arcade.overlap(this.player, this.door, this.goto_level_2, null, this);

        game.physics.arcade.overlap(this.player, this.keys, this.collect_key, null, this);

        /* Restart level if player caught by enemies */
        game.physics.arcade.overlap(this.player, this.enemies, this.restart_level, null, this);

        this.player_controller.set_main_player_movements();


        /* Make enemies follow players */
        let player = this.player;
        this.enemies.forEachAlive(function(enemy)
        {
            if (enemy.visible && enemy.inCamera)
            {
                game.physics.arcade.moveToObject(enemy, player, enemy.speed);
            }

        });
    }

    /* Collect keys, destroy and count collected keys. */
    collect_key(player, key)
    {
        this.collected_keys += 1;
        key.kill();
    }

    /* TODO Restart level 1 instead */
    restart_level()
    {
        game.state.start('lose');
    }
    
    /* Proceed to level 2. */
    goto_level_2()
    {

        if (this.collected_keys === 3)
        {
            game.state.start('level_2');
        }
    }
}
