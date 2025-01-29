class SceneManager {
    constructor(game) {
        this.game = game;

        // Used for camera system
        this.game.camera = this;
        this.x = 0;
        this.y = 0;
        this.midpointX = PARAMS.CANVAS_WIDTH / 2 - PARAMS.PLAYER_SIZE / 2;
        this.midpointY = PARAMS.CANVAS_HEIGHT / 2 - PARAMS.PLAYER_SIZE / 2;

        // Indicate what type of scene is on canvas
        // 0=title, 1=racing, 2=shop, 3=game over, ...
        this.sceneType = 0;

        // Add entities and load scene
        this.currentMap = null;
        this.player = new Player(game, 0, 0);
        this.game.player = this.player;

        // TODO: Replace temporary scene with level one later
        this.loadScene(LEVEL_ONE);
    }

    loadScene(scene) {
        this.sceneType = scene.type;

        // Load map
        this.currentMap = new Map(this.game, scene.background.width, scene.background.height, scene.background.scale,
            ASSET_MANAGER.getAsset(scene.background.src));
        this.game.addEntity(this.currentMap);

        // Load finish line
        let scale = this.currentMap.scale;
        let l = scene.finishLine;
        this.game.addEntity(new FinishLine(this.game, l.x * scale, l.y * scale,
            (l.endX - l.x) * scale, (l.endY - l.y) * scale));

        // Load off road area
        if (scene.offRoad) {
            scene.offRoad.forEach(e => {
                this.game.addEntity(new OffRoad(this.game, e.x * scale, e.y * scale,
                    (e.endX - e.x) * scale, (e.endY - e.y) * scale));
            });
        }

        // Load player
        this.player.x = scene.player.x;
        this.player.y = scene.player.y;
        this.player.degree = scene.player.degree;
        this.player.running = true;
        ASSET_MANAGER.playAsset("./audios/car-audio.wav");
        this.game.addEntity(this.player);

        // Load player weapon
        if (scene.playerWeapon) {
            this.player.setPrimaryWeapon(new MissileWeapon(this.game, this.player, scene.playerWeapon.type));
            this.player.primaryWeapon.isActive = true;
        }
        this.game.addEntity(this.player.primaryWeapon);

        // TODO: Load AI racer
    }

    /**
     * Thing to update:
     * - "Position" of the camera
     */
    update() {
        // Move camera; the car is always in enter
        this.x = this.player.x - this.midpointX;
        this.y = this.player.y - this.midpointY;
    }

    draw(ctx) {
        // TODO: Replace with actual HUD
        ctx.font = "20px serif";
        switch(this.sceneType) {
            case 1:
                ctx.fillText("Health: " + this.player.health, 10, 30);
                ctx.fillText("Speed: " + this.player.power, 10, 50);
                break;
            case 2:
                ctx.fillText("Level completed, go to Shop", 10, 30);
                break;
            case 3:
                ctx.fillText("Game Over", 10, 30);
                break;
        }
    }
}