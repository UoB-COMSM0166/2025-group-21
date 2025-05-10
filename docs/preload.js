// images
let playerHead = null;
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
let ingameCoin = null;
let usernameInputBar = null;
let displayBox = null;
let shopTitle = null
let yourPenguin = null
let workshopBackground = null;
let tipsBox = null;
let penguinClaw = null;
let penguinBodyFly = null;

let fishWorkshop = null;
let snowballWorkshop = null;
let arrowWorkshop = null;
let flyingWorkshop = null;
let dragonWingsWs = null;
let rotorsWs = null;
let boosterWs = null;
let boosterHydrogen = null;
let noFlyWs = null;
let flyWs = null;
let shieldWorkshop = null;
let shadow = null;

let playerHeadFish = null;
let playerHeadSnowball = null;
let playerHeadArrow = null;
let playerHeadLaser = null;
let playerHeadGatling = null;

let playerFlyFeet, playerFlyBooster, playerPenguinWings,
    playerDragonWings, playerHelicopterRotor, introHelicopterPenguin;

let arrowRight, arrowRightGlowing, arrowRightRed;
let arrowLeft, arrowLeftGlowing, arrowLeftRed;
let buyButton, buyButtonGlowing, buyButtonRed;
let flightButton, flightButtonGlowing;
let projectilesButton, projectilesButtonGlowing;
let forceFieldButton2, forceFieldButton2Glowing;

//--Inventory Images--------
let itemFrame;
let dragonWingsGlowing;
let rotorsWsGlowing;
let boosterHydrogenGlowing;
let boosterWsGlowing;
let flyWsGlowing;

let fishWorkshopGlowing;
let snowballWorkshopGlowing;
let arrowWorkshopGlowing;
let greenLaserGlowing;
let purpleLaserGlowing;
//--------------------------

//------------------WorkShop------------------------------
let framedDragonWings, framedRotor, framedPropaneBooster,
    framedHydrogenBooster, framedFlappingPenguin

let framedFish, framedSnowCanyon, framedCrossbow,
    framedSingleLaser, framedLaserGatling

let pickOne;
//--------------------------------------------------------


// BUTTONS
// main menu
let homeBackground = null;
let blurredHomeBackground = null;
let logo = null;
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
let highscoresButton = null;
let highscoresButtonHover = null;
let creditsButton = null;
let creditsButtonHover = null;


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

