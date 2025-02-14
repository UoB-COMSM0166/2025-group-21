

function keyPressed() {

    if (key === ' ') {
        game.spacePressed = true;

        if (!game.player.alive && game.death.deathTimer.time >= 180) {
            game.death.skipCoinCount = true;
        }
    }
}
function keyReleased() {

    if (key === ' ') {
        game.spacePressed = false;
    }
    else if (Domain === 'game' && keyCode === 27) { // 27 == ESC key

        game.pause.active = !game.pause.active;
    }
}