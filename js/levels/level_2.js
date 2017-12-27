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
        this.map.addTilesetImage('bat');

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

        this.enemies = game.add.group();
        this.enemies.enableBody = true;

        this.map.createFromObjects('enemies_layer', 76, 'bat', 1, true, false, this.enemies);
        this.enemies.callAll('animations.add', 'animations', 'fly', [1, 2, 3], 10, true);
        this.enemies.callAll('animations.play', 'animations', 'fly');
    }

    update()
    {
        game.physics.arcade.collide(this.player, this.layer_0);
        game.physics.arcade.overlap(this.player, this.keys, this.collect_key, null, this);
        game.physics.arcade.overlap(this.player, this.enemies, this.restart_level, null, this);

        this.player_controller.set_main_player_movements();

        let player = this.player;
        this.enemies.forEachAlive(function(enemy)
        {
            if (enemy.visible && enemy.inCamera)
            {
                game.physics.arcade.moveToObject(enemy, player, enemy.speed);
            }

        });
    }

    collect_key(player, key)
    {
        this.collected_keys += 1;
        key.kill();
    }

    restart_level()
    {
        game.state.start('lose');
    }

    goto_level_2()
    {
        if (this.collected_keys === 4)
        {
            game.state.start('level_1');
        }
    }
}
