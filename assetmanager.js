class AssetManager {
    constructor() {
        this.successCount = 0;
        this.errorCount = 0;
        this.cache = [];
        this.downloadQueue = [];
    };

    queueDownload(path) {
        console.log("Queueing " + path);
        this.downloadQueue.push(path);
    };

    isDone() {
        return this.downloadQueue.length === this.successCount + this.errorCount;
    };

    downloadAll(callback) {
        if (this.downloadQueue.length === 0) setTimeout(callback, 10);
        for (let i = 0; i < this.downloadQueue.length; i++) {
            const path = this.downloadQueue[i];
            const ext = path.substring(path.length - 3);    // Extension of the asset

            switch(ext) {
                // If asset is an image
                case 'jpg':
                case 'png':
                    const img = new Image();

                    img.addEventListener("load", () => {
                        console.log("Loaded " + img.src);
                        this.successCount++;
                        if (this.isDone()) callback();
                    });

                    img.addEventListener("error", () => {
                        console.log("Error loading " + img.src);
                        this.errorCount++;
                        if (this.isDone()) callback();
                    });

                    img.src = path;
                    this.cache[path] = img;
                    break;
                // If assest is an audio
                case 'wav':
                case 'mp3':
                case 'mp4':
                    var aud = new Audio();

                    aud.addEventListener("loadeddata", () => {
                        console.log("Loaded " + aud.src);
                        this.successCount++;
                        if (this.isDone()) callback();
                    });

                    aud.addEventListener("error", () => {
                        console.log("Error loading " + aud.src);
                        this.errorCount++;
                        if (this.isDone()) callback();
                    });

                    aud.addEventListener("ended", () => {
                        aud.pause();
                        aud.currentTime = 0;
                    });

                    aud.src = path;
                    aud.load();
                    this.cache[path] = aud;
                    break;
            }
        }
    };

    getAsset(path) {
        return this.cache[path];
    };

    playAsset(path) {
        let audio = this.cache[path];
        if (audio.currentTime != 0) {
            let bak = audio.cloneNode();
            bak.currentTime = 0;
            bak.volume = audio.volume;
            bak.play();
        } else {
            audio.currentTime = 0;
            audio.play();
        }
    };

    pauseBackgroundMusic() {
        for (var key in this.cache) {
            let asset = this.cache[key];
            if (asset instanceof Audio) {
                asset.pause();
                //asset.currentTime = 0;
            }
        }
    };
    // unmute or unpause background music
    unPauseBackgroundMusic(){
        for (var key in this.cache) {
            let asset = this.cache[key];
            if (asset instanceof Audio && asset.paused) {
                asset.play();
            }
        }
    }
    // adjusts Sound volume 
    adjustSoundVolume(soundLevel) {
        // Convert the sound level value to a number
        const volume = parseFloat(soundLevel);  
    
        // Validate the volume value is a valid finite number and within the range [0, 1]
        if (isNaN(volume) || volume < 0 || volume > 1) {
            console.error("Invalid volume value:", soundLevel);
            return; 
        }
        console.log("I am adjusting volume now: ", volume);
        for (var key in this.cache) {
            let asset = this.cache[key];
            if (asset instanceof Audio) {
                console.log("Setting volume for asset", key, "to", volume); // Debugging log
                asset.volume = volume;  // Adjust the volume of each audio asset
            }
        }
    }
    
    autoRepeat(path) {
        var aud = this.cache[path];
        aud.addEventListener("ended", function () {
            aud.play();
        });
    };
};