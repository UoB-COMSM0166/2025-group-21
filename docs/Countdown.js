class Countdown {
    constructor() {
        this.startTime = millis();
        this.currentNumber = 3;
        this.completed = false;
    }

    display() {
        let elapsedTime = millis() - this.startTime;

        // Update current number every second
        this.currentNumber = Math.max(1, Math.ceil((3000 - elapsedTime) / 1000));

        // Check if countdown is complete
        if (elapsedTime >= 3000) {
            this.completed = true;
            return;
        }

        // Draw countdown number
        push();
        textAlign(CENTER, CENTER);
        textFont('Trebuchet MS');
        textSize(page.pageWidth / 10);
        fill(255);

        // Add slight shadow/outline effect
        stroke(0);
        strokeWeight(page.pageWidth / 100);
        text(this.currentNumber, width/2, height/2);
        pop();
    }
}