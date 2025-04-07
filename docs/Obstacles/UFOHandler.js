

class UFOHandler {

    constructor() {
        this.spawnRate = 1;
        this.nextSpawnThreshold = 100;
        this.UFOs = [];
        this.explosions = [];
        this.collisionRadius = 50;



    }
    updateUFOs() {

        if (!game.pause.active && game.zoom < 1 &&
            Math.random() > 0.99 - 0.005*this.spawnRate) { // 0.975

            this.UFOs.push(new UFO(game.player.pos.y + 0.3*(height - game.player.pos.y)*Math.random() + 50));
        }

        for (let i=0; i<this.UFOs.length; i++) {
            if (!game.pause.active) this.UFOs[i].updatePosition();
            this.UFOs[i].drawUFO();

            // UFO crosses barrier slightly beyond edge of screen
            if (this.UFOs[i].pos.x < -200/game.zoom || this.UFOs[i].pos.x > width/game.zoom ||
                (this.UFOs[i].pos.y < game.player.pos.y - 10*game.topMargin/game.zoom && game.zoom < 1) ||
                (this.UFOs[i].pos.y < -500 && game.zoom === 1) ||
                this.UFOs[i].pos.y > height/game.zoom) {

                this.UFOs.splice(i, 1);
            }
        }
        if (game.player.alive) {
            this.checkForPlayerUFOCollision();
            this.updateSpawnRate();
        }
    }

    updateSpawnRate() {
        if (game.offset/100 > this.nextSpawnThreshold) {
            this.nextSpawnThreshold += 100;
            this.spawnRate++;
        }
    }
    checkForPlayerUFOCollision() {

        for (let u=0; u<this.UFOs.length; u++) {

            if (this.UFOs[u] !== undefined) {

                let dx = abs(game.player.pos.x - this.UFOs[u].pos.x);
                let dy = abs(game.player.pos.y - this.UFOs[u].pos.y);

                if (Math.sqrt(dx**2 + dy**2) < this.collisionRadius) {
                    this.explosions.push(new Explosion(this.UFOs[u].pos));
                    this.UFOs.splice(u, 1);
                    explosionSound.play();

                    if (!game.invincibility) {
                        game.death = new Death('UFO');
                        game.player.vel.x = -0.5;
                        game.player.vel.y = 0;
                    }
                }
            }
        }
    }

    updateExplosions() {

        for (let i=0; i<this.explosions.length; i++) {

            if (this.explosions[i].explosionComplete) {
                this.explosions.splice(i, 1);
            }
            else this.explosions[i].explode();
        }
    }



}