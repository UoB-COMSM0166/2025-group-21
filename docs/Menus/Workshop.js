

class Workshop {

    constructor() {
        this.workshopMusic = null;
        this.purchaseSound = null;
        this.illegalPurchaseSound = null;

        document.body.classList.add("show-cursor");
        this.selectedItem = null;
        this.buttonsActive = false;
        this.buttonCooldownTimer = new Clock();
        this.buttonCooldownTimer.tick();
        this.arrowLeftRedTimer = 0;
        this.arrowRightRedTimer = 0;
        this.buyButtonRedTimer = 0;
        this.updateItemPrices();
        this.masterVolume = settings.masterVolume * settings.mute;
        this.soundsLoaded = false;
        this.hoverPopSound = null;
        this.wasHoveringPurchase = false;
        this.wasHoveringPlay = false
        this.wasHoveringProjectile = false;
        this.wasHoveringFlying = false;
        this.wasHoveringForceField = false;
        this.wasHoveringMainMenu = false;
        this.wasHoveringFlightButton = false;
        this.wasHoveringpProjectilesButton = false;
        this.wasHoveringpforceFieldButton = false;

        //---- Hovering... Glow Buttons ------
        this.wasHoveringArrowLeft = false;
        this.wasHoveringArrowRight = false;
        this.wasHoveringDragonWing = false;
        this.wasHoveringRotor = false;
        this.wasHoveringBooster = false;
        this.wasHoveringPenguinFly = false;
        this.wasHoveringHydrogenBooster = false;
        this.wasHoveringFish = false;
        this.wasHoveringSnowCanyon = false;
        this.wasHoveringCrossbow = false;
        this.wasHoveringGreenLaser = false;
        this.wasHoveringPurpleLaser = false;

        this.buttonPressedSound = null;
        this.loadAudio().then(() => this.soundsLoaded = true);

        this.fadeOut = false;
        this.screenTint = 0;
        this.fadeOutTimer = new Clock()


        //--- What's being shown in the shop ----
        this.showProjectile = 1;
        this.showFligth = 1;
        this.showForceField = 1;

        //--- Player status levels ------
        this.playerFligthLevel = 0;
        this.playerProjectileLevel = 0;
        this.playerForceFieldLevel = 0;

        /* --- fade‑in / fade‑out banner text --- */
        this._fadeMessage      = "";
        this.testTextPhase     = 'done';  // 'fadeIn' | 'hold' | 'fadeOut' | 'done'
        this.testTextAlpha     = 0;
        this.testTextHoldTimer = 0;


        //-----Your Penguin Animation--------


        this.frameIndex = 0;
        this.headImg = playerHead;
        this.feetImg = playerFlyFeet;
        this.wingImg = playerPenguinWings;
        //-----------------------------------

        //---- Wings Item's Column ----------
        this.itemColumnX = 1.32 * width / 2;
        this.itemColumnY = 0.545 * height;

        //---- Projectile Item's Column -----
        this.projectileColumnX = 1.775 * width / 2;
        this.projectileColumnY = 0.545 * height;
        //-----------------------------------

        //------Column for the items---------
        this.itemColumnScale = 0.05;
        //-----------------------------------

    }

    async loadAudio() {
        this.workshopMusic = await soundBoard.getSound('workshopMusic');
        this.purchaseSound = await soundBoard.getSound('purchaseSound');
        this.illegalPurchaseSound = await soundBoard.getSound('illegalPurchaseSound');
        this.hoverPopSound = await soundBoard.getSound('hoverPopSound');
        this.buttonPressedSound = await soundBoard.getSound('buttonPressedSound');

        setMasterVolume(this.masterVolume);
        this.workshopMusic.loop();
    }

    disconnectAudio() {
        this.workshopMusic.stop();
        this.purchaseSound.stop();
        this.illegalPurchaseSound.stop();
        this.workshopMusic = null;
        this.purchaseSound = null;
        this.illegalPurchaseSound = null;
    }

    openShop() {
        this.refreshLevelsFromInventory();   // keep UI in sync with Inventory
        if (!this.soundsLoaded) return;

        this.updateDisplay();
        this.printCoins();
        this.updateButtonCooldown();

        if (this.fadeOut) {
            this.masterVolume = lerp(this.masterVolume, 0, 0.04);
            this.workshopMusic.setVolume(volume * this.masterVolume);
            fill(`rgba(0, 0, 0, ${this.screenTint})`);
            rect(0, 0, width, height);

            if (this.screenTint >= 0.95) {
                this.screenTint = lerp(this.screenTint, 1, 0.5);

                if (this.screenTint >= 0.9999) {
                    ///this.screenTint = 1;
                    this.fadeOutTimer.tick();
                }
            } else {
                this.screenTint = lerp(this.screenTint, 1, 0.04);
            }

            if (this.fadeOutTimer.time > 20) {
                this.disconnectAudio();
                //soundBoard.disposeAll();
                //shop.dispose();
                domains.shop = null;
                Domain = 'game';
            }
        }
    }

    updateButtonCooldown() {

        if (this.buttonCooldownTimer.time > 0) {
            this.buttonCooldownTimer.tick();
        }
        if (this.buttonCooldownTimer.time > 30) {
            this.buttonCooldownTimer.reset();
            this.buttonsActive = true
        }
    }

