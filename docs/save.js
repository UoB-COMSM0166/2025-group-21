const SAVE_KEY = 'pengwingsSaveData';
const CURRENT_VERSION = 5;

// default game state
const NEW_GAME_STATE = {
    version: CURRENT_VERSION,

    coins: 0,
    flyLevel: 0,
    projectileLevel: 0,
    forceFieldLevel: 0,
    currentFly: 0,
    currentProjectile: -1,

    masterVolume: 1,
    mute: 1,
    musicVolume: 0.5,
    musicMute: 0,
    difficulty: 0,
    bgQuality: 2,
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
        const result = JSON.parse(progress);
        if (result.musicVolume === undefined) result.musicVolume = 1;
        if (result.musicMute   === undefined) result.musicMute   = 1;
        return result;
    }
    catch (err) {
        console.warn('Error parsing game save data:\n', err);
        localStorage.removeItem(SAVE_KEY);
        return null;
    }
}

function saveGameProgress() {
    const progress = {
        version: CURRENT_VERSION,

        coins: inventory.coins,
        flyLevel: inventory.flyLevel,
        projectileLevel: inventory.laserLevel,
        forceFieldLevel: inventory.forceFieldLevel,
        currentFly: inventory.currentFlyItem,
        currentProjectile: inventory.currentProjectileItem,

        masterVolume: settings.masterVolume,
        musicVolume: settings.musicVolume,
        musicMute:    settings.musicMute,
        mute: settings.mute,
        difficulty: settings.difficulty,
        bgQuality: settings.bgQuality,
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