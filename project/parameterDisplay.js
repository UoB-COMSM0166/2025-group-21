//---Real time display on screen for parameters----------
//(Debugging only)
class Display {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.spacing = 20;
        this.textSizeValue = 16;
    }

    show(slope, theta, floorSpeed, velocity, gravity) {
        fill(255);
        textSize(this.textSizeValue);
        textAlign(LEFT, TOP);

        text("Slope: " + slope.toFixed(2), this.x, this.y);
        text("Theta: " + theta.toFixed(2) + "°", this.x, this.y + this.spacing);
        text("Floor Speed: " + floorSpeed.toFixed(2), this.x, this.y + this.spacing * 2);
        text("Vertical Velocity: " + velocity.toFixed(2), this.x, this.y + this.spacing * 3);
        text("Gravity: " + gravity.toFixed(2), this.x, this.y + this.spacing * 4 );
    }
}