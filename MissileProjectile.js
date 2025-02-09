
class MissileProjectile extends Projectile {
    constructor(game, x, y, angle, damage, owner, missileType) {
        super(game, x, y, angle, damage, owner);
        this.missileType = missileType;
        this.speed = missileType.speed * 1.5; // increased speed by 50% based on type

        // to ensure missile is faster than player's max speed
        // if (this.speed < this.game.player.maxSpeed * 1.2) {
        //     this.speed = this.game.player.maxSpeed * 1.2; // always 20% faster than player
        // }

        this.width = 14;  // Frame width from sprite
        this.height = 34; // Frame height from sprite
        this.spriteSheet = ASSET_MANAGER.getAsset("./sprites/missile.png");
        this.animation = new Animator(this.spriteSheet, 
            this.missileType.frameIndex * this.width + 2, 2,
            this.width - 4, this.height,
            1, 10, 0, false, true);
        this.updateBB();
    }

    updateBB() {
        this.BB = new RectangularBB(this.x, this.y + (this.height / 2 - this.width / 2), this.width, this.width);
    }

    draw(ctx) {
        // Draw the missile sprite
        this.animation.drawFrame(this.game.clockTick, ctx, 
            this.x - this.game.camera.x, this.y - this.game.camera.y, 
            1, this.angle + Math.PI / 2);

        // Draw missile trail
        // ctx.beginPath();
        // ctx.moveTo(this.originalX, this.originalY);
        // ctx.lineTo(this.x, this.y);
        // ctx.strokeStyle = "orange";
        // ctx.lineWidth = 2;
        // ctx.stroke();
    }

    update() {
        super.update();
        // we can add any missile-specific behavior here
        // For example, homing behavior for certain missile types
        if (this.missileType === MissileType.SIDEWINDER) {
            // we can add homing logic here if desired
        }
        this.updateBB();
    }
}
