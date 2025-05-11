

class ForceField {
    constructor(level) {
        this.powerLevel = level;
        this.active = false;
        this.radius = width/20;
        this.stretchFactor = 0;
        this.chargeFraction = 1;
    }

    activate() {
        if (this.chargeFraction === 1) {
            domains.game.invincibility = true;
            domains.game.obstacleHandler.collisionRadius = width/8;

            if (!domains.game.forceFieldSound.isPlaying()) {
                domains.game.forceFieldSound.play();
            }
        }
        if (domains.game.forceFieldSound.isPlaying() && domains.game.pause.active) {
            domains.game.forceFieldSound.stop();
        }
        else if (!domains.game.forceFieldSound.isPlaying() && !domains.game.pause.active) {
            domains.game.forceFieldSound.play();
        }
        if (!domains.game.pause.active) {
            this.chargeFraction -= (0.003 - 0.0004*this.powerLevel);
        }
        this.stretchFactor = this.getStretchFactor();
        this.drawForceField();

        if (this.chargeFraction <= 0) {
            domains.game.forceFieldSound.stop();
            this.active = false;
            domains.game.invincibility = false;
            domains.game.obstacleHandler.collisionRadius = 50;
        }
    }

    drawForceField() {

        let velocityAngle;

        if (domains.game.score.airtime > 3) {
            velocityAngle = atan2(domains.game.player.vel.x, domains.game.player.vel.y);
        }
        else velocityAngle = atan(domains.game.terrain.slope(domains.game.player.pos.x));

        let level = inventory.forceFieldLevel;
        if (level > 1) this.drawShieldLayer(30, 136, 0, 0.51, 1, velocityAngle);
        this.drawShieldLayer(255, 136, 0, 0.21, 1.05, velocityAngle);
        if (level > 2) this.drawShieldLayer(0, 178, 255, 0.28, 0.95, velocityAngle);
        if (level > 3) this.drawShieldLayer(182, 84, 255, 0.29, 0.975, velocityAngle);
        if (level > 4) this.drawShieldLayer(255, 0, 0, 0.1, 1.025, velocityAngle);
    }

    drawShieldLayer(r, g, b, a, scale, velocityAngle) {
        fill('rgba(253,200,1,0.05)');
        stroke(`rgba(${r},${g},${b},${a})`);
        strokeWeight(5);

        push();
        translate(150, domains.game.player.pos.y - width/100);

        if (domains.game.score.airtime > 3) rotate(-velocityAngle + Math.PI/2);
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
        let velocity = Math.sqrt(domains.game.player.vel.x**2 + domains.game.player.vel.y**2);
        return 0.075 * velocity;
    }

    drawChargeBar() {

        push();
        translate(width*0.775, height*0.061);
        rotate(-Math.PI/2);
        stroke('rgb(0,0,0)');
        strokeWeight(width/80);

        if (this.active)                    fill('rgba(200,255,0,0.38)');
        else if (this.chargeFraction === 1) fill('rgba(255,221,0,0.65)');
        else                                fill('rgba(255,0,0,0.47)');

        ellipse(0, 0, width/32);


        this.drawChargeBarLayer(253, 200, 1, 0.85, 253, 200, 1, 0.85, width/65);
        this.drawChargeBarLayer(253, 200, 1, 0.85, 253, 200, 1, 0.85, width/63);
        this.drawChargeBarLayer(139, 67, 244, 0.71, 184, 44, 110, 1, width/64);
        pop();
    }

    drawChargeBarLayer(r1, g1, b1, a1, r2, g2, b2, a2, radius) {
        stroke(`rgba(${r1},${g1},${b1},${a1})`);
        strokeWeight(width/136);
        let oldX = null, oldY = null;

        for (let angle = 0; angle <= Math.PI*2 + 0.1; angle += 0.1) {

            if (angle > this.chargeFraction * (2*Math.PI + 0.1)) {
                stroke(`rgba(${r2},${g2},${b2},${a2})`);
            }
            let x = radius * Math.cos(angle);
            let y = radius * Math.sin(angle);

            if (oldX != null) line(oldX, oldY, x, y);
            oldX = x;
            oldY = y;
        }
    }

    charge() {

        if (this.chargeFraction < 1 && !this.active && !domains.game.pause.active) {
            this.chargeFraction += 0.001;
        }
        else if (this.chargeFraction > 1) this.chargeFraction = 1;
    }
}