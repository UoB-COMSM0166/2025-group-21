class Menu {
    constructor() {
        this.visible = false;
        //this.menuPaused = false;
        this.opacity = 0.6;
        this.buttons = [];
        this.createButtons();
        this.menuHovered = false;
        this.backgroundDrawn = false;
        this.menuButtonVisible = true;
        //this.countdown = 0;
        //this.countdownActive = false;
        this.selectedIndex = -1;
    }

    createButtons() {
        const buttonLabels = ["START AGAIN", "INSTRUCTION", "SETTING"];
        const buttonActions = [
            () => this.restartGame(), // START AGAIN
            () => this.showInstructions(), // INSTRUCTION
            () => this.showSettings() // SETTING
        ];

        let buttonWidth = page.pageWidth * 0.3;
        let buttonHeight = page.pageHeight * 0.07;
        let totalHeight = buttonLabels.length * buttonHeight + (buttonLabels.length - 1) * (page.pageHeight * 0.05);
        let startY = (page.pageHeight - totalHeight) / 2;
        let xPos = page.xPadding + (page.pageWidth - buttonWidth) / 2;

         for (let i = 0; i < buttonLabels.length; i++) {
            let btn = createButton(buttonLabels[i]);
            btn.position(xPos, startY + i * (buttonHeight + page.pageHeight * 0.05));
            btn.size(buttonWidth, buttonHeight);
            btn.class("playButton");
            btn.mousePressed(buttonActions[i]);
            btn.mousePressedHandler = buttonActions[i];
            btn.hide();
            this.buttons.push(btn);
        }
    }

//    startCountdown() {
//        if(this.countdownActive) return;
//        this.countdownActive = true;
//        this.countdown = 3;
//
//        if(game.pause) {
//            game.pause.reset();
//        }
//
//        setTimeout(() => this.countdown = 2, 1000);
//        setTimeout(() => this.countdown = 1, 2000);
//        setTimeout(() => {
//            this.countdown = 0;
//            this.countdownActive = false;
//            game.pause.active = false;
//            //this.menuPaused = false;
//        }, 3000);
//    }

    showMenuScreen() {
        this.visible = true;
        game.menuOpen = true;
        //this.pauseGame();
        game.pause.active = true;
        //this.countdown = 0;
        //this.countdownActive = false;


        if (!this.backgroundDrawn) {
            fill(`rgba(0, 0, 0, ${this.opacity})`);
            rect(0, 0, width, height);
            this.backgroundDrawn = true;
        }

        for (let btn of this.buttons) {
            btn.show();
        }
    }

    drawMenuButton() {
        if (!this.menuButtonVisible) return;
        let menuX = 120, menuY = 20, menuWidth = 100, menuHeight = 40;

        if (mouseX > menuX && mouseX < menuX + menuWidth && mouseY > menuY && mouseY < menuY + menuHeight) {
            this.menuHovered = true;
        } else {
            this.menuHovered = false;
        }

        if (this.menuHovered) {
            fill(135, 206, 250);
        } else {
            fill(255);
        }
        rect(menuX, menuY, menuWidth, menuHeight, 5);

        fill(0);
        textSize(20);
        textAlign(CENTER, CENTER);
        text("MENU", menuX + menuWidth / 2, menuY + menuHeight / 2);
    }

    hideMenuButton() {
        this.menuButtonVisible = false;
    }

    showMenuButton() {
        this.menuButtonVisible = true;
    }

    hideButtons() {
        for (let btn of this.buttons) {
            btn.hide();
        }
    }

    closeMenu() {
//        this.visible = false;
//        game.pause.active = false;
//        this.hideButtons();
//        game.menuOpen = false;
//        this.backgroundDrawn = false;
        //this.startCountdown();
        this.hideButtons();
        this.visible = false;
        this.backgroundDrawn = false;
        game.menuOpen = false;
        //this.resumeGame();
        //this.startCountdown(); // 开始倒计时
        game.pause.active = false;
    }

//    drawCountdown() {
//        if(this.countdown > 0) {
//            fill(255);
//            textSize(80);
//            textAlign(CENTER, CENTER);
//            text(this.countdown, width/2, height/2);
//        }
//    }

    restartGame() {
        this.closeMenu();
        game = new Game();
        game.pause.active = false;
        //game.menuOpen = false;
    }

    showInstructions() {
        console.log("Show Instructions screen (future implementation)");
    }

    showSettings() {
        console.log("Show Settings screen (future implementation)");
    }

    moveSelection(direction) {
        if (this.buttons.length === 0) return;

        if (this.selectedIndex === -1) {
            // ✅ 只有按 `↓` 才能激活 `START AGAIN`
            if (direction === 1) {
                this.selectedIndex = 0;
            }
        } else {
            // ✅ 循环移动
            this.selectedIndex = (this.selectedIndex + direction + this.buttons.length) % this.buttons.length;
        }

        this.updateButtonStyles();
    }

    updateButtonStyles() {
        for (let i = 0; i < this.buttons.length; i++) {
            if (i === this.selectedIndex) {
                this.buttons[i].style("background-color", "rgb(187, 252, 252)");  // ✅ 让键盘选中的按钮变亮
            } else {
                this.buttons[i].style("background-color", "rgb(135, 206, 250)");  // ❌ 让未选中的按钮恢复默认颜色
            }
        }
    }

    selectButton() {
        if (this.selectedIndex !== -1) {
            const buttonAction = this.buttons[this.selectedIndex].mousePressedHandler;  // ✅ 直接获取绑定的函数
            if (buttonAction) {
                buttonAction();  // ✅ 直接执行按钮的功能
            }
        }
    }
}