    updateDisplay() {

        push();
        // background
        image(workshopBackground, 0, 0, width, height);
        // title
        imageMode(CENTER);
        image(shopTitle, width / 2, height / 10, shopTitle.width / 2.5, shopTitle.height / 2.5);
        // Your Penguin
        image(yourPenguin, 1.55 * width / 2, 2.5 * height / 10, 0.3 * yourPenguin.width / 2.5, 0.3 * yourPenguin.height / 2.5);
        pop();

        //---- Update button positions -------
        this.updatePlayButton();
        this.updatePurchaseButton();
        this.updateProjectileButton();
        this.updateFlyingButton();
        this.updateForceFieldButton();
        this.updateMainMenuButton();
        this.updateArrowNavigationButtons();

        //------------ Blocks --------------
        noStroke();
        fill('rgba(199, 209, 255, 0.4)');
        //rect(width*0.1, height*0.4, width/3.5, width/3.5, 10);
        image(displayBox, width * 0.02, height * 0.28, width / 3.2, width / 3.2);
        //--- Description Square ---------
        rect(width * 0.33, height * 0.32, 0.5 * width / 2.2, 1.65 * width / 6.5, 10);
        //--- character square --------
        rect(width * 0.66, height * 0.32, 0.5 * width / 2.2, 1.65 * width / 6.5, 10);

        this.showUpgradeDescription();

        this.drawTestingText();

        //---- Drawing the Player's Penguin ----------
        this.drawYourPenguin();
        //----Column to hold the flight items---------
        this.drawFlightItemColumn();
        //----Column to hold the projectile items-----
        this.drawProjectileItemColumn();


        /* draw special flight buttons last so they sit on top of everything */
        this.updatePenguinFlyButton();
        this.updateDragonWingButton();
        this.updateRotorButton();
        this.updateBoosterButton();
        this.updateHydrogenBoosterButton();
        this.updateFishButton();
        this.updateSnowCanyonButton();
        this.updateCrossbowButton();
        this.updateGreenLaserButton();
        this.updatePurpleLaserButton();

        //---- Pick oNE MESSAGE FOR item columns ----
        push();
        imageMode(CENTER);
        let scale = 0.05;
        image(pickOne, 1.32*width / 2, 0.52*height / 2, pickOne.width * scale, pickOne.height * scale);
        image(pickOne, 1.78*width / 2, 0.52*height / 2, pickOne.width * scale, pickOne.height * scale);
        pop();
    }

    //--NOTE: Buying logic -----------------------------------------------------------------
    playerHasEnoughCoins() {
        if (this.selectedItem === null) return false;

        switch (this.selectedItem) {
            case 'laser':
                if (inventory.laserLevel < 5) {
                    return inventory.coins >= this.laserUpgradePrice;
                }
                break;
            case 'flying':
                if (inventory.flyLevel < 5) {
                    return inventory.coins >= this.flyingUpgradePrice;
                }
                break;
            case 'force field':
                if (inventory.forceFieldLevel < 5) {
                    return inventory.coins >= this.forceFieldUpgradePrice;
                }
                break;
        }
        return false;
    }

    playerRequirementCheck() {
        if (this.selectedItem === null) return false;

        switch (this.selectedItem) {
            case 'laser': {
                const req = inventory.projectileRequirementLevel[this.showProjectile - 1];
                if (this.playerProjectileLevel >= req && this.showProjectile === inventory.laserLevel + 1) {
                    return true;
                }
                break;
            }
            case 'flying': {
                const req = inventory.fligthRequirementLevel[this.showFligth];
                if (this.playerFligthLevel >= req && this.showFligth === inventory.flyLevel + 1) {
                    return true;
                }
                break;
            }
            case 'force field': {
                const req = inventory.forceFieldRequirementLevel[this.showForceField];
                if (this.playerForceFieldLevel >= req && this.showForceField === inventory.forceFieldLevel + 1) {
                    return true;
                }
                break;
            }
        }
        return false;
    }

    updateItemPrices() {
        this.laserUpgradePrice = inventory.getLaserUpgradePrice();
        this.flyingUpgradePrice = inventory.getFlyingUpgradePrice();
        this.forceFieldUpgradePrice = inventory.getForceFieldUpgradePrice();
    }


    //--Note: BUY Button -------------------------------------------------------------------
    updatePurchaseButton() {
        push();
        let scale = 0.002 * width;
        let size = createVector(0.22 * buyButton.width / scale, 0.22 * buyButton.height / scale);
        let pos = createVector(0.445 * width, 0.85 * height);
        imageMode(CENTER);

        let isHovering = hoveringOverButton(pos, size);
        if (isHovering && !this.wasHoveringPurchase) {
            this.hoverPopSound.play();
        }
        this.wasHoveringPurchase = isHovering;
        if (isHovering) {
            image(buyButtonGlowing, pos.x, pos.y, size.x, size.y);

            if (mouseIsPressed && this.buttonsActive && !this.wasMousePressed) {
                this.wasMousePressed = true;
                if (this.playerRequirementCheck()) {
                    //--todo: Check if
                    if (this.playerHasEnoughCoins()) {
                        this.buttonsActive = false;
                        this.buttonCooldownTimer.tick();
                        this.buttonPressedSound.play();
                        this.upgradeItem();
                        saveGameProgress();
                    } else {
                        this.buttonsActive = false;
                        this.buttonCooldownTimer.tick();
                        this.illegalPurchaseSound.play();
                        this.buyButtonRedTimer = 30;
                        this.fadeInFadeOut("You don't have enough coins");
                    }
                } else if (this.selectedItem === null) {
                    this.buttonsActive = false;
                    this.buttonCooldownTimer.tick();
                    this.illegalPurchaseSound.play();
                    this.buyButtonRedTimer = 30;
                    this.fadeInFadeOut("What are you trying to buy? There are no items being shown!");
                } else {
                    this.buttonsActive = false;
                    this.buttonCooldownTimer.tick();
                    this.illegalPurchaseSound.play();
                    this.buyButtonRedTimer = 30;
                    this.fadeInFadeOut("You don't meet the requirements to buy this item!");
                }

            }
        } else {
            image(buyButton, pos.x, pos.y, size.x, size.y);
        }

        pop();
    }


