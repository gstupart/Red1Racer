const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./sprites/missile.png");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	gameEngine.init(ctx);

    // for missile demo
    const missileDemo = new MissileDemo(gameEngine);
    gameEngine.addEntity(missileDemo);


	// Create player car at center of canvas


	// Initializing with all missile types
    /*    new MissileWeapon(gameEngine, playerCar, MissileType.MAVERICK),
        new MissileWeapon(gameEngine, playerCar, MissileType.SIDEWINDER),
        new MissileWeapon(gameEngine, playerCar, MissileType.STORM_SHADOW),
        new MissileWeapon(gameEngine, playerCar, MissileType.SPARROW),
        new MissileWeapon(gameEngine, playerCar, MissileType.TORPEDO),
        new MissileWeapon(gameEngine, playerCar, MissileType.ALAMO),
        new MissileWeapon(gameEngine, playerCar, MissileType.SMALL_ROCKET)
    ];*/


	// Add player car to game engine



	gameEngine.start();
});
