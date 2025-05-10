

function keyPressed() {

    if (userIsTyping) {
        getInputCharacter();
        return;
    }

    if (Domain === 'intro') {

        if (key === ' ' || keyCode === ENTER) {
            if (domains.intro !== null) {
                domains.intro.skipAnimation();
            }
        }
    }

    if (Domain === 'game') {

        if (key === settings.boostKey) {
            domains.game.spacePressed = true;
        }

        if (key === ' ') {

            if (!domains.game.player.alive && domains.game.death.deathTimer.time >= 180) {
                domains.game.death.skipCoinCount = true;
            }
        }

        if (key === settings.flyKey && domains.game.fly != null) {
            domains.game.fly.active = true;
        }

        if (!domains.game.pause.active && domains.game.player.alive) {

            if (key === settings.shootKey) {
                domains.game.player.shooting = true;

                if (inventory.currentProjectileItem < 4) {
                    domains.game.projectile.shoot();
                }
                else {
                    domains.game.projectile.gatlingMode = true;
                }
            }

            if (key === settings.shieldKey && domains.game.shield != null && domains.game.shield.chargeFraction === 1) {
                domains.game.shield.active = true;
            }
        }
    }

    if (Domain === 'mainMenu') {
        if(domains.mainMenu !== null && domains.mainMenu.animationComplete) {
            domains.mainMenu.handleKeyNavigation(keyCode);
            return;
        }
    }

    if (Domain === 'instruction') {
        if (keyCode === DOWN_ARROW) {
            domains.instruction.moveSelection(1);
        } else if (keyCode === UP_ARROW) {
            domains.instruction.moveSelection(-1);
        } else if (keyCode === ENTER || key === ' ') {
                domains.instruction.selectCurrentButton();
        }
        return;
    }


    if (Domain === 'loadGame') {
        if (domains !== null) {
            domains.gameLoader.handleKeyNavigation(keyCode);
        }
    }

    if (Domain === 'game' && domains.game.pause.active) {
        if (keyCode === UP_ARROW) {
            if (domains.game.pause.selectedButtonIndex === -1) {
                domains.game.pause.selectedButtonIndex = 0;
                //game.pause.updateButtonStyles();
            } else {
                domains.game.pause.moveSelection(-1);
            }
        } else if (keyCode === DOWN_ARROW) {
            if (domains.game.pause.showInvPanel) {
                domains.game.pause.invPanel.setCloseButtonSelected(true);
            } else if (domains.game.pause.selectedButtonIndex === -1) {
                domains.game.pause.selectedButtonIndex = 0;
                //game.pause.updateButtonStyles();
            } else {
                domains.game.pause.moveSelection(1);
            }
        } else if (keyCode === ENTER) {
            if (domains.game.pause.showInvPanel && domains.game.pause.invPanel.isCloseButtonSelected) {
                // If inventory panel is visible and CLOSE button is selected, activate it
                domains.game.pause.showInvPanel = false;
                domains.game.pause.invPanel.isCloseButtonSelected = false;
                domains.game.pause.selectedButtonIndex = -1;
            } else {
                domains.game.pause.selectCurrentButton();
            }
        }
    }

    if (Domain === 'game' && !domains.game.player.alive && domains.game.death.deathTimer.time >= 230) {
        if (!domains.game.death.showStats) {
            if (keyCode === UP_ARROW) {
                if (!domains.game.death.anyKeyPressed) {
                    domains.game.death.selectedButtonIndex = 0;
                    domains.game.death.anyKeyPressed = true;
                } else if (domains.game.death.selectedButtonIndex > 0) {
                    domains.game.death.selectedButtonIndex--;
                } else {
                    domains.game.death.selectedButtonIndex = domains.game.death.buttonCount - 1;
                }
            }
            else if (keyCode === DOWN_ARROW) {
                if (!domains.game.death.anyKeyPressed) {
                    domains.game.death.selectedButtonIndex = 0;
                    domains.game.death.anyKeyPressed = true;
                } else if (domains.game.death.selectedButtonIndex < domains.game.death.buttonCount - 1) {
                    domains.game.death.selectedButtonIndex++;
                } else {
                    domains.game.death.selectedButtonIndex = 0;
                }
            }
            else if (keyCode === ENTER) {
                domains.game.death.selectCurrentButton();
            }
        }
        // Key navigation in stats page
        else {
            if (keyCode === DOWN_ARROW) {
                domains.game.stats.backButtonSelected = true;
            }
            else if (keyCode === ENTER && domains.game.stats.backButtonSelected) {
                domains.game.death.showStats = false;
                domains.game.death.selectedButtonIndex = -1;
                domains.game.stats.backButtonSelected = false;
            }
        }
    }
}
function keyReleased() {

    if (Domain === 'game') {

        if (key === settings.boostKey) {
            domains.game.spacePressed = false;
        }
        else if (keyCode === 27) { // 27 == ESC key
            if (domains.game.player.alive) {
                if (domains.game.pause.active && !domains.game.pause.showSettings) {
                    if (domains.game.pause.isCountingDown) {
                        domains.game.pause.isCountingDown = false;
                        domains.game.pause.active = true;
                        domains.game.pause.reset();
                        domains.game.pause.countdown = null;
                    }
                    else {
                        domains.game.pause.showInvPanel = false;
                        domains.game.pause.continueButtonPressed();
                    }
                }
                else domains.game.pause.active = true;
                //game.pause.active = !game.pause.active;
            }
        }

        if (key === settings.flyKey && domains.game.fly != null) {
            domains.game.fly.active = false;
        }

        if (key === settings.shootKey) {
            domains.game.player.shooting = false;
            domains.game.projectile.gatlingMode = false;
        }
    }
}

