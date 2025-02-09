class Page {

    // Not ideal constructor, will rewrite later
    constructor () {
        this.xPadding = 0;
        this.yPadding = 0;
        this.margin = 25;
        this.gameScale = 1;
        this.pageHeight;
        this.pageWidth;
        this.canvas = null;

        this.setPageSize();
        this.setPadding();
        this.setCanvas();
    }

    setPageSize() {

        // Calc maximum dimensions
        let maxWidth = window.innerWidth - this.margin * 2;
        let maxHeight = window.innerHeight - this.margin * 2;

        // Calc maximum dimensions, but still in 16:9
        let widthBasedHeight = maxWidth * 9 / 16;
        let heightBasedWidth = maxHeight * 16 / 9;

        // Use limiting dimension
        if (widthBasedHeight <= maxHeight) {
            this.pageWidth = maxWidth;
            this.pageHeight = widthBasedHeight;
        } else {
            this.pageHeight = maxHeight;
            this.pageWidth = heightBasedWidth;
        }
    }

    setPadding() {
        this.xPadding = (window.innerWidth - this.pageWidth - this.margin * 2) / 2;
        this.yPadding = (window.innerHeight - this.pageHeight - this.margin * 2) / 2;
    }

    setCanvas() {
        // Create canvas var, pad and position
        this.canvas = createCanvas(this.pageWidth, this.pageHeight);
        this.canvas.position(this.xPadding + this.margin, this.yPadding + this.margin);
    }

    adjustGameScale() {

        // Store old height
        let oldHeight = this.pageHeight;
        let oldWidth = this.pageWidth;

        // Update dimensions
        page.setPageSize();
        page.setPadding();

        // Calc ratio of change
        // this.gameScale *= min(this.pageHeight / oldHeight, this.pageWidth / oldWidth);
    }

}


function windowResized() {

    // Update the page scale
    page.adjustGameScale();

    // Resize and reposition the canvas
    resizeCanvas(page.pageWidth, page.pageHeight);
    page.canvas.position(page.xPadding + page.margin, page.yPadding + page.margin);
}
