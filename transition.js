class Transition {
    constructor(game) {
        Object.assign(this, { game});
        this.elapsedTime = 0;
    }

    update() {
        this.elapsedTime += this.game.clockTick;
        if (this.elapsedTime > 2.5) {
            this.elapsedTime = 0;
            this.game.camera.loadShop();
        }
    }

    draw(ctx) {
        ctx.fillStyle = "White";
        ctx.font = '100px "Jersey 15"';
        let textWidth = ctx.measureText("LEVEL").width;
        ctx.fillText("LEVEL", PARAMS.CANVAS_WIDTH / 2 - textWidth / 2, PARAMS.CANVAS_HEIGHT / 2 - 110);
        if (this.elapsedTime > 1) {
            textWidth = ctx.measureText("COMPLETED").width;
            ctx.fillText("COMPLETED", PARAMS.CANVAS_WIDTH / 2 - textWidth / 2, PARAMS.CANVAS_HEIGHT / 2 + 10);
        }
    }

    drawDeath(ctx) {
        ctx.fillStyle = "White";
        ctx.font = '100px "Jersey 15"';
        let textWidth = ctx.measureText("YOU DIED").width;
        ctx.fillText("YOU DIED", PARAMS.CANVAS_WIDTH / 2 - textWidth / 2, PARAMS.CANVAS_HEIGHT / 2 - 110);
    }

    drawTitle(ctx) {
        ctx.fillStyle = "White";
        ctx.font = '100px "Jersey 15"';
        let textWidth = ctx.measureText("CLICK ON SCREEN").width;
        ctx.fillText("CLICK ON SCREEN", PARAMS.CANVAS_WIDTH / 2 - textWidth / 2, PARAMS.CANVAS_HEIGHT / 2 - 80);
        textWidth = ctx.measureText("TO START").width;
        ctx.fillText("TO START", PARAMS.CANVAS_WIDTH / 2 - textWidth / 2, PARAMS.CANVAS_HEIGHT / 2 + 40);
    }
}