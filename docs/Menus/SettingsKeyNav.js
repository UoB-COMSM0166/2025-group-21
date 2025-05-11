

class SettingsKeyNav {
    constructor(settings) {
        this.settings = settings;
        this.selectedControl = -1;  // -1 means no selection
        this.keyboardActive = false;
        this.volumeAdjustMode = false;
        this.musicVolumeAdjustMode = false;
        this.selectedArrow = "main";

        this.controlCount = 9; // Master Volume, Master Mute, Music Volume, Music Mute, Difficulty, Background Quality, Cheats, Change Controls, Back
    }

    handleInput(keyCode) {
        settings.hideCursor();

        if (this.volumeAdjustMode) {
            this.handleVolumeAdjustment(keyCode);
            return;
        }

        if (this.musicVolumeAdjustMode) {
            this.handleMusicVolumeAdjustment(keyCode);
            return;
        }
        if (this.selectedControl === 0) { // volume bar
            if (keyCode === UP_ARROW) {
                this.moveSelection(-1); // menu
            }
            else if (keyCode === DOWN_ARROW) {
                this.moveSelection(2); // music bar
            }
            else if (keyCode === RIGHT_ARROW) {
                this.moveSelection(1); // volume mute
            }
        }
        else if (this.selectedControl === 1) { // volume mute
            if (keyCode === UP_ARROW) {
                this.moveSelection(-2); // menu
            }
            else if (keyCode === DOWN_ARROW) {
                this.moveSelection(2); // music mute
            }
            else if (keyCode === LEFT_ARROW) {
                this.moveSelection(-1); // volume bar
            }
        }
        else if (this.selectedControl === 2) { // music bar
            if (keyCode === UP_ARROW) {
                this.moveSelection(-2); // volume bar
            }
            else if (keyCode === DOWN_ARROW) {
                this.moveSelection(2); // difficulty
            }
            else if (keyCode === RIGHT_ARROW) {
                this.moveSelection(1); // music mute
            }
        }
        else if (this.selectedControl === 3) { // music mute
            if (keyCode === UP_ARROW) {
                this.moveSelection(-2); // volume mute
            }
            else if (keyCode === DOWN_ARROW) {
                this.moveSelection(1); // difficulty
            }
            else if (keyCode === LEFT_ARROW) {
                this.moveSelection(-1); // music bar
            }
        }
        // remaining controls
        else {
            if (keyCode === UP_ARROW) {
                this.moveSelection(-1);
            } else if (keyCode === DOWN_ARROW) {
                this.moveSelection(1);
            }
        }
        if (keyCode === ENTER) {
            this.activateSelectedControl();
        }
    }

    getNextAvailableControl(current, direction) {
        let next = current;
        let found = false;

        while (!found) {
            next = (next + direction + this.controlCount) % this.controlCount;

            // Check if the control is available
            switch(next) {
                case 0: // Master Volume - always available
                    found = true;
                    break;
                case 1: // Master Mute - always available
                    found = true;
                    break;
                case 2: // Music Volume - always available
                    found = true;
                    break;
                case 3: // Music Mute - always available
                    found = true;
                    break;
                case 4: // Difficulty - check if there are available arrows
                    if (this.settings.difficulty < 2 || this.settings.difficulty > 0) {
                        found = true;
                        if (direction > 0) {
                            this.selectedSubControl = this.settings.difficulty < 2 ? "up" : "down";
                        } else {
                            this.selectedSubControl = this.settings.difficulty > 0 ? "down" : "up";
                        }
                    }
                    break;
                case 5: // Background quality - check if there are available arrows
                    if (this.settings.bgQuality > 0 || this.settings.bgQuality < this.settings.bgQualities.length - 1) {
                        found = true;
                        if (direction > 0) {
                            this.selectedSubControl = this.settings.bgQuality > 0 ? "up" : "down";
                        } else {
                            this.selectedSubControl = this.settings.bgQuality < this.settings.bgQualities.length - 1 ? "down" : "up";
                        }
                    }
                    break;
                default: // Other controls - always available
                    found = true;
                    this.selectedSubControl = "main";
                    break;
            }

            // If all controls have been checked and none are available, select the current control
            if (next === current) {
                found = true;
            }
        }
        return next;
    }

