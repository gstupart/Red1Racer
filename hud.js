class HUD {
    constructor(game, player) {
        Object.assign(this, { game, player });

        this.weaponSprite = ASSET_MANAGER.getAsset("./sprites/weapon-icon.png");
        this.weaponSize = 70;

        this.speedSprite = ASSET_MANAGER.getAsset("./sprites/speedometer.png");
        this.speedSize = 150;

        this.leftMouseSprite = ASSET_MANAGER.getAsset("./sprites/leftmouse.png");
        this.rightMouseSprite = ASSET_MANAGER.getAsset("./sprites/rightmouse.png");
        this.mouseSize = 30;

        this.startTime = 0;
        this.time = 0;
    }

    update() {
        this.time = (Date.now() - this.startTime) / 1000;
    }

    draw(ctx) {
        // Draw background
        ctx.fillStyle = "rgba(256, 256, 256, 0.8)";
        ctx.fillRect(0, PARAMS.CANVAS_HEIGHT - 105, PARAMS.CANVAS_WIDTH, 5);

        let grad = ctx.createLinearGradient(150, 0, PARAMS.CANVAS_WIDTH, 0);
        grad.addColorStop(0, "rgba(0, 0, 0, 0.8)");
        grad.addColorStop(0.2, "rgba(14, 134, 212, 0.8)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, PARAMS.CANVAS_HEIGHT - 100, PARAMS.CANVAS_WIDTH, 100);


        // Draw speedometer
        ctx.drawImage(this.speedSprite, 0, 0, 428, 428, 20, PARAMS.CANVAS_HEIGHT - this.speedSize - 10, 
            this.speedSize, this.speedSize);

        let rotateCanvas = document.createElement("canvas");
        rotateCanvas.width = 428;
        rotateCanvas.height = 428;
        let rotateCtx = rotateCanvas.getContext("2d");
        rotateCtx.imageSmoothingEnabled = true;
        rotateCtx.save();
        rotateCtx.translate(rotateCanvas.width / 2, rotateCanvas.height / 2);
        rotateCtx.rotate(Math.PI * 4 / 3 * this.player.power / this.player.maxPower);
        rotateCtx.translate(-rotateCanvas.width / 2, -rotateCanvas.height / 2);
        rotateCtx.drawImage(this.speedSprite, 449, 64, 50, 218, 189, 189, 50, 218);
        rotateCtx.restore();
        ctx.drawImage(rotateCanvas, 20, PARAMS.CANVAS_HEIGHT - this.speedSize - 10, this.speedSize, this.speedSize);

        
        // Draw information including level, time, player health, and player attack
        ctx.fillStyle = "white";

        // Labels
        ctx.font = '30px "Jersey 15"';
        // Level
        let w = ctx.measureText("LEVEL: ").width;
        ctx.fillText("LEVEL: ", 270 - w, PARAMS.CANVAS_HEIGHT - 60);
        // Time
        w = ctx.measureText("TIME: ").width;
        ctx.fillText("TIME: ", 430 - w, PARAMS.CANVAS_HEIGHT - 20);
        // Health
        w = ctx.measureText("HP: ").width;
        ctx.fillText("HP: ", 430 - w, PARAMS.CANVAS_HEIGHT - 60);
        // Attack
        w = ctx.measureText("ATK: ").width;
        ctx.fillText("ATK: ", 270 - w, PARAMS.CANVAS_HEIGHT - 20);

        // Values
        ctx.font = '27px "Jersey 15"';
        // Level
        ctx.fillText(`${this.game.camera.level} / 2`, 270, PARAMS.CANVAS_HEIGHT - 60);
        // Time
        let minute = Math.floor(this.time / 60) % 60;
        let second = Math.floor(this.time % 60);
        let ms = Math.round((this.time - Math.floor(this.time)) * 100);
        ctx.fillText(`${String(minute).padStart(2, 0)}:${String(second).padStart(2, 0)}.${ms}`, 430, PARAMS.CANVAS_HEIGHT - 20);
        // Health
        ctx.lineWidth = 2;
        ctx.strokeStyle = "white";
        ctx.strokeRect(430, PARAMS.CANVAS_HEIGHT - 80, 150, 25);
        ctx.fillRect(433, PARAMS.CANVAS_HEIGHT - 77, 144 * (this.player.health / this.player.maxHealth), 19);
        // Attack
        ctx.fillText(this.player.attack, 270, PARAMS.CANVAS_HEIGHT - 20);


        // Draw weapon icons

        // Primary weapon
        if (this.player.primaryWeapon) {    // Primary weapon equipped
            ctx.drawImage(this.weaponSprite, 301, 215, 85, 85, 700, PARAMS.CANVAS_HEIGHT - 85, 
                this.weaponSize, this.weaponSize);
            let waitTime = this.player.primaryWeapon.fireCountDown();
            if (waitTime.wait > 0) {    // If can't fire, show count down time
                let cx = 700 + this.weaponSize / 2;
                let cy = PARAMS.CANVAS_HEIGHT - 85 + this.weaponSize / 2;

                ctx.save();
                ctx.beginPath();
                ctx.fillStyle = "rgba(100, 100, 100, 0.7)";
                ctx.moveTo(cx, cy);
                ctx.arc(cx, cy, this.weaponSize / 2, 0, Math.PI * 2 * waitTime.wait / waitTime.total);
                ctx.fill();
                ctx.restore();

                ctx.strokeStyle = "white";
                ctx.font = '40px "Jersey 15"';
                let s = String(Math.round(waitTime.wait / 1000));
                ctx.fillText(s, cx - ctx.measureText(s).width / 2, cy + 10);
            }
        } else {    // No primary weapon
            ctx.drawImage(this.weaponSprite, 399, 314, 85, 85, 700, PARAMS.CANVAS_HEIGHT - 85, 
                this.weaponSize, this.weaponSize);
        }
        ctx.drawImage(this.leftMouseSprite, 0, 0, 16, 16, 690, PARAMS.CANVAS_HEIGHT - 85, 
            this.mouseSize, this.mouseSize);

        // Secondary weapon
        if (this.player.secondaryWeapon) {      // Secondary weapon equipped
            ctx.drawImage(this.weaponSprite, 399, 215, 85, 85, 800, PARAMS.CANVAS_HEIGHT - 85, 
                this.weaponSize, this.weaponSize);
            let waitTime = this.player.secondaryWeapon.fireCountDown();
            if (waitTime.wait > 0) {    // If can't fire, show count down time
                let cx = 800 + this.weaponSize / 2;
                let cy = PARAMS.CANVAS_HEIGHT - 85 + this.weaponSize / 2;

                ctx.save();
                ctx.beginPath();
                ctx.fillStyle = "rgba(100, 100, 100, 0.7)";
                ctx.moveTo(cx, cy);
                ctx.arc(cx, cy, this.weaponSize / 2, 0, Math.PI * 2 * waitTime.wait / waitTime.total);
                ctx.fill();
                ctx.restore();

                ctx.strokeStyle = "white";
                ctx.font = '40px "Jersey 15"';
                let s = String(Math.round(waitTime.wait / 1000));
                ctx.fillText(s, cx - ctx.measureText(s).width / 2, cy + 10);
            }
        } else {    // No secondary weapon
            ctx.drawImage(this.weaponSprite, 399, 314, 85, 85, 800, PARAMS.CANVAS_HEIGHT - 85, 
                this.weaponSize, this.weaponSize);
        }
        ctx.drawImage(this.rightMouseSprite, 0, 0, 16, 16, 790, PARAMS.CANVAS_HEIGHT - 85, 
            this.mouseSize, this.mouseSize);
    }
}