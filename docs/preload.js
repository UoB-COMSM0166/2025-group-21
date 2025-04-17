

// images
let playerImg = null;
let playerFly = null;
let playerDeath = null
let ufo = null;
let explosion = null;
let fish = null;
let damagedUfo = null;
let laserSound = null;
let heartImages = [];
let freezingUfo = null;
let frozenUfo = null;
let snowball = null;
let arrow = null;
let ufoArrowImpact = null;
let greenLaser = null;
let purpleLaser = null;
let coinImage = null;
let usernameInputBar = null;
let displayBox = null;
let shopTitle = null
let workshopBackground = null;
let tipsBox = null;
let penguinClaw = null;


// audio
// let laserAutomaticSound = null;
// let explosionSound = null;
// let deathSound = null;
// let windSound = null;
// let fishThrow = null;
// let fishImpactSound = null;
// let forceFieldSound = null;
// let purchaseSound = null;
// let illegalPurchaseSound = null;
// let snowballSound = null;
// let freezeSound = null;
// let loseLifeSound = null;
// let gainLifeSound = null;
// let arrowSound = null;
// let ufoArrowImpactSound = null;
// let workshopMusic = null;
// let collectCoinSound = null

// BUTTONS
// main menu
let homeBackground;
let logo;
let penguinFlyGif = null;
let penguinSpinGif = null;
let keyboardIcon = null;
let startGameButton = null;
let startGameButtonHover = null;
let shopButton = null;
let shopButtonHover = null;
let instructionsButton = null;
let instructionsButtonHover = null;
let settingsButton = null;
let settingsButtonHover = null;

// load game
let yesButton = null;
let yesButtonHover = null;
let noButton = null;
let noButtonHover = null;

// death menu
let returnToWorkshopButton = null;
let returnToWorkshopButtonHover = null;
let playAgainButton = null;
let playAgainButtonHover = null;
let statsButton = null;
let statsButtonHover = null;

// other
let backButton = null;
let backButtonHover = null;
let submitButton = null;
let submitButtonHover = null;

// fonts
let instructionFont = null;

// shop
let projectileButton = null
let projectileButtonHover = null;
let flyingButton = null;
let flyingButtonHover = null;
let forceFieldButton = null;
let forceFieldButtonHover = null;
let buyButtonYellow = null;
let buyButtonRed = null;
let buyButtonGreen = null;
let playButton = null;
let playButtonHover = null;
let mainMenuButton = null;
let mainMenuButtonHover = null;


// pause menu
let continueButton = null;
let continueButtonHover = null;
let inventoryButton = null;
let inventoryButtonHover = null;
let pauseShopButton = null;
let pauseShopButtonHover = null;
let pauseSettingsButton = null;
let pauseSettingsButtonHover = null;
let closeButton = null;
let closeButtonHover = null;

// settings menu
let volumeDial = null;
let volumeDialHover = null;
let volumeBar = null;
let incrementArrow = null;
let incrementArrowHover = null;
let decrementArrow = null;
let decrementArrowHover = null;
let soundOn = null;
let soundOff = null;
let onButton = null;
let onButtonHover = null;
let offButton = null;
let offButtonHover = null;
let controlsButton = null;
let controlsButtonHover = null;
let changeButton = null;
let changeButtonHover = null;

