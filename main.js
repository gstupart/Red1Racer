const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./sprites/tank-sprite.png");
ASSET_MANAGER.queueDownload("./sprites/missile.png");
//ASSET_MANAGER.queueDownload("./maps/temp-map.jpg");
ASSET_MANAGER.queueDownload("./maps/level1.png");

ASSET_MANAGER.queueDownload("./audios/car-audio.wav");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;

    // for missile demo
    //const missileDemo = new MissileDemo(gameEngine);
    //gameEngine.addEntity(missileDemo);

	ASSET_MANAGER.autoRepeat("./audios/car-audio.wav");

	PARAMS.CANVAS_WIDTH = canvas.width;
	PARAMS.CANVAS_HEIGHT = canvas.height;

	gameEngine.init(ctx);

	new SceneManager(gameEngine);

	gameEngine.start();
});