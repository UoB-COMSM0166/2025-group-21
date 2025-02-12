

function keyPressed() {

    if (key === ' ') {
        game.spacePressed = true;
    }
}
function keyReleased() {

    if (key === ' ') {
        game.spacePressed = false;
    }
    else if (Domain === 'game' && key === 'a') {

        game.pause.active = !game.pause.active;
    }
}