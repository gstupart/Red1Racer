class SceneManager {
    constructor(game) {
        this.game = game;

        // Used for camera system
        this.game.camera = this;
        this.x = 0;
        this.y = 0;
        this.midpointX = PARAMS.CANVAS_WIDTH / 2 - PARAMS.PLAYER_SIZE / 2;
        this.midpointY = PARAMS.CANVAS_HEIGHT / 2 - PARAMS.PLAYER_SIZE / 2;

        this.title = true;

        // Add entities and load scene
        this.currentMap = null;
        this.player = new Player(game, 0, 0);
        this.game.player = this.player;

        // TODO: Replace temporary scene with level one later
        this.loadScene(LEVEL_ONE);
    }

    loadScene(level) {
        this.title = false;

        // Load default weapon on level 1
        if (level.label == "level 1") {
            this.player.setPrimaryWeapon(new MissileWeapon(this.game, this.player));
            this.player.primaryWeapon.isActive = true;
        }

        this.currentMap = new Map(this.game, level.background.width, level.background.height, level.background.scale,
            ASSET_MANAGER.getAsset(level.background.src));
        this.player.x = level.player.x;
        this.player.y = level.player.y;
        this.player.degree = level.player.degree;

        this.game.addEntity(this.currentMap);
        this.game.addEntity(this.player);
        this.game.addEntity(this.player.primaryWeapon);
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
        // Draw HUD here
    }
}