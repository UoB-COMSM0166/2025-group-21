

class Wind {
    constructor() {
        domains.game.windSound.setVolume(0);
        domains.game.windSound.loop();
    }

    adjustVolume() {

        if (!domains.game.player.alive) {
            domains.game.windSound.setVolume(0.0, 0.5);
        }
        else if (domains.game.initialDrop) {
            domains.game.windSound.setVolume(0.0, 0.0);
        }
        else if (domains.game.player.pos.y < height/4 && !domains.game.pause.active) {
            domains.game.windSound.setVolume(0.13*settings.masterVolume*settings.mute, 3);
        }
        else {
            domains.game.windSound.setVolume(0.0, 1.0);
        }
    }
}