class Boon {
    constructor(game, x, y){
        Object.assign(this, {game, x, y})
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/boon_spritesheet.png");
        // this.boneAnimation = new Animator(this.boneSpritesheet, 19, 9, 210, 175, 4, .1, 38, false, true);
        this.animation = new Animator(this.spritesheet, 10, 9, 600, 600, 4, 1, 30, false, true);
        // when eat boon health increases by 20
        this.health = 20;
        this.radius = 25;
        this.scale = this.radius * 1 / 208;
        this.BB = new CircularBB(x + this.radius, y + this.radius, this.radius);
    };
    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, 
            this.x - this.game.camera.x, this.y - this.game.camera.y, this.scale, 0);
    };
    update() {

    };
}