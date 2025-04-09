

class Clock {

    constructor() {
        this.time = 0;
    }

    tick() {
        this.time++;
    }

    reset() {
        this.time = 0;
    }
}