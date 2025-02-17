

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
        if (key === 'd' && game.laser != null && !game.pause.active && game.player.alive) {

            if (inventory.laserLevel < 5) {
                game.laser.shoot();
            }
            else game.laser.gatlingMode = true;
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

        if (key === 'd' && game.laser != null) {

            game.laser.gatlingMode = false;
        }
    }
}