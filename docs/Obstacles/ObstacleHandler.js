

class ObstacleHandler {

    constructor() {
        this.spawnRate = 1;
        this.airplaneSpawnChance = 0.009;
        this.birdSpawnChance = 0.009;

        this.nextSpawnThreshold = 100;

        this.aerialObstacles = [];
        this.explosions = [];
        this.collisionRadius = 50;
    }

    updateObstacles() {
        // Add UFO's
        if (!domains.game.pause.active && domains.game.zoom < 0.25 &&
            Math.random() > 0.99 - 0.05*this.spawnRate) { // 0.975
            let spawnLevel = domains.game.player.pos.y + 0.3*(height - domains.game.player.pos.y)*Math.random() + 50;
            this.aerialObstacles.push(new UFO(spawnLevel));
        }
        // Add Airplanes
        if (!domains.game.pause.active && domains.game.zoom < 0.65 &&
            Math.random() < this.airplaneSpawnChance) { // 0.975
            let spawnLevel = domains.game.player.pos.y + random(0.2, 0.3)*(height - domains.game.player.pos.y);
            this.aerialObstacles.push(new Airplane(spawnLevel));
        }
        // Add Birds
        if (!domains.game.pause.active && Math.random() < this.birdSpawnChance) { // 0.975
            let spawnLevel = height * random(0.1, 0.15);
            this.aerialObstacles.push(new Bird(spawnLevel));
        }

        for (let i=0; i<this.aerialObstacles.length; i++) {
            if (!domains.game.pause.active) this.aerialObstacles[i].updatePosition();
            this.aerialObstacles[i].drawObstacle();

            // Obstacle crosses barrier slightly beyond edge of screen
            if (this.aerialObstacles[i].pos.x < -200/domains.game.zoom || this.aerialObstacles[i].pos.x > width/domains.game.zoom ||
                (this.aerialObstacles[i].pos.y < domains.game.player.pos.y - 10*domains.game.topMargin/domains.game.zoom
                    && domains.game.zoom < 1) ||
                (this.aerialObstacles[i].pos.y < -500 && domains.game.zoom === 1) ||
                this.aerialObstacles[i].pos.y > height/domains.game.zoom) {

                this.aerialObstacles[i] = null;
                this.aerialObstacles.splice(i, 1);
            }
        }
        if (domains.game.player.alive) {
            this.checkForPlayerCollision();
            this.updateSpawnRate();
        }
    }

    updateSpawnRate() {
        if (domains.game.offset/100 > this.nextSpawnThreshold) {
            this.nextSpawnThreshold += 100;
            this.spawnRate++;
        }
    }

    checkForPlayerCollision() {

        for (let u=0; u<this.aerialObstacles.length; u++) {

            if (this.aerialObstacles[u] !== undefined) {

                let dx = abs(domains.game.player.pos.x - this.aerialObstacles[u].pos.x);
                let dy = abs(domains.game.player.pos.y - this.aerialObstacles[u].pos.y);

                if (Math.sqrt(dx**2 + dy**2) < this.collisionRadius) {
                    this.explosions.push(new Explosion(this.aerialObstacles[u].pos));
                    this.aerialObstacles.splice(u, 1);

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
