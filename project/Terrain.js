

class Terrain {

    numWaves;
    amplitudes = [];
    frequencies = []; // Wavelengths
    phases = [];  // Phase offsets
    constructor() {
        this.numWaves = 20;  // Number of sine waves to sum

        for (let i = 0; i < this.numWaves; i++) {
            this.amplitudes.push(Math.random() * 20);
            this.frequencies.push(Math.random() * 0.015 + 0.01);
            this.phases.push(Math.random() * Math.PI * 4);
        }
    }
    drawHills() {
        fill(187, 252, 252); // Ice colour
        noStroke();
        beginShape();

        vertex(0, height); // Bottom-left corner

        for (let x = 0; x <= width; x += 5) {
            let y = this.f(x);
            vertex(x, y);
        }
        vertex(width, height); // Bottom-right corner
        endShape(CLOSE);
    }

    // Generates hills using a sum of sine waves
    generateHills(x) {
        let y = height - 150;  // Base height

        for (let i = 0; i < this.numWaves; i++) {
            y -= this.amplitudes[i] * sin(this.frequencies[i] * x + this.phases[i]);
        }
        return y;
    }

    // Calculate amplitude, y, of terrain curve at position x
    f(x) {
        return this.generateHills(x + offset);
    }
    slope(x) {
        let dx = 0.01;
        let y1 = this.f(x);
        let y2 = this.f(x + dx);
        return (y2 - y1) / dx;
    }

    secondDerivative(x) {
        let dx = 0.01;
        let y1 = this.slope(x);
        let y2 = this.slope(x + dx);
        return (y2 - y1) / dx;
    }
}