    moveSelection(direction) {
        if (!this.keyboardActive) {
            this.keyboardActive = true;
            // Set initial control on first activation
            if (direction > 0) {
                this.selectedControl = 0;
            } else {
                this.selectedControl = this.controlCount - 1;
            }
            return;
        }

        // When on difficulty or background quality controls with up/down arrows available, move between arrows
        if ((this.selectedControl === 4 || this.selectedControl === 5) && direction !== 0) {
            if (this.selectedControl === 4) {
                if (this.selectedSubControl === "up" && direction > 0 && this.settings.difficulty > 0) {
                    this.selectedSubControl = "down";
                    return;
                } else if (this.selectedSubControl === "down" && direction < 0 && this.settings.difficulty < 2) {
                    this.selectedSubControl = "up";
                    return;
                }
            }
            // For background quality control
            else if (this.selectedControl === 5) {
                if (this.selectedSubControl === "up" && direction > 0 && this.settings.bgQuality < this.settings.bgQualities.length - 1) {
                    this.selectedSubControl = "down";
                    return;
                } else if (this.selectedSubControl === "down" && direction < 0 && this.settings.bgQuality > 0) {
                    this.selectedSubControl = "up";
                    return;
                }
            }
        }

        this.selectedControl = this.getNextAvailableControl(this.selectedControl, direction);
    }

    activateSelectedControl() {
        switch(this.selectedControl) {
            case 0:
                this.volumeAdjustMode = true;
                break;
            case 1:
                this.settings.mute = (this.settings.mute + 1) % 2;
                this.settings.muteButton = this.settings.mute === 1 ? soundOn : soundOff;
                break;
            case 2:
                this.musicVolumeAdjustMode = true;
                break;
            case 3:
                this.settings.musicMute = (this.settings.musicMute + 1) % 2;
                this.settings.musicMuteButton = this.settings.musicMute === 1 ? soundOn : soundOff;
                break;
            case 4:
                if (this.selectedSubControl === "up" && this.settings.difficulty < 2) {
                    this.settings.difficulty++;
                } else if (this.selectedSubControl === "down" && this.settings.difficulty > 0) {
                    this.settings.difficulty--;
                }
                break;
            case 5:
                if (this.selectedSubControl === "up" && this.settings.bgQuality > 0) {
                    this.settings.bgQuality--;
                    onQualityChange(this.settings.bgQuality + 1);
                } else if (this.selectedSubControl === "down" && this.settings.bgQuality < this.settings.bgQualities.length - 1) {
                    this.settings.bgQuality++;
                    onQualityChange(this.settings.bgQuality + 1);
                }
                break;
            case 6:
                this.settings.enableCheats = !this.settings.enableCheats;
                this.settings.cheatsButton = this.settings.enableCheats ? onButton : offButton;
                this.settings.cheatsButtonHover = this.settings.enableCheats ? onButtonHover : offButtonHover;
                if (Domain === 'game') {
                    domains.game.updateCheats();
                }
                break;
            case 7:
                this.settings.changeControls = true;
                this.resetSelection();
                if (this.settings.controlsPanel) {
                    this.settings.controlsPanel.resetNavigation();
                }
                break;
            case 8:
                this.exitSettings();
                break;
        }
    }

    handleVolumeAdjustment(keyCode) {
        if (keyCode === LEFT_ARROW) {
            this.settings.masterVolume = Math.max(0, this.settings.masterVolume - 0.05);
            this.updateDialPosition();
        } else if (keyCode === RIGHT_ARROW) {
            this.settings.masterVolume = Math.min(1, this.settings.masterVolume + 0.05);
            this.updateDialPosition();
        } else if (keyCode === ENTER) {
            this.volumeAdjustMode = false;
        }

        setMasterVolume(this.settings.masterVolume * this.settings.mute);
    }

