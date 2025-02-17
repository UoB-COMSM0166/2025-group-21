

class Wind {
    constructor() {
        windSound.setVolume(0);
        windSound.loop();
    }

    adjustVolume() {

        if (!game.player.alive) {
            windSound.setVolume(0.0, 0.5);
        }
        else if (game.player.pos.y < height/4 && !game.pause.active && !game.initialDrop) {
            windSound.setVolume(0.5, 2.0);
        }
        else {
            windSound.setVolume(0.0, 1.0);
        }
    }
}