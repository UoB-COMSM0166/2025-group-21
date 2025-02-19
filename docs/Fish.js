

class Fish extends Projectile {

    constructor(position, velocity) {

        super(position, createVector(velocity.x/3, velocity.y/3));
        this.gravity = 0.7;
        this.angle = 0;
        fishThrow.play();
    }

    updatePosition() {

        this.vel.y += this.gravity;
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
    }

    drawLaser() {
        push();
        translate(this.pos.x, this.pos.y);
        imageMode(CENTER);
        rotate(this.angle += 0.1);
        image(fish, 0, 0, 30, 30);
        pop();
    }
}