function preload() {
    // pause menu
    continueButton = loadImage('assets/buttons/pauseMenu/continueButton.png');
    continueButtonHover = loadImage('assets/buttons/pauseMenu/continueButtonHover.png');
    inventoryButton = loadImage('assets/buttons/pauseMenu/inventoryButton.png');
    inventoryButtonHover = loadImage('assets/buttons/pauseMenu/inventoryButtonHover.png');
    pauseShopButton = loadImage('assets/buttons/pauseMenu/shopButton.png');
    pauseShopButtonHover = loadImage('assets/buttons/pauseMenu/shopButtonHover.png');
    pauseSettingsButton = loadImage('assets/buttons/pauseMenu/settingsButton.png');
    pauseSettingsButtonHover = loadImage('assets/buttons/pauseMenu/settingsButtonHover.png');
    closeButton = loadImage('assets/buttons/pauseMenu/closeButton.png');
    closeButtonHover = loadImage('assets/buttons/pauseMenu/closeButtonHover.png');

    // load game
    yesButton = loadImage('assets/buttons/loadGame/yesButton.png');
    yesButtonHover = loadImage('assets/buttons/loadGame/yesButtonHover.png');
    noButton = loadImage('assets/buttons/loadGame/noButton.png');
    noButtonHover = loadImage('assets/buttons/loadGame/noButtonHover.png');

    // death menu
    returnToWorkshopButton = loadImage('assets/buttons/returnToWorkshopButton.png');
    returnToWorkshopButtonHover = loadImage('assets/buttons/returnToWorkshopButtonHover.png');
    playAgainButton = loadImage('assets/buttons/playAgainButton.png');
    playAgainButtonHover = loadImage('assets/buttons/playAgainButtonHover.png');
    statsButton = loadImage('assets/buttons/statsButton.png');
    statsButtonHover = loadImage('assets/buttons/statsButtonHover.png');

    // other
    backButton = loadImage('assets/buttons/backButton.png');
    backButtonHover = loadImage('assets/buttons/backButtonHover.png');
    submitButton = loadImage('assets/buttons/submitButton.png');
    submitButtonHover = loadImage('assets/buttons/submitButtonHover.png');

    // shop
    projectileButton = loadImage('assets/buttons/projectileButton.png');
    projectileButtonHover = loadImage('assets/buttons/projectileButtonHover.png');
    flyingButton = loadImage('assets/buttons/flyingButton.png');
    flyingButtonHover = loadImage('assets/buttons/flyingButtonHover.png');
    forceFieldButton = loadImage('assets/buttons/forceFieldButton.png');
    forceFieldButtonHover = loadImage('assets/buttons/forceFieldButtonHover.png');
    buyButtonYellow = loadImage('assets/buttons/buyButtonYellow.png');
    buyButtonRed = loadImage('assets/buttons/buyButtonRed.png');
    buyButtonGreen = loadImage('assets/buttons/buyButtonGreen.png');
    playButton = loadImage('assets/buttons/shopPlayButton.png');
    playButtonHover = loadImage('assets/buttons/shopPlayButtonHover.png');
    mainMenuButton = loadImage('assets/buttons/mainMenuButton.png');
    mainMenuButtonHover = loadImage('assets/buttons/mainMenuButtonHover.png');

    // instruction
    instructionFont = loadFont('assets/fonts/Noteworthy.ttf');
    tipsBox = loadImage('assets/images/tipsBox.png');
    penguinClaw = loadImage('assets/images/penguinClaw(1).png');

    // main menu
    startGameButton = loadImage('assets/buttons/mainMenu/startGameButton.png');
    startGameButtonHover = loadImage('assets/buttons/mainMenu/startGameButtonHover.png');
    shopButton = loadImage('assets/buttons/mainMenu/shopButton.png');
    shopButtonHover = loadImage('assets/buttons/mainMenu/shopButtonHover.png');
    instructionsButton = loadImage('assets/buttons/mainMenu/instructionsButton.png');
    instructionsButtonHover = loadImage('assets/buttons/mainMenu/instructionsButtonHover.png');
    settingsButton = loadImage('assets/buttons/mainMenu/settingsButton.png');
    settingsButtonHover = loadImage('assets/buttons/mainMenu/settingsButtonHover.png');


    playerImg = loadImage('assets/images/player1.png');
    playerFly = loadImage('assets/sprites/playerFly.png');
    playerDeath = loadImage('assets/sprites/playerDeath.png');
    ufo = loadImage('assets/images/ufo.png');
    explosion = loadImage('assets/sprites/explosion.png');
    fish = loadImage('assets/images/fish.png');
    damagedUfo = loadImage('assets/images/damagedUfo.png');
    coinImage = loadImage('assets/images/coin.png');
    usernameInputBar = loadImage('assets/images/usernameInputBar.png');
    displayBox = loadImage('assets/images/displayBox.png');
    shopTitle = loadImage('assets/images/shopTitle.png');

    // Load variety of hearts
    heartImages[0] = loadImage('assets/images/heart1.png');
    heartImages[1] = loadImage('assets/images/heart2.png');
    heartImages[2] = loadImage('assets/images/heart3.png');
    heartImages[3] = loadImage('assets/images/heart4.png');

    damagedUfo = loadImage('assets/images/damagedUfo.png');
    snowball = loadImage('assets/images/snowball.png');
    freezingUfo = loadImage('assets/sprites/freezingUfo.png');
    frozenUfo = loadImage('assets/images/frozenUfo.png');
    arrow = loadImage('assets/sprites/arrow.png');
    ufoArrowImpact = loadImage('assets/sprites/ufoArrowImpact.png');
    greenLaser = loadImage('assets/images/greenLaser.png');
    purpleLaser = loadImage('assets/images/purpleLaser.png');

    seagull = loadImage('assets/sprites/seagull.png');
    airplane = loadImage('assets/images/airplane.png')

    homeBackground = loadImage('assets/gifs/background.gif');
    logo = loadImage('assets/images/pengwingsTitle.png');
    penguinFlyGif = loadImage('assets/gifs/penguinFly.gif');
    penguinSpinGif = loadImage('assets/gifs/penguinSpin.gif');
    keyboardIcon = loadImage('assets/images/keyboardIcon.png');
    workshopBackground = loadImage('assets/images/workshop_background.png');

    // settings menu
    volumeDial = loadImage('assets/settings/volumeDial.png');
    volumeDialHover = loadImage('assets/settings/volumeDialHover.png');
    volumeBar = loadImage('assets/settings/volumeBar.png');
    incrementArrow = loadImage('assets/settings/incrementArrow.png');
    incrementArrowHover = loadImage('assets/settings/incrementArrowHover.png');
    decrementArrow = loadImage('assets/settings/decrementArrow.png');
    decrementArrowHover = loadImage('assets/settings/decrementArrowHover.png');
    soundOn = loadImage('assets/settings/soundOn.png');
    soundOff = loadImage('assets/settings/soundOff.png');
    onButton = loadImage('assets/settings/onButton.png');
    onButtonHover = loadImage('assets/settings/onButtonHover.png');
    offButton = loadImage('assets/settings/offButton.png');
    offButtonHover = loadImage('assets/settings/offButtonHover.png');
    controlsButton = loadImage('assets/settings/changeControlsButton.png');
    controlsButtonHover = loadImage('assets/settings/changeControlsButtonHover.png');
    changeButton = loadImage('assets/settings/changeButton.png');
    changeButtonHover = loadImage('assets/settings/changeButtonHover.png');
}

