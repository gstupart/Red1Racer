// TO BE CONTINUED

class Weapon {
    constructor(game, owner) {
        this.game = game;
        this.owner = owner; // The car that owns this weapon
        this.fireRate = 1; // Shots per second
        this.lastFireTime = 0;
        this.damage = 10;
        this.projectileSpeed = 7;
        this.isActive = false;
        this.currentFrame = 0;
        this.frameCount = 0;
        this.frameDuration = 0.1; // time between frames in seconds
        this.frameTimer = 0;
    }

    update() {
        // Update animation frame
        this.frameTimer += this.game.clockTick;
        if (this.frameTimer >= this.frameDuration) {
            this.frameTimer = 0;
            this.currentFrame = (this.currentFrame + 1) % this.frameCount;
        }
    }

    // Base draw method - override in specific weapon classes
    draw(ctx) {
        // Will be implemented by specific weapons
    }

    canFire() {
        return Date.now() - this.lastFireTime > (1000 / this.fireRate);
    }

    fire(srcX, srcY, targetX, targetY) {
        if (this.canFire()) {
            this.lastFireTime = Date.now();
            this.game.addEntity(this.createProjectile(srcX, srcY, targetX, targetY));
        }
    }

    createProjectile(targetX, targetY) {
        // Will be implemented by specific weapons
    }
}
