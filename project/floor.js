class Floor {

    constructor() {

        // Params for sin curve generation
        this.amplitudes = [];
        this.frequencies = [];
        this.phases = [];
        this.numWaves = 20; // Num sin waves to sum

        // Floor speed
        this.speed = 5;
        this.step = 5;
        this.frameMovement = 0;

        // Floor under player
        this.floorY1 = null;
        this.floorY2 = null;
        this.floorX1 = 200;
        this.floorX2 = 199;
    }

    initSinParams() {

        // Get randomised parameters for sin waves
        for (let i = 0; i < this.numWaves; i++) {
            this.amplitudes.push(Math.random() * 20 + 10);
            this.frequencies.push(Math.random() * 0.01 + 0.01);
            this.phases.push(Math.random() * Math.PI * 4);
        }
    }

    drawFloor() {

        let prevX = null;
        let prevY = null;

        //---this variable prevents the wave's jumping to another frame when accelerating
        this.frameMovement += this.speed;

        for (let x = 0; x <= width; x += this.step) {
            let y = height / 1.5 - this.generateHills(x + this.frameMovement);
            if (prevX !== null && prevY !== null) {
                stroke(255);
                line(prevX, prevY, x, y);
            }
            // Store vars under player
            if (x === player.x) {
                this.floorY1 = y;
                this.floorY2 = prevY;
            }
            prevX = x;
            prevY = y;
        }

    }

    generateHills(x) {
        // Sum randomised parameter sin curves for variation
        let y = 0;
        for (let i = 0; i < this.numWaves; i++) {
            y += this.amplitudes[i] * Math.sin(this.frequencies[i] * x + this.phases[i]);
        }
        return y;
    }

}
