

class FlyingAbility {

    constructor(powerLevel) {

        this.level = powerLevel;
        this.velocityBoost = 0.5;
        this.maxCharge = 300 + 20*powerLevel
        this.chargeLeft = this.maxCharge;
        this.active = false;
        //this.reset = true;
    }

    performDoubleJump() {

         if (this.chargeLeft > 0 && !game.pause.active) {
             game.player.vel.y -= game.fly.velocityBoost;
             this.chargeLeft -= 10;
         }
    }
    charge() {
        if (this.chargeLeft < this.maxCharge) {

            if (!game.pause.active) {
                this.chargeLeft += this.level > 0 ? (this.level+1)/2: 0.5;
            }
            this.displayChargeLeft();
        }
    }

    displayChargeLeft() {

        push();
            let d = width*0.003;
            fill(0);
            rect(width*0.82 - d, height*0.08 - d, width/6.2 + 2*d, height/70 + 2*d);
            fill('rgb(135, 206, 250)');
            rect(width*0.82, height*0.08, width/6.2, height/70)

            let timeLeftFraction = this.chargeLeft/this.maxCharge;
            fill('rgb(184,44,110)');
            //p5.fillGradient(width*0.82, height*0.08, width*0.82, height/70, color(255, 0, 0), color(0, 0, 255), "x");
            rect(width*0.82, height*0.08, timeLeftFraction*width/6.2, height/70);
        pop();
    }
}