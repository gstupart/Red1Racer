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

class Level2Boon {
    constructor(game, x, y){
        Object.assign(this, {game, x, y})
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/level2boon.png");
        if(!this.spritesheet){
            console.error("Spritesheet not loaded:", "./sprites/Level_two_boon.png");
        }
        // this.boneAnimation = new Animator(this.boneSpritesheet, 19, 9, 210, 175, 4, .1, 38, false, true);
        this.animation = new Animator(this.spritesheet, 12, 12, 1000, 1000, 1, 3, 0, false, true);
        // when eat boon health increases by 20
        this.health = 25;
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
class SuperEnergy {
    constructor(game, x, y){
        Object.assign(this, {game, x, y})
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/superEnergy.png");
        // this.boneAnimation = new Animator(this.boneSpritesheet, 19, 9, 210, 175, 4, .1, 38, false, true);
        this.animation = new Animator(this.spritesheet, 0, 0, 1600, 1500, 1, 3, 0, false, true);
        // when eat boon health increases by 20
        this.health = 35;
        this.radius = 20;
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