let volume = 0.2;

function setMasterVolume(masterVolume) {
    soundBoard.cache['workshopMusic'].setVolume(2*volume*masterVolume);
    soundBoard.cache['purchaseSound'].setVolume(volume*masterVolume);
    soundBoard.cache['illegalPurchaseSound'].setVolume(volume*masterVolume);

    soundBoard.cache['laserSound'].setVolume(2*volume*masterVolume);
    soundBoard.cache['laserAutomaticSound'].setVolume(2*volume*masterVolume);
    soundBoard.cache['explosionSound'].setVolume(volume*masterVolume);
    soundBoard.cache['deathSound'].setVolume(volume*masterVolume);
    soundBoard.cache['fishThrow'].setVolume(volume*masterVolume);
    soundBoard.cache['fishImpactSound'].setVolume(volume*masterVolume);
    soundBoard.cache['forceFieldSound'].setVolume(volume*masterVolume);
    soundBoard.cache['snowballSound'].setVolume(volume*masterVolume);
    soundBoard.cache['freezeSound'].setVolume(0.5*volume*masterVolume);
    soundBoard.cache['arrowSound'].setVolume(0.5*volume*masterVolume);
    soundBoard.cache['ufoArrowImpactSound'].setVolume(volume*masterVolume);
    soundBoard.cache['loseLifeSound'].setVolume(2*volume*masterVolume);
    soundBoard.cache['gainLifeSound'].setVolume(1.5*volume*masterVolume);
    soundBoard.cache['coinSound'].setVolume(0.5*volume*masterVolume);
}

function loadSoundAsync(path) {
    return new Promise((resolve, reject) => loadSound(path, resolve, reject));
}
