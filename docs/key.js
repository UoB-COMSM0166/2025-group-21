

function keyPressed() {
    if (Domain === 'intro') {

        if (key === ' ') {
            if (intro !== null) {
                intro.skipAnimation();
            }
        }
    }



    if (Domain === 'game') {

        if (game.highscores.userIsTyping) {
            getInputCharacter();
            return;
        }

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
                else {
                    game.projectile.gatlingMode = true;
                }
            }

            if (key === 'f' && game.shield != null && game.shield.chargeFraction === 1) {
                game.shield.active = true;
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
                //game.pause.updateButtonStyles();
            } else {
                game.pause.moveSelection(-1);
            }
        } else if (keyCode === DOWN_ARROW) {
            if (game.pause.showInvPanel) {
                game.pause.invPanel.setCloseButtonSelected(true);
            } else if (game.pause.selectedButtonIndex === -1) {
                game.pause.selectedButtonIndex = 0;
                //game.pause.updateButtonStyles();
            } else {
                game.pause.moveSelection(1);
            }
        } else if (keyCode === ENTER) {
            if (game.pause.showInvPanel && game.pause.invPanel.isCloseButtonSelected) {
                // If inventory panel is visible and CLOSE button is selected, activate it
                game.pause.showInvPanel = false;
                game.pause.invPanel.isCloseButtonSelected = false;
            } else {
                game.pause.selectCurrentButton();
            }
        }
    }
}
function keyReleased() {

    if (Domain === 'game') {

        if (key === ' ') {
            game.spacePressed = false;
        }
        else if (keyCode === 27) { // 27 == ESC key
            if (game.pause.active) {
                game.pause.showInvPanel = false;
                game.pause.continueButtonPressed();
            }
            else game.pause.active = true;
            //game.pause.active = !game.pause.active;
        }

        if (key === 'w' && game.fly != null) {
            game.fly.active = false;
        }

        if (key === 'd') {
            game.projectile.gatlingMode = false;
        }
    }
}

