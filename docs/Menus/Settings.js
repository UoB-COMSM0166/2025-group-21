class Settings {

    constructor(gameProgress) {
        this.masterVolume = gameProgress.masterVolume;
        this.mute = gameProgress.mute; // sound on = 1, sound off = 0;
        this.muteButton = soundOn;
        this.buttonCooldownTimer = new Clock();
        this.buttonsActive = true;
        this.dialPos = this.initialiseDialPos(this.masterVolume);
        this.offset = null;

        this.musicVolume     = gameProgress.musicVolume;
        this.musicMute       = gameProgress.musicMute; // 1=on
        this.musicMuteButton = this.musicMute ? soundOn : soundOff;
        this.musicDialPos  = this.initialiseDialPosMusic(this.musicVolume);
        this.offsetMusic   = null;

        this.difficulties = ['Beginner', 'Intermediate', 'Advanced'];
        this.difficulty = gameProgress.difficulty;
        this.currentDifficulty = this.difficulty;


        this.bgQualities = ['High', 'Medium', 'Low', 'Ultra Low'];
        this.bgQuality = gameProgress.bgQuality;
        this.currentBgQuality = this.bgQuality;

        this.enableCheats = false;
        this.cheatsButton = offButton;
        this.cheatsButtonHover = offButtonHover;

        // key binds
        this.changeControls = false;
        this.controlsPanel = null;
        this.flyKey = gameProgress.flyKey;
        this.boostKey = gameProgress.boostKey;
        this.shootKey = gameProgress.shootKey;
        this.shieldKey = gameProgress.shieldKey;
    }

    // is selected key being used by another ability?
    keyIsAvailable(key) {
        return !(this.flyKey === key || this.boostKey === key || this.shootKey === key || this.shieldKey === key);
    }

    get keyNav() {
        if (!this._keyNav) {
            this._keyNav = new SettingsKeyNav(this);
        }
        return this._keyNav;
    }

    // main loop
    showSettingsScreen() {
        push();
        image(blurredHomeBackground, 0, 0, width, height);

        if (this.changeControls) {
            if (this.controlsPanel === null) {
                this.controlsPanel = new ControlsPanel()
            }
            this.controlsPanel.showPanel();
        }
        else {
            this.drawLabels();
            this.drawVolumeBar();
            this.drawMusicBar();
            this.updateMusicDial();
            this.updateVolumeDial();
            this.updateMasterMuteButton();
            this.updateMusicMuteButton();
            this.updateDifficultyControl();
            this.updateCheatsButton();
            this.updateControlsButton();
            this.updateBackgroundQualityControl();

            if (Domain === 'mainMenu') {
                this.updateMainMenuButton();
            }
            else this.updateBackButton();

            if (this.buttonCooldownTimer.time > 0) {
                this.updateButtonCooldown();
            }

            /* allow either dial to be dragged independently */
            this.adjustDialPos();
            this.adjustMusicDialPos();
            setMasterVolume(this.masterVolume * this.mute);
        }
        this.keyNav.drawKeyboardNavHighlights();
        pop();
    }

    updateControlsButton() {
        let scale = 0.006 * width;
        let size = createVector(controlsButton.width / scale, controlsButton.height / scale);
        let pos = createVector(0.5*width, 0.78*height);

        if (hoveringOverButton(pos, size)) {
            image(controlsButtonHover, pos.x, pos.y, size.x, size.y);

            if (mouseIsPressed && this.buttonsActive) {
                this.changeControls = true;
                this.startCooldown();
                this.keyNav.resetSelection();
                if (this.controlsPanel) {
                    this.controlsPanel.resetNavigation();
                }
            }
        }
        else image(controlsButton, pos.x, pos.y, size.x, size.y);
    }

    // only appears when accessing settings from main menu
    updateMainMenuButton() {
        let scale = 0.008 * width;
        let size = createVector(mainMenuButton.width / scale, mainMenuButton.height / scale);
        let pos = createVector(0.935 * width, 0.04 * height);
        imageMode(CENTER);

        if (hoveringOverButton(pos, size)) {
            image(mainMenuButtonHover, pos.x, pos.y, size.x, size.y);

            if (mouseIsPressed && settings.buttonsActive) {
                saveGameProgress();
                settings.currentDifficulty = settings.difficulty;
                domains.mainMenu.showSettings = false;
            }
        }
        else image(mainMenuButton, pos.x, pos.y, size.x, size.y);
    }

    // only appears when accessing settings from game
    updateBackButton() {
        let scale = 0.0035 * width;
        let size = createVector(backButton.width / scale, backButton.height / scale);
        let pos = createVector(0.95 * width, 0.04 * height);
        imageMode(CENTER);

        if (hoveringOverButton(pos, size)) {
            image(backButtonHover, pos.x, pos.y, size.x, size.y);

            if (mouseIsPressed && settings.buttonsActive) {
                saveGameProgress();
                domains.game.pause.showSettings = false;

                if (Domain === 'mainMenu') {
                    settings.currentDifficulty = settings.difficulty;
                    domains.mainMenu.showSettings = false;
                }
                else {
                    domains.game.pause.showSettings = false;
                }
            }
        }
        else image(backButton, pos.x, pos.y, size.x, size.y);
    }


    updateCheatsButton() {
        let scale = 0.006 * width;
        let size = createVector(this.cheatsButton.width / scale, this.cheatsButton.height / scale);
        let pos = createVector(0.59*width, 0.68*height);

        if (hoveringOverButton(pos, size)) {
            image(this.cheatsButtonHover, pos.x, pos.y, size.x, size.y);

            if (mouseIsPressed && this.buttonsActive) {
                this.enableCheats = !this.enableCheats;
                this.startCooldown();

                if (Domain === 'game') {
                    domains.game.updateCheats();
                }
            }
        }
        else image(this.cheatsButton, pos.x, pos.y, size.x, size.y);

        if (this.enableCheats) {
            this.cheatsButton = onButton;
            this.cheatsButtonHover = onButtonHover;
        }
        else {
            this.cheatsButton = offButton;
            this.cheatsButtonHover = offButtonHover;
        }
    }

    updateDifficultyControl() {
        let scale = 0.006 * width;
        let size = createVector(incrementArrow.width / scale, incrementArrow.height / scale);
        let upPos = createVector(0.7*width, 0.45*height);
        let downPos = createVector(0.7*width, 0.49*height);

        // up arrow
        if (hoveringOverButton(upPos, size) && this.difficulty < 2) {
            image(incrementArrowHover, upPos.x, upPos.y, size.x, size.y);

            if (mouseIsPressed && this.buttonsActive) {
                this.difficulty++;
                this.startCooldown();
            }
        }
        else image(incrementArrow, upPos.x, upPos.y, size.x, size.y);

        // down arrow
        if (hoveringOverButton(downPos, size) && this.difficulty > 0) {
            image(decrementArrowHover, downPos.x, downPos.y, size.x, size.y);

            if (mouseIsPressed && this.buttonsActive) {
                this.difficulty--;
                this.startCooldown();
            }
        }
        else image(decrementArrow, downPos.x, downPos.y, size.x, size.y);

    }

    updateMasterMuteButton() {
        let scale = 0.006 * width;
        let size = createVector(this.muteButton.width / scale, this.muteButton.height / scale);
        let pos = createVector(0.78*width, 0.28*height);
        image(this.muteButton, pos.x, pos.y, size.x, size.y);

        if (hoveringOverButton(pos, size) && mouseIsPressed && this.buttonsActive) {
            this.mute = (this.mute + 1) % 2;
            this.startCooldown();
        }
        this.muteButton = this.mute === 1 ? soundOn : soundOff;
    }

    updateMusicMuteButton() {
        let scale = 0.006 * width;
        let size  = createVector(this.musicMuteButton.width / scale,
                                 this.musicMuteButton.height / scale);
        let pos   = createVector(0.78 * width, 0.4 * height);

        image(this.musicMuteButton, pos.x, pos.y, size.x, size.y);

        if (hoveringOverButton(pos, size) && mouseIsPressed && this.buttonsActive) {
            this.musicMute = (this.musicMute + 1) % 2;          // toggle 1↔0
            this.musicMuteButton = this.musicMute ? soundOn : soundOff;
            this.startCooldown();
        }
    }

    updateButtonCooldown() {
        this.buttonCooldownTimer.tick();

        if (this.buttonCooldownTimer.time > 30) {
            this.buttonCooldownTimer.reset();
            this.buttonsActive = true
        }
    }

    startCooldown() {
        this.buttonsActive = false;
        this.buttonCooldownTimer.tick();
    }

    updateVolumeDial() {
        let scale = 0.0035 * width;
        let size = createVector(volumeDial.width / scale, volumeDial.height / scale);

        if (hoveringOverButton(this.dialPos, size)) {
            if (mouseIsPressed) {
                if (this.offset == null) {
                    this.offset = this.dialPos.x - mouseX;
                    this.buttonsActive = false;
                }
            }
        }
        if (!mouseIsPressed && this.offset != null) {
            this.offset = null;
            this.buttonsActive = true;
        }

        imageMode(CENTER);
        if (this.offset !== null || hoveringOverButton(this.dialPos, size)) {
            image(volumeDialHover, this.dialPos.x, this.dialPos.y, size.x, size.y);
        }
        else image(volumeDial, this.dialPos.x, this.dialPos.y, size.x, size.y);
    }

    updateBackgroundQualityControl() {
        let scale   = 0.006 * width;
        let size    = createVector(incrementArrow.width/scale, incrementArrow.height/scale);
        let upPos   = createVector(0.7*width, 0.54*height);
        let downPos = createVector(0.7*width, 0.58*height);

        // Up arrow: go to HIGHER quality (lower index)
        if (hoveringOverButton(upPos, size) && this.bgQuality > 0) {
            image(incrementArrowHover, upPos.x, upPos.y, size.x, size.y);
            if (mouseIsPressed && this.buttonsActive) {
                this.bgQuality--;
                this.startCooldown();
                onQualityChange(this.bgQuality + 1);
            }
        } else {
            image(incrementArrow, upPos.x, upPos.y, size.x, size.y);
        }

        // Down arrow: go to LOWER quality (higher index)
        if (hoveringOverButton(downPos, size) && this.bgQuality < this.bgQualities.length - 1) {
            image(decrementArrowHover, downPos.x, downPos.y, size.x, size.y);
            if (mouseIsPressed && this.buttonsActive) {
                this.bgQuality++;
                this.startCooldown();
                onQualityChange(this.bgQuality + 1);
            }
        } else {
            image(decrementArrow, downPos.x, downPos.y, size.x, size.y);
        }
    }

    // volume dial is currently being controlled by user
    adjustDialPos() {
        if (this.offset == null) return;   // only drag while grabbed

        this.dialPos.x = mouseX + this.offset;

        if (this.dialPos.x < 0.27*width) {
            this.dialPos.x = 0.27*width;
        }
        else if (this.dialPos.x > 0.73*width) {
            this.dialPos.x = 0.73*width;
        }
        this.masterVolume = (this.dialPos.x/width - 0.27) / 0.46;
    }

    initialiseDialPos(masterVolume) {
        let xPos = (0.27 + 0.46*masterVolume) * width;
        return createVector(xPos, 0.28*height);
    }

    /* ---------- Music‑volume helpers ---------- */

    initialiseDialPosMusic(vol) {
        let xPos = (0.27 + 0.46 * vol) * width;
        return createVector(xPos, 0.4 * height);   // slightly lower than master
    }

    updateMusicDial() {
        let scale = 0.0035 * width;
        let size  = createVector(volumeDial.width / scale, volumeDial.height / scale);

        if (hoveringOverButton(this.musicDialPos, size)) {
            if (mouseIsPressed) {
                if (this.offsetMusic == null) {
                    this.offsetMusic   = this.musicDialPos.x - mouseX;
                    this.buttonsActive = false;
                }
            }
        }
        if (!mouseIsPressed && this.offsetMusic != null) {
            this.offsetMusic = null;
            this.buttonsActive = true;
        }

        imageMode(CENTER);
        if (this.offsetMusic !== null || hoveringOverButton(this.musicDialPos, size)) {
            image(volumeDialHover, this.musicDialPos.x, this.musicDialPos.y, size.x, size.y);
        } else {
            image(volumeDial, this.musicDialPos.x, this.musicDialPos.y, size.x, size.y);
        }
    }

    adjustMusicDialPos() {
        if (this.offsetMusic == null) return;

        this.musicDialPos.x = mouseX + this.offsetMusic;
        this.musicDialPos.x = constrain(this.musicDialPos.x, 0.27 * width, 0.73 * width);
        this.musicVolume = (this.musicDialPos.x / width - 0.27) / 0.46;
    }

    drawMusicBar() {
        let scale = 0.0035 * width;
        imageMode(CENTER);
        image(volumeBar, width / 2, 0.4 * height, volumeBar.width / scale, volumeBar.height / scale);
    }

    drawVolumeBar() {
        let scale = 0.0035 * width;
        imageMode(CENTER);
        image(volumeBar, width/2, 0.28*height, volumeBar.width / scale, volumeBar.height / scale);
    }

    // Draw the labels associated with all button and controls
    drawLabels() {
        let size = width/10
        fill('rgb(21,37,58)');
        textFont('Trebuchet MS');
        textAlign(CENTER, CENTER);
        stroke('rgb(21,37,58)');
        strokeWeight(size/30);
        textSize(size/1.5);
        text('Settings', width/2, height/9.5); // title

        size = width/30
        strokeWeight(size/30);
        textSize(size/1.5);
        text('Master Volume', width/2, height/4.2);
        text('Music Volume',  width/2, height/2.8);

        textAlign(LEFT);
        text('Difficulty:', width/3.45, 0.47*height); // difficulty
        textAlign(CENTER);
        text(`${this.difficulties[this.difficulty]}`, 0.58*width, 0.47*height)

        textAlign(LEFT);
        text('Background Quality:', width/3.45, 0.56*height);
        textAlign(CENTER);
        text(`${this.bgQualities[this.bgQuality]}`, 0.58*width, 0.56*height);

        text('Enable Cheats:', width/2.17, 0.68*height); // cheats
    }
}