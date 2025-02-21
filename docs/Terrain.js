

class Terrain {

    amplitudes = [];
    frequencies = []; // Wavelengths
    phases = [];  // Phase offsets

    constructor() {
        this.numWaves = 20;  // Number of sine waves to sum
        for (let i = 0; i < this.numWaves; i++) {
            this.amplitudes.push(Math.random() * 7 + 10);
            this.frequencies.push(Math.random() * 0.012 + 0.01);
            this.phases.push(Math.random() * Math.PI * 4);
        }
    }

    drawHills() {
        let step = 5;

        // Init shape and define colour
        noStroke();
        beginShape();
        fill(187, 252, 252);

        // Set shape vertices
        vertex(page.getXLeft(), page.getYBottom());
        for (let x = page.getXLeft() - step; x <= page.getXRight() + step; x += step) {
            vertex(x, this.f(x));
        }
        vertex(page.getXRight(), page.getYBottom());
        endShape(CLOSE);
    }

    generateHills(x) {
        let y = ((page.pageHeight / 2) * 0.5);  // Base height

        for (let i = 0; i < this.numWaves; i++) {
            y -= (this.amplitudes[i] * sin(this.frequencies[i] * (x) + this.phases[i]));
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
