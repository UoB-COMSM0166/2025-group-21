class Coins {

    constructor() {
        this.coins = [];
        this.collectedCoins = [];
        this.totalCoinsCollected = 0;
        this.spacing = 5000;
        this.lastX = 0;
    }

    update(offset) {
        this.coins = this.coins.filter(coin => coin.x > offset - 200);
        // Generate new coins ahead of player once they get past the last set
        while (this.lastX < offset + width + 500) {
            let startX = this.lastX + this.spacing + random(-200, 200);
            let numCoins = floor(random(3, 7));
            for (let i = 0; i < numCoins; i++) {
                let x = startX + i*40;
                let y = game.terrain.generateHills(x) - 25;
                this.coins.push(createVector(x, y));
            }
            this.lastX = startX;
        }

        // Draw coins at correct screen position (rather than total position)
        for (let singleCoin of this.coins) {
            let screenX = singleCoin.x - offset;
            let screenY = singleCoin.y;
            image(coinImage, screenX, screenY, coinImage.width*0.07, coinImage.height*0.07);
        }
    }

    checkCollision() {
        for (let i = this.coins.length - 1; i >= 0; i--) {
            let singleCoin = this.coins[i];
            let d = dist(game.player.pos.x, game.player.pos.y, singleCoin.x - game.offset, singleCoin.y);
            if (d < 30) {

                // Save and remove from coins
                let collected = this.coins.splice(i, 1)[0];
                this.collectedCoins.push({
                    pos: collected.copy(),
                    size: 0.07,
                    height: 0
                });
                collectCoinSound.play();
                this.totalCoinsCollected++;
            }
        }
    }

    playCoinCollection(offset) {
        for (let i = this.collectedCoins.length - 1; i >= 0; i--) {
            let coin = this.collectedCoins[i];

            // Animate motion
            coin.size *= 0.95;
            coin.height += 1.75;

            // Draw shrinking / rising coin
            let screenX = coin.pos.x - offset;
            let screenY = coin.pos.y - coin.height;
            image(coinImage, screenX, screenY, coinImage.width*coin.size, coinImage.height*coin.size);

            // Remove when coin small enough
            if (coin.size < 0.01) {
                this.collectedCoins.splice(i, 1);
            }
        }
    }
}