function getInputCharacter() {

    switch (key) {
        case 'A': inputCharacter = 'A'; break;
        case 'B': inputCharacter = 'B'; break;
        case 'C': inputCharacter = 'C'; break;
        case 'D': inputCharacter = 'D'; break;
        case 'E': inputCharacter = 'E'; break;
        case 'F': inputCharacter = 'F'; break;
        case 'G': inputCharacter = 'G'; break;
        case 'H': inputCharacter = 'H'; break;
        case 'I': inputCharacter = 'I'; break;
        case 'J': inputCharacter = 'J'; break;
        case 'K': inputCharacter = 'K'; break;
        case 'L': inputCharacter = 'L'; break;
        case 'M': inputCharacter = 'M'; break;
        case 'N': inputCharacter = 'N'; break;
        case 'O': inputCharacter = 'O'; break;
        case 'P': inputCharacter = 'P'; break;
        case 'Q': inputCharacter = 'Q'; break;
        case 'R': inputCharacter = 'R'; break;
        case 'S': inputCharacter = 'S'; break;
        case 'T': inputCharacter = 'T'; break;
        case 'U': inputCharacter = 'U'; break;
        case 'V': inputCharacter = 'V'; break;
        case 'W': inputCharacter = 'W'; break;
        case 'X': inputCharacter = 'X'; break;
        case 'Y': inputCharacter = 'Y'; break;
        case 'Z': inputCharacter = 'Z'; break;
        case 'a': inputCharacter = 'a'; break;
        case 'b': inputCharacter = 'b'; break;
        case 'c': inputCharacter = 'c'; break;
        case 'd': inputCharacter = 'd'; break;
        case 'e': inputCharacter = 'e'; break;
        case 'f': inputCharacter = 'f'; break;
        case 'g': inputCharacter = 'g'; break;
        case 'h': inputCharacter = 'h'; break;
        case 'i': inputCharacter = 'i'; break;
        case 'j': inputCharacter = 'j'; break;
        case 'k': inputCharacter = 'k'; break;
        case 'l': inputCharacter = 'l'; break;
        case 'm': inputCharacter = 'm'; break;
        case 'n': inputCharacter = 'n'; break;
        case 'o': inputCharacter = 'o'; break;
        case 'p': inputCharacter = 'p'; break;
        case 'q': inputCharacter = 'q'; break;
        case 'r': inputCharacter = 'r'; break;
        case 's': inputCharacter = 's'; break;
        case 't': inputCharacter = 't'; break;
        case 'u': inputCharacter = 'u'; break;
        case 'v': inputCharacter = 'v'; break;
        case 'w': inputCharacter = 'w'; break;
        case 'x': inputCharacter = 'x'; break;
        case 'y': inputCharacter = 'y'; break;
        case 'z': inputCharacter = 'z'; break;
        case '0': inputCharacter = '0'; break;
        case '1': inputCharacter = '1'; break;
        case '2': inputCharacter = '2'; break;
        case '3': inputCharacter = '3'; break;
        case '4': inputCharacter = '4'; break;
        case '5': inputCharacter = '5'; break;
        case '6': inputCharacter = '6'; break;
        case '7': inputCharacter = '7'; break;
        case '8': inputCharacter = '8'; break;
        case '9': inputCharacter = '9'; break;
        case ' ': inputCharacter = ' '; break;
        case '!': inputCharacter = '!'; break;
        case '@': inputCharacter = '@'; break;
        case '£': inputCharacter = '£'; break;
        case '$': inputCharacter = '$'; break;
        case '%': inputCharacter = '%'; break;
        case '^': inputCharacter = '^'; break;
        case '&': inputCharacter = '&'; break;
        case '*': inputCharacter = '*'; break;
        case '(': inputCharacter = '('; break;
        case ')': inputCharacter = ')'; break;
        case '-': inputCharacter = '-'; break;
        case '_': inputCharacter = '_'; break;
        case '=': inputCharacter = '='; break;
        case '+': inputCharacter = '+'; break;
        case '[': inputCharacter = '['; break;
        case ']': inputCharacter = ']'; break;
        case '{': inputCharacter = '{'; break;
        case '}': inputCharacter = '}'; break;
        case '\'': inputCharacter = '\''; break;
        case '"': inputCharacter = '"'; break;
        case '\\': inputCharacter = '\\'; break;
        case '|': inputCharacter = '|'; break;
        case ';': inputCharacter = ';'; break;
        case ':': inputCharacter = ':'; break;
        case '<': inputCharacter = '<'; break;
        case '>': inputCharacter = '>'; break;
        case ',': inputCharacter = ','; break;
        case '.': inputCharacter = '.'; break;
        case '/': inputCharacter = '/'; break;
        case '?': inputCharacter = '?'; break;
        case '~': inputCharacter = '~'; break;
        case '`': inputCharacter = '`'; break;
        case 'Enter': inputCharacter = 'Enter'; break;
        case 'Backspace': inputCharacter = 'Backspace'; break;
        default: inputCharacter = null;
    }
}