    //--Note: Buying information -----------------------------------------------------------
    showUpgradeDescription() {

        let size = width / 70;
        fill(10, 25, 87, 255);
        textFont('Trebuchet MS');
        textAlign(LEFT, TOP);
        stroke(10, 25, 87, 255);
        strokeWeight(size);
        textSize(size);
        noStroke();

        switch (this.selectedItem) {
            case 'laser':
                this.showLaserDescription();
                break;
            case 'flying':
                this.showFlyingDescription();
                break;
            case 'force field':
                this.showForceFieldDescription();
                break;
        }
    }

    printAbilityLevel(abilityLevel) {
        push();
        stroke(0);
        strokeWeight(width / 1000);
        fill('rgb(246,208,55)');

        push();
        translate(0.065 * width, 0.37 * height); // same as the flying object base
        for (let i = 0; i < abilityLevel; i++) {
            inventory.drawStar(30 * i, 0, width / 60); // 30px between stars, adjust as needed
        }
        pop();
        pop();
    }

    showLaserDescription() {
        // compute price for the displayed projectile level
        let laserPrice = this.showProjectile > 1 ? (this.showProjectile - 1) * 350 : 10;
        text(
            `Projectile level ${this.showProjectile}: ${laserPrice} coins\n\n` +
            inventory.getProjectileBuyRequirement(this.showProjectile) +
            inventory.getProjectileDescription(this.showProjectile),
            0.345 * width,
            0.35 * height
        );

        // TODO: add description
        this.printAbilityLevel(this.showProjectile);

        push();
        let size = width / 1250;
        imageMode(CENTER);
        translate(0.175 * width, 0.55 * height);

        //--todo: IMG shown has to be in base of "showProjectile"
        switch (this.showProjectile) {
            case 1:
                image(shadow, 0, height / 6, 0.7 * size * shadow.width / 8, 0.7 * size * shadow.height / 8);
                rotate(-0.78);
                image(fishWorkshop, 0, 0, 0.24 * size * fishWorkshop.width, 0.24 * size * fishWorkshop.height);
                break;
            case 2:
                image(snowballWorkshop, 0, 0, 0.6 * size * snowballWorkshop.width / 3, 0.6 * size * snowballWorkshop.height / 3);
                image(shadow, 0, 0.15 * height, 0.9 * size * shadow.width / 8, 0.9 * size * shadow.height / 8);
                break;
            case 3:
                image(shadow, 0, 0.13 * height, size * shadow.width / 8, size * shadow.height / 15);
                image(arrowWorkshop, 16, 0, 0.7 * size * arrowWorkshop.width / 3.5, 0.7 * size * arrowWorkshop.height / 3.5);
                break;
            case 4:
                image(shadow, 0, 0.15 * height, 0.8 * size * shadow.width / 8, 0.8 * size * shadow.height / 15);
                image(greenLaser, 0, 10 * size, size * greenLaser.width / 4.5, size * greenLaser.height / 4.5);
                break;
            case 5:
                image(purpleLaser, 15, 0.03 * height, 1.5 * size * purpleLaser.width / 5, 1.5 * size * purpleLaser.height / 5);
                image(shadow, 0, 0.15 * height, 1.1 * size * shadow.width / 8, 0.8 * size * shadow.height / 8);
                break;
        }

        pop();
    }

    showFlyingDescription() {
        // compute price for the displayed flying level
        let flyingPrice = this.showFligth * 500;
        text(
            `Flying level ${this.showFligth}: ${flyingPrice} coins\n\n` +
            inventory.getFlyingBuyRequirement(this.showFligth) +
            inventory.getFlyingDescription(this.showFligth),
            0.345 * width,
            0.35 * height
        );

        this.printAbilityLevel(this.showFligth);

        push();
        let size = width / 3700;
        let shadowOffset = 0.06 * width;

        imageMode(CENTER);
        translate(0.175 * width, 0.55 * height);

        switch (this.showFligth) {
            case 0:
                image(noFlyWs, 0, 0, 0.6 * size * noFlyWs.width, 0.6 * size * noFlyWs.height);
                image(shadow, 0, 0.6 * height / 5, size * shadow.width / 3, size * shadow.height / 3);
                break;
            case 1:
                image(flyWs, 0, 0, 0.6 * size * flyWs.width, 0.6 * size * flyWs.height);
                image(shadow, 0, 0.6 * height / 5, size * shadow.width / 3, size * shadow.height / 3);
                break;
            case 2:
                image(dragonWingsWs, 0, 0, 0.8 * size * dragonWingsWs.width, 0.8 * size * dragonWingsWs.height);
                image(shadow, 0, 0.7 * height / 5, 0.8 * size * shadow.width / 3, 0.8 * size * shadow.height / 3);
                break;
            case 3:
                image(rotorsWs, 0, 0, size * rotorsWs.width, size * rotorsWs.height);
                image(shadow, -shadowOffset, 0.7 * height / 5, 0.5 * size * shadow.width / 3, 0.5 * size * shadow.height / 3);
                image(shadow, 1.1 * shadowOffset, 0.7 * height / 5, 0.5 * size * shadow.width / 3, 0.5 * size * shadow.height / 3);
                break;
            case 4:
                image(boosterWs, 0, 0, size * boosterWs.width, size * boosterWs.height);
                image(shadow, 0.9 * shadowOffset, 0.7 * height / 5, 0.8 * size * shadow.width / 3, 0.8 * size * shadow.height / 3);
                break;
            case 5:
                image(boosterHydrogen, 0, 0, size * boosterHydrogen.width, size * boosterHydrogen.height);
                image(shadow, 0.9 * shadowOffset, 0.7 * height / 5, 0.8 * size * shadow.width / 3, 0.8 * size * shadow.height / 3);
                break;
        }
        pop();
    }

