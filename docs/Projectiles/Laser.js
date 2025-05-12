

class Laser extends Projectile {

    constructor(position, velocity) {
        super(position, velocity);
        if (inventory.currentProjectileItem < 4) {
            if (domains.game.laserSound.isPlaying()) {
                domains.game.laserSound.stop();
            }
            domains.game.laserSound.play();
        }
    }

    // Update the laser position on the screen
    updatePosition() {
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
    }

    // Draw the laser on the canvas each frame
    drawProjectile() {
        switch (domains.game.projectile.level) {
            case 4: stroke('rgba(50,255,0,0.03)'); break;
            case 5: stroke('rgba(138,50,255,0.04)'); break;
            default: noStroke(); break;
        }

        for (let i=40; i>=6; i--) {
            strokeWeight(i);
            line(this.pos.x, this.pos.y, this.pos.x + 2*this.vel.x, this.pos.y + 2*this.vel.y);
        }

        stroke(255);
        strokeWeight(5);
        line(this.pos.x, this.pos.y, this.pos.x + 2*this.vel.x, this.pos.y + 2*this.vel.y);
    }
}