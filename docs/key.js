

function keyPressed() {
    if (Domain === 'intro') {

        if (key === ' ') {
            if (intro !== null) {
                intro.skipAnimation();
            }
        }
    }


    if (Domain === 'game') {

        if (key === ' ') {
            game.spacePressed = true;

            if (!game.player.alive && game.death.deathTimer.time >= 180) {
                game.death.skipCoinCount = true;
            }
        }

        if (key === 'w' && game.fly != null) {
            game.fly.active = true;
        }

        if (!game.pause.active && game.player.alive) {

            if (key === 'd') {

                if (inventory.laserLevel < 5) {
                    game.projectile.shoot();
                }
                else game.projectile.gatlingMode = true;
            }

            if (key === 'f' && game.shield != null && game.shield.chargeFraction === 1) {
                game.shield.active = true;
                game.shield.initialise();
            }
        }
    }

    if (Domain === 'mainMenu') {
        if(mainMenu !== null && mainMenu.animationComplete) {
            mainMenu.handleKeyNavigation(keyCode);
            return;
        }
    }

    if (Domain === 'game' && game.pause.active) {
        if (keyCode === UP_ARROW) {
            if (game.pause.selectedButtonIndex === -1) {
                game.pause.selectedButtonIndex = 0;
                game.pause.updateButtonStyles();
            } else {
                game.pause.moveSelection(-1);
            }
            return;
        } else if (keyCode === DOWN_ARROW) {
            if (game.pause.invPanel.isVisible()) {
                game.pause.invPanel.setCloseButtonSelected(true);
            } else if (game.pause.selectedButtonIndex === -1) {
                game.pause.selectedButtonIndex = 0;
                game.pause.updateButtonStyles();
            } else {
                game.pause.moveSelection(1);
            }
            return;
        } else if (keyCode === ENTER) {
            if (game.pause.invPanel.isVisible() && game.pause.invPanel.isCloseButtonSelected) {
                // If inventory panel is visible and CLOSE button is selected, activate it
                game.pause.invPanel.activateCloseButton();
            } else {
                game.pause.selectCurrentButton();
            }
            return;
        }
    }


    if (Domain === 'setting') {
        if (event && event.preventDefault) {
            event.preventDefault();
        }

        if (keyCode === UP_ARROW) {
            if (setting.selectedOptionIndex === -1) {
                setting.selectedOptionIndex = 0;
                setting.updateFocusDisplay();
            } else {
                setting.moveSelection(-1);
            }
            if (setting.options[setting.selectedOptionIndex] && setting.options[setting.selectedOptionIndex].elt) {
                setting.options[setting.selectedOptionIndex].elt.blur();
            }
            return false;
        } else if (keyCode === DOWN_ARROW) {
            if (setting.selectedOptionIndex === -1) {
                setting.selectedOptionIndex = 0;
                setting.updateFocusDisplay();
            } else {
                setting.moveSelection(1);
            }
            if (setting.options[setting.selectedOptionIndex] && setting.options[setting.selectedOptionIndex].elt) {
                setting.options[setting.selectedOptionIndex].elt.blur();
            }
            return false;
        } else if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
            let step = (keyCode === LEFT_ARROW ? -5 : 5);
            if (setting.selectedOptionIndex === 0) {
                let newVal = constrain(setting.sfxSlider.value() + step, 0, 100);
                setting.sfxSlider.value(newVal);
            } else if (setting.selectedOptionIndex === 1) {
                let newVal = constrain(setting.bgmSlider.value() + step, 0, 100);
                setting.bgmSlider.value(newVal);
            }
            if (setting.options[setting.selectedOptionIndex] && setting.options[setting.selectedOptionIndex].elt) {
                setting.options[setting.selectedOptionIndex].elt.blur();
            }
            return false;
        } else if (keyCode === ENTER) {
            if (setting.selectedOptionIndex === 2) {
                setting.backToMainMenu();
            }
            return false;
        }
    }
}


function keyReleased() {

    if (Domain === 'game') {

        if (key === ' ') {
            game.spacePressed = false;
        }
        else if (keyCode === 27) { // 27 == ESC key
            game.pause.active = !game.pause.active;
        }

        if (key === 'w' && game.fly != null) {
            game.fly.active = false;
        }

        if (key === 'd') {
            game.projectile.gatlingMode = false;
        }
    }
}