    showForceFieldDescription() {
        // compute price for the displayed force field level
        let forceFieldPrice = (this.showForceField) * 750;
        text(
            `Force Field level ${this.showForceField}: ${forceFieldPrice} coins\n\n` +
            //--todo add requirement and descreiption for force field
            //inventory.getForceFieldBuyRequirement(this.showForceField)
            'requirements' + 'description',
            //inventory.getForceFieldDescription(this.showForceField),
            0.34 * width,
            height / 2.37
        );

        this.printAbilityLevel(this.showForceField);

        push();
        let size = width / 3800;
        imageMode(CENTER);
        translate(0.175 * width, 0.55 * height);
        image(shadow, 0, height / 5.5, size * shadow.width / 3.5, size * shadow.height / 3.5);
        image(shieldWorkshop, 0, 0, size * shieldWorkshop.width, size * shieldWorkshop.height);
        pop();
    }

    //--Note: Top buttons for the workshop ------------------------------------------------
    updateProjectileButton() {
        push();
        let scale = 0.002 * width;
        let size = createVector(0.5 * projectileButton.width / scale, 0.5 * projectileButton.height / scale);
        let pos = createVector(0.15 * width, 0.25 * height);
        imageMode(CENTER);

        let isActualHover = hoveringOverButton(pos, size);
        let isHovering = isActualHover || this.selectedItem === 'laser';
        if (isActualHover && !this.wasHoveringProjectile) {
            if (this.hoverPopSound) this.hoverPopSound.play();
        }
        this.wasHoveringProjectile = isActualHover;
        if (isHovering) {
            image(projectileButtonHover, pos.x, pos.y, size.x, size.y);

            if (isActualHover && mouseIsPressed && !this.wasMousePressed) {
                this.buttonPressedSound.play();
                this.selectedItem = 'laser';
                this.wasMousePressed = true;
            }
        } else {
            image(projectileButton, pos.x, pos.y, size.x, size.y);
        }
        pop();
    }

    updateFlyingButton() {
        push();
        let scale = 0.00178 * width;
        let size = createVector(0.5 * flyingButton.width / scale, 0.5 * flyingButton.height / scale);
        let pos = createVector(0.3 * width, 0.25 * height);
        imageMode(CENTER);

        let isActualHover = hoveringOverButton(pos, size);
        let isHovering = isActualHover || this.selectedItem === 'flying';
        if (isActualHover && !this.wasHoveringFlying) {
            if (this.hoverPopSound) this.hoverPopSound.play();
        }
        this.wasHoveringFlying = isActualHover;
        if (isHovering) {
            image(flyingButtonHover, pos.x, pos.y, size.x, size.y);

            if (isActualHover && mouseIsPressed && !this.wasMousePressed) {
                this.buttonPressedSound.play();
                this.selectedItem = 'flying';
                this.wasMousePressed = true;
            }
        } else {
            image(flyingButton, pos.x, pos.y, size.x, size.y);
        }
        pop();
    }

    updateForceFieldButton() {
        push();
        let scale = 0.0018 * width;
        let size = createVector(0.5 * forceFieldButton.width / scale, 0.5 * forceFieldButton.height / scale);
        let pos = createVector(0.45 * width, 0.25 * height);
        imageMode(CENTER);

        let isActualHover = hoveringOverButton(pos, size);
        let isHovering = isActualHover || this.selectedItem === 'force field';
        if (isActualHover && !this.wasHoveringForceField) {
            if (this.hoverPopSound) this.hoverPopSound.play();
        }
        this.wasHoveringForceField = isActualHover;
        if (isHovering) {
            image(forceFieldButtonHover, pos.x, pos.y, size.x, size.y);

            if (isActualHover && mouseIsPressed && !this.wasMousePressed) {
                this.buttonPressedSound.play();
                this.selectedItem = 'force field';
                this.wasMousePressed = true;
            }
        } else {
            image(forceFieldButton, pos.x, pos.y, size.x, size.y);
        }
        pop();
    }


    //--Note: Item Buttos: For the item columns ------------------------------------------

    // FLY 1 ------------ Penguin‑Fly Item Button --------------
    updatePenguinFlyButton() {
        if (this.playerFligthLevel < 1) return;

        push();
        const scale = 0.0065 * width;
        const size = createVector(0.5 * flyWs.width / scale,
            0.5 * flyWs.height / scale);
        const pos = createVector(0.66 * width, 0.37 * height);
        const equipped = (inventory.currentFlyItem === 1);
        imageMode(CENTER);

        const isActualHover = hoveringOverButton(pos, size);
        if (isActualHover && !this.wasHoveringPenguinFly) {
            this.hoverPopSound?.play();
        }
        this.wasHoveringPenguinFly = isActualHover;

        if (isActualHover) {
            image(flyWsGlowing, pos.x, pos.y, size.x, size.y);

            if (mouseIsPressed && !this.wasMousePressed) {
                this.buttonPressedSound?.play();
                this.wasMousePressed = true;
                inventory.currentFlyItem = 1;
            }
        } else {
            image(equipped ? flyWsGlowing : flyWs, pos.x, pos.y, size.x, size.y);
        }
        pop();
    }
    // FLY 2 ------------ Dragon‑Wing Item Button --------------
    updateDragonWingButton() {
        if (this.playerFligthLevel < 2) return;
        push();
        const scale = 0.005 * width;
        const size = createVector(0.5 * dragonWingsWs.width / scale,
            0.5 * dragonWingsWs.height / scale);
        const pos = createVector(0.66 * width, 0.46 * height);
        const equipped = (inventory.currentFlyItem === 2);
        imageMode(CENTER);

        const isActualHover = hoveringOverButton(pos, size);
        if (isActualHover && !this.wasHoveringDragonWing) {
            this.hoverPopSound?.play();
        }
        this.wasHoveringDragonWing = isActualHover;

        if (isActualHover) {
            image(dragonWingsGlowing, pos.x, pos.y, size.x, size.y);

            if (mouseIsPressed && !this.wasMousePressed) {
                this.buttonPressedSound?.play();
                this.wasMousePressed = true;
                inventory.currentFlyItem = 2;
            }
        } else {
            image(equipped ? dragonWingsGlowing : dragonWingsWs, pos.x, pos.y, size.x, size.y);
        }
        pop();
    }

