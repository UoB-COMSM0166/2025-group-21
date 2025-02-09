

class Terrain {

    numWaves;
    amplitudes = [];
    frequencies = []; // Wavelengths
    phases = [];  // Phase offsets
    constructor() {
        this.numWaves = 20;  // Number of sine waves to sum

        for (let i = 0; i < this.numWaves; i++) {
            this.amplitudes.push(Math.random() * 10 + 10);
            this.frequencies.push(Math.random() * 0.012 + 0.01);
            this.phases.push(Math.random() * Math.PI * 4);
        }
    }


    drawHills() {

        fill(187, 252, 252); // Ice colour
        noStroke();
        beginShape();

        vertex(-170/zoom, height); // Bottom-left corner
        let hillPoints = [];

        for (let x = -170 / zoom; x <= width / zoom + 10; x += 5) {
            let y = this.f(x);
            hillPoints.push({x, y});
            vertex(x, y);
        }
        vertex(width / zoom, height); // Bottom-right corner
        endShape();



        // Draw snow on top of hills
        fill(255);
        beginShape();

        // Top edge
        for (let point of hillPoints) {
            let y = point.y, x = point.x
            let newY = y + 2*sin((x + offset) * 0.05) + 2*cos((x + offset) * 0.07) - 3;
            vertex(x, newY);
        }
        // Bottom edge
        for (let i = hillPoints.length-1; i >= 0; i--) {

            let {x, y} = hillPoints[i];
            let newY = y + 10*sin((x + offset) * 0.1) + 10*cos((x + offset) * 0.17) + 10*cos((x + offset) * 0.217) + 30;

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
        return this.generateHills(x + offset);
    }
    slope(x) {
        let dx = 1;
        let y1 = this.f(x - dx/2);
        let y2 = this.f(x + dx/2);
        return (y2 - y1) / dx;
    }
}
