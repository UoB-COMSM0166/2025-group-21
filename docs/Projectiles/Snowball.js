

class Snowball extends Projectile {

    constructor(position, velocity) {

        super(position, createVector(velocity.x/2, velocity.y/2));
        this.gravity = 0.5;
        this.angle = 0;
        snowballSound.play();
    }

    updatePosition() {

        this.vel.y += this.gravity;
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
    }

    drawProjectile() {
        push();
        translate(this.pos.x, this.pos.y);
        imageMode(CENTER);

        if (!game.pause.active) {
            rotate(this.angle += 0.5);
        }
        image(snowball, 0, 0, 40, 40);
        pop();
    }
}