let seagull = null;
let damagedSeagull = null;
let frozenSeagull = null;
let freezingSeagull = null;
let seagullArrow = null;
let airplane = null;
let freezingAirplane = null;

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
    buyButtonGreen = loadImage('assets/buttons/buyButtonGreen.png');
    playButton = loadImage('assets/buttons/shopPlayButton.png');
    playButtonHover = loadImage('assets/buttons/shopPlayButtonHover.png');
    mainMenuButton = loadImage('assets/buttons/mainMenuButton.png');
    mainMenuButtonHover = loadImage('assets/buttons/mainMenuButtonHover.png');

    // Shop, innventory access
    flightButton = loadImage('assets/images/flightButton.png');
    flightButtonGlowing = loadImage('assets/images/flightButtonGlowing.png');
    projectilesButton = loadImage('assets/images/projectilesButton.png');
    projectilesButtonGlowing = loadImage('assets/images/projectilesButtonGlowing.png');
    forceFieldButton2 = loadImage('assets/images/forceFieldButton2.png');
    forceFieldButton2Glowing = loadImage('assets/images/forceFieldButton2Glowing.png');

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
    highscoresButton = loadImage('assets/buttons/mainMenu/highscoresButton.png');
    highscoresButtonHover = loadImage('assets/buttons/mainMenu/highscoresButtonHover.png');
    creditsButton = loadImage('assets/buttons/mainMenu/creditsButton.png');
    creditsButtonHover = loadImage('assets/buttons/mainMenu/creditsButtonHover.png');

    preloadBackgroundImages();

    playerHead = loadImage('assets/sprites/playerHead.png')
    playerHeadFish       = loadImage('assets/sprites/playerHead_fish.png');
    playerHeadSnowball   = loadImage('assets/sprites/playerHead_snowball.png');
    playerHeadArrow      = loadImage('assets/sprites/playerHead_arrow.png');
    playerHeadLaser      = loadImage('assets/sprites/playerHead_laser.png');
    playerHeadGatling    = loadImage('assets/sprites/playerHead_gatling.png');
    playerFlyFeet        = loadImage('assets/sprites/fly_feet.png');
    playerFlyBooster     = loadImage('assets/sprites/fly_booster.png');
    playerPenguinWings     = loadImage('assets/sprites/penguinWings.png');
    playerDragonWings    = loadImage('assets/sprites/dragonWings.png');
    playerHelicopterRotor = loadImage('assets/sprites/helicopterRotor.png');
    introHelicopterPenguin = loadImage('assets/sprites/helicopterPenguin_Full.png');

    playerImg = loadImage('assets/images/player1.png');
    playerBody = loadImage('assets/sprites/playerBody.png');
    playerDeath = loadImage('assets/sprites/playerDeath.png');
    ufo = loadImage('assets/images/ufo.png');
    explosion = loadImage('assets/sprites/explosion.png');
    fish = loadImage('assets/images/fish.png');
    damagedUfo = loadImage('assets/images/damagedUfo.png');
    coinImage = loadImage('assets/images/coin.png');
    usernameInputBar = loadImage('assets/images/usernameInputBar.png');
    displayBox = loadImage('assets/images/displayBox.png');
    shopTitle = loadImage('assets/images/shopTitle.png');
    yourPenguin = loadImage('assets/images/yourP.png');

    // Load variety of hearts
    heartImages[0] = loadImage('assets/images/heart1.png');
    heartImages[1] = loadImage('assets/images/heart2.png');
    heartImages[2] = loadImage('assets/images/heart3.png');
    heartImages[3] = loadImage('assets/images/heart4.png');
    ingameCoin = loadImage('assets/images/penguin_coin.png');

    damagedUfo = loadImage('assets/images/damagedUfo.png');
    snowball = loadImage('assets/images/snowball.png');
    freezingUfo = loadImage('assets/sprites/freezingUfo.png');
    frozenUfo = loadImage('assets/images/frozenUfo.png');
    arrow = loadImage('assets/sprites/arrow.png');
    ufoArrowImpact = loadImage('assets/images/ufoArrowImpact.png');
    greenLaser = loadImage('assets/images/greenLaser.png');
    purpleLaser = loadImage('assets/images/purpleLaser.png');

    //--- Ice Buttons ---------------------------------------------------------
    arrowRight = loadImage('assets/images/arrowRight.png');
    arrowRightGlowing = loadImage('assets/images/arrowRightGlowing.png');
    arrowRightRed = loadImage('assets/images/arrowRightRed.png');
    arrowLeft = loadImage('assets/images/arrowLeft.png');
    arrowLeftGlowing = loadImage('assets/images/arrowLeftGlowing.png');
    arrowLeftRed = loadImage('assets/images/arrowLeftRed.png');
    buyButton = loadImage('assets/images/buyButton.png');
    buyButtonGlowing = loadImage('assets/images/buyButtonGlowing.png');
    buyButtonRed = loadImage('assets/images/buyButtonRed.png');
    greenLaserGlowing = loadImage('assets/images/greenLaserGlowing.png');
    purpleLaserGlowing = loadImage('assets/images/purpleLaserGlowing.png');


    //--- Inventory Small Glowing Frames -------------------------------------------------------------
    itemFrame = loadImage('assets/images/itemFrame.png');
    dragonWingsGlowing = loadImage('assets/images/dragonWings_WorkshopGlowing.png');
    rotorsWsGlowing = loadImage('assets/images/rotors_WorkshopGlowing.png');
    boosterWsGlowing = loadImage('assets/images/booster_WorkshopGlowing.png');
    boosterHydrogenGlowing = loadImage('assets/images/boosterHydrogen_WorkshopGlowing.png');
    flyWsGlowing = loadImage('assets/images/fly_WorkshopGlowing.png');
    fishWorkshopGlowing = loadImage('assets/images/fishWorkshopGlowing.png');
    snowballWorkshopGlowing = loadImage('assets/images/snowballWorkshopGlowing.png');
    arrowWorkshopGlowing = loadImage('assets/images/arrowWorkshopGlowing.png');
    pickOne = loadImage('assets/images/pickOne.png');


    framedFlappingPenguin = loadImage('assets/images/framed_FlappingPenguin.png');
    framedRotor = loadImage('assets/images/framed_Rotor.png');
    framedDragonWings = loadImage('assets/images/framed_DragonWings.png');
    framedPropaneBooster = loadImage('assets/images/framed_PropaneBooster.png');
    framedHydrogenBooster = loadImage('assets/images/framed_HydrogenBooster.png');

    framedFish = loadImage('assets/images/framed_Fish.png');
    framedSnowCanyon = loadImage('assets/images/framed_SnowCanyon.png');
    framedCrossbow = loadImage('assets/images/framed_Crossbow.png');
    framedSingleLaser = loadImage('assets/images/framed_Laser1.png');
    framedLaserGatling = loadImage('assets/images/framed_Laser2.png');



    fishWorkshop = loadImage('assets/images/fishWorkshop.png');
    snowballWorkshop = loadImage('assets/images/snowballWorkshop.png');
    arrowWorkshop = loadImage('assets/images/arrowWorkshop.png');
    flyingWorkshop = loadImage('assets/images/flyingAbility.png');
    dragonWingsWs = loadImage('assets/images/dragonWings_Workshop.png');
    boosterWs = loadImage('assets/images/booster_Workshop.png');
    boosterHydrogen = loadImage('assets/images/boosterHydrogen_Workshop.png');
    rotorsWs = loadImage('assets/images/rotors_Workshop.png');
    noFlyWs = loadImage('assets/images/noFly_Workshop.png');
    flyWs = loadImage('assets/images/fly_Workshop.png');
    shieldWorkshop = loadImage('assets/images/forceFieldAbility.png');
    shadow = loadImage('assets/images/shadow.png');

    seagull = loadImage('assets/sprites/seagull.png');
    damagedSeagull = loadImage('assets/images/damagedSeagull.png');
    freezingSeagull = loadImage('assets/sprites/freezingBird.png');
    frozenSeagull = loadImage('assets/images/frozenBird.png');
    seagullArrow = loadImage('assets/images/birdArrow.png');
    airplane = loadImage('assets/images/airplane.png')
    freezingAirplane = loadImage('assets/sprites/freezingPlane.png');


    homeBackground = loadImage('assets/gifs/background.gif');
    blurredHomeBackground = loadImage('assets/gifs/blurredBackground.gif');
    logo = loadImage('assets/images/pengwingsTitle.png');
    keyboardIcon = loadImage('assets/images/keyboardIcon.png');
    workshopBackground = loadImage('assets/images/workshop_background.png');
    penguinBodyFly = loadImage('assets/sprites/playerFly_with_head.png');

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
    let sound;
    if ((sound = soundBoard.cache['workshopMusic']) !== undefined) sound.setVolume(2*volume*masterVolume);
    if ((sound = soundBoard.cache['purchaseSound']) !== undefined) sound.setVolume(volume*masterVolume);
    if ((sound = soundBoard.cache['illegalPurchaseSound']) !== undefined) sound.setVolume(4*volume*masterVolume);
    if ((sound = soundBoard.cache['hoverPopSound']) !== undefined) sound.setVolume(0.5*volume*masterVolume);
    if ((sound = soundBoard.cache['buttonPressedSound']) !== undefined) sound.setVolume(volume*masterVolume);

    if ((sound = soundBoard.cache['laserSound']) !== undefined) sound.setVolume(2*volume*masterVolume);
    if ((sound = soundBoard.cache['laserAutomaticSound']) !== undefined) sound.setVolume(2*volume*masterVolume);
    if ((sound = soundBoard.cache['explosionSound']) !== undefined) sound.setVolume(volume*masterVolume);
    if ((sound = soundBoard.cache['deathSound']) !== undefined) sound.setVolume(volume*masterVolume);
    if ((sound = soundBoard.cache['fishThrow']) !== undefined) sound.setVolume(volume*masterVolume);
    if ((sound = soundBoard.cache['fishImpactSound']) !== undefined) sound.setVolume(volume*masterVolume);
    if ((sound = soundBoard.cache['forceFieldSound']) !== undefined) sound.setVolume(volume*masterVolume);
    if ((sound = soundBoard.cache['snowballSound']) !== undefined) sound.setVolume(volume*masterVolume);
    if ((sound = soundBoard.cache['freezeSound']) !== undefined) sound.setVolume(0.5*volume*masterVolume);
    if ((sound = soundBoard.cache['arrowSound']) !== undefined) sound.setVolume(0.5*volume*masterVolume);
    if ((sound = soundBoard.cache['ufoArrowImpactSound']) !== undefined) sound.setVolume(volume*masterVolume);
    if ((sound = soundBoard.cache['loseLifeSound']) !== undefined) sound.setVolume(2*volume*masterVolume);
    if ((sound = soundBoard.cache['gainLifeSound']) !== undefined) sound.setVolume(1.5*volume*masterVolume);
    if ((sound = soundBoard.cache['coinSound']) !== undefined) sound.setVolume(0.5*volume*masterVolume);
    if ((sound = soundBoard.cache['wingFlapSound']) !== undefined) sound.setVolume(1.4*volume*masterVolume);
    if ((sound = soundBoard.cache['boosterSound']) !== undefined) sound.setVolume(0.8*volume*masterVolume);
    if ((sound = soundBoard.cache['rotorSound']) !== undefined) sound.setVolume(0.8*volume*masterVolume);
}

function loadSoundAsync(path) {
    return new Promise((resolve, reject) => loadSound(path, resolve, reject));
}
