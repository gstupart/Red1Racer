class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.shop = new Shop(game, 0, 0, 9000);

    };
    clearEntities() {
        this.game.entities.forEach(function (entity) {
            entity.removeFromWorld = true;
        });
    };
    update() {
        this.shop.update();
    };
    draw(ctx) {
        this.shop.draw(ctx);
    };
};

