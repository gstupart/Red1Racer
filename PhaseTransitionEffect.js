class PhaseTransitionEffect {
    constructor(game, x, y, phaseNumber) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.phaseNumber = phaseNumber;
        this.boundingBox = null; // to ensure it doesn't interfere with collision detection
        
        // Asset management
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/phase-effect1.png");
        if (!this.spritesheet) throw new Error("Missing phase effect spritesheet");
        
        // transition sound when effect starts
        ASSET_MANAGER.playAsset("./audios/phase_transition.wav");
        
        // Animation configuration
        this.animation = this.createAnimation();
        this.removeFromWorld = false;
    }

    createAnimation() {
        // Sprite sheet configuration
        const frameWidth = 1500 / 5; //1575 / 5; // 315px per frame (1575 total width / 5 frames)
        const frameHeight = 277; //312;
        const startX = 0; //76;
        const startY = 0; //290;

        return new Animator(
            this.spritesheet,
            startX, startY,
            frameWidth, frameHeight,
            5, //  frames
            0.2, // Frame duration
            0, // Padding
            true, // Reverse
            false // Loop (for continuous effect)
        );
    }

    update() {
        if (this.animation.isDone()) {
            this.removeFromWorld = true;
        }
    }

    draw(ctx) {
        //const drawX = this.x - (1575/5)/2 - this.game.camera.x;
        //const drawY = this.y - 312/2 - this.game.camera.y;
        const drawX = this.x - (1500/5)/2 - this.game.camera.x;
        const drawY = this.y - 277/2 - this.game.camera.y;
        
        ctx.imageSmoothingEnabled = false;
        this.animation.drawFrame(
            this.game.clockTick, ctx,
            drawX, drawY,
            1 // scales the size down 
        );
    }
}


