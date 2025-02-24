class AudioController {
    constructor(assetManager) {
        this.assetManager = assetManager;
        this.isMuted = false;
        this.currentTrack = null;
        this.bgmVolume = 0.5;    // volume from 1 to 0.5
        this.sfxVolume = 1;

        // Initialize control event listeners
        this.initializeControls();
    }

    initializeControls() {
        // // Debug button toggles debugging in the game engine.
        // const debugBtn = document.getElementById('debug-btn');
        // debugBtn.addEventListener('click', () => {
        //     gameEngine.options.debugging = !gameEngine.options.debugging;
        //     debugBtn.textContent = `Debug: ${gameEngine.options.debugging ? 'On' : 'Off'}`;
        // });

        // Mute button toggles the mute state for both BGM and SFX.
        const muteBtn = document.getElementById('mute-btn');
        muteBtn.addEventListener('click', () => {
            this.isMuted = !this.isMuted;
            muteBtn.classList.toggle('active');
            muteBtn.textContent = this.isMuted ? "Unmute" : "Mute";
            this.updateAllVolumes();
        });
    
        // Background Music Volume slider: changes only the background music volume.
        const bgmSlider = document.getElementById('bgm-volume');
        bgmSlider.addEventListener('input', (e) => {
            this.bgmVolume = parseFloat(e.target.value);
            this.updateBackgroundVolume();
        });

        // Sound Effects Volume slider: changes all other audio assets.
        const sfxSlider = document.getElementById('sfx-volume');
        sfxSlider.addEventListener('input', (e) => {
            this.sfxVolume = parseFloat(e.target.value);
            this.updateSFXVolume();
        });

        // Track selector (drop-down)
        const trackSelector = document.getElementById('track-selector');

        // Play button: plays the background music track from the selected option.
        const playBtn = document.getElementById('play-btn');
        playBtn.addEventListener('click', () => {
            const selectedTrack = trackSelector.value;
            this.playBackgroundMusic(selectedTrack);
        });

        // Stop button: stops the background music track.
        const stopBtn = document.getElementById('stop-btn');
        stopBtn.addEventListener('click', () => {
            this.stopBackgroundMusic();
        });
    }

    updateAllVolumes() {
        this.updateBackgroundVolume();
        this.updateSFXVolume();
    }

    updateBackgroundVolume() {
        if (this.currentTrack) {
            this.currentTrack.volume = this.isMuted ? 0 : this.bgmVolume;
        }
    }

    updateSFXVolume() {
        // Loop through all assets; if it’s an audio and it isn’t the background music track, update its volume.
        for (let key in this.assetManager.cache) {
            const asset = this.assetManager.cache[key];
            if (asset instanceof Audio && asset !== this.currentTrack) {
                asset.volume = this.isMuted ? 0 : this.sfxVolume;
            }
        }
    }

    playBackgroundMusic(trackPath) {
        // Stop any currently playing background track before starting a new one.
        this.stopBackgroundMusic();
        this.currentTrack = this.assetManager.getAsset(trackPath);
        if (this.currentTrack) {
            this.currentTrack.loop = true;
            this.updateBackgroundVolume();
            this.currentTrack.play();
        }
    }

    stopBackgroundMusic() {
        if (this.currentTrack) {
            this.currentTrack.pause();
            this.currentTrack.currentTime = 0;
            this.currentTrack = null;
        }
    }
}







