

class ProjectileAbility {
    constructor(powerLevel) {
        this.level = powerLevel;
        this.coolDown = 100 - 10*powerLevel;
        this.projectiles = [];
        this.gatlingMode = false;
    }

    shoot() {
        let velocityAngle;

        if (game.score.airtime > 3) {
            velocityAngle = atan2(game.player.vel.y, game.player.vel.x); // Angle of penguin
        }
        else {
            velocityAngle = atan(game.terrain.slope(game.player.pos.x)); // Slope gradient
        }
        let originX = game.player.pos.x - 10*sin(velocityAngle) - 10*cos(velocityAngle);
        let originY = game.player.pos.y - 10*cos(velocityAngle) - 10*sin(velocityAngle);
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

            if (!game.pause.active) this.projectiles[i].updatePosition();
            this.projectiles[i].drawProjectile();

            // if projectile goes off the screen
            if (this.projectiles[i].pos.x > width/game.zoom || this.projectiles[i].pos.x < 0 ||
                (this.projectiles[i].pos.y < game.player.pos.y - game.topMargin/game.zoom && game.zoom < 1) ||
                (this.projectiles[i].pos.y < 0 && game.zoom === 1) ||
                this.projectiles[i].pos.y > height/game.zoom) {

                this.projectiles[i] = null;
                this.projectiles.splice(i, 1);
            }
            this.checkForUFOCollisions(i);
        }
        if (this.gatlingMode) {
            if (!game.pause.active && game.player.alive && frameCount % 4 === 0) {
                this.shoot();
            }
            if (game.pause.active && game.laserAutomaticSound.isPlaying()) {
                game.laserAutomaticSound.stop();
            }
            if (!game.pause.active && !game.laserAutomaticSound.isPlaying()) {
                game.laserAutomaticSound.loop();
            }
        }
        else if (game.laserAutomaticSound.isPlaying()) {
            game.laserAutomaticSound.stop();
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

        for (let u=0; u<game.UFOHandler.UFOs.length; u++) {

            if (this.projectiles[l] !== undefined && game.UFOHandler.UFOs[u] !== undefined) {

                let dx = abs(this.projectiles[l].pos.x - game.UFOHandler.UFOs[u].pos.x);
                let dy = abs(this.projectiles[l].pos.y - game.UFOHandler.UFOs[u].pos.y);

                if (Math.sqrt(dx**2 + dy**2) < 50) {
                    game.stats.ufoHits++;
                    game.score.total += 100;

                    if (this.projectiles[l] instanceof Fish) {
                        game.UFOHandler.UFOs[u].hitByFish = true;
                        game.fishImpactSound.play();
                        this.projectiles[l].vel.y -= 10;
                    }
                    else if (this.projectiles[l] instanceof Snowball) {
                        this.projectiles.splice(l, 1);
                        game.UFOHandler.UFOs[u].freezing = true;
                        game.freezeSound.play();
                    }
                    else if (this.projectiles[l] instanceof Arrow) {
                        this.projectiles.splice(l, 1);
                        game.UFOHandler.UFOs[u].hitByArrow = true;
                        game.ufoArrowImpactSound.play();
                    }
                    else {
                        this.projectiles.splice(l, 1);
                        game.UFOHandler.explosions.push(new Explosion(game.UFOHandler.UFOs[u].pos));
                        game.UFOHandler.UFOs.splice(u, 1);

                        if (game.explosionSound.isPlaying()) {
                            game.explosionSound.stop();
                        }
                        game.explosionSound.play();
                    }
                }
            }
        }
    }
}