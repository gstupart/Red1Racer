
// TO BE CONTINUED

class LaserWeapon extends Weapon {
    constructor(game, owner) {
        super(game, owner);
        this.fireRate = 2;
        this.damage = 15;
        this.projectileSpeed = 10;
        this.frameCount = 4; // Number of frames in laser animation
        
        // Load laser sprite sheet
        this.spriteSheet = ASSET_MANAGER.getAsset("./sprites/laser.png");
    }

    draw(ctx) {
        if (this.isActive) {
            // Example drawing from a sprite sheet
            // Assuming each frame is 32x32 pixels
            ctx.drawImage(this.spriteSheet, 
                this.currentFrame * 32, 0, // Source x, y
                32, 32, // Source width, height
                this.owner.x - 16, this.owner.y - 16, // Destination x, y
                32, 32); // Destination width, height
        }
    }

    createProjectile(targetX, targetY) {
        const angle = Math.atan2(targetY - this.owner.y, targetX - this.owner.x);
        return new LaserProjectile(this.game, this.owner.x, this.owner.y, angle, this.damage);
    }
}





