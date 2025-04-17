

const SAVE_KEY = 'pengwingsSaveData'

const NEW_GAME_STATE = {
    coins: 0,
    flyLevel: 0,
    projectileLevel: 1,
    forceFieldLevel: 0,

    masterVolume: 1,
    mute: 1,
    difficulty: 0,
    flyKey: 'w',
    boostKey: ' ',
    shootKey: 'd',
    shieldKey: 'f'
}

function loadGameProgress() {
    const progress = localStorage.getItem(SAVE_KEY);

    if (!progress) {
        return null;
    }
    try {
        return JSON.parse(progress);
    }
    catch (err) {
        console.warn('Error parsing game save data:\n', err);
        localStorage.removeItem(SAVE_KEY);
        return null;
    }
}

function saveGameProgress() {
    const progress = {
        coins: inventory.coins,
        flyLevel: inventory.flyLevel,
        projectileLevel: inventory.laserLevel,
        forceFieldLevel: inventory.forceFieldLevel,

        masterVolume: settings.masterVolume,
        mute: settings.mute,
        difficulty: settings.difficulty,
        flyKey: settings.flyKey,
        boostKey: settings.boostKey,
        shootKey: settings.shootKey,
        shieldKey: settings.shieldKey
    }

    try {
        localStorage.setItem(SAVE_KEY, JSON.stringify(progress));
    }
    catch(err) {
        console.warn('Error saving game data');
    }
}