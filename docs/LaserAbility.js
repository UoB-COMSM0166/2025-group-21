

class LaserAbility {
    constructor(powerLevel) {
        this.level = powerLevel;
        this.coolDown = 100 - 10*powerLevel;
        this.lasers = [];
    }

    shoot() {
        let velocityAngle;
        if (game.score.airtime > 3) {
            velocityAngle = atan2(game.player.vel.y, game.player.vel.x);
        }
        else {
            velocityAngle = atan(game.terrain.slope(game.player.pos.x));
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

            if (this.lasers[i].pos.x < -10000 || this.lasers[i].pos.x > 10000 ||
                this.lasers[i].pos.y < -10000 || this.lasers[i].pos.y > 10000) {

                this.lasers.splice(i, 1);
            }
        }
    }
}