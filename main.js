
var ASSET_MANAGER = new AssetManager();

// spritesheets
ASSET_MANAGER.queueDownload("./weaponShop.png");
ASSET_MANAGER.downloadAll(function () {
	var gameEngine = new GameEngine();
	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');

	gameEngine.init(ctx);
		
	new SceneManager(gameEngine);

	gameEngine.start();
});