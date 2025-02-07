

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

        vertex(-170/zoom, height); // Bottom-left corner

        for (let x = -170 / zoom; x <= width / zoom; x += 5) {
            let y = this.f(x);
            vertex(x, y);
        }
        vertex(width / zoom, height); // Bottom-right corner
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
        return this.generateHills(x + offset);
    }
    slope(x) {
        let dx = 1;
        let y1 = this.f(x - dx/2);
        let y2 = this.f(x + dx/2);
        return (y2 - y1) / dx;
    }
}
