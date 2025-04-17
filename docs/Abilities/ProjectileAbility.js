

class ProjectileAbility {
    constructor(powerLevel) {
        this.level = powerLevel;
        this.coolDown = 100 - 10*powerLevel;
        this.projectiles = [];
        this.gatlingMode = false;
    }

    shoot() {
        let velocityAngle;

        if (domains.game.score.airtime > 3) {
            velocityAngle = atan2(domains.game.player.vel.y, domains.game.player.vel.x); // Angle of penguin
        }
        else {
            velocityAngle = atan(domains.game.terrain.slope(domains.game.player.pos.x)); // Slope gradient
        }
        let originX = domains.game.player.pos.x - 10*sin(velocityAngle) - 10*cos(velocityAngle);
        let originY = domains.game.player.pos.y - 10*cos(velocityAngle) - 10*sin(velocityAngle);
        let position = createVector(originX, originY);
        let velocity = createVector(50*cos(velocityAngle), 50*sin(velocityAngle));

        switch (this.level) {
            case 1: this.projectiles.push(new Fish(position, velocity)); break;
            case 2: this.projectiles.push(new Snowball(position, velocity)); break;
            case 3: this.projectiles.push(new Arrow(position, velocity, velocityAngle)); break;
            case 4: this.projectiles.push(new Laser(position, velocity)); break;
            case 5: this.projectiles.push(new Laser(position, velocity)); break;
        }
    }

    updateProjectiles() {

        for (let i=0; i<this.projectiles.length; i++) {

            if (!domains.game.pause.active) this.projectiles[i].updatePosition();
            this.projectiles[i].drawProjectile();

            // if projectile goes off the screen
            if (this.projectiles[i].pos.x > width/domains.game.zoom || this.projectiles[i].pos.x < 0 ||
                (this.projectiles[i].pos.y < domains.game.player.pos.y - domains.game.topMargin/domains.game.zoom
                    && domains.game.zoom < 1) ||
                (this.projectiles[i].pos.y < 0 && domains.game.zoom === 1) ||
                this.projectiles[i].pos.y > height/domains.game.zoom) {

                this.projectiles[i] = null;
                this.projectiles.splice(i, 1);
            }
            this.checkForUFOCollisions(i);
        }
        if (this.gatlingMode) {
            if (!domains.game.pause.active && domains.game.player.alive && frameCount % 4 === 0) {
                this.shoot();
            }
            if (domains.game.pause.active && domains.game.laserAutomaticSound.isPlaying()) {
                domains.game.laserAutomaticSound.stop();
            }
            if (!domains.game.pause.active && !domains.game.laserAutomaticSound.isPlaying()) {
                domains.game.laserAutomaticSound.loop();
            }
        }
        else if (domains.game.laserAutomaticSound.isPlaying()) {
            domains.game.laserAutomaticSound.stop();
        }
        // if (game.player.alive && !game.pause.active && frameCount % 4 === 0) {
        //     this.shoot();
        // }
        // if (game.pause.active && laserAutomaticSound.isPlaying()) {
        //     laserAutomaticSound.stop();
        // }
        // else if (!game.pause.active)
    }

    checkForUFOCollisions(l) {

        for (let u=0; u<domains.game.UFOHandler.UFOs.length; u++) {

            if (this.projectiles[l] !== undefined && domains.game.UFOHandler.UFOs[u] !== undefined) {

                let dx = abs(this.projectiles[l].pos.x - domains.game.UFOHandler.UFOs[u].pos.x);
                let dy = abs(this.projectiles[l].pos.y - domains.game.UFOHandler.UFOs[u].pos.y);

                if (Math.sqrt(dx**2 + dy**2) < 50) {
                    domains.game.stats.ufoHits++;
                    domains.game.score.total += 100;

                    if (this.projectiles[l] instanceof Fish) {
                        domains.game.UFOHandler.UFOs[u].hitByFish = true;

                        if (domains.game.fishImpactSound.isPlaying()) {
                            domains.game.fishImpactSound.stop();
                        }
                        domains.game.fishImpactSound.play();
                        this.projectiles[l].vel.y -= 10;
                    }
                    else if (this.projectiles[l] instanceof Snowball) {
                        this.projectiles.splice(l, 1);
                        domains.game.UFOHandler.UFOs[u].freezing = true;

                        if (domains.game.freezeSound.isPlaying()) {
                            domains.game.freezeSound.stop();
                        }
                        domains.game.freezeSound.play();
                    }
                    else if (this.projectiles[l] instanceof Arrow) {
                        this.projectiles.splice(l, 1);
                        domains.game.UFOHandler.UFOs[u].hitByArrow = true;

                        if (domains.game.ufoArrowImpactSound.isPlaying()) {
                            domains.game.ufoArrowImpactSound.stop();
                        }
                        domains.game.ufoArrowImpactSound.play();
                    }
                    else {
                        this.projectiles.splice(l, 1);
                        domains.game.UFOHandler.explosions.push(new Explosion(domains.game.UFOHandler.UFOs[u].pos));
                        domains.game.UFOHandler.UFOs.splice(u, 1);

                        if (domains.game.explosionSound.isPlaying()) {
                            domains.game.explosionSound.stop();
                        }
                        domains.game.explosionSound.play();
                    }
                }
            }
        }
    }
}