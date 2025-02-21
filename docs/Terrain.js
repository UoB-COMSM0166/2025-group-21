

class Terrain {

    amplitudes = [];
    frequencies = []; // Wavelengths
    phases = [];  // Phase offsets

    constructor() {
        this.numWaves = 20;  // Number of sine waves to sum
        this.floorLevel = 0

        for (let i = 0; i < this.numWaves; i++) {
            this.amplitudes.push(Math.random() * 10 + 10);
            this.frequencies.push(Math.random() * 0.012 + 0.01);
            this.phases.push(Math.random() * Math.PI * 4);
        }
    }

    drawHills() {

        noStroke();
        beginShape();

        fill(187, 252, 252); // Ice colour

        vertex((-page.pageWidth/2 / page.scaleX) / zoom, (page.pageHeight/2 / page.scaleX) / zoom);

        for (let x = ((-page.pageWidth / 2) / page.scaleX) / zoom; x <= ((page.pageWidth / 2) / page.scaleX) / zoom; x += 5) {
            let y = this.f(x);
            vertex(x, y);
        }
        vertex((page.pageWidth/2 / page.scaleX) / zoom, (page.pageHeight/2 / page.scaleX) / zoom);


        endShape(CLOSE);

    }

    generateHills(x) {
        let y = (((page.pageHeight / 2) * 0.5) / page.scaleX);  // Base height
        this.floorLevel = y;

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
