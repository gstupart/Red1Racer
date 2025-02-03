const gameEngine = new GameEngine();
var ASSET_MANAGER = new AssetManager();

// Sprite sheets and map
ASSET_MANAGER.queueDownload("./sprites/tank-sprite.png");
ASSET_MANAGER.queueDownload("./sprites/missile.png");
ASSET_MANAGER.queueDownload("./sprites/mineSheet.png");
ASSET_MANAGER.queueDownload("./sprites/spikeFin.png");
ASSET_MANAGER.queueDownload("./sprites/explosion-sheet1.png");
ASSET_MANAGER.queueDownload("./maps/general-background.png");
ASSET_MANAGER.queueDownload("./maps/level1.png");

// Audios
ASSET_MANAGER.queueDownload("./audios/car-audio.wav");
ASSET_MANAGER.queueDownload("./audios/explosion.wav");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;

	ASSET_MANAGER.autoRepeat("./audios/car-audio.wav");

	PARAMS.CANVAS_WIDTH = canvas.width;
	PARAMS.CANVAS_HEIGHT = canvas.height;

	gameEngine.init(ctx);
	new SceneManager(gameEngine);
	gameEngine.start();
});