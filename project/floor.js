class Floor {

    constructor() {
        this.yBelow = null;
        this.yBehind = null;
        this.amplitudes = [];
        this.frequencies = [];
        this.phases = [];
        this.speed = 5;
        this.numWaves = 20; // Num sin waves to sum
        this.step = 5;
        this.frameMovement = 0;
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

            let currentY = height / 1.5 - this.generateHills(x + this.frameMovement);

            if (prevX !== null && prevY !== null) {
                stroke(255);
                line(prevX, prevY, x, currentY);
            }

            if (x === player.x) {
                this.yBelow = currentY;
                this.yBehind = prevY || currentY;
            }

            prevX = x;
            prevY = currentY;

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

    //---Needed for the calculus of Thetha
    floorYatX(worldX) {
        return height / 1.5 - this.generateHills(worldX);
    }

}
