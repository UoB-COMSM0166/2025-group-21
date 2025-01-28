let floor = {
    x: null,
    y: null
}

function initSinParams() {

    // Get randomised parameters for sin waves
    for (let i = 0; i < numWaves; i++) {
        amplitudes.push(Math.random() * 20 + 10);
        frequencies.push(Math.random() * 0.01 + 0.01);
        phases.push(Math.random() * Math.PI * 4);
    }
  
}

function drawFloor() {

    let prevX = null;
    let prevY = null;

    // Draw and shuffle with increasing frameCount
    for (let x = 0; x <= width; x += step) {
        floor.y = height / 1.5 - generateHills(x + frameCount * speed);
        if (prevX !== null && prevY !== null) {
            line(prevX, prevY, x, floor.y);
        }
        prevX = x;
        prevY = floor.y;
    }

}

function generateHills(x) {
  
    // Sum randomised parameter sin curves for variation
    let y = 0;
    for (let i = 0; i < numWaves; i++) {
        y += amplitudes[i] * Math.sin(frequencies[i] * x + phases[i]);
    }
    return y;

}


function floorYatX(x) {

    //--Same formula for Y in the drawFloor function---

    return height / 1.5 - generateHills(x + frameCount * speed);
}