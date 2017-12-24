"use strict";

/* Start physics system and load 'loadState'. */
class bootState
{
    create()
    {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.state.start('load');
    }
}
