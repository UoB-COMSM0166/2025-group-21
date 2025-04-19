

class Terrain {

    amplitudes = [];
    frequencies = []; // Wavelengths
    phases = [];  // Phase offsets

    constructor() {
        this.numWaves = 30;  // Number of sine waves to sum
        this.stage = 1;
        this.randomnessFactor = 0;

        for (let i = 0; i < 27; i++) {
            this.amplitudes.push(2);
            this.frequencies.push(0.01);
            this.phases.push(0);
        }
        let ampFactor;
        let freqFactor;
        let phaseFactor;

        switch (settings.difficulty) {
            case 0:
                ampFactor = 10;
                freqFactor = 0.007;
                phaseFactor = 4;
                break;
            case 1:
                ampFactor = 30;
                freqFactor = 0.012;
                phaseFactor = 6;
                break;
            case 2:
                ampFactor = 40;
                freqFactor = 0.016;
                phaseFactor = 9;
                break;
        }

        for (let i = 0; i < 4; i++) {
            this.amplitudes.push(ampFactor + 0.25*ampFactor*Math.random() - 0.125*ampFactor);
            this.frequencies.push(freqFactor + 0.3*freqFactor*Math.random());
            this.phases.push(phaseFactor * Math.PI);
        }

        this.rampHeight = this.calculateInitialRamp();

        //this.ramp = this.preRenderRamp()

        // Add new (more random) elements to end

        // OLD RANDOMISED HILLS PARAMS PRIOR TO INCREASING DIFFICULTY CHANGE
        // for (let i = 0; i < this.numWaves; i++) {
        //     this.amplitudes.push(Math.random() * 10 + 10);
        //     this.frequencies.push(Math.random() * 0.012 + 0.01);
        //     this.phases.push(Math.random() * Math.PI * 4);
        // }
    }

    updateHillParams() {
        // Calc a randomness factor based on offset
        this.randomnessFactor = Math.min(50000 / 10000, 1);

        // Remove first element (oldest / least random)
        this.amplitudes.shift();
        this.frequencies.shift();
        this.phases.shift();

        // Calc variation to apply relative to each param
        let ampVariation = this.randomnessFactor * 10 + 2;
        let freqVariation = this.randomnessFactor * 0.01 + 0.01;
        let phaseVariation = Math.PI * (1 + this.randomnessFactor * 0.5);

        // Add new (more random) elements to end
        this.amplitudes.push(Math.random() * ampVariation);
        this.frequencies.push(Math.random() * freqVariation);
        this.phases.push(Math.random() * phaseVariation);
    }

    drawHills(length, canvas) {
        // If reached new stage distance, make hill parameters more randomised
        // if (game.offset / 10000 > this.stage) {
        //     this.updateHillParams();
        //     this.stage++;
        // }

        //console.log(this.randomnessFactor);

        if (canvas === undefined) {
            canvas = window._renderer._pInst;
        }

        for (let i=0; i<6; i++) {
            this.drawLayer(160 - 10*i, 205 - 15*i, 230 - 5*i, i, length, canvas);
        }
        this.drawSnow(length, canvas);
    }

    drawLayer(r, g, b, layer, length, canvas) {
        beginShape();

        fill(`rgb(${r},${g},${b})`);
        canvas.vertex(-170 / domains.game.zoom, height);

        for (let x = -170 / domains.game.zoom; x <= length / domains.game.zoom + 10; x += 5 / domains.game.zoom) {
            let y = this.f(x) + 50*layer + 10;
            canvas.vertex(x, y);
        }
        canvas.vertex(length/domains.game.zoom + 10, height);
        endShape(CLOSE);
    }

    drawSnow(length, canvas) {
        fill('rgb(255,238,241)');
        beginShape();

        for (let x = -170 / domains.game.zoom; x <= length / domains.game.zoom + 10; x += 5 / domains.game.zoom) {
            let y = this.f(x);
            let newY = y + 2*sin((x + domains.game.offset) * 0.05) + 2*cos((x + domains.game.offset) * 0.07) - 3;
            canvas.vertex(x, newY);
        }
        for (let x = length / domains.game.zoom + 10; x >= -170 / domains.game.zoom; x -= 5 / domains.game.zoom) {
            let y = this.f(x) + 20;
            let newY = y + 2*sin((x + domains.game.offset) * 0.04) + 2*cos((x + domains.game.offset) * 0.05) - 3;
            canvas.vertex(x, newY);
        }
        endShape(CLOSE);
    }

