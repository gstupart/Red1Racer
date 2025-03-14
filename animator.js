class Animator {
    constructor(spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePadding, reverse, loop) {
        Object.assign(this, { spritesheet, xStart, yStart, height, width, frameCount, frameDuration, framePadding, reverse, loop });

        this.elapsedTime = 0;
        this.totalTime = this.frameCount * this.frameDuration;

    };

    /**
     * Draw current frame.
     * 
     * @param {number} tick The clock tick.
     * @param {*} ctx The canvas render context.
     * @param {number} x The The x-coordinate of the upper-left corner of the frame.
     * @param {number} y The The y-coordinate of the upper-left corner of the frame.
     * @param {number} scale The scale of the frame compare to its original size on sprite sheet.
     * @param {number} rotate The degree of rotation (in Radians) of the frame.
     * @param {string} label The label for the image.
     * @returns 
     */
    drawFrame(tick, ctx, x, y, scale, rotate, label) {
        this.elapsedTime += tick;

        if (this.isDone()) {
            if (this.loop) {
                this.elapsedTime -= this.totalTime;
            } else {
                return;
            }
        }

        let frame = this.currentFrame();
        if (this.reverse) frame = this.frameCount - frame - 1;

        // Do rotation
        let scaledH = this.height * scale;
        let scaledW = this.width * scale;
        // let canvasSize = Math.max(this.width, this.height) * scale;
        let canvasSize = Math.ceil(Math.sqrt(scaledH * scaledH + scaledW * scaledW));

        if (rotate != 0) {  // Rotate image
            let rotateCanvas = document.createElement("canvas");
            rotateCanvas.width = canvasSize;
            rotateCanvas.height = canvasSize;
            let rotateCtx = rotateCanvas.getContext("2d");
            rotateCtx.imageSmoothingEnabled = true;
            rotateCtx.save();
            rotateCtx.translate(rotateCanvas.width / 2, rotateCanvas.height / 2);
            rotateCtx.rotate(rotate);
            rotateCtx.translate(-rotateCanvas.width / 2, -rotateCanvas.height / 2);
            rotateCtx.drawImage(this.spritesheet,
                this.xStart + frame * (this.width + this.framePadding), this.yStart, 
                this.width, this.height,
                canvasSize / 2 - scaledW / 2, canvasSize / 2 - scaledH / 2, 
                scaledW, scaledH);

            // Draw label is specified
            if (label) {
                rotateCtx.font = '25px "Jersey 15"';
                rotateCtx.fillStyle = "white";
                let w = rotateCtx.measureText(label).width;
                rotateCtx.fillText(label, canvasSize / 2 - w / 2, canvasSize / 2 + scaledH / 2);
            }

            rotateCtx.restore();
            ctx.drawImage(rotateCanvas, x - (canvasSize - scaledW) / 2, y - (canvasSize - scaledH) / 2, 
                canvasSize, canvasSize);
        } else { 
            ctx.drawImage(this.spritesheet,
                this.xStart + frame * (this.width + this.framePadding), this.yStart, this.width, this.height,
                x, y, scaledW, scaledH);
            if (label) {
                ctx.font = '25px "Jersey 15"';
                ctx.fillStyle = "white";
                let w = ctx.measureText(label).width;
                ctx.fillText(label, x + this.width * scale / 2 - w / 2, y + scaledH);
            }
        }
    };

    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration);
    };

    isDone() {
        return (this.elapsedTime >= this.totalTime);
    };
};