    handleMusicVolumeAdjustment(keyCode) {
        if (keyCode === LEFT_ARROW) {
            this.settings.musicVolume = Math.max(0, this.settings.musicVolume - 0.05);
            this.updateMusicDialPosition();
        } else if (keyCode === RIGHT_ARROW) {
            this.settings.musicVolume = Math.min(1, this.settings.musicVolume + 0.05);
            this.updateMusicDialPosition();
        } else if (keyCode === ENTER) {
            this.musicVolumeAdjustMode = false;
        }
    }

    updateDialPosition() {
        this.settings.dialPos.x = (0.27 + 0.46 * this.settings.masterVolume) * width;
    }

    updateMusicDialPosition() {
        this.settings.musicDialPos.x = (0.27 + 0.46 * this.settings.musicVolume) * width;
    }

    exitSettings() {
        saveGameProgress();

        if (Domain === 'mainMenu') {
            this.settings.currentDifficulty = this.settings.difficulty;
            domains.mainMenu.showSettings = false;
        } else {
            domains.game.pause.showSettings = false;
        }
    }

    resetSelection() {
        this.selectedControl = -1;
        this.keyboardActive = false;
        this.volumeAdjustMode = false;
        this.musicVolumeAdjustMode = false;
        this.selectedSubControl = "main";
    }

    drawKeyboardNavHighlights() {
        if (!this.keyboardActive) return;
        if (!volumeDialHover || !this.settings || !this.settings.dialPos) return;

        switch(this.selectedControl) {
            case 0:
                this.drawVolumeHighlight();
                break;
            case 1:
                this.drawMasterMuteHighlight();
                break;
            case 2:
                this.drawMusicVolumeHighlight();
                break;
            case 3:
                this.drawMusicMuteHighlight();
                break;
            case 4:
                this.drawDifficultyHighlight();
                break;
            case 5:
                this.drawQualityHighlight();
                break;
            case 6:
                this.drawCheatsHighlight();
                break;
            case 7:
                this.drawControlsHighlight();
                break;
            case 8:
                this.drawBackHighlight();
                break;
        }
        this.drawVolumeAdjustmentInstructions();
    }

    drawVolumeHighlight() {
        if (!volumeDialHover || !this.settings || !this.settings.dialPos) return;
        let scale = 0.0035 * width;
        let size = createVector(volumeDialHover.width / scale, volumeDialHover.height / scale);
        imageMode(CENTER);
        image(volumeDialHover, this.settings.dialPos.x, this.settings.dialPos.y, size.x, size.y);
    }

    drawMusicVolumeHighlight() {
        if (!volumeDialHover || !this.settings || !this.settings.musicDialPos) return;
        let scale = 0.0035 * width;
        let size = createVector(volumeDialHover.width / scale, volumeDialHover.height / scale);
        imageMode(CENTER);
        image(volumeDialHover, this.settings.musicDialPos.x, this.settings.musicDialPos.y, size.x, size.y);
    }

    drawMasterMuteHighlight() {
        if (!this.settings || !this.settings.muteButton) return;

        let scale = 0.006 * width;
        let pos = createVector(0.78*width, 0.28*height);
        let size = createVector(this.settings.muteButton.width / scale, this.settings.muteButton.height / scale);

        image(this.settings.muteButton, pos.x, pos.y, size.x, size.y);

        push();
        noFill();
        stroke(100, 80, 200);
        strokeWeight(2);
        rectMode(CENTER);
        rect(pos.x, pos.y, size.x + 10, size.y + 10, 5);
        pop();
    }

    drawMusicMuteHighlight() {
        if (!this.settings || !this.settings.musicMuteButton) return;

        let scale = 0.006 * width;
        let pos = createVector(0.78*width, 0.4*height);
        let size = createVector(this.settings.musicMuteButton.width / scale, this.settings.musicMuteButton.height / scale);

        image(this.settings.musicMuteButton, pos.x, pos.y, size.x, size.y);

        push();
        noFill();
        stroke(100, 80, 200);
        strokeWeight(2);
        rectMode(CENTER);
        rect(pos.x, pos.y, size.x + 10, size.y + 10, 5);
        pop();
    }

