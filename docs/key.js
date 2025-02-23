function keyPressed() {

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

        if (key.toLowerCase() === 'm' && Domain === 'game' && game.player.alive) {
            if (!game.menuOpen) {
                game.menuOpen = true;
                game.menu.showMenuScreen();
            } else {
                game.menu.closeMenu();
            }
        }
//
        if (game.menuOpen) {
            if (keyCode === DOWN_ARROW) {
                game.menu.moveSelection(1);
            }
            if (keyCode === UP_ARROW) {
                game.menu.moveSelection(-1);
            }
            if (keyCode === ENTER) {
                game.menu.selectButton();
            }
            return;  // ✅ 如果 `Menu` 打开，阻止其他按键
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