class Page {

    constructor() {
        this.margin = 25;
        this.canvas = null;
        this.scaleX = 1;
        this.scaleY = 1;
        this.zoom = 1;
        this.translateY = 0;

        this.defaultWidth = 1280;
        this.defaultHeight = 720;

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
        }
        else {
            this.pageWidth = maxHeight * (16 / 9);
            this.pageHeight = maxHeight;
        }

        // Set scaling and padding
        this.updateScaling();
        this.setPadding();
    }

    setPadding() {
        // Calculate padding
        this.xPadding = (window.innerWidth - this.pageWidth - this.margin * 2) / 2;
        this.yPadding = (window.innerHeight - this.pageHeight - this.margin * 2) / 2;
    }

    setCanvas() {
        // Create Canvas variable, pad the sides and centre position
        this.canvas = createCanvas(this.pageWidth, this.pageHeight);
        this.canvas.position(this.xPadding + this.margin, this.yPadding + this.margin);
    }

    updateScaling() {
        // this.scaleX = (this.pageWidth / this.initialWidth) * 0.85;
        // this.scaleY = (this.pageHeight / this.initialHeight) * 0.85;
        this.scaleX = this.pageWidth / this.defaultWidth;
        this.scaleY = this.pageHeight / this.defaultHeight;
    }

    resize() {
        this.setPageSize();
        resizeCanvas(this.pageWidth, this.pageHeight);
        this.canvas.position(this.xPadding + this.margin, this.yPadding + this.margin);
        this.updateScaling(this.pageWidth, this.pageHeight);
    }

    updateZoom() {
        let zoomThreshold = (-this.pageHeight/2) * 0.95;

        if (game.player.pos.y >= zoomThreshold) {
            this.zoom = 1;
            this.translateY = 0;
        }
        else {
            let visible_height = (this.pageHeight/2) - game.player.pos.y;
            this.zoom = Math.min(1, this.pageHeight / visible_height);
            this.translateY = (zoomThreshold / this.zoom) - game.player.pos.y;
        }
    }

    // Returns complete scaling factor on X axis
    getXScale() { return this.scaleX * this.zoom; }
    // Returns complete scaling factor on Y axis
    getYScale() { return this.scaleY * this.zoom; }
    // Returns left X axis boundary
    getXLeft() { return (-this.pageWidth / 2) / this.getXScale(); }
    // Returns right X axis boundary
    getXRight() { return (this.pageWidth / 2) / this.getXScale(); }
    // Returns top Y axis boundary
    getYTop() { return (-this.pageHeight / 2) / this.getYScale(); }
    // Returns bottom Y axis boundary
    getYBottom() { return (this.pageHeight / 2) / this.getYScale(); }
    // Returns centre X value
    getXCentre() {}
    // Returns centre Y value
    getYCentre() {}
}

function windowResized() {
    game.page.resize();
    game.page.updateZoom();
}