    drawDifficultyHighlight() {
        let scale = 0.006 * width;
        let size = createVector(incrementArrow.width / scale, incrementArrow.height / scale);
        let upPos = createVector(0.7*width, 0.5*height);
        let downPos = createVector(0.7*width, 0.54*height);

        if (this.selectedSubControl === "up" && this.settings.difficulty < 2) {
            image(incrementArrowHover, upPos.x, upPos.y, size.x, size.y);
        } else if (this.selectedSubControl === "down" && this.settings.difficulty > 0) {
            image(decrementArrowHover, downPos.x, downPos.y, size.x, size.y);
        }

        push();
        fill(195, 195, 255);
        textAlign(CENTER);
        textSize(width/30/1.5);
        strokeWeight(width/400);
        text(`${this.settings.difficulties[this.settings.difficulty]}`, 0.58*width, 0.52*height);
        pop();
    }

    drawQualityHighlight() {
        let scale = 0.006 * width;
        let size = createVector(incrementArrow.width / scale, incrementArrow.height / scale);
        let upPos = createVector(0.7*width, 0.61*height);
        let downPos = createVector(0.7*width, 0.65*height);

        if (this.selectedSubControl === "up" && this.settings.bgQuality > 0) {
            image(incrementArrowHover, upPos.x, upPos.y, size.x, size.y);
        } else if (this.selectedSubControl === "down" && this.settings.bgQuality < this.settings.bgQualities.length - 1) {
            image(decrementArrowHover, downPos.x, downPos.y, size.x, size.y);
        }

        push();
        fill(195, 195, 255);
        textAlign(CENTER);
        textSize(width/30/1.5);
        strokeWeight(width/400);
        text(`${this.settings.bgQualities[this.settings.bgQuality]}`, 0.58*width, 0.63*height);
        pop();
    }

    drawCheatsHighlight() {
        let scale = 0.006 * width;
        let size = createVector(this.settings.cheatsButton.width / scale, this.settings.cheatsButton.height / scale);
        let pos = createVector(0.59*width, 0.7375*height);

        image(this.settings.cheatsButtonHover, pos.x, pos.y, size.x, size.y);
    }

    drawControlsHighlight() {
        let scale = 0.006 * width;
        let size = createVector(controlsButton.width / scale, controlsButton.height / scale);
        let pos = createVector(0.5*width, 0.85*height);

        image(controlsButtonHover, pos.x, pos.y, size.x, size.y);
    }

    drawBackHighlight() {
        let scale = 0.0035 * width;
        let size = createVector(backButton.width / scale, backButton.height / scale);
        let pos;

        if (Domain === 'mainMenu') {
            scale = 0.008 * width;
            size = createVector(mainMenuButton.width / scale, mainMenuButton.height / scale);
            pos = createVector(0.935 * width, 0.04 * height);
            image(mainMenuButtonHover, pos.x, pos.y, size.x, size.y);
        } else {
            pos = createVector(0.95 * width, 0.04 * height);
            image(backButtonHover, pos.x, pos.y, size.x, size.y);
        }

//        push();
//        noFill();
//        stroke(100, 80, 200);
//        strokeWeight(2);
//        rectMode(CENTER);
//        rect(pos.x, pos.y, size.x + 10, size.y + 10, 5);
//        pop();
    }

    drawVolumeAdjustmentInstructions() {
        if (this.volumeAdjustMode || this.musicVolumeAdjustMode) {
            push();
            textAlign(CENTER);
            fill(209, 232, 255);
            textSize(width/60);
            strokeWeight(width/500);
            textFont(instructionFont);
            text("Use left/right keys to adjust, press Enter to confirm", width/2, 0.31*height);
            pop();
        }
    }
}