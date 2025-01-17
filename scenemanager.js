class SceneManager {
    constructor(game) {
        this.game = game;
        this.player = new Player(game, 600, 200);
        this.loadTempScene();
    }

    loadTempScene() {
        this.game.addEntity(this.player);
    }

    update() {
        
    }

    draw(ctx) {
        
    }
}