

let offset = 0;  // Horizontal movement of screen position
//let speed = 0;
let changeSpeed = false

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    terrain = new Terrain();
    player = new Player(150, 150);
}

function draw() {
    background(135, 206, 250);  // Blue sky
    terrain.drawHills();
    offset += player.vel.x;  // Move hills to the left

    player.update();
    player.drawPlayer()

    if (changeSpeed) {

        if (player.vel.x < 5) {
            player.vel.x = lerp(player.vel.x, 5, 1); //1
            //player.vel.y = lerp(player.vel.y, 5, 0.1);
        }
        else if (player.vel.x < 20) {
            player.vel.x *= 1.02; // 1.02
        }
        //player.vel.y += 0.5;
    }
    // else if (!player.inAir) {
    //     player.vel.x *= 0.9
    // }
    else {
        player.vel.x = lerp(player.vel.x, 0, 0.03); // 0.03
    }
}
