
// I put random numbers for the sprite. Need to be changed.

class PhaseTransitionEffect {
    constructor(game, x, y, phaseNumber) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.phaseNumber = phaseNumber;
        
        // Asset management
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/phase-effects.png");
        if (!this.spritesheet) throw new Error("Missing phase effect spritesheet");
        
        // transition sound when effect starts
        //ASSET_MANAGER.playAsset("./audio/phase_transition.wav");
        
        // Animation configuration
        this.animation = this.createAnimation();
        this.removeFromWorld = false;
    }

    createAnimation() {
        const phaseConfig = {
            1: { yOffset: 0, frameCount: 8, duration: 0.1 },
            2: { yOffset: 64, frameCount: 10, duration: 0.08 },
            3: { yOffset: 128, frameCount: 12, duration: 0.07 }
        };
        
        const config = phaseConfig[this.phaseNumber] || phaseConfig[1];
        
        return new Animator(
            this.spritesheet,
            0, config.yOffset,
            64, 64,
            config.frameCount,
            config.duration,
            0, false, true
        );
    }

    update() {
        if (this.animation.isDone()) {
            this.removeFromWorld = true;
        }
    }

    draw(ctx) {
        const drawX = this.x - 32 - this.game.camera.x;
        const drawY = this.y - 32 - this.game.camera.y;
        
        this.animation.drawFrame(
            this.game.clockTick, ctx,
            drawX, drawY,
            2.0
        );
    }
}










