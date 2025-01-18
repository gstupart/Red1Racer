
class MissileProjectile extends Projectile {
    constructor(game, x, y, angle, damage, missileType) {
        super(game, x, y, angle, damage);
        this.missileType = missileType;
        this.speed = missileType.speed;
        this.width = 12;  // Frame width from sprite
        this.height = 36; // Frame height from sprite
        this.spriteSheet = ASSET_MANAGER.getAsset("./sprites/missile.png");
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle + Math.PI / 2); // Rotates to point in direction of travel
        
        // Draw the missile sprite
        ctx.drawImage(
            this.spriteSheet,
            this.missileType.frameIndex * this.width, 0,
            this.width, this.height,
            -this.width / 2, -this.height / 2,
            this.width, this.height
        );

        // Draw missile trail
        ctx.beginPath();
        ctx.moveTo(0, this.height / 2);
        ctx.lineTo(0, this.height / 2 + 10);
        ctx.strokeStyle = "orange";
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.restore();
    }

    update() {
        super.update();
        // we can add any missile-specific behavior here
        // For example, homing behavior for certain missile types
        if (this.missileType === MissileType.SIDEWINDER) {
            // we can add homing logic here if desired
        }
    }
}









