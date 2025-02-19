

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

        if (this.level > 0) {
            this.projectiles.push(new Laser(position, velocity));
        }
        else {
            this.projectiles.push(new Fish(position, velocity));
        }
    }

    updateLasers() {

        for (let i=0; i<this.projectiles.length; i++) {

            if (!game.pause.active) this.projectiles[i].updatePosition();
            this.projectiles[i].drawLaser();

            // if laser goes off the screen
            if (this.projectiles[i].pos.x > width/game.zoom ||
                (this.projectiles[i].pos.y < game.player.pos.y - game.topMargin/game.zoom && game.zoom < 1) ||
                (this.projectiles[i].pos.y < 0 && game.zoom === 1) ||
                this.projectiles[i].pos.y > height/game.zoom) {

                this.projectiles.splice(i, 1);
            }
            this.checkForUFOCollisions(i);
        }
        if (this.gatlingMode && game.player.alive && frameCount % 4 === 0) this.shoot();
    }

    checkForUFOCollisions(l) {

        for (let u=0; u<game.UFOHandler.UFOs.length; u++) {

            if (this.projectiles[l] !== undefined && game.UFOHandler.UFOs[u] !== undefined) {

                let dx = abs(this.projectiles[l].pos.x - game.UFOHandler.UFOs[u].pos.x);
                let dy = abs(this.projectiles[l].pos.y - game.UFOHandler.UFOs[u].pos.y);

                if (Math.sqrt(dx**2 + dy**2) < 50) {

                    if (this.projectiles[l] instanceof Fish) {
                        game.UFOHandler.UFOs[u].hitByFish = true;
                        fishImpactSound.play();
                        this.projectiles[l].vel.y -= 10;
                    }
                    else {
                        this.projectiles.splice(l, 1);
                        game.UFOHandler.explosions.push(new Explosion(game.UFOHandler.UFOs[u].pos));
                        game.UFOHandler.UFOs.splice(u, 1);
                        explosionSound.play();
                    }
                }
            }
        }
    }
}