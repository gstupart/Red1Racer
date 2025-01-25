
class MissileProjectile extends Projectile {
    constructor(game, x, y, angle, damage, owner, missileType) {
        super(game, x, y, angle, damage, owner);
        this.missileType = missileType;
        this.speed = missileType.speed;
        this.width = 12;  // Frame width from sprite
        this.height = 36; // Frame height from sprite
        this.spriteSheet = ASSET_MANAGER.getAsset("./sprites/missile.png");
        this.animation = new Animator(this.spriteSheet, 
            this.missileType.frameIndex * this.width, 0,
            this.width, this.height,
            1, 10, 0, false, true);
        this.updateBB();
    }

    updateBB() {
        this.BB = new RectangularBB(this.x, this.y, this.width, this.height);
    }

    draw(ctx) {
        // Draw the missile sprite
        ctx.drawImage(
            this.spriteSheet,
            this.missileType.frameIndex * this.width, 0,
            this.width, this.height,
            -this.width / 2, -this.height / 2,
            this.width, this.height
        );

        this.animation.drawFrame(this.game.clockTick, ctx, 
            this.x - this.game.camera.x, this.y - this.game.camera.y, 
            1, this.angle + Math.PI / 2);

        // Draw missile trail
        ctx.beginPath();
        ctx.moveTo(this.originalX, this.originalY);
        ctx.lineTo(this.x, this.y);
        ctx.strokeStyle = "orange";
        ctx.lineWidth = 2;
        ctx.stroke();
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