function getInputCharacter() {

    switch (key) {
        case 'A': game.highscores.inputCharacter = 'A'; break;
        case 'B': game.highscores.inputCharacter = 'B'; break;
        case 'C': game.highscores.inputCharacter = 'C'; break;
        case 'D': game.highscores.inputCharacter = 'D'; break;
        case 'E': game.highscores.inputCharacter = 'E'; break;
        case 'F': game.highscores.inputCharacter = 'F'; break;
        case 'G': game.highscores.inputCharacter = 'G'; break;
        case 'H': game.highscores.inputCharacter = 'H'; break;
        case 'I': game.highscores.inputCharacter = 'I'; break;
        case 'J': game.highscores.inputCharacter = 'J'; break;
        case 'K': game.highscores.inputCharacter = 'K'; break;
        case 'L': game.highscores.inputCharacter = 'L'; break;
        case 'M': game.highscores.inputCharacter = 'M'; break;
        case 'N': game.highscores.inputCharacter = 'N'; break;
        case 'O': game.highscores.inputCharacter = 'O'; break;
        case 'P': game.highscores.inputCharacter = 'P'; break;
        case 'Q': game.highscores.inputCharacter = 'Q'; break;
        case 'R': game.highscores.inputCharacter = 'R'; break;
        case 'S': game.highscores.inputCharacter = 'S'; break;
        case 'T': game.highscores.inputCharacter = 'T'; break;
        case 'U': game.highscores.inputCharacter = 'U'; break;
        case 'V': game.highscores.inputCharacter = 'V'; break;
        case 'W': game.highscores.inputCharacter = 'W'; break;
        case 'X': game.highscores.inputCharacter = 'X'; break;
        case 'Y': game.highscores.inputCharacter = 'Y'; break;
        case 'Z': game.highscores.inputCharacter = 'Z'; break;
        case 'a': game.highscores.inputCharacter = 'a'; break;
        case 'b': game.highscores.inputCharacter = 'b'; break;
        case 'c': game.highscores.inputCharacter = 'c'; break;
        case 'd': game.highscores.inputCharacter = 'd'; break;
        case 'e': game.highscores.inputCharacter = 'e'; break;
        case 'f': game.highscores.inputCharacter = 'f'; break;
        case 'g': game.highscores.inputCharacter = 'g'; break;
        case 'h': game.highscores.inputCharacter = 'h'; break;
        case 'i': game.highscores.inputCharacter = 'i'; break;
        case 'j': game.highscores.inputCharacter = 'j'; break;
        case 'k': game.highscores.inputCharacter = 'k'; break;
        case 'l': game.highscores.inputCharacter = 'l'; break;
        case 'm': game.highscores.inputCharacter = 'm'; break;
        case 'n': game.highscores.inputCharacter = 'n'; break;
        case 'o': game.highscores.inputCharacter = 'o'; break;
        case 'p': game.highscores.inputCharacter = 'p'; break;
        case 'q': game.highscores.inputCharacter = 'q'; break;
        case 'r': game.highscores.inputCharacter = 'r'; break;
        case 's': game.highscores.inputCharacter = 's'; break;
        case 't': game.highscores.inputCharacter = 't'; break;
        case 'u': game.highscores.inputCharacter = 'u'; break;
        case 'v': game.highscores.inputCharacter = 'v'; break;
        case 'w': game.highscores.inputCharacter = 'w'; break;
        case 'x': game.highscores.inputCharacter = 'x'; break;
        case 'y': game.highscores.inputCharacter = 'y'; break;
        case 'z': game.highscores.inputCharacter = 'z'; break;
        case '0': game.highscores.inputCharacter = '0'; break;
        case '1': game.highscores.inputCharacter = '1'; break;
        case '2': game.highscores.inputCharacter = '2'; break;
        case '3': game.highscores.inputCharacter = '3'; break;
        case '4': game.highscores.inputCharacter = '4'; break;
        case '5': game.highscores.inputCharacter = '5'; break;
        case '6': game.highscores.inputCharacter = '6'; break;
        case '7': game.highscores.inputCharacter = '7'; break;
        case '8': game.highscores.inputCharacter = '8'; break;
        case '9': game.highscores.inputCharacter = '9'; break;
        case ' ': game.highscores.inputCharacter = ' '; break;
        case '!': game.highscores.inputCharacter = '!'; break;
        case '@': game.highscores.inputCharacter = '@'; break;
        case '£': game.highscores.inputCharacter = '£'; break;
        case '$': game.highscores.inputCharacter = '$'; break;
        case '%': game.highscores.inputCharacter = '%'; break;
        case '^': game.highscores.inputCharacter = '^'; break;
        case '&': game.highscores.inputCharacter = '&'; break;
        case '*': game.highscores.inputCharacter = '*'; break;
        case '(': game.highscores.inputCharacter = '('; break;
        case ')': game.highscores.inputCharacter = ')'; break;
        case '-': game.highscores.inputCharacter = '-'; break;
        case '_': game.highscores.inputCharacter = '_'; break;
        case '=': game.highscores.inputCharacter = '='; break;
        case '+': game.highscores.inputCharacter = '+'; break;
        case '[': game.highscores.inputCharacter = '['; break;
        case ']': game.highscores.inputCharacter = ']'; break;
        case '{': game.highscores.inputCharacter = '{'; break;
        case '}': game.highscores.inputCharacter = '}'; break;
        case '\'': game.highscores.inputCharacter = '\''; break;
        case '"': game.highscores.inputCharacter = '"'; break;
        case '\\': game.highscores.inputCharacter = '\\'; break;
        case '|': game.highscores.inputCharacter = '|'; break;
        case ';': game.highscores.inputCharacter = ';'; break;
        case ':': game.highscores.inputCharacter = ':'; break;
        case '<': game.highscores.inputCharacter = '<'; break;
        case '>': game.highscores.inputCharacter = '>'; break;
        case ',': game.highscores.inputCharacter = ','; break;
        case '.': game.highscores.inputCharacter = '.'; break;
        case '/': game.highscores.inputCharacter = '/'; break;
        case '?': game.highscores.inputCharacter = '?'; break;
        case '~': game.highscores.inputCharacter = '~'; break;
        case '`': game.highscores.inputCharacter = '`'; break;
        case 'Enter': game.highscores.inputCharacter = 'Enter'; break;
        case 'Backspace': game.highscores.inputCharacter = 'Backspace'; break;
        default: game.highscores.inputCharacter = null;
    }
}
