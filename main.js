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
ASSET_MANAGER.queueDownload("./sprites/phase-effect1.png");

ASSET_MANAGER.queueDownload("./sprites/explosion-sheet1.png");
ASSET_MANAGER.queueDownload("./maps/general-background.png");
ASSET_MANAGER.queueDownload("./maps/level1.png");
ASSET_MANAGER.queueDownload("./maps/level2.png");
ASSET_MANAGER.queueDownload("./maps/level3.png");
ASSET_MANAGER.queueDownload("./maps/level4.png");

// Background music tracks
ASSET_MANAGER.queueDownload("./audios/MainRacingTheme.wav");
ASSET_MANAGER.queueDownload("./audios/SecondRacingTheme.wav");
ASSET_MANAGER.queueDownload("./audios/background2.mp3");
ASSET_MANAGER.queueDownload("./audios/background3.mp3");
ASSET_MANAGER.queueDownload("./audios/background4.mp3");
ASSET_MANAGER.queueDownload("./audios/SecondRacingTheme.wav");

// Audios
ASSET_MANAGER.queueDownload("./audios/car-audio.wav");
ASSET_MANAGER.queueDownload("./audios/explosion.wav");
ASSET_MANAGER.queueDownload("./audios/menuSound.mp3");
ASSET_MANAGER.queueDownload("./audios/phase_transition.wav");
ASSET_MANAGER.queueDownload("./audios/player-dead.wav");
ASSET_MANAGER.queueDownload("./audios/VictoryTheme.wav");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;

	ASSET_MANAGER.autoRepeat("./audios/car-audio.wav");

	PARAMS.CANVAS_WIDTH = canvas.width;
	PARAMS.CANVAS_HEIGHT = canvas.height;

	gameEngine.init(ctx);
	new SceneManager(gameEngine);

	// this create the audio controller and store it globally.
	window.audioController = new AudioController(ASSET_MANAGER);
	// this starts playing the first level’s music immediately.
	window.audioController.playBackgroundMusic('./audios/MainRacingTheme.wav');

	gameEngine.start();
});