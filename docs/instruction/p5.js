
function drawGradientBackground() {
    for (let i = 0; i < height; i++) {
        let inter = map(i, 0, height, 0, 1);
        let c = lerpColor(color(240, 248, 255), color(100, 150, 200), inter);
        stroke(c);
        line(0, i, width, i);
    }
}


function isMouseOverOkButton() {
    return mouseX > okButtonX - okButtonWidth / 2 && mouseX < okButtonX + okButtonWidth / 2 &&
        mouseY > okButtonY - okButtonHeight / 2 && mouseY < okButtonY + okButtonHeight / 2;
}
