

class ForceField {
    constructor() {
        this.powerLevel = inventory.forceFieldLevel;
        this.active = false;
        this.radius = width/20;
        this.stretchFactor = 0;
    }

    activate() {
        this.stretchFactor = this.getStretchFactor();
        this.drawForceField();
    }

    drawForceField() {

        let velocityAngle;

        if (game.score.airtime > 3) {
            velocityAngle = atan2(game.player.vel.x, game.player.vel.y);
        }
        else velocityAngle = atan(game.terrain.slope(game.player.pos.x));

        this.drawShieldLayer(30, 136, 0, 0.51, 1, velocityAngle);
        this.drawShieldLayer(255, 136, 0, 0.21, 1.05, velocityAngle);
        this.drawShieldLayer(0, 178, 255, 0.28, 0.95, velocityAngle);
        this.drawShieldLayer(182, 84, 255, 0.29, 0.975, velocityAngle);
        this.drawShieldLayer(255, 0, 0, 0.1, 1.025, velocityAngle);
    }

    drawShieldLayer(r, g, b, a, scale, velocityAngle) {
        fill('rgba(253,200,1,0.05)');
        stroke(`rgba(${r},${g},${b},${a})`);
        strokeWeight(5);

        push();
        translate(game.player.pos.x, game.player.pos.y - game.player.radius);

        if (game.score.airtime > 3) rotate(-velocityAngle + Math.PI/2);
        else rotate(velocityAngle);
        beginShape();

        for (let angle = 0; angle < Math.PI * 2; angle += 0.1) {

            let x = scale * this.radius * Math.cos(angle) + 10*noise(0.02*frameCount);
            if (x < 0) x += x * this.stretchFactor * (Math.random() + 0.5);
            let y = scale * this.radius * Math.sin(angle) + 10*noise(0.02*frameCount);

            vertex(x, y);
        }
        endShape(CLOSE);
        pop();
    }

    getStretchFactor() {
        let velocity = Math.sqrt(game.player.vel.x**2 + game.player.vel.y**2);
        return 0.075 * velocity;
    }

    initialise() {
        game.invincibility = true;
        game.UFOHandler.collisionRadius = width/8;
        forceFieldSound.play();

    }

    resetAbility() {
        game.invincibility = false;
        game.UFOHandler.collisionRadius = 50;
        forceFieldSound.stop();
    }
}