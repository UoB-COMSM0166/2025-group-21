

class DomainManager {
    constructor(gameProgress) {
        this.gameProgress = gameProgress;
        this.gameLoader = null;
        this.intro = null;
        this.mainMenu = null;
        this.game = null;
        this.shop = null;
        this.instruction = null;
    }

    // This is the master game loop
    // Value of 'Domain' dictates which part of the program is executed
    run() {
        if (Domain === 'loadGame') {
            if (this.gameLoader === null) {
                this.gameLoader = new GameLoader(this.gameProgress);
            }
            this.gameLoader.showLoadScreen();
        }

        if (Domain === 'intro') {
            if(this.intro === null) {
                this.intro = new Intro();
                this.intro.resetAnimation();
            }
            this.intro.showIntro();
        }

        if (Domain === 'mainMenu') {
            if (this.mainMenu === null) {
                this.mainMenu = new MainMenu();
            }
            if (this.mainMenu.showSettings) {
                settings.showSettingsScreen();
            }
            else this.mainMenu.showMainMenu();
        }

        if (Domain === 'shop') {
            if (this.shop === null) {
                this.shop = new Workshop();
            }
            this.shop.openShop();
        }

        if (Domain === 'game') {
            if (this.game === null) {
                this.game = new Game();
            }
            this.game.runSimulation();
        }
    }
}