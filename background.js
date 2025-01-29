class Map {
    constructor(game, width, height, scale, spritesheet) {
        Object.assign(this, {game, width, height, scale, spritesheet});
        this.x = 0;
        this.y = 0;
    }

    update() {

    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x, this.y, this.width, this.height, 
            this.x - this.game.camera.x, this.y - this.game.camera.y, 
            this.width * this.scale, this.height * this.scale);
    }
}

/**
 * Invisible offroad area.
 */
class OffRoad {
    constructor(game, x, y, w, h) {
        Object.assign(this, { game, x, y, w, h });
        this.BB = new RectangularBB(this.x, this.y, this.w, this.h);
    }

    update() {

    }

    draw(ctx) {

    }
}

/**
 * Invisible finish line area
 */
class FinishLine {
    constructor(game, x, y, w, h) {
        Object.assign(this, { game, x, y, w, h });
        this.BB = new RectangularBB(this.x, this.y, this.w, this.h);
    }

    update() {

    }

    draw(ctx) {

    }
}