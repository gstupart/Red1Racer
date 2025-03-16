
class Bidding {
    constructor(game, x, y, player) {
        Object.assign(this, { game, x, y, player});
        this.isOpen = true;
        this.isDisplay = true; 
        this.plus = ASSET_MANAGER.getAsset("./sprites/plus.png");
        this.minus = ASSET_MANAGER.getAsset("./sprites/minus.png");
        this.check = ASSET_MANAGER.getAsset("./sprites/check.png");
        this.valueGrid = [0, 0, 0];  // Minutes, Filler, Seconds
        let originalStyle = { font: "20px Arial", fillStyle: "rgb(200, 200, 200)" }
        let selectedStyle = { font: "20px Arial", fillStyle: "white" }
        this.submitBtn = new Button(game, PARAMS.CANVAS_WIDTH / 2 - 40, PARAMS.CANVAS_HEIGHT / 2 - 80, 80, 30, originalStyle, selectedStyle, 
            "Submit", "black", PARAMS.CANVAS_HEIGHT / 2 + 32 - 90);
        originalStyle = { font: "20px Arial", fillStyle: "rgb(200, 200, 200)" };
        selectedStyle = { font: "20px Arial", fillStyle: "rgb(85, 81, 81)" };
        this.helpPage = new InfoPage(game, "How to Bid", BIDDING_HELP, BIDDING_HELP.length, 10, 100, 80, 30, originalStyle, selectedStyle, 124, "black");
    }

    draw(ctx) {
        if (this.isOpen && this.isDisplay) {
            // Draw bidder UI background
            ctx.fillStyle = "White";
            ctx.font = '100px "Jersey 15"';
            let singleWidth = ctx.measureText("1").width;
            let distanceScale = 100;

            let midNum = PARAMS.CANVAS_WIDTH / 2 - singleWidth / 2;
            let leftNum = midNum - distanceScale;
            let rightNum = midNum + distanceScale;
            let midPos = PARAMS.CANVAS_HEIGHT / 2 - 130;
            let upperPos = midPos - 100;
            let lowerPos = midPos + 10;

            // Page Title
            ctx.fillText("Up Next: ", (PARAMS.CANVAS_WIDTH - ctx.measureText("Up Next: ").width) / 2, 80);

            ctx.fillText(this.valueGrid[0], leftNum, midPos);
            
            ctx.fillText(this.valueGrid[2], rightNum, midPos);

            // Left number buttons
            ctx.drawImage(this.plus, leftNum, upperPos, singleWidth + 10, singleWidth + 10);
            ctx.drawImage(this.minus, leftNum, lowerPos, singleWidth + 10, singleWidth + 10);

            // Mid symbols
            ctx.fillText(":", midNum, midPos);
            // ctx.drawImage(this.check, midNum, lowerPos, singleWidth + 10, singleWidth + 10);

            // Right number buttons
            ctx.drawImage(this.plus, rightNum, upperPos, singleWidth + 10, singleWidth + 10);
            ctx.drawImage(this.minus, rightNum, lowerPos, singleWidth + 10, singleWidth + 10);

            // mouse listeners from gameengine
            const mouse = this.game.mouse;
            // Check Upper
            for (let i = 0; i < 3; i++) {
                if (i != 1) {
                    const hover =
                        mouse &&
                        mouse.x >= leftNum + i * distanceScale &&
                        mouse.x <= leftNum + i * distanceScale + singleWidth + 10 && 
                        mouse.y >= upperPos &&
                        mouse.y <= upperPos + singleWidth + 10;
                    if (hover && this.game.click) {
                        console.log("Upper: ", i);
                        this.game.click = false; // Reset click to prevent multiple triggers
                        if (i == 0) {
                            if (this.valueGrid[0] < 9) this.valueGrid[0]++;
                        } else {
                            if (this.valueGrid[2] < 59) this.valueGrid[2]++;
                        }
                        break;
                    }
                }
            }
            // Check Lower
            for (let i = 0; i < 3; i++) {
                if (i != 1) {
                    const hover =
                        mouse &&
                        mouse.x >= leftNum + i * distanceScale &&
                        mouse.x <= leftNum + i * distanceScale + singleWidth + 10 && 
                        mouse.y >= lowerPos &&
                        mouse.y <= lowerPos + singleWidth + 10;
                    if (hover && this.game.click) {
                        this.game.click = false; // Reset click to prevent multiple triggers
                        console.log("Lower: ", i);
                        if (this.valueGrid[i] > 0) this.valueGrid[i]--;
                        break;
                    }
                }
            }

            // Check Submit
            // const hover =
            //     mouse &&
            //     mouse.x >= midNum &&
            //     mouse.x <= midNum + singleWidth + 10 && 
            //     mouse.y >= lowerPos &&
            //     mouse.y <= lowerPos + singleWidth + 10;
            // if (hover && this.game.click) {
            //     this.game.click = false; // Reset click to prevent multiple triggers
            //     console.log("Submit");
            //     this.isOpen = false;
            // }
            this.submitBtn.draw(ctx);
            this.drawMap(ctx);
        }
        this.helpPage.draw(ctx);
    }
    
    update() {
        this.helpPage.update();
        if (this.submitBtn.isClicked()) {
            console.log("Submit");
            this.isOpen = false;
        }
        this.isDisplay = !this.helpPage.isOpen;
        return this.isOpen;
    }

    getBid() {
        return {minutes: this.valueGrid[0], seconds: this.valueGrid[2]};
    }

    drawMap(ctx) {
        ctx.drawImage(this.game.camera.currentMap.spritesheet, 100, PARAMS.CANVAS_HEIGHT / 2 - 30, 800, 400);
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;   
        ctx.strokeRect(100, PARAMS.CANVAS_HEIGHT / 2 - 30, 800, 400);
    }
}