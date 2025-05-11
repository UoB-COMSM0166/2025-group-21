

class Wind {

    constructor() {
        domains.game.windSound.setVolume(0);
        domains.game.windSound.loop();
        this.volume = 0;
    }

    // Set the volume for the background wind
    adjustVolume() {
        if (domains.game.pause.active) return;

        let volume = settings.masterVolume*settings.mute;

        if (domains.game.stats.numJumps === 0) {
            domains.game.windSound.setVolume(0.0);
        }
        else if (!domains.game.player.alive) {
            domains.game.windSound.setVolume(0.0, 0.5);
        }
        else if (domains.game.player.vel.x > 15) {
            domains.game.windSound.setVolume(0.00015*volume*domains.game.player.vel.x**2, 1);
        }
        else domains.game.windSound.setVolume(0, 1);
    }
}