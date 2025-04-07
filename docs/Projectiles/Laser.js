

class Laser extends Projectile {
    constructor(position, velocity) {
        super(position, velocity);
        laserSound.play();
    }

    updatePosition() {
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
    }

    drawProjectile() {

        switch (game.projectile.level) {

            case 1:
                stroke('rgba(255,0,0,0.03)');
                break;
            case 2:
                stroke('rgba(255,255,0,0.03)');
                break;
            case 3:
                stroke('rgba(50,255,0,0.03)');
                break;
            case 4:
                stroke('rgba(0,21,255,0.03)');
                break;
            case 5:
                stroke('rgba(138,50,255,0.04)');
                break;
            default:
                noStroke();
                break;
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