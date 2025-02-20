const gameEngine = new GameEngine();
var ASSET_MANAGER = new AssetManager();

// Sprite sheets and map
ASSET_MANAGER.queueDownload("./sprites/tank-sprite.png");
ASSET_MANAGER.queueDownload("./sprites/missile.png");
ASSET_MANAGER.queueDownload("./sprites/mineSheet.png");
ASSET_MANAGER.queueDownload("./sprites/boon_spritesheet.png");
ASSET_MANAGER.queueDownload("./sprites/level2boon.png");
ASSET_MANAGER.queueDownload("./sprites/superEnergy.png");
ASSET_MANAGER.queueDownload("./sprites/explosion-sheet.png");
ASSET_MANAGER.queueDownload("./sprites/input-icon.png");
ASSET_MANAGER.queueDownload("./sprites/speedometer.png");
ASSET_MANAGER.queueDownload("./sprites/weapon-icon.png");
ASSET_MANAGER.queueDownload("./sprites/rockpack.png");
ASSET_MANAGER.queueDownload("./sprites/spike-trap.png");
ASSET_MANAGER.queueDownload("./sprites/suriken.png");
ASSET_MANAGER.queueDownload("./sprites/plus.png");
ASSET_MANAGER.queueDownload("./sprites/minus.png");
ASSET_MANAGER.queueDownload("./sprites/check.png");

// boss
ASSET_MANAGER.queueDownload("./sprites/boss-sheet.png");
ASSET_MANAGER.queueDownload("./sprites/phase-effects.png");

ASSET_MANAGER.queueDownload("./sprites/explosion-sheet1.png");
ASSET_MANAGER.queueDownload("./maps/general-background.png");
ASSET_MANAGER.queueDownload("./maps/level1.png");
ASSET_MANAGER.queueDownload("./maps/level2.png");

// Audios
ASSET_MANAGER.queueDownload("./audios/car-audio.wav");
ASSET_MANAGER.queueDownload("./audios/explosion.wav");
ASSET_MANAGER.queueDownload("./audios/menuSound.mp3");
//ASSET_MANAGER.queueDownload("./audio/phase_transition.wav");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;

	ASSET_MANAGER.autoRepeat("./audios/car-audio.wav");

	PARAMS.CANVAS_WIDTH = canvas.width;
	PARAMS.CANVAS_HEIGHT = canvas.height;

	// pauses background music
	document.getElementById("mute-btn").addEventListener("click", () =>{
		ASSET_MANAGER.pauseBackgroundMusic();
		setTimeout(() => canvas.focus(), 30);
	});
	// unpause the background music
	document.getElementById("unmute-btn").addEventListener("click", () =>{
		ASSET_MANAGER.unPauseBackgroundMusic();
		setTimeout(() => canvas.focus(), 30);
	});
	// Controling sound effects
	document.getElementById("volume-slider").addEventListener('input', (event) =>{
		const soundLevel = event.target.value;
		ASSET_MANAGER.adjustSoundVolume(soundLevel);
		setTimeout(() => canvas.focus(), 30);
	});

	gameEngine.init(ctx);
	new SceneManager(gameEngine);
	gameEngine.start();
});