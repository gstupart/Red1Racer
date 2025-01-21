class SceneManager {
    constructor(game) {
        this.game = game;

        // Used for camera system
        this.game.camera = this;
        this.x = 0;
        this.y = 0;
        this.midpointX = PARAMS.CANVAS_WIDTH / 2 - PARAMS.PLAYER_SIZE / 2;
        this.midpointY = PARAMS.CANVAS_HEIGHT / 2 - PARAMS.PLAYER_SIZE / 2;

        // Add entities and load scene
        this.currentMap = new Map(this.game, 4000, 4000, ASSET_MANAGER.getAsset("./maps/temp-map.jpg"))
        this.player = new Player(game, 300, 500);
        this.loadTempScene();
    }

    // TODO: Replace temporary scene with level one later
    loadTempScene() {
        this.game.addEntity(this.currentMap);
        this.game.addEntity(this.player);
    }

    /**
     * Thing to update:
     * - "Position" of the camera
     */
    update() {

        // Move camera; the car is always in enter
        let mapX = this.currentMap.x - this.player.x + this.midpointX;  // Next x for the map
        let mapY = this.currentMap.y - this.player.y + this.midpointY;  // Next y for the map
        if (mapX <= 0 && mapX >= -this.currentMap.width + this.player.x + this.midpointX) 
            this.x = this.player.x - this.midpointX;
        if (mapY <= 0 && mapY >= -this.currentMap.height + this.player.y + this.midpointY) 
            this.y = this.player.y - this.midpointY;
        
    }

    draw(ctx) {
        
    }
}