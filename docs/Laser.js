

class Laser{
    constructor(position, velocity) {
        this.pos = createVector(position.x, position.y);
        this.vel = createVector(velocity.x, velocity.y);
    }

    updatePosition() {
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
    }

    drawLaser() {

        stroke(255, 0, 0);
        strokeWeight(10);
        line(this.pos.x, this.pos.y, this.pos.x + 2*this.vel.x, this.pos.y + 2*this.vel.y);
    }
}