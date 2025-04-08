
class Stage{

    constructor() {
        this.stage = 1;
        this.speed_multiplier = this.stage*1.2;

    }

    checkStage(offset) {
        this.stage = 1+offset/10000;
    }
}
