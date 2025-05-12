

class Fish extends Projectile {

    constructor(position, velocity) {
        super(position, createVector(velocity.x/2, velocity.y/2));
        this.gravity = 0.7;
        this.angle = 0;

        if (domains.game.fishThrow.isPlaying()) {
            domains.game.fishThrow.stop();
        }
        domains.game.fishThrow.play();
    }

    // Update the fish position on the screen
    updatePosition() {
        this.vel.y += this.gravity;
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
    }

    // Draw the fish on the screen each frame
    drawProjectile() {
        push();
        translate(this.pos.x, this.pos.y);
        imageMode(CENTER);

        if (!domains.game.pause.active) {
            rotate(this.angle += 0.1);
        }
        image(fish, 0, 0, 30, 30);
        pop();
    }
}