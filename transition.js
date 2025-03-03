class Transition {
    constructor(game) {
        Object.assign(this, { game });
        this.elapsedTime = 0;
        
        // Buttons
        let originalStyle = { font: '50px "Jersey 15"', fillStyle: "#212196" }
        let selectedStyle = { font: '50px "Jersey 15"', fillStyle: "#212196" }
        // Game over scene
        this.toTitleBtn = new Button(game, PARAMS.CANVAS_WIDTH / 2 - 200, PARAMS.CANVAS_HEIGHT / 2, 400, 80,
            originalStyle, selectedStyle, "Back to Title", "white", PARAMS.CANVAS_HEIGHT / 2 + 55);
        this.contBtn = new Button(game, PARAMS.CANVAS_WIDTH / 2 - 200, PARAMS.CANVAS_HEIGHT / 2 + 100, 400, 80,
            originalStyle, selectedStyle, `Continue (LV. ${this.game.camera.levelCount + 1})`, "white", 
            PARAMS.CANVAS_HEIGHT / 2 + 155);
        // Title scene
        this.newGameBtn = new Button(game, PARAMS.CANVAS_WIDTH / 2 - 200, PARAMS.CANVAS_HEIGHT / 2, 400, 80,
            originalStyle, selectedStyle, "New Game", "white", PARAMS.CANVAS_HEIGHT / 2 + 55);
        this.shopBtn = new Button(game, PARAMS.CANVAS_WIDTH / 2 - 200, PARAMS.CANVAS_HEIGHT / 2 + 200, 400, 80,
            originalStyle, selectedStyle, "Shop", "white", PARAMS.CANVAS_HEIGHT / 2 + 255);
    }

    update() {
        this.elapsedTime += this.game.clockTick;
        switch(this.game.camera.sceneType) {
            case 0:     // Title
                if (this.newGameBtn.isClicked() || this.contBtn.isClicked()) {  // Start game
                    this.elapsedTime = 0;
                    this.game.entities.forEach((entity) => {
                        entity.removeFromWorld = true;
                    });
                    if (this.newGameBtn.isClicked()) this.game.camera.newGame();    // New game
                    this.game.click = null;
                    this.game.camera.sceneType = 5;
                } else if (this.shopBtn.isClicked()) {  // To shop
                    this.elapsedTime = 0;
                    this.game.click = null;
                    this.game.camera.loadShop(false);
                }
                break;
            case 3:     // Game over scene
                if (this.toTitleBtn.isClicked() || this.contBtn.isClicked()) {
                    this.elapsedTime = 0;
                    this.game.entities.forEach((entity) => {
                        entity.removeFromWorld = true;
                    });
                    this.game.camera.sceneType = this.toTitleBtn.isClicked() ? 0 : 5;
                    this.game.click = null;
                }
                break;
            case 4:     // Transition between level and shop
                if (this.elapsedTime > 2.5) {
                    this.elapsedTime = 0;
                    this.game.camera.loadShop();
                }
                break;
            case 5:     // Transition to bidding
                if (this.elapsedTime > 4.5) {
                    this.elapsedTime = 0;
                    this.game.camera.loadBid();
                }
                break;
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
        this.toTitleBtn.draw(ctx);
        this.contBtn.draw(ctx);
    }

    drawTitle(ctx) {
        ctx.fillStyle = "White";
        ctx.font = '100px "Jersey 15"';
        let textWidth = ctx.measureText("RED ONE RACER").width;
        ctx.fillText("RED ONE RACER", PARAMS.CANVAS_WIDTH / 2 - textWidth / 2, PARAMS.CANVAS_HEIGHT / 2 - 80);
        this.newGameBtn.draw(ctx);
        this.contBtn.draw(ctx);
        this.shopBtn.draw(ctx);
    }

    drawBid(ctx) {
        ctx.fillStyle = "White";
        ctx.font = '100px "Jersey 15"';
        let textWidth = ctx.measureText("BID").width;
        ctx.fillText("BID", PARAMS.CANVAS_WIDTH / 2 - textWidth / 2, PARAMS.CANVAS_HEIGHT / 2 - 110);
        if (this.elapsedTime > 1.5) {
            textWidth = ctx.measureText("YOUR").width;
            ctx.fillText("YOUR", PARAMS.CANVAS_WIDTH / 2 - textWidth / 2, PARAMS.CANVAS_HEIGHT / 2 + 10);
        }
        if (this.elapsedTime > 3) {
            textWidth = ctx.measureText("TIME").width;
            ctx.fillText("TIME", PARAMS.CANVAS_WIDTH / 2 - textWidth / 2, PARAMS.CANVAS_HEIGHT / 2 + 110);
        }
    }
}