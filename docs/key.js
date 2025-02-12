

function keyPressed() {

    if (key === ' ') {
        game.spacePressed = true;
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