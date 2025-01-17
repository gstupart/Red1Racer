const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./sprites/tank-sprite.png");

ASSET_MANAGER.queueDownload("./audios/car-audio.wav");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;

	ASSET_MANAGER.autoRepeat("./audios/car-audio.wav");

	gameEngine.init(ctx);

	gameEngine.addEntity(new SceneManager(gameEngine));

	gameEngine.start();
});
