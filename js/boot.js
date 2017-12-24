"use strict";

class bootState
{
    create()
    {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.state.start('load');
    }
}