    // FLY 3 ------------ Rotor Item Button --------------------
    updateRotorButton() {
        if (this.playerFligthLevel < 3) return;

        push();
        const scale = 0.004 * width;
        const size = createVector(0.5 * rotorsWs.width / scale,
            0.5 * rotorsWs.height / scale);
        const pos = createVector(0.66 * width, 0.543 * height);
        const equipped = (inventory.currentFlyItem === 3);
        imageMode(CENTER);

        const isActualHover = hoveringOverButton(pos, size);
        if (isActualHover && !this.wasHoveringRotor) {
            this.hoverPopSound?.play();
        }
        this.wasHoveringRotor = isActualHover;

        if (isActualHover) {
            image(rotorsWsGlowing, pos.x, pos.y, size.x, size.y);

            if (mouseIsPressed && !this.wasMousePressed) {
                this.buttonPressedSound?.play();
                this.wasMousePressed = true;
                inventory.currentFlyItem = 3;
            }
        } else {
            image(equipped ? rotorsWsGlowing : rotorsWs, pos.x, pos.y, size.x, size.y);
        }
        pop();
    }

    // FLY 4 ------------ Booster Item Button ------------------
    updateBoosterButton() {
        if (this.playerFligthLevel < 4) return;

        push();
        const scale = 0.004 * width;
        const size = createVector(0.5 * boosterWs.width / scale,
            0.5 * boosterWs.height / scale);
        const pos = createVector(0.65 * width, 0.629 * height);
        const equipped = (inventory.currentFlyItem === 4);
        imageMode(CENTER);

        const isActualHover = hoveringOverButton(pos, size);
        if (isActualHover && !this.wasHoveringBooster) {
            this.hoverPopSound?.play();
        }
        this.wasHoveringBooster = isActualHover;

        if (isActualHover) {
            image(boosterWsGlowing, pos.x, pos.y, size.x, size.y);

            if (mouseIsPressed && !this.wasMousePressed) {
                this.buttonPressedSound?.play();
                this.wasMousePressed = true;
                inventory.currentFlyItem = 4;
            }
        } else {
            image(equipped ? boosterWsGlowing : boosterWs, pos.x, pos.y, size.x, size.y);
        }
        pop();
    }

    // FLY 5 ------------ Hydrogen‑Booster Item Button ---------
    updateHydrogenBoosterButton() {
        if (this.playerFligthLevel < 5) return;

        push();
        const scale = 0.004 * width;
        const size = createVector(
            0.5 * boosterHydrogen.width / scale,
            0.5 * boosterHydrogen.height / scale
        );
        const pos = createVector(0.65 * width, 0.718 * height);
        const equipped = (inventory.currentFlyItem === 5);
        imageMode(CENTER);

        const isHover = hoveringOverButton(pos, size);
        if (isHover && !this.wasHoveringHydrogenBooster) {
            this.hoverPopSound?.play();
        }
        this.wasHoveringHydrogenBooster = isHover;

        if (isHover) {
            image(boosterHydrogenGlowing, pos.x, pos.y, size.x, size.y);

            if (mouseIsPressed && !this.wasMousePressed) {
                this.buttonPressedSound?.play();
                this.wasMousePressed = true;
                inventory.currentFlyItem = 5;
            }
        } else {
            image(equipped ? boosterHydrogenGlowing : boosterHydrogen, pos.x, pos.y, size.x, size.y);
        }
        pop();
    }

    // PROJECTILE 1 ------------ Fish Item Button ---------------------
    updateFishButton() {
        if (this.playerProjectileLevel < 1) return;
        push();
        const scale = 0.005 * width;
        const size = createVector(
            0.5 * fishWorkshop.width / scale,
            0.5 * fishWorkshop.height / scale
        );
        const pos = createVector(this.projectileColumnX, 0.37 * height);
        const equipped = (inventory.currentProjectileItem === 0);
        imageMode(CENTER);

        const isHover = hoveringOverButton(pos, size);
        if (isHover && !this.wasHoveringFish) {
            this.hoverPopSound?.play();
        }
        this.wasHoveringFish = isHover;

        if (isHover) {
            image(fishWorkshopGlowing, pos.x, pos.y, size.x, size.y);

            if (mouseIsPressed && !this.wasMousePressed) {
                this.buttonPressedSound?.play();
                this.wasMousePressed = true;
                inventory.currentProjectileItem = 0;
            }
        } else {
            image(equipped ? fishWorkshopGlowing : fishWorkshop, pos.x, pos.y, size.x, size.y);
        }
        pop();
    }

    // PROJECTILE 2------------ Snow‑Canyon Item Button --------------
    updateSnowCanyonButton() {
        if (this.playerProjectileLevel < 2) return;

        push();
        const scale = 0.007 * width;
        const size = createVector(
            0.5 * snowballWorkshop.width / scale,
            0.5 * snowballWorkshop.height / scale
        );
        const pos = createVector(this.projectileColumnX, 0.46 * height);
        const equipped = (inventory.currentProjectileItem === 1);
        imageMode(CENTER);

        const isHover = hoveringOverButton(pos, size);
        if (isHover && !this.wasHoveringSnowCanyon) {
            this.hoverPopSound?.play();
        }
        this.wasHoveringSnowCanyon = isHover;

        if (isHover) {
            image(snowballWorkshopGlowing, pos.x, pos.y, size.x, size.y);

            if (mouseIsPressed && !this.wasMousePressed) {
                this.buttonPressedSound?.play();
                this.wasMousePressed = true;
                inventory.currentProjectileItem = 1;
            }
        } else {
            image(equipped ? snowballWorkshopGlowing : snowballWorkshop, pos.x, pos.y, size.x, size.y);
        }
        pop();
    }

