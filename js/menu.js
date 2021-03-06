"use strict";

/*
    blue-beanie - A 2D run-and-collect web video game.
    Copyright (C) 2017 faraco <skelic3@gmail.com>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/


/* Display instructions and wait for user input to start game. */
class menuState
{
    create()
    {
        game.add.image(0, 0, 'water_bg');
        let bar = game.add.graphics();
        bar.beginFill(0x000000, 0.2);
        bar.drawRect(0, 100, 800, 100);

        let style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

        let text = game.add.text(0, 0, "Blue Beanie", style);
        text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        text.setTextBounds(0, 100, 800, 100);

        let text2 = game.add.text(0, 40, "by faraco", style);
        text2.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        text2.setTextBounds(0, 100, 800, 100);

        let text3 = game.add.text(0, 150, 'Click anywhere on the game screen to start.', style);
        text3.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        text3.setTextBounds(0, 100, 800, 100);

        this.synth = game.add.audio('calm_synth');
        this.synth.loopFull(0.6);
    }

    update()
    {
        if (game.input.activePointer.isDown)
        {
            this.start();
        }
    }

    start()
    {
        this.synth.stop();
        game.state.start('level_1');
    }
}
