"use strict";

/* Level 2 game logic */
class level_2_State
{
    create()
    {
        this.map = game.add.tilemap('map_2');
        this.map.addTilesetImage('landscape');
        this.map.addTilesetImage('lava');
        this.map.addTilesetImage('key');
        this.map.addTilesetImage('bat');
        this.map.addTilesetImage('door');

        this.layer_0 = this.map.createLayer('background_layer');
        this.layer_0.resizeWorld();

        /* Outer wall */
        this.map.setCollision(22);

        /* Decorator around lava tile */
        this.map.setCollision(33);

        /* Temporary hack for game.physics.arcade.overlap() which doesn't won't work different layers */
        /* If player overlap/collide with lava, restart level 2 */
        let restart_level = this.restart_level;
        this.map.setTileIndexCallback([69], function() {
            restart_level();
        });

        this.player = game.add.sprite(game.world.centerX - 100, game.world.centerY, 'player');
        this.player_controller = new gameUtils(this.player);

        this.keys = game.add.group();
        this.keys.enableBody = true;

        this.map.createFromObjects('collectables_layer', 74, 'key', 0, true, false, this.keys);
        this.collected_keys = 0;

        this.enemies = game.add.group();
        this.enemies.enableBody = true;

        this.map.createFromObjects('enemies_layer', 76, 'bat', 1, true, false, this.enemies);
        this.enemies.callAll('animations.add', 'animations', 'fly', [1, 2, 3], 10, true);
        this.enemies.callAll('animations.play', 'animations', 'fly');

        this.door = game.add.group();
        this.door.enableBody = true;

        this.map.createFromObjects('exit_layer', 1001, 'door', 33, true, false, this.door);
    }

    update()
    {   
        game.physics.arcade.collide(this.player, this.layer_0);
        game.physics.arcade.overlap(this.player, this.keys, this.collect_key, null, this);
        game.physics.arcade.overlap(this.player, this.door, this.goto_level_3, null, this);
        game.physics.arcade.overlap(this.player, this.enemies, this.restart_level, null, this);

        this.player_controller.set_main_player_movements();

        /* Enemies follow player */
        let player = this.player;
        this.enemies.forEachAlive(function(enemy)
        {
            if (enemy.visible && enemy.inCamera)
            {
                game.physics.arcade.moveToObject(enemy, player, enemy.speed);
            }

        });
    }

    /* Destroy key after player got it */
    collect_key(player, key)
    {
        this.collected_keys += 1;
        key.kill();
    }

    /* Restart level 2 */
    restart_level()
    {
        game.state.start('game_restart_2');
    }

    /* Proceed to level 3 */
    goto_level_3()
    {
        if (this.collected_keys === 4)
        {
            game.state.start('level_3');
        }
    }
}
