class Trail {

    constructor(playerInstance) {
        this.player = playerInstance
        this.trailVector = createVector(0, 0);
        this.trailLength = 0;
    }

    checkTrailVector() {
        // If vector magnitude is sufficient, generate tail
        if (this.getVectorMagnitude() > 3) {
            this.setTrailVector();
            return true;
        }
        return false;
    }

    getVectorMagnitude() {
        // Return the magnitude of the velocity vector
        this.trailVector.x = this.player.vel.x;
        this.trailVector.y = this.player.vel.y;
        return this.trailVector.mag();
    }

    setTrailVector() {

        this.trailLength = this.getVectorMagnitude();

        if (this.trailLength === 0) {
            this.trailVector = createVector(0, 0);
            return;
        }

        let vX = this.player.vel.x;
        let vY = this.player.vel.y;
        this.trailVector = createVector(vX / this.trailLength, vY / this.trailLength).mult(-1);
    }

    draw() {
        if (!this.checkTrailVector()) {
            return;
        }

        this.setTrailVector();

        let startX = this.player.pos.x;
        let startY = this.player.pos.y - this.player.radius;
        let endX = startX + this.trailVector.x * this.trailLength * 2;
        let endY = startY + this.trailVector.y * this.trailLength * 2;

        // let opacity = map(this.getVectorMagnitude(), 0, 10, 50, 200);
        
        push();
        strokeWeight(10);
        stroke('#446781');
        line(startX, startY, endX, endY);
        pop();
    }

}