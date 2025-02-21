

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

            if (key === 'f' && game.shield != null) {
                game.shield.active = true;
                game.shield.initialise();
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
            game.pause.active = !game.pause.active;
        }

        if (key === 'w' && game.fly != null) {
            game.fly.active = false;
        }

        if (key === 'd') {
            game.projectile.gatlingMode = false;
        }

        if (key === 'f' && game.shield != null) {
            game.shield.active = false;
            game.shield.resetAbility();
        }
    }
}