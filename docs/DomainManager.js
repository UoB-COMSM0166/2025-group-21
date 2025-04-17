

class DomainManager {
    constructor() {
        this.domain = Domain;
        this.intro = null;
        this.mainMenu = null;
        this.game = null;
        this.shop = null;
    }

    run() {
        if (Domain === 'intro') {
            if(this.intro == null) {
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