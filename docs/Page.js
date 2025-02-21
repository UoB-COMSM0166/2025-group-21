
class Page {

    // Not ideal constructor, will rewrite later
    constructor() {
        this.margin = 25;
        this.canvas = null;
        this.scaleX = 0.75;
        this.scaleY = 0.75;

        this.setPageSize();
        this.setCanvas();

        this.initialWidth = this.pageWidth;
        this.initialHeight = this.pageHeight;
    }

    setPageSize() {
        let maxWidth = window.innerWidth - this.margin * 2;
        let maxHeight = window.innerHeight - this.margin * 2;

        // Calculate dimensions, maintaining 16:9 aspect ratio
        if (maxWidth * (9 / 16) <= maxHeight) {
            this.pageWidth = maxWidth;
            this.pageHeight = maxWidth * (9 / 16);
        } else {
            this.pageWidth = maxHeight * (16 / 9);
            this.pageHeight = maxHeight;
        }

        // Calculate padding
        this.xPadding = (window.innerWidth - this.pageWidth - this.margin * 2) / 2;
        this.yPadding = (window.innerHeight - this.pageHeight - this.margin * 2) / 2;
    }

    setCanvas() {
        // Create Canvas variable, pad the sides and centre position
        this.canvas = createCanvas(this.pageWidth, this.pageHeight);
        this.canvas.position(this.xPadding + this.margin, this.yPadding + this.margin);
    }

    adjustGameScale() {
        this.scaleX = this.pageWidth / this.initialWidth * 0.75;
        this.scaleY = this.pageHeight / this.initialHeight * 0.75;
    }
}

function windowResized() {

    // Resize page
    page.setPageSize();
    resizeCanvas(page.pageWidth, page.pageHeight);
    page.canvas.position(page.xPadding, page.yPadding);
    page.adjustGameScale();

    // Lock player to terrain while resizing
    player.pos.y = terrain.f(player.pos.x);
    player.vel.y = 0;
    player.acc.y = 0;
}