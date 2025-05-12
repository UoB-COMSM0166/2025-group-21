

let Domain = 'loadGame'; // Determines which part of the game code is executed

let domains = null;
let inventory = null;
let settings = null;
let userIsTyping = false;
let inputCharacter = null;
let soundBoard = null;
let soundsCached = false;
let bg = null;

function onQualityChange(newLevel) {
    signalBackground = newLevel;   // 1=High, 2=Medium, 3=Low, 4=UltraLow
    preloadBackgroundImages();
    bg = new Background();
}

function setup() {
    // remove loading screen gif
    const loader = document.getElementById('loader');
    if (loader) loader.style.display = 'none';

    let gameProgress = loadGameProgress();

    // Set up canvas aspect ratio and resize to current window size
    createCanvas(1280, 720).id("myCanvas");
    resizeCanvasCSS();
    window.addEventListener("resize", resizeCanvasCSS);
    soundBoard = new SoundBoard();
    domains = new DomainManager(gameProgress);

    window.addEventListener("mousemove", (event) => {
        respondToMouseMovement();
    });
}

function draw() {
    if (Domain === 'game') {
        console.log('level = ' + inventory.currentProjectileItem)
    }

    if (!soundsCached) {
        return;
    }
    domains.run();
}



function resizeCanvasCSS() {
    let canvas = document.getElementById("myCanvas");

    // Maintain aspect ratio while scaling to fit window
    let aspectRatio = 16 / 9;
    let newWidth = window.innerWidth - 20*2; // Subtract the margin off
    let newHeight = window.innerHeight - 20*2;

    // Pick the larger of two
    if (newWidth / newHeight > aspectRatio) newWidth = newHeight * aspectRatio;
    else newHeight = newWidth / aspectRatio;

    canvas.style.width = `${newWidth}px`;
    canvas.style.height = `${newHeight}px`;
}

function hoveringOverButton(pos, size) {
    return mouseX > pos.x - size.x/2 && mouseX < pos.x + size.x/2 &&
        mouseY > pos.y - size.y/2 && mouseY < pos.y + size.y/2;
}

function respondToMouseMovement() {
    switch(Domain) {
        case 'loadGame':
            domains.gameLoader.selectedButtonIndex = -1
            document.body.classList.add("show-cursor");
            break;
        case 'mainMenu':
            if (domains.mainMenu.showSettings) {
                if (settings.keyNav.selectedControl > -1) {
                    settings.keyNav.selectedControl = -1;
                }
                settings.showCursor();
            }
            else if (domains.mainMenu.showCredits) {
                if (domains.mainMenu.creditsMenuButtonSelected) {
                    domains.mainMenu.creditsMenuButtonSelected = false;
                }
                domains.mainMenu.showCursor();
            }
            else if (domains.mainMenu.instructions !== null) {
                if (domains.mainMenu.instructions.selectedButtonIndex > -1) {
                    domains.mainMenu.instructions.selectedButtonIndex = -1;
                }
                domains.mainMenu.showCursor();
            }
            else if (domains.mainMenu.highscores !== null) {
                if (domains.mainMenu.highscores.mainMenuButtonSelected) {
                    domains.mainMenu.highscores.mainMenuButtonSelected = false;
                }
                domains.mainMenu.showCursor();
            }
            else {
                if (domains.mainMenu.selectedButtonIndex > -1) {
                    domains.mainMenu.selectedButtonIndex = -1;
                }
                domains.mainMenu.showCursor();
                domains.mainMenu.anyKeyPressed = false;
            }
            break;
        case 'game':
            if (domains.game.pause.showSettings) {
                if (settings.keyNav.selectedControl > -1) {
                    settings.keyNav.selectedControl = -1;
                }
                settings.showCursor();
            }
            else if (domains.game.pause.active && !domains.game.pause.isCountingDown) {
                if (domains.game.pause.selectedButtonIndex > -1) {
                    domains.game.pause.selectedButtonIndex = -1
                }
                domains.game.pause.showCursor();
            }
            else if (domains.game.death !== null &&
                (domains.game.death.progressSaved || userIsTyping || domains.game.highscores.usernameEntered)) {

                if (domains.game.death.selectedButtonIndex > -1) {
                    domains.game.death.selectedButtonIndex = -1
                }
                if (domains.game.stats.backButtonSelected) {
                    domains.game.stats.backButtonSelected = false;
                }
                if (domains.game.highscores.submitSelected) {
                    domains.game.highscores.submitSelected = false;
                }
                if (domains.game.highscores.backSelected) {
                    domains.game.highscores.backSelected = false;
                }
                document.body.classList.add("show-cursor");
                domains.game.death.cursorVisible = true;
            }
            break;
        case 'shop':
            if (domains.shop.keyNav.selected != null) {
                domains.shop.keyNav.selected = null;
                document.body.classList.add("show-cursor");
            }
            break;
    }
}
