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


/* Game over (lose) screen menu */
class gameRestart_2
{
    create()
    {
        let bar = game.add.graphics();
        bar.beginFill(0x000000, 0.2);
        bar.drawRect(0, 100, 800, 100);

        let style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

        let text = game.add.text(0, 0, "Game Over! You lost!", style);
        text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        text.setTextBounds(0, 100, 800, 100);

        let text2 = game.add.text(0, 50, 'Click anywhere on the screen to restart level 2.', style);
        text2.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        text2.setTextBounds(0, 100, 800, 100);
    }

    update()
    {
        if (game.input.activePointer.isDown)
        {
            this.restart();
        }
    }

    restart()
    {
        game.state.start('level_2');
    }
}
