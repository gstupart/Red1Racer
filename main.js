const gameEngine = new GameEngine();
var ASSET_MANAGER = new AssetManager();

// spritesheets
ASSET_MANAGER.downloadAll(function () {
	var gameEngine = new GameEngine();
	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');

// Sprite sheets and map
ASSET_MANAGER.queueDownload("./sprites/tank-sprite.png");
ASSET_MANAGER.queueDownload("./sprites/missile.png");
ASSET_MANAGER.queueDownload("./maps/temp-map.jpg");

// Audios
ASSET_MANAGER.queueDownload("./audios/car-audio.wav");

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