    // PROJECTILE 3------------ Crossbow Item Button -----------------
    updateCrossbowButton() {
        if (this.playerProjectileLevel < 3) return;

        push();
        const scale = 0.007 * width;
        const size = createVector(
            0.5 * arrowWorkshop.width / scale,
            0.5 * arrowWorkshop.height / scale
        );
        const pos = createVector(this.projectileColumnX, 0.543 * height);
        const equipped = (inventory.currentProjectileItem === 2);
        imageMode(CENTER);

        const isHover = hoveringOverButton(pos, size);
        if (isHover && !this.wasHoveringCrossbow) {
            this.hoverPopSound?.play();
        }
        this.wasHoveringCrossbow = isHover;

        if (isHover) {
            image(arrowWorkshopGlowing, pos.x, pos.y, size.x, size.y);

            if (mouseIsPressed && !this.wasMousePressed) {
                this.buttonPressedSound?.play();
                this.wasMousePressed = true;
                inventory.currentProjectileItem = 2;
            }
        } else {
            image(equipped ? arrowWorkshopGlowing : arrowWorkshop, pos.x, pos.y, size.x, size.y);
        }
        pop();
    }

    // PROJECTILE 4------------ Green‑Laser Item Button --------------
    updateGreenLaserButton() {
        if (this.playerProjectileLevel < 4) return;

        push();
        const scale = 0.007 * width;
        const size = createVector(
            0.5 * greenLaser.width / scale,
            0.5 * greenLaser.height / scale
        );
        const pos = createVector(this.projectileColumnX, 0.629 * height);
        const equipped = (inventory.currentProjectileItem === 3);
        imageMode(CENTER);

        const isHover = hoveringOverButton(pos, size);
        if (isHover && !this.wasHoveringGreenLaser) {
            this.hoverPopSound?.play();
        }
        this.wasHoveringGreenLaser = isHover;

        if (isHover) {
            image(greenLaserGlowing, pos.x, pos.y, size.x, size.y);

            if (mouseIsPressed && !this.wasMousePressed) {
                this.buttonPressedSound?.play();
                this.wasMousePressed = true;
                inventory.currentProjectileItem = 3;
            }
        } else {
            image(equipped ? greenLaserGlowing : greenLaser, pos.x, pos.y, size.x, size.y);
        }
        pop();
    }

    // PROJECTILE 5------------ Purple‑Laser Item Button --------------
    updatePurpleLaserButton() {
        if (this.playerProjectileLevel < 5) return;

        push();
        const scale = 0.007 * width;   // same scale as green‑laser
        const size = createVector(
            0.5 * purpleLaser.width / scale,
            0.5 * purpleLaser.height / scale
        );
        const pos = createVector(this.projectileColumnX, 0.718 * height); // X matches green‑laser, Y matches hydrogen booster
        const equipped = (inventory.currentProjectileItem === 4);
        imageMode(CENTER);

        const isHover = hoveringOverButton(pos, size);
        if (isHover && !this.wasHoveringPurpleLaser) {
            this.hoverPopSound?.play();
        }
        this.wasHoveringPurpleLaser = isHover;

        if (isHover) {
            image(purpleLaserGlowing, pos.x, pos.y, size.x, size.y);

            if (mouseIsPressed && !this.wasMousePressed) {
                this.buttonPressedSound?.play();
                this.wasMousePressed = true;
                inventory.currentProjectileItem = 4;
            }
        } else {
            image(equipped ? purpleLaserGlowing : purpleLaser, pos.x, pos.y, size.x, size.y);
        }
        pop();
    }




    //------------PlayButton---------------------------
    //--todo: Change the sprite to Icy style
    updatePlayButton() {
        push();
        let scale = 0.0018 * width;
        let size = createVector(playButton.width / scale, playButton.height / scale);
        let pos = createVector(0.88 * width, 0.89 * height);
        imageMode(CENTER);

        let isHovering = hoveringOverButton(pos, size);
        if (isHovering && !this.wasHoveringPlay) {
            this.hoverPopSound.play();
        }
        this.wasHoveringPlay = isHovering;
        if (isHovering) {
            image(playButtonHover, pos.x, pos.y, size.x, size.y);

            if (mouseIsPressed && !this.wasMousePressed) {
                this.buttonPressedSound.play();
                this.wasMousePressed = true;
                document.body.classList.remove("show-cursor");
                this.fadeOut = true;
            }
        } else {
            image(playButton, pos.x, pos.y, size.x, size.y);
        }
        pop();
    }

    updateMainMenuButton() {
        push();
        let scale = 0.008 * width;
        let size = createVector(mainMenuButton.width / scale, mainMenuButton.height / scale);
        let pos = createVector(0.935 * width, 0.04 * height);
        imageMode(CENTER);

        let isHovering = hoveringOverButton(pos, size);
        if (isHovering && !this.wasHoveringMainMenu) {
            this.hoverPopSound.play();
        }
        this.wasHoveringMainMenu = isHovering;
        if (isHovering) {
            image(mainMenuButtonHover, pos.x, pos.y, size.x, size.y);

            if (mouseIsPressed && !this.wasMousePressed) {
                this.buttonPressedSound.play();
                this.wasMousePressed = true;
                this.disconnectAudio();
                domains.shop = null;
                Domain = 'mainMenu';
            }
        } else {
            image(mainMenuButton, pos.x, pos.y, size.x, size.y);
        }
        pop();
    }

