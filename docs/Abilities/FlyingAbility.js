

class FlyingAbility {

    constructor(powerLevel) {

        this.level = powerLevel;
        this.velocityBoost = 0.5;
        this.maxCharge = 300 + 20*powerLevel
        this.chargeLeft = this.maxCharge;
        this.active = false;
    }

    applyUpwardForce() {

         if (this.chargeLeft > 0 && !domains.game.pause.active) {
             domains.game.player.vel.y -= domains.game.fly.velocityBoost;
             if (!domains.game.infiniteFly) this.chargeLeft -= 10;
         }
    }

    charge() {
        if (this.chargeLeft < this.maxCharge) {

            if (!domains.game.pause.active) {
                this.chargeLeft += (this.level+1) / 2;
            }
            this.displayChargeLeft();
        }
    }

    displayChargeLeft() {

        push();
            let d = width*0.003;
            //fill(0);
            //rect(width*0.82 - d, height*0.08 - d, width/6.2 + 2*d, height/70 + 2*d);
            //fill('rgb(151,186,236)');
            //rect(width*0.82, height*0.08, width/6.2, height/70)

            let timeLeftFraction = this.chargeLeft/this.maxCharge;
            //fill('rgb(184,44,110)');
            //rect(width*0.82, height*0.08, timeLeftFraction*width/6.2, height/70);
        pop();
    }
}