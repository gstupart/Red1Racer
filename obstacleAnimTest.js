class ObstacleAnimTest {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y })
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/mineSheet.png");
        console.log("Successfully Loaded Asset");
        this.testAnim = new Animator(this.spritesheet, 0, 0, 245, 196, 3, .1, 0, false, true);
    };

    draw(ctx) {
        // console.log(this.game.clockTick);
        this.testAnim.drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
    };

    update() {
        // Placeholder; change to condition that means to start the game
    };
}