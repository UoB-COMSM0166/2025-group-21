

class LaserAbility {
    constructor(powerLevel) {
        this.level = powerLevel;
        this.coolDown = 100 - 10*powerLevel;
        this.lasers = [];
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
        this.lasers.push(new Laser(position, velocity));
    }

    updateLasers() {

        for (let i=0; i<this.lasers.length; i++) {

            if (!game.pause.active) this.lasers[i].updatePosition();
            this.lasers[i].drawLaser();

            // if laser goes off the screen
            if (this.lasers[i].pos.x > width/game.zoom ||
                (this.lasers[i].pos.y < game.player.pos.y - game.topMargin/game.zoom && game.zoom < 1) ||
                (this.lasers[i].pos.y < 0 && game.zoom === 1) ||
                this.lasers[i].pos.y > height/game.zoom) {

                this.lasers.splice(i, 1);
            }
            this.checkForUFOCollisions(i);
        }
        if (this.gatlingMode && game.player.alive && frameCount % 4 === 0) this.shoot();
    }

    checkForUFOCollisions(l) {

        for (let u=0; u<game.UFOHandler.UFOs.length; u++) {

            if (this.lasers[l] !== undefined && game.UFOHandler.UFOs[u] !== undefined) {

                let dx = abs(this.lasers[l].pos.x - game.UFOHandler.UFOs[u].pos.x);
                let dy = abs(this.lasers[l].pos.y - game.UFOHandler.UFOs[u].pos.y);

                if (Math.sqrt(dx**2 + dy**2) < 50) {
                    this.lasers.splice(l, 1);
                    game.UFOHandler.explosions.push(new Explosion(game.UFOHandler.UFOs[u].pos));
                    game.UFOHandler.UFOs.splice(u, 1);
                }
            }
        }
    }
}