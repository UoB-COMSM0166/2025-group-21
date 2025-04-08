

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
            if (game.pause.selectedButtonIndex === -1) {
                game.pause.selectedButtonIndex = 0;
                game.pause.updateButtonStyles();
            } else {
                game.pause.moveSelection(1);
            }
            return;
        } else if (keyCode === ENTER) {
            game.pause.selectCurrentButton();
            return;
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