    upgradeItem() {
        switch (this.selectedItem) {
            case 'laser':
                inventory.laserLevel++;
                this.playerProjectileLevel = inventory.laserLevel;
                //--Auto equiping here-----
                inventory.currentProjectileItem = inventory.laserLevel - 1;
                inventory.coins -= this.laserUpgradePrice;
                break;
            case 'flying':
                inventory.flyLevel++;
                this.playerFligthLevel = inventory.flyLevel;
                inventory.coins -= this.flyingUpgradePrice;
                break;
            case 'force field':
                inventory.forceFieldLevel++;
                this.playerForceFieldLevel = inventory.forceFieldLevel;
                inventory.coins -= this.forceFieldUpgradePrice;
                break;
        }
        this.purchaseSound.play();
        this.updateItemPrices();
    }

    printCoins() {
        push()
        let size = width / 8;
        fill(228, 221, 0);
        textFont('Courier New');
        textAlign(LEFT, CENTER);
        stroke(0);
        strokeWeight(size / 17);
        textSize(size / 3);
        imageMode(CENTER);
        image(coinImage, width * 0.04, height * 0.07, 0.4 * size, 0.4 * size);
        fill(0);
        stroke(255);
        strokeWeight(size / 70);
        textStyle(BOLD);
        text(`×${inventory.coins}`, width * 0.075, height * 0.073);
        pop();
    }

    updateArrowNavigationButtons() {
        push();
        let scale = 0.0018 * width;
        let size = createVector(0.2 * arrowLeft.width / scale, 0.2 * arrowLeft.height / scale);

        let leftPos = createVector(0.12 * width, 0.85 * height);
        let rightPos = createVector(0.24 * width, 0.85 * height);

        imageMode(CENTER);

        // Left Arrow
        let isHoveringLeft = hoveringOverButton(leftPos, size);
        if (isHoveringLeft && !this.wasHoveringArrowLeft) {
            this.hoverPopSound.play();
        }
        this.wasHoveringArrowLeft = isHoveringLeft;
        if (isHoveringLeft) {
            image(arrowLeftGlowing, leftPos.x, leftPos.y, size.x, size.y);
            if (mouseIsPressed && !this.wasMousePressed) {
                this.wasMousePressed = true;
                if (this.selectedItem === 'laser') {
                    if (this.showProjectile > 1) {
                        this.buttonPressedSound.play();
                        this.showProjectile--;
                    } else {
                        this.illegalPurchaseSound.play();
                        this.arrowLeftRedTimer = 30;
                        this.fadeInFadeOut("C'mon! This is the first item, try the other arrow");
                    }
                } else if (this.selectedItem === 'flying') {
                    if (this.showFligth > 0) {
                        this.buttonPressedSound.play();
                        this.showFligth--;
                    } else {
                        this.illegalPurchaseSound.play();
                        this.arrowLeftRedTimer = 30;
                        this.fadeInFadeOut("C'mon! This is the first item, try the other arrow");
                    }
                } else if (this.selectedItem === 'force field') {
                    if (this.showForceField > 1) {
                        this.buttonPressedSound.play();
                        this.showForceField--;
                    } else {
                        this.illegalPurchaseSound.play();
                        this.arrowLeftRedTimer = 30;
                        this.fadeInFadeOut("C'mon! This is the first item, try the other arrow");
                    }
                } else if (this.selectedItem === null) {
                    this.illegalPurchaseSound.play();
                    this.arrowLeftRedTimer = 30;
                    this.fadeInFadeOut("Please select an item section if you want to use the arrows!");
                }
            }
        } else {
            image(arrowLeft, leftPos.x, leftPos.y, size.x, size.y);
        }

        // Right Arrow
        let isHoveringRight = hoveringOverButton(rightPos, size);
        if (isHoveringRight && !this.wasHoveringArrowRight) {
            this.hoverPopSound.play();
        }
        this.wasHoveringArrowRight = isHoveringRight;
        if (isHoveringRight) {
            image(arrowRightGlowing, rightPos.x, rightPos.y, size.x, size.y);
            if (mouseIsPressed && !this.wasMousePressed) {
                this.wasMousePressed = true;
                if (this.selectedItem === 'laser') {
                    if (this.showProjectile < 5) {
                        this.buttonPressedSound.play();
                        this.showProjectile++;
                    } else {
                        this.illegalPurchaseSound.play();
                        this.arrowRightRedTimer = 30;
                        this.fadeInFadeOut("There are no more items to this side, try the other arrow!");
                    }
                } else if (this.selectedItem === 'flying') {
                    if (this.showFligth < 5) {
                        this.buttonPressedSound.play();
                        this.showFligth++;
                    } else {
                        this.illegalPurchaseSound.play();
                        this.arrowRightRedTimer = 30;
                        this.fadeInFadeOut("There are no more items to this side, try the other arrow!");
                    }
                } else if (this.selectedItem === 'force field') {
                    if (this.showForceField < 5) {
                        this.buttonPressedSound.play();
                        this.showForceField++;
                    } else {
                        this.illegalPurchaseSound.play();
                        this.arrowRightRedTimer = 30;
                        this.fadeInFadeOut("There are no more items to this side, try the other arrow!");
                    }
                } else if (this.selectedItem === null) {
                    this.illegalPurchaseSound.play();
                    this.arrowRightRedTimer = 30;
                    this.fadeInFadeOut("Please select an item section if you want to use the arrows!");
                }
            }
        } else {
            image(arrowRight, rightPos.x, rightPos.y, size.x, size.y);
        }

        if (!mouseIsPressed) {
            this.wasMousePressed = false;
        }

        //--- The drawing of the left red arrow for short period ---------
        if (this.arrowLeftRedTimer > 0) {
            image(arrowLeftRed, leftPos.x, leftPos.y, size.x, size.y);
            this.arrowLeftRedTimer--;
        }

        //--- The drawing of the rigth red arrow for short period ---------
        if (this.arrowRightRedTimer > 0) {
            image(arrowRightRed, rightPos.x, rightPos.y, size.x, size.y);
            this.arrowRightRedTimer--;
        }

        //--- The drawing of the buy red button for short period ---------
        if (this.buyButtonRedTimer > 0) {
            let scale = 0.002 * width;
            let size = createVector(0.22 * buyButton.width / scale, 0.22 * buyButton.height / scale);
            let pos = createVector(0.445 * width, 0.85 * height);
            image(buyButtonRed, pos.x, pos.y, size.x, size.y);
            this.buyButtonRedTimer--;
        }
        pop();
    }

