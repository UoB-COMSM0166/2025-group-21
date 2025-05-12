class Terrain {

    amplitudes = [];
    frequencies = []; // Wavelengths
    phases = [];  // Phase offsets

    constructor() {
        this.numWaves = 30;  // Number of sine waves to sum
        this.randomnessFactor = 0;

        for (let i = 0; i < 27; i++) {
            this.amplitudes.push(2);
            this.frequencies.push(0.01);
            this.phases.push(0);
        }
        let ampFactor;
        let freqFactor;
        let phaseFactor;

        // set base curve parameters based on difficulty
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

        // generate random variation in these parameters and add to arrays
        for (let i = 0; i < 4; i++) {
            this.amplitudes.push(ampFactor + 0.25*ampFactor*Math.random() - 0.125*ampFactor);
            this.frequencies.push(freqFactor + 0.3*freqFactor*Math.random());
            this.phases.push(phaseFactor * Math.PI);
        }

        this.step = settings.difficulty === 2 ? 15 : 30;
    }

    drawHills(length, canvas) {
        if (canvas === undefined) {
            canvas = window._renderer._pInst;
        }

        for (let i=0; i<6; i++) {
            this.drawLayer(160 - 10*i, 205 - 15*i, 230 - 5*i, i, length, canvas);
        }
        this.drawSnow(length, canvas);
    }

    // Draw the individual terrain layers
    drawLayer(r, g, b, layer, length, canvas) {
        beginShape();
        fill(`rgb(${r},${g},${b})`);
        canvas.vertex(-170 / domains.game.zoom, height);

        for (let x = -170 / domains.game.zoom; x <= length / domains.game.zoom + 20; x += this.step) {
            let y = this.f(x) + 50*layer + 10;
            canvas.vertex(x, y);
        }
        canvas.vertex(length/domains.game.zoom + 10, height);
        endShape(CLOSE);
    }

    // Draw the snow layer on top of the hills
    drawSnow(length, canvas) {
        fill('rgb(255,238,241)');
        beginShape();

        for (let x = -170 / domains.game.zoom; x <= length / domains.game.zoom + 10; x += 15) {
            let y = this.f(x);
            let newY = y + 2*sin((x + domains.game.offset) * 0.05) + 2*cos((x + domains.game.offset) * 0.07) - 3;
            canvas.vertex(x, newY);
        }
        for (let x = length / domains.game.zoom + 10; x >= -170 / domains.game.zoom; x -= 15) {
            let y = this.f(x) + 20;
            let newY = y + 2*sin((x + domains.game.offset) * 0.04) + 2*cos((x + domains.game.offset) * 0.05) - 3;
            canvas.vertex(x, newY);
        }
        endShape(CLOSE);
    }

    // Generate initial ramp or rolling hills based on offset
    generateHills(x) {
        // Set intial height
        let y = height * 0.8;
        // Initial ramp switch statement
        switch (true) {
            case (x < 200):
                y = height * 0.3;
                break;
            case (x < 900):
                y = (height*0.3) + (height*0.25) * (1 - Math.cos(((x-200)/700) * Math.PI));
                break;
            case (x < 1900):
                y -= (height*0.125) * (1 - Math.cos((2*(x-(900))/1000) * Math.PI));
                break;
            case (x < 2500):
                for (let i = 0; i < this.numWaves; i++) {
                    y -= ((x-(1900))/600) * this.amplitudes[i] * Math.sin(this.frequencies[i] * x + this.phases[i]);
                }
                break;
            default:
                for (let i = 0; i < this.numWaves; i++) {
                    y -= this.amplitudes[i] * Math.sin(this.frequencies[i] * x + this.phases[i]);
                }
        }
        return y;
    }

    // Calculate amplitude, y, of terrain curve at position x
    f(x) {
        return this.generateHills(x + domains.game.offset);
    }

    // Calculate the slope of the terrain
    slope(x) {
        let dx = 1;
        let y1 = this.f(x - dx/2);
        let y2 = this.f(x + dx/2);
        return (y2 - y1) / dx;
    }
}

if (typeof module !== 'undefined') { module.exports = Terrain; }

