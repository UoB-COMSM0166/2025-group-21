

class BackgroundMusic {
     constructor() {
         //.this.bgMusic       = null;   // main gameplay soundtrack
         this.setVolume();
         domains.game.bgMusic.loop();
         this.bgMusicPaused = false;  // helper flag
     }

     adjustVolume() {
         /* pause / resume background music together with the pause menu */
         if (domains.game.bgMusic) {
             if (domains.game.pause.active && !this.bgMusicPaused) {
                 domains.game.bgMusic.pause();
                 this.bgMusicPaused = true;
             } else if (!domains.game.pause.active && this.bgMusicPaused) {
                 domains.game.bgMusic.play();
                 this.bgMusicPaused = false;
             }
         }

         /* continuously apply current volume settings */
         if (domains.game.bgMusic) {
             this.setVolume();
         }

         /* cut music as soon as the player dies */
         if (domains.game.death && domains.game.bgMusic) {
             domains.game.bgMusic.stop();
             domains.game.bgMusic = null;          // prevent further resume attempts
             this.bgMusicPaused = true;
         }
     }

     setVolume() {
         domains.game.bgMusic.setVolume(
             0.2 *
             settings.musicVolume *
             settings.musicMute *
             settings.masterVolume
         );
     }
}