    /* ---------- small fading banner at bottom ---------- */
    drawTestingText() {
        if (this.testTextPhase === 'done') return;

        push();
        textAlign(CENTER, CENTER);
        textSize(0.3 * width / 20);
        fill(255, this.testTextAlpha);
        noStroke();
        text(this._fadeMessage, width / 2, height * 0.93);
        pop();

        const fadeSpeed = 5;   // alpha units per frame

        if (this.testTextPhase === 'fadeIn') {
            this.testTextAlpha = min(255, this.testTextAlpha + fadeSpeed);
            if (this.testTextAlpha >= 255) {
                this.testTextPhase = 'hold';
            }
        } else if (this.testTextPhase === 'hold') {
            this.testTextHoldTimer++;
            if (this.testTextHoldTimer > 60) {  // hold ~1 s
                this.testTextPhase = 'fadeOut';
            }
        } else if (this.testTextPhase === 'fadeOut') {
            this.testTextAlpha = max(0, this.testTextAlpha - fadeSpeed);
            if (this.testTextAlpha <= 0) {
                this.testTextPhase = 'done';
            }
        }
    }

    fadeInFadeOut(msg) {
        this._fadeMessage      = msg;
        this.testTextAlpha     = 0;
        this.testTextPhase     = 'fadeIn';
        this.testTextHoldTimer = 0;
    }

    drawYourPenguin() {
        //-- This is for sync with the actual player's inventory ---
        this.refreshSpritesFromInventory();

        const FRAME_W = 128;
        const FRAME_H = 128;
        const COLS = 2;
        const TOTAL_FRAMES = 6;
        const SCALE = 1.6;   // overall size on screen

        // ---- Penguinenguin animation Vel---------------------------
        if (frameCount % 4 === 0) {
            this.frameIndex = (this.frameIndex + 1) % TOTAL_FRAMES;
        }

        const col = this.frameIndex % COLS;
        const row = Math.floor(this.frameIndex / COLS);


        push();
        imageMode(CENTER);

        /* Draw in the exact middle of the canvas */
        translate(0.77 * width, height / 2);

        //---- BODY ----
        image(
            playerBody,
            0, 0,
            FRAME_W * SCALE, FRAME_H * SCALE,   // destination box
            col * FRAME_W, row * FRAME_H,       // source‑sheet x,y
            FRAME_W, FRAME_H                    // source‑sheet w,h
        );

        //---- FEET ---- (row 0 = normal feet)
        image(
            this.feetImg,
            0, 0,
            128 * SCALE, 128 * SCALE,
            0, 0,
            128, 128
        );

        // ---- HEAD ----
        image(
            this.headImg,
            0, 0,
            128 * SCALE, 128 * SCALE,
            0, 0,
            128, 128
        );

        // ---- WINGS ----
        image(
            this.wingImg,
            0, 0,
            FRAME_W * SCALE, FRAME_H * SCALE,
            col * FRAME_W, row * FRAME_H,
            FRAME_W, FRAME_H
        );
        pop();
    }

    // Note: Syncronisation with the actual player's inventory ---------------
    refreshSpritesFromInventory() {
        //--- Head sprite --> projectile
        switch (inventory.currentProjectileItem) {
            case 0: this.headImg = playerHeadFish;       break;
            case 1: this.headImg = playerHeadSnowball;   break;
            case 2: this.headImg = playerHeadArrow;      break;
            case 3: this.headImg = playerHeadLaser;      break;
            case 4: this.headImg = playerHeadGatling;    break;
        }

        //-- Feet and wings according to Fly level --------
        switch (inventory.currentFlyItem) {
            case 0:
            case 1:
                this.feetImg = playerFlyFeet;
                this.wingImg = playerPenguinWings;
                break;
            case 2:
                this.feetImg = playerFlyFeet;
                this.wingImg = playerDragonWings;
                break;
            case 3:
                this.feetImg = playerFlyFeet;
                this.wingImg = playerHelicopterRotor;
                break;
            case 4:
                this.feetImg = playerFlyBooster;
                this.wingImg = playerPenguinWings;
                break;
            case 5:
                this.feetImg = playerFlyBooster;
                this.wingImg = playerPenguinWings;
                break;
        }
    }


    //------------ Item Column (5 stacked frames squares) --------------
    drawFlightItemColumn() {
        push();
        imageMode(CENTER);

        const FRAMES = 5;
        const size = this.itemColumnScale * width;
        const x = this.itemColumnX;

        const startY = this.itemColumnY - (FRAMES * size) / 2 + size / 2;

        for (let i = 0; i < FRAMES; i++) {
            image(itemFrame, x, startY + i * size, size, size);
        }

        pop();
    }

    //----------- Projectile Item Column (5 stacked frames quares) -------------
    drawProjectileItemColumn() {
        push();
        imageMode(CENTER);

        const FRAMES = 5;
        const size = this.itemColumnScale * width;
        const x = this.projectileColumnX;

        // Start Y so the column is vertically centred
        const startY = this.projectileColumnY - (FRAMES * size) / 2 + size / 2;

        for (let i = 0; i < FRAMES; i++) {
            image(itemFrame, x, startY + i * size, size, size);
        }

        pop();
    }


    //-------- Updating Levels From Inventory -----------------
    refreshLevelsFromInventory() {
        this.playerFligthLevel     = inventory.flyLevel;
        this.playerProjectileLevel = inventory.laserLevel;
        this.playerForceFieldLevel = inventory.forceFieldLevel;
    }
}
