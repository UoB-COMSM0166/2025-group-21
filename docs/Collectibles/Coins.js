class Coins {

    constructor() {
        this.coins = [];
        this.collectedCoins = [];
        this.totalCoinsCollected = 0;
        this.spacing = 4000;
        this.lastX = 0;
    }

    update(offset) {
        this.coins = this.coins.filter(coin => coin.x > offset - 600);
        // Make sure coins and hearts don't overlap
        let newCoinX = this.lastX + this.spacing + random(-500, 500);
        let nextHeartX = domains.game.hearts.hearts[domains.game.hearts.hearts.length-1];
        let differenceCoinHeart = abs(newCoinX - nextHeartX);
        // Generate new coins ahead of player once they get past the last set
        while (this.lastX < offset + width + 500) {
            let startX = newCoinX;
            let numCoins = floor(random(3, 7));
            for (let i = 0; i < numCoins; i++) {
                let coinCoords = this.calculateCoords(startX);
                let offsetCoinCoords = this.calculateOffset(coinCoords.x, coinCoords.y);
                let x = offsetCoinCoords.x;
                let y = offsetCoinCoords.y;
                startX = coinCoords.x
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

    calculateCoords(startX) {
        let coinGap = 45;
        let currentGap = 0;
        let shift = 0;

        let prevX = startX;
        let prevY = domains.game.terrain.generateHills(startX);
        let currentX = 0;
        let currentY = 0;

        while (currentGap < coinGap) {
            shift++;
            currentX = prevX + shift;
            currentY = domains.game.terrain.generateHills(currentX);
            let dx = currentX - prevX;
            let dy = currentY - prevY
            currentGap = Math.hypot(dx, dy);
        }

        let finalPoint = {
            x: currentX,
            y: currentY
        }

        return finalPoint;
    }

    calculateOffset(coinX, coinY) {
        let tangent = {
            x: coinX - (coinX-0.1),
            y: coinY - domains.game.terrain.generateHills(coinX-0.1)
        };

        let tangentLength = Math.hypot(tangent.x, tangent.y);

        let normal = {
            x: -tangent.y / tangentLength,
            y: tangent.x / tangentLength
        }

        let offsetPoint = {
            x: coinX - normal.x * 20,
            y: coinY - normal.y * 20
        }
        return offsetPoint;
    }

    checkCollision() {
        for (let i = this.coins.length - 1; i >= 0; i--) {
            let singleCoin = this.coins[i];
            let d = dist(domains.game.player.pos.x, domains.game.player.pos.y,
                         singleCoin.x - domains.game.offset, singleCoin.y);
            if (d < 30) {

                // Save and remove from coins
                let collected = this.coins.splice(i, 1)[0];
                this.collectedCoins.push({
                    pos: collected.copy(),
                    size: 0.07,
                    height: 0
                });
                domains.game.collectCoinSound.play();
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