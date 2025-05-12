

// Would be abstract but unfortunately this is JavaScript :(
class Projectile {

    constructor(position, velocity) {
        this.pos = createVector(position.x, position.y);
        this.vel = createVector(velocity.x, velocity.y);
    }
}