

class ObstacleHandler {

    constructor() {
        this.spawnRate = 1;
        this.nextSpawnThreshold = 100;

        this.aerialObstacles = [];
        this.explosions = [];
        this.collisionRadius = 50;
        this.birdHitCooldown = new Clock();
    }

    updateObstacles() {
        // Add UFO's
        if (!domains.game.pause.active && domains.game.zoom < 0.25 &&
            Math.random() > 0.99 - 0.005*this.spawnRate) {
            let spawnLevel = domains.game.player.pos.y + 0.3*(height - domains.game.player.pos.y)*Math.random() + 50;
            this.aerialObstacles.push(new UFO(spawnLevel));
        }
        // Add Airplanes
        if (!domains.game.pause.active && domains.game.zoom < 0.65 &&
            Math.random() > 0.99 - 0.002*this.spawnRate) {
            let highLimit = domains.game.zoom < 0.25 ? 0.3 : 0.2;
            let lowLimit = domains.game.zoom < 0.25 ? 0.6 : 0.3;
            let spawnLevel = domains.game.player.pos.y + random(highLimit, lowLimit)*(height - domains.game.player.pos.y);
            this.aerialObstacles.push(new Airplane(spawnLevel));
        }
        // Add Birds
        if (!domains.game.pause.active && Math.random() > 0.99 - 0.001*this.spawnRate) {
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
        if (this.birdHitCooldown.time > 0) {
            this.updateCooldown();
            return;
        }

        for (let u=0; u<this.aerialObstacles.length; u++) {

            if (this.aerialObstacles[u] !== undefined) {

                let dx = abs(domains.game.player.pos.x - this.aerialObstacles[u].pos.x);
                let dy = abs(domains.game.player.pos.y - this.aerialObstacles[u].pos.y);

                if (Math.sqrt(dx**2 + dy**2) < this.collisionRadius) {
                    this.aerialObstacles[u].hitByArrow = true;

                    if (this.aerialObstacles[u] instanceof Bird) {
                        if (domains.game.invincibility) {
                            this.explosions.push(new Explosion(this.aerialObstacles[u].pos));
                            this.aerialObstacles.splice(u, 1);

                            if (domains.game.explosionSound.isPlaying()) {
                                domains.game.explosionSound.stop();
                            }
                            domains.game.explosionSound.play();
                            return;
                        }
                        else if (domains.game.player.lives.getLives() > 1) {
                            domains.game.player.lives.removeLife();
                            this.birdHitCooldown.tick();
                            return;
                        }
                    }

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

    updateCooldown() {
        this.birdHitCooldown.tick();

        if (this.birdHitCooldown.time > 120) {
            this.birdHitCooldown.reset();
        }
    }
}
