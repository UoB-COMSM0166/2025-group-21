

class Pause {

    constructor() {
        this.active = false;
    }

    showPauseScreen() {
        fill(0, 0, 0, 150);
        rect(0, 0, window.innerWidth, window.innerHeight);
    }
}