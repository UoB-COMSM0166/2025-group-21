
class Setting {
    constructor(parentDomain = 'mainMenu') {
        this.parentDomain = parentDomain;

        //sound effect slider
        this.sfxSlider = createSlider(0, 100, 50, 1);
        this.sfxSlider.elt.style.outline = "none";
        this.sfxSlider.mousePressed(() => {
            this.selectedOptionIndex = 0;
            this.updateFocusDisplay();
            this.sfxSlider.elt.blur();
        });

        //bgm slider
        this.bgmSlider = createSlider(0, 100, 50, 1);
        this.bgmSlider.elt.style.outline = "none";
        this.bgmSlider.mousePressed(() => {
            this.selectedOptionIndex = 1;
            this.updateFocusDisplay();
            this.bgmSlider.elt.blur();
        });


        this.backButton = createButton('return');
        this.backButton.elt.style.outline = "none";
        this.backButton.mousePressed(() => {
            this.backToMainMenu();
            this.backButton.elt.blur();
        });


        this.options = [this.sfxSlider, this.bgmSlider, this.backButton];
        this.selectedOptionIndex = 0;
        this.updateFocusDisplay();
    }


    draw() {

        background(240, 248, 255);
        imageMode(CORNER);
        image(homeBackground, 0, 0, page.pageWidth, page.pageHeight);


        let boxWidth   = page.pageWidth * 0.9;
        let boxHeight  = page.pageHeight * 0.9;
        let boxCenterX = page.pageWidth / 2;
        let boxCenterY = page.pageHeight / 2;

        let boxLeft = boxCenterX - boxWidth / 2;
        let boxTop  = boxCenterY - boxHeight / 2;


        push();
        imageMode(CENTER);
        image(tipsBox, boxCenterX, boxCenterY, boxWidth, boxHeight);
        pop();

        textFont(instructionFont);
        fill(0);
        textSize(page.pageWidth * 0.03);
        textAlign(CENTER, TOP);
        text("Setting", boxCenterX, boxTop + boxHeight * 0.275);

        let labelX  = boxLeft + boxWidth * 0.15;
        let sliderX = boxLeft + boxWidth * 0.5;
        let sfxY = boxTop + boxHeight * 0.45;
        let bgmY = boxTop + boxHeight * 0.57;

        textAlign(LEFT, CENTER);
        textSize(page.pageWidth * 0.02);
        text("Sound Effect Volume: " + this.sfxSlider.value(), labelX, sfxY);
        text("Background Music Volume: " + this.bgmSlider.value(), labelX, bgmY);


        this.sfxSlider.position(page.xPadding + page.margin + sliderX, page.yPadding + page.margin + sfxY - (this.sfxSlider.height / 2));
        this.sfxSlider.style('width', (boxWidth * 0.3) + "px");

        this.bgmSlider.position(page.xPadding + page.margin + sliderX, page.yPadding + page.margin + bgmY - (this.bgmSlider.height / 2));
        this.bgmSlider.style('width', (boxWidth * 0.3) + "px");

        let hintY = boxTop + boxHeight * 0.66;

        textAlign(CENTER, TOP);
        textSize(page.pageWidth * 0.016);
        fill(0);

        text(
            "Use the <up/down arrows> to switch tabs, <left/right arrows> to adjust the volume,\n " +
            "or just use the mouse to operate",
            boxCenterX,
            hintY
        );


        let btnWidth  = page.pageWidth * 0.2;
        let btnHeight = page.pageHeight * 0.1;
        let btnX = page.xPadding + page.margin + (page.pageWidth - btnWidth) / 2;
        let btnY = page.yPadding + page.margin + (boxCenterY + boxHeight / 2 - btnHeight - 10);
        this.backButton.position(btnX, btnY);
        this.backButton.size(btnWidth, btnHeight);

        let sfxValue  = this.sfxSlider.value();
        let bgmValue  = this.bgmSlider.value();
        let sfxVolume = sfxValue / 100.0;
        let bgmVolume = bgmValue / 100.0;
        if (deathSound)       deathSound.setVolume(sfxVolume);
        if (explosionSound)   explosionSound.setVolume(sfxVolume);
        if (fishImpactSound)  fishImpactSound.setVolume(sfxVolume);
        if (fishThrow)        fishThrow.setVolume(sfxVolume);
        if (laserSound)       laserSound.setVolume(sfxVolume);
        if (forceFieldSound)  forceFieldSound.setVolume(bgmVolume);
        if (windSound)        windSound.setVolume(bgmVolume);
    }

    updateFocusDisplay() {
        for (let i = 0; i < this.options.length; i++) {
            let elem = this.options[i];
            if (i === this.selectedOptionIndex) {
                if (elem.elt) {
                    elem.elt.style.border = "3px solid blue";
                } else {
                    elem.style('border', '3px solid blue');
                }
            } else {
                if (elem.elt) {
                    elem.elt.style.border = "none";
                } else {
                    elem.style('border', 'none');
                }
            }
        }
    }

    moveSelection(direction) {
        this.selectedOptionIndex = (this.selectedOptionIndex + direction + this.options.length) % this.options.length;
        this.updateFocusDisplay();
    }

    backToMainMenu() {
        this.sfxSlider.remove();
        this.bgmSlider.remove();
        this.backButton.remove();

        if (this.parentDomain === 'pause') {
            Domain = 'game';
            game.pause.active = true;
        } else {
            Domain = 'mainMenu';
            mainMenu = new MainMenu();
        }
        setting = null;
    }
}
