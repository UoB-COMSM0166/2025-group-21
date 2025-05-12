

class Snowball extends Projectile {

    constructor(position, velocity) {
        super(position, createVector(velocity.x/2, velocity.y/2));
        this.gravity = 0.5;
        this.angle = 0;

        if (domains.game.snowballSound.isPlaying()) {
            domains.game.snowballSound.stop();
        }
        domains.game.snowballSound.play();
    }

    // Update the snowballs position on screen
    updatePosition() {
        this.vel.y += this.gravity;
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
    }

    // Draw the snowballs position on screen every frame
    drawProjectile() {
        push();
        translate(this.pos.x, this.pos.y);
        imageMode(CENTER);

        if (!domains.game.pause.active) {
            rotate(this.angle += 0.5);
        }
        image(snowball, 0, 0, 40, 40);
        pop();
    }
}