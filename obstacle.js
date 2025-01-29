class Mine {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y })
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/mineSheet.png");
        this.animation = new Animator(this.spritesheet, 19, 9, 207, 175, 4, .1, 38, false, true);
        this.damage = 20;
        this.radius = 25;
        this.scale = this.radius * 2 / 208;
        this.BB = new CircularBB(x + this.radius, y + this.radius, this.radius);
    };

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, 
            this.x - this.game.camera.x, this.y - this.game.camera.y, this.scale, 0);
    };

    update() {

    };
}