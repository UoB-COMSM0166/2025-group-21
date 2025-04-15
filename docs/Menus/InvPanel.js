class InvPanel {
    constructor() {
        this.abilityLabels = ["PROJECTILE", "FLYING", "FORCE FIELD"];
        this.abilityLevels = [inventory.laserLevel, inventory.flyLevel, inventory.forceFieldLevel];
        this.isCloseButtonSelected = false;
    }

    updateCloseButton() {
        push();
        let pos = createVector(0.5*width, 0.67*height)
        let scale = 0.01 * width;
        let size = createVector(closeButton.width / scale, closeButton.height / scale);
        imageMode(CENTER);

        if (hoveringOverButton(pos, size)) {
            image(closeButtonHover, pos.x, pos.y, size.x, size.y);

            if (mouseIsPressed) {
                game.pause.showInvPanel = false;
                this.isCloseButtonSelected = false;
                game.pause.startCooldown();
            }
        }
        else if (this.isCloseButtonSelected) {
            image(closeButtonHover, pos.x, pos.y, size.x, size.y);
        }
        else {
            image(closeButton, pos.x, pos.y, size.x, size.y);
        }
        pop();
    }

    draw() {

        push();
        // Panel dimensions
        let panelWidth = width * 0.5;
        let panelHeight = height * 0.5;
        let panelX = (width - panelWidth) / 2;
        let panelY = (height - panelHeight) / 2;

        // Draw white rounded rectangle
        fill(255);
        rectMode(CORNER);
        rect(panelX, panelY, panelWidth, panelHeight, 20); // 20 is the corner radius

        // Add panel title
        textAlign(CENTER, TOP);
        textFont('Trebuchet MS');
        textSize(panelHeight * 0.08);
        fill(65, 145, 200); // Blue color matching menu buttons
        text("INVENTORY", panelX + panelWidth/2, panelY + panelHeight * 0.07);

        // Calculate content area dimensions for better spacing
        let contentAreaHeight = panelHeight * 0.6; // 60% of the panel height for content
        let contentStartY = panelY + panelHeight * 0.18; // Start 20% from the top
        let itemSpacing = contentAreaHeight / (this.abilityLabels.length);

        // Set text properties for ability names
        textAlign(LEFT, CENTER);
        textSize(panelHeight * 0.06);
        fill(0);

        // Calculate star parameters
        let baseStarSize = panelHeight * 0.045;
        let filledStarSize = baseStarSize * 1.2; // Filled stars are 20% larger
        let emptyStarSize = baseStarSize * 0.9;  // Empty stars are 10% smaller
        let starSpacing = baseStarSize * 1.5;
        let totalStarWidth = 5 * starSpacing;

        // Fixed width for labels (about 40% of panel width)
        let labelWidth = panelWidth * 0.4;

        // Calculate total width and center position
        let totalWidth = labelWidth + totalStarWidth;
        let startX = panelX + (panelWidth - totalWidth) / 2;
        let starStartX = startX + labelWidth;

        for (let i = 0; i < this.abilityLabels.length; i++) {
            let itemY = contentStartY + i * itemSpacing + itemSpacing / 2;

            // Draw ability name
            text(this.abilityLabels[i], startX, itemY);

            // Draw yellow stars
            fill(255, 215, 0); // Gold color
            for (let j = 0; j < 5; j++) {
                if (j < this.abilityLevels[i]) {
                    // Filled star for levels achieved - larger size
                    inventory.drawStar(starStartX + j * starSpacing, itemY, filledStarSize);
                } else {
                    // Empty star (outline) for levels not achieved - smaller size
                    stroke(255, 215, 0);
                    strokeWeight(2);
                    noFill();
                    inventory.drawStar(starStartX + j * starSpacing, itemY, emptyStarSize);
                    noStroke();
                }
            }
            fill(0); // Reset to black for text
        }
        this.updateCloseButton();
        pop();
    }

    setCloseButtonSelected(selected) {
        this.isCloseButtonSelected = selected;
    }
}
