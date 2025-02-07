class Transition {
    constructor(game) {
        Object.assign(this, { game});
        this.elapsedTime = 0;
    }

    update() {
        this.elapsedTime += this.game.clockTick;
        if (this.elapsedTime > 2.5) this.game.camera.loadShop();
    }

    draw(ctx) {
        ctx.fillStyle = "White";
        ctx.font = '100px "Jersey 15"';
        ctx.fillText("LLEVEL", PARAMS.CANVAS_WIDTH / 2 - 125, PARAMS.CANVAS_HEIGHT / 2 - 110);
        if (this.elapsedTime > 1) 
            ctx.fillText("COMPLETED", PARAMS.CANVAS_WIDTH / 2 - 225, PARAMS.CANVAS_HEIGHT / 2 + 10);
    }

    drawDeath(ctx) {
        ctx.fillStyle = "White";
        ctx.font = '100px "Jersey 15"';
        ctx.fillText("YOU DIED", PARAMS.CANVAS_WIDTH / 2 - 125, PARAMS.CANVAS_HEIGHT / 2 - 110);
    }

    drawTitle(ctx) {
        ctx.fillStyle = "White";
        ctx.font = '100px "Jersey 15"';
        ctx.fillText("CLICK ON SCREEN", PARAMS.CANVAS_WIDTH / 2 - 300, PARAMS.CANVAS_HEIGHT / 2 - 80);
        ctx.fillText("TO START", PARAMS.CANVAS_WIDTH / 2 - 150, PARAMS.CANVAS_HEIGHT / 2 + 40);
        // control keys on screen
        ctx.fillStyle = "yellow";
        ctx.font = '50px "Jersey 15"';
        ctx.fillText("Control Keys", PARAMS.CANVAS_WIDTH / 2 - 500, PARAMS.CANVAS_HEIGHT / 2 + 120);
        ctx.font = '25px "Jersey 15"';
        ctx.fillText("Move              W", PARAMS.CANVAS_WIDTH / 2 - 450, PARAMS.CANVAS_HEIGHT / 2 + 160);
        ctx.fillText("Turn Right      D", PARAMS.CANVAS_WIDTH / 2 - 450, PARAMS.CANVAS_HEIGHT / 2 + 185);
        ctx.fillText("Turn Left       A", PARAMS.CANVAS_WIDTH / 2 - 450, PARAMS.CANVAS_HEIGHT / 2 + 210);
    }
}