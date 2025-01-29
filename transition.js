class Transition {
    constructor(game) {
        Object.assign(this, { game});
        this.elapsedTime = 0;
    }

    update() {
        this.elapsedTime += this.game.clockTick;
        if (this.elapsedTime > 3) this.game.camera.loadShop();
    }

    draw(ctx) {
        ctx.fillStyle = "White";
        ctx.font = '100px "Jersey 15"';
        ctx.fillText("Level", PARAMS.CANVAS_WIDTH / 2 - 125, PARAMS.CANVAS_HEIGHT / 2 - 110);
        if (this.elapsedTime > 1.5) 
            ctx.fillText("Completed", PARAMS.CANVAS_WIDTH / 2 - 225, PARAMS.CANVAS_HEIGHT / 2 + 10);
    }
}