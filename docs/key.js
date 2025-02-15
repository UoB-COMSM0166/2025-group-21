

function keyPressed() {

    if (Domain === 'game') {

        if (key === ' ') {
            game.spacePressed = true;

            if (!game.player.alive && game.death.deathTimer.time >= 180) {
                game.death.skipCoinCount = true;
            }
        }

        if (key === 'w') {
            game.fly.active = true;
        }
        if (key === 'd' && !game.pause.active) {
            game.laser.shoot();
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

        if (key === 'w') {
            game.fly.active = false;
        }
    }
}