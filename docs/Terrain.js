

class Terrain {

    amplitudes = [];
    frequencies = []; // Wavelengths
    phases = [];  // Phase offsets

    constructor() {
        this.numWaves = 30;  // Number of sine waves to sum
        this.stage = 1;
        this.randomnessFactor = 0;

        // for (let i = 0; i < 26; i++) {
        //     this.amplitudes.push(2);
        //     this.frequencies.push(0.01);
        //     this.phases.push(0);
        // }
        //
        // let ampVariation = 1 * 10 + 2;
        // let freqVariation = 1 * 0.01 + 0.01;
        // let phaseVariation = Math.PI * (1 + 1 * 0.5);
        //
        // for (let i = 0; i < 4; i++) {
        //     this.amplitudes.push(Math.random() * ampVariation);
        //     this.frequencies.push(Math.random() * freqVariation);
        //     this.phases.push(Math.random() * phaseVariation);
        // }

        // Add new (more random) elements to end

        // // // OLD RANDOMISED HILLS PARAMS PRIOR TO INCREASING DIFFICULTY CHANGE
        for (let i = 0; i < this.numWaves; i++) {
            this.amplitudes.push(Math.random() * 10 + 10);
            this.frequencies.push(Math.random() * 0.012 + 0.01);
            this.phases.push(Math.random() * Math.PI * 4);
        }
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

    drawHills() {
        // If reached new stage distance, make hill parameters more randomised
        // if (game.offset / 10000 > this.stage) {
        //     this.updateHillParams();
        //     this.stage++;
        // }

        console.log(this.randomnessFactor);

        for (let i=0; i<6; i++) {
            this.drawLayer(159, 216 - 10*i, 251, i);
        }
        this.drawSnow();
    }

    drawLayer(r, g, b, layer) {
        beginShape();

        fill(`rgb(${r},${g},${b})`);
        vertex(-170 / game.zoom, height);

        for (let x = -170 / game.zoom; x <= width / game.zoom + 10; x += 5 / game.zoom) {
            let y = this.f(x) + 50*layer + 10;
            vertex(x, y);
        }
        vertex(width/game.zoom + 10, height);
        endShape(CLOSE);
    }

    drawSnow() {
        fill('rgb(255,238,241)');
        beginShape();

        for (let x = -170 / game.zoom; x <= width / game.zoom + 10; x += 5 / game.zoom) {
            let y = this.f(x);
            let newY = y + 2*sin((x + game.offset) * 0.05) + 2*cos((x + game.offset) * 0.07) - 3;
            vertex(x, newY);
        }
        for (let x = width / game.zoom + 10; x >= -170 / game.zoom; x -= 5 / game.zoom) {
            let y = this.f(x) + 20;
            let newY = y + 2*sin((x + game.offset) * 0.04) + 2*cos((x + game.offset) * 0.05) - 3;
            vertex(x, newY);
        }
        endShape(CLOSE);
    }

    generateHills(x) {
        let y = height - 150;  // Base height

        for (let i = 0; i < this.numWaves; i++) {
            y -= this.amplitudes[i] * sin(this.frequencies[i] * (x) + this.phases[i]);
        }
        return y;
    }

    // Calculate amplitude, y, of terrain curve at position x
    f(x) {
        return this.generateHills(x + game.offset);
    }

    slope(x) {
        let dx = 1;
        let y1 = this.f(x - dx/2);
        let y2 = this.f(x + dx/2);
        return (y2 - y1) / dx;
    }
}
