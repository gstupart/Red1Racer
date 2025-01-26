class Animator{
    constructor(spritsheet, xStart, yStart, width, height, frameCount, frameDuration){
        //this.spritsheet = spritsheet; or 
        Object.assign(this, {spritsheet, xStart, yStart, width, height, frameCount, frameDuration});

        this.elapsedTime = 0;
        this.totalTime = frameCount * frameDuration;
    };
    // draw Frames
    drawFrame(tick, ctx, x, y){
        this.elapsedTime += tick;
        // check if the movement overlaps time we should get to the begining
        // if overlaped it minus the total of it is like mod operation
        if(this.elapsedTime > this.totalTime) this.elapsedTime -= this.totalTime;
        const frame = this.currentFrame();
        ctx.drawImage(this.spritsheet, 
            this.xStart + this.width * frame, this.yStart,
            this.width, this.height,
            x, y,
            this.width * 5, this.height * 5);
    };
    // current frame
    currentFrame(){
        return Math.floor(this.elapsedTime / this.frameDuration); 
    };
    // Done 
    isDone(){
        return (this.elapsedTime >= this.totalTime);
    };

}