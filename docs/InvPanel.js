class InvPanel {
    constructor() {
        this.visible = false;
        this.closeButton = null;
        this.abilityLabels = ["PROJECTILE", "FLYING", "FORCE FIELD"];
        this.abilityLevels = [5, 3, 5]; // Default values, will be updated from inventory
        this.isCloseButtonSelected = false;
    }

    show() {
        this.visible = true;

        // Update ability levels from inventory
        if (inventory) {
            this.abilityLevels = [
                inventory.laserLevel,
                inventory.flyLevel,
                inventory.forceFieldLevel
            ];
        }

        // Create close button
        this.createCloseButton();
    }

    hide() {
        this.visible = false;
        this.removeCloseButton();
        this.isCloseButtonSelected = false;

        if (game && game.pause) {
            for (let btn of game.pause.buttons) {
                btn.show();
                btn.style('z-index', 'auto');
            }
        }
    }

    draw() {
        if (!this.visible) return;

        push();
        // Panel dimensions
        let panelWidth = page.pageWidth * 0.5;
        let panelHeight = page.pageHeight * 0.5;
        let panelX = (page.pageWidth - panelWidth) / 2;
        let panelY = (page.pageHeight - panelHeight) / 2;

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
                    this.drawStar(starStartX + j * starSpacing, itemY, filledStarSize);
                } else {
                    // Empty star (outline) for levels not achieved - smaller size
                    stroke(255, 215, 0);
                    strokeWeight(2);
                    noFill();
                    this.drawStar(starStartX + j * starSpacing, itemY, emptyStarSize);
                    noStroke();
                }
            }
            fill(0); // Reset to black for text
        }
        this.updateCloseButtonStyle();
        pop();
    }

    drawStar(x, y, size) {
        push();
        translate(x, y);

        beginShape();
        for (let i = 0; i < 5; i++) {
            let angle = PI / 2 + i * TWO_PI / 5;
            let outerX = cos(angle) * size / 2;
            let outerY = sin(angle) * size / 2;
            vertex(outerX, outerY);

            angle += TWO_PI / 10;
            let innerX = cos(angle) * size / 5;
            let innerY = sin(angle) * size / 5;
            vertex(innerX, innerY);
        }
        endShape(CLOSE);

        pop();
    }

    createCloseButton() {
        let panelWidth = page.pageWidth * 0.5;
        let panelHeight = page.pageHeight * 0.5;
        let panelX = (page.pageWidth - panelWidth) / 2;
        let panelY = (page.pageHeight - panelHeight) / 2;

        let buttonWidth = panelWidth * 0.4;
        let buttonHeight = panelHeight * 0.12;
        let buttonX = panelX + (panelWidth - buttonWidth) / 2;
        let buttonY = panelY + panelHeight - buttonHeight - panelHeight * 0.1; // 10% bottom margin

        this.closeButton = createButton('CLOSE');
        this.closeButton.position(
            page.xPadding + page.margin + buttonX,
            page.yPadding + page.margin + buttonY
        );
        this.closeButton.size(buttonWidth, buttonHeight);
        this.closeButton.class('menuButton');
        this.closeButton.mousePressed(() => this.hide());
        this.closeButton.style('z-index', '10'); // Ensure button is above canvas

        // Set font size relative to button size
        let fontSize = buttonHeight * 0.3;
        let fontSizeRem = (fontSize / 16).toFixed(2) + 'rem';
        this.closeButton.style('font-size', fontSizeRem);
    }

    updateCloseButtonStyle() {
        if (this.closeButton) {
            if (this.isCloseButtonSelected) {
                this.closeButton.addClass('selectedButton');
            } else {
                this.closeButton.removeClass('selectedButton');
            }
        }
    }

    setCloseButtonSelected(selected) {
        this.isCloseButtonSelected = selected;
    }

    activateCloseButton() {
        if (this.isCloseButtonSelected) {
            this.hide();
        }
    }

    removeCloseButton() {
        if (this.closeButton !== null) {
            this.closeButton.remove();
            this.closeButton = null;
        }
    }

    isVisible() {
        return this.visible;
    }
}