    generateHills(x) {
        let y = height * 0.8;
        // Generate initial ramp at start
        if (x < 2300) {
            y = this.generateInitialRamp(x, y);

            // // pre-calculated ramp
            // const xFloor = Math.floor(x);
            // const t = (x - xFloor);
            // y = this.rampHeight[xFloor] + t * (this.rampHeight[xFloor + 1] - this.rampHeight[xFloor]);
        }
        else {
            for (let i = 0; i < this.numWaves; i++) {
                y -= this.amplitudes[i] * Math.sin(this.frequencies[i] * x + this.phases[i]);
            }
        }

        return y;
    }

    calculateInitialRamp() {
        // Y params
        let platformHeight = height * 0.3;
        let downRampHeight = height * 0.25;
        let upRampHeight = height * 0.125;
        // X parameters
        let platformLength = 200;
        let downRampLenth = 700;
        let upRampLength = 1000;
        let blendLength = 400;

        let groundHeight = [] //new Float32Array(2300);

        for (let x=0; x<2300; x++) {
            let y = height * 0.8;
            // Flat platform to start
            if (x < platformLength) {
                y = platformHeight;
            }
            // Down ramp
            else if (x < platformLength + downRampLenth) {
                let t = (x - platformLength) / downRampLenth;
                y = platformHeight + downRampHeight * (1 - sin(t * Math.PI + Math.PI / 2));
            }
            // Up ramp for launch
            else if (x < platformLength + downRampLenth + upRampLength) {
                let t = 2 * (x - (platformLength + downRampLenth)) / upRampLength;
                y -= upRampHeight * (1 - sin(t * Math.PI + Math.PI / 2));
            }
            // Blend into sine curves
            else if (x < platformLength + downRampLenth + upRampLength + blendLength) {
                let t = (x - (platformLength + downRampLenth + upRampLength)) / blendLength;
                for (let i = 0; i < this.numWaves; i++) {
                    y -= t * this.amplitudes[i] * Math.sin(this.frequencies[i] * x + this.phases[i]);
                }
            }
            groundHeight.push(y);
            //groundHeight[x] = y;
        }
        return groundHeight;
    }

    generateInitialRamp(x) {
        let y = height * 0.8;
        // Y params
        let platformHeight = height * 0.3;
        let downRampHeight = height * 0.25;
        let upRampHeight = height * 0.125;
        // X parameters
        let platformLength = 200;
        let downRampLenth = 700;
        let upRampLength = 1000;
        let blendLength = 400;

        // Flat platform to start
        if (x < platformLength) {
            y = platformHeight;
        }
        // Down ramp
        else if (x < platformLength + downRampLenth) {
            let t = (x - platformLength) / downRampLenth;
            y = platformHeight + downRampHeight * (1 - sin(t * Math.PI + Math.PI / 2));
        }
        // Up ramp for launch
        else if (x < platformLength + downRampLenth + upRampLength) {
            let t = 2 * (x - (platformLength + downRampLenth)) / upRampLength;
            y -= upRampHeight * (1 - sin(t * Math.PI + Math.PI / 2));
        }
        // Blend into sine curves
        else if (x < platformLength + downRampLenth + upRampLength + blendLength) {
            let t = (x - (platformLength + downRampLenth + upRampLength)) / blendLength;
            for (let i = 0; i < this.numWaves; i++) {
                y -= t * this.amplitudes[i] * Math.sin(this.frequencies[i] * x + this.phases[i]);
            }
        }
        return y;
    }

    // Calculate amplitude, y, of terrain curve at position x
    f(x) {
        return this.generateHills(x + domains.game.offset);
    }

    slope(x) {
        let dx = 1;
        let y1 = this.f(x - dx/2);
        let y2 = this.f(x + dx/2);
        return (y2 - y1) / dx;
    }
}
