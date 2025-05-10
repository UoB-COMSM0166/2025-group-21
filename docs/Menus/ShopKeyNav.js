

class ShopKeyNav {

    constructor() {
        this.groups = [];
        this.groups.push(new ButtonGroup('menu', ['menu'])); // 0
        this.groups.push(new ButtonGroup('abilities', ['projectile', 'flying', 'shield'])); // 1
        this.groups.push(new ButtonGroup('arrows', ['left', 'right'])); // 2
        this.groups.push(new ButtonGroup('buy', ['buy'])); // 3
        this.groups.push(new ButtonGroup('fly', ['basicFly', 'wings', 'rotors', 'redJet', 'blueJet'])); // 4
        this.groups.push(new ButtonGroup('shoot', ['fish', 'snowball', 'arrow', 'gLaser', 'pLaser'])); // 5
        this.groups.push(new ButtonGroup('play', ['play'])); // 6

        this.groupIndex = 1; // start at abilities
        this.selected = null;
    }

    handleInput(key) {
        if (this.selected === null &&
            (key === LEFT_ARROW || key === RIGHT_ARROW || key === UP_ARROW || key === DOWN_ARROW)) {

            this.selected = this.groups[this.groupIndex].current;
            document.body.classList.remove("show-cursor");

            return;
        }
        if (key === ENTER) {
            this.buttonPressed();
        }
        else switch (this.groupIndex) {
            case 0: this.selectMenu(key); break;
            case 1: this.selectAbility(key); break;
            case 2: this.selectArrow(key); break;
            case 3: this.selectBuy(key); break;
            case 4: this.selectFly(key); break;
            case 5: this.selectShoot(key); break;
            case 6: this.selectPlay(key); break;
        }
        this.selected = this.groups[this.groupIndex].current;
    }

    buttonPressed() {
        switch (this.selected) {
            case 'menu': domains.shop.mainMenuButtonPressed(); break;
            case 'projectile': domains.shop.projectileButtonPressed(); break;
            case 'flying': domains.shop.flyingButtonPressed(); break;
            case 'shield': domains.shop.forceFieldButtonPressed(); break;
            case 'left': domains.shop.leftArrowButtonPressed(); break;
            case 'right': domains.shop.rightArrowButtonPressed(); break;
            case 'buy': domains.shop.purchaseButtonPressed(); break;
            case 'basicFly': domains.shop.basicFlyButtonPressed(); break;
            case 'wings': domains.shop.wingsButtonPressed(); break;
            case 'rotors': domains.shop.rotorsButtonPressed(); break;
            case 'redJet': domains.shop.redJetButtonPressed(); break;
            case 'blueJet': domains.shop.blueJetButtonPressed(); break;
            case 'fish': domains.shop.fishButtonPressed(); break;
            case 'snowball': domains.shop.snowballButtonPressed(); break;
            case 'arrow': domains.shop.crossbowButtonPressed(); break;
            case 'gLaser': domains.shop.greenLaserButtonPressed(); break;
            case 'pLaser': domains.shop.purpleLaserButtonPressed(); break;
            case 'play': domains.shop.playButtonPressed(); break;
        }
    }

    selectAbility(key) {
        if (key === LEFT_ARROW) {
            this.groups[1].prev();
        }
        else if (key === RIGHT_ARROW) {
            if (this.groups[1].atEnd()) {
                if (inventory.flyLevel > 0) {
                    this.groupIndex = 4; // fly group
                }
                else if (inventory.laserLevel > 0) {
                    this.groupIndex = 5; // shoot group
                }
                else this.groupIndex = 0; // menu group
            }
            else this.groups[1].next();
        }
        else if (key === UP_ARROW) {
            this.groupIndex = 0; // main menu group
        }
        else if (key === DOWN_ARROW) {
            this.groupIndex = 2; // arrows group
        }
    }

    selectMenu(key) {
        if (key === LEFT_ARROW) {
            this.groupIndex = 1; // abilities group
        }
        else if (key === DOWN_ARROW) {
            if (inventory.laserLevel > 0) {
                this.groupIndex = 5; // shoot group
            }
            else if (inventory.flyLevel > 0) {
                this.groupIndex = 4; // fly group
            }
            else this.groupIndex = 6; // play group
        }
    }

    selectArrow(key) {
        if (key === LEFT_ARROW) {
            this.groups[2].prev();
        }
        else if (key === RIGHT_ARROW) {
            if (this.groups[2].atEnd()) {
                this.groupIndex = 3; // buy group
            }
            else this.groups[2].next();
        }
        else if (key === UP_ARROW) {
            this.groupIndex = 1 // abilities group
        }
    }

    selectBuy(key) {
        if (key === LEFT_ARROW) {
            this.groupIndex = 2 // arrows group
        }
        else if (key === RIGHT_ARROW) {
            if (inventory.flyLevel > 0) {
                this.groupIndex = 4 // fly group
            }
            else if (inventory.laserLevel > 0) {
                this.groupIndex = 5 // shoot group
            }
            else this.groupIndex = 6; // play group
        }
        else if (key === UP_ARROW) {
            this.groupIndex = 1 // abilities group
        }
    }

    selectFly(key) {
        if (key === UP_ARROW) {
            if (this.groups[4].atStart()) {
                this.groupIndex = 0; // menu group
            }
            this.groups[4].prev();
        }
        else if (key === DOWN_ARROW) {
            if (this.groups[4].atEnd() || this.groups[4].index === inventory.flyLevel - 1) {
                this.groupIndex = 6; // play group
            }
            else this.groups[4].next();
        }
        else if (key === LEFT_ARROW) {
            if (this.groups[4].index < 2) {
                this.groupIndex = 1; // abilities group
            }
            else this.groupIndex = 3; // buy group
        }
        else if (key === RIGHT_ARROW) {
            if (inventory.laserLevel > 0) {
                this.groupIndex = 5; // shoot group
            }
        }
    }

    selectShoot(key) {
        if (key === UP_ARROW) {
            if (this.groups[5].atStart()) {
                this.groupIndex = 0; // menu group
            }
            this.groups[5].prev();
        }
        else if (key === DOWN_ARROW) {
            if (this.groups[5].atEnd() || this.groups[5].index === inventory.laserLevel - 1) {
                this.groupIndex = 6; // play group
            }
            else this.groups[5].next();
        }
        else if (key === LEFT_ARROW) {
            if (inventory.flyLevel > 0) {
                this.groupIndex = 4; // fly group
            }
            else if (this.groups[5].index < 2) {
                this.groupIndex = 1; // abilities group
            }
            else this.groupIndex = 3; // buy group
        }
    }

    selectPlay(key) {
        if (key === LEFT_ARROW) {
            this.groupIndex = 3; // buy group
        }
        else if (key === UP_ARROW) {
            if (inventory.laserLevel > 0) {
                this.groupIndex = 5; // shoot group
            }
            else if (inventory.flyLevel > 0) {
                this.groupIndex = 4; // fly group
            }
            else this.groupIndex = 0; // menu group
        }
    }
}