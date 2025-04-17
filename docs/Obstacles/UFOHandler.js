

class UFOHandler {

    constructor() {
        this.spawnRate = 1;
        this.nextSpawnThreshold = 100;
        this.UFOs = [];
        this.explosions = [];
        this.collisionRadius = 50;



    }
    updateUFOs() {

        if (!domains.game.pause.active && domains.game.zoom < 1 &&
            Math.random() > 0.99 - 0.005*this.spawnRate) { // 0.975

            this.UFOs.push(new UFO(domains.game.player.pos.y + 0.3*(height - domains.game.player.pos.y)*Math.random() + 50));
        }

        for (let i=0; i<this.UFOs.length; i++) {
            if (!domains.game.pause.active) this.UFOs[i].updatePosition();
            this.UFOs[i].drawUFO();

            // UFO crosses barrier slightly beyond edge of screen
            if (this.UFOs[i].pos.x < -200/domains.game.zoom || this.UFOs[i].pos.x > width/domains.game.zoom ||
                (this.UFOs[i].pos.y < domains.game.player.pos.y - 10*domains.game.topMargin/domains.game.zoom
                    && domains.game.zoom < 1) ||
                (this.UFOs[i].pos.y < -500 && domains.game.zoom === 1) ||
                this.UFOs[i].pos.y > height/domains.game.zoom) {

                this.UFOs[i] = null;
                this.UFOs.splice(i, 1);
            }
        }
        if (domains.game.player.alive) {
            this.checkForPlayerUFOCollision();
            this.updateSpawnRate();
        }
    }

    updateSpawnRate() {
        if (domains.game.offset/100 > this.nextSpawnThreshold) {
            this.nextSpawnThreshold += 100;
            this.spawnRate++;
        }
    }
    checkForPlayerUFOCollision() {

        for (let u=0; u<this.UFOs.length; u++) {

            if (this.UFOs[u] !== undefined) {

                let dx = abs(domains.game.player.pos.x - this.UFOs[u].pos.x);
                let dy = abs(domains.game.player.pos.y - this.UFOs[u].pos.y);

                if (Math.sqrt(dx**2 + dy**2) < this.collisionRadius) {
                    this.explosions.push(new Explosion(this.UFOs[u].pos));
                    this.UFOs.splice(u, 1);

                    if (domains.game.explosionSound.isPlaying()) {
                        domains.game.explosionSound.stop();
                    }
                    domains.game.explosionSound.play();

                    if (!domains.game.invincibility) {
                        domains.game.death = new Death('UFO');
                        domains.game.player.vel.x = -0.5;
                        domains.game.player.vel.y = 0;
                    }
                }
            }
        }
    }

    updateExplosions() {

        for (let i=0; i<this.explosions.length; i++) {

            if (this.explosions[i].explosionComplete) {
                this.explosions[i] = null;
                this.explosions.splice(i, 1);
            }
            else this.explosions[i].explode();
        }
    }
}
