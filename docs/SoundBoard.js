

class SoundBoard {

    constructor() {
        this.cache = {};
        this.loadAudio().then(() => {
            soundsCached = true;
            setMasterVolume(1)
        });
    }

    async loadAudio() {
        this.cache['mainSoundtrack1'] = await loadSoundAsync('assets/sounds/mainSoundtrack1.mp3');
        this.cache['workshopMusic'] = await loadSoundAsync('assets/sounds/workshopMusic.mp3');
        this.cache['purchaseSound'] = await loadSoundAsync('assets/sounds/purchaseSound.mp3');
        this.cache['illegalPurchaseSound'] = await loadSoundAsync('assets/sounds/illegalPurchaseSound.mp3');
        this.cache['hoverPopSound'] = await loadSoundAsync('assets/sounds/hoverPopSound.mp3');
        this.cache['buttonPressedSound'] = await loadSoundAsync('assets/sounds/buttonPressedSound.mp3');

        this.cache['windSound'] = await loadSoundAsync('assets/sounds/windSound.mp3');
        this.cache['laserSound'] = await loadSoundAsync('assets/sounds/laser.mp3');
        this.cache['laserAutomaticSound'] = await loadSoundAsync('assets/sounds/laserAutomatic.mp3');
        this.cache['explosionSound'] = await loadSoundAsync('assets/sounds/explosionSound.mp3');
        this.cache['deathSound'] = await loadSoundAsync('assets/sounds/deathSound.mp3');
        this.cache['fishThrow'] = await loadSoundAsync('assets/sounds/fishThrow.mp3');
        this.cache['fishImpactSound'] = await loadSoundAsync('assets/sounds/fishImpactSound.mp3');
        this.cache['forceFieldSound'] = await loadSoundAsync('assets/sounds/forceFieldSound.mp3');
        this.cache['snowballSound'] = await loadSoundAsync('assets/sounds/snowballSound.mp3');
        this.cache['freezeSound'] = await loadSoundAsync('assets/sounds/freezeSound.mp3');
        this.cache['arrowSound'] = await loadSoundAsync('assets/sounds/arrowSound.mp3');
        this.cache['ufoArrowImpactSound'] = await loadSoundAsync('assets/sounds/ufoArrowImpactSound.mp3');
        this.cache['loseLifeSound'] = await loadSoundAsync('assets/sounds/loseLifeSound.mp3');
        this.cache['gainLifeSound'] = await loadSoundAsync('assets/sounds/gainLifeSound.mp3');
        this.cache['coinSound'] = await loadSoundAsync('assets/sounds/coinSound.mp3');
        this.cache['wingFlapSound'] = await loadSoundAsync('assets/sounds/wingFlapSound.mp3');
        this.cache['boosterSound'] = await loadSoundAsync('assets/sounds/boosterSound.mp3');
        this.cache['rotorSound'] = await loadSoundAsync('assets/sounds/rotorSound.mp3');
    }

    async getSound(name) {
        if (this.cache[name]) {
            return this.cache[name];
        }
    }
}
