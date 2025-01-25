
// TO BE CONTINUED

class MissileWeapon extends Weapon {
    constructor(game, owner, missileType = MissileType.MAVERICK) {
        super(game, owner);
        this.setMissileType(missileType);
        
        // Sprite sheet configuration
        this.frameWidth = 12;    // Width of each frame
        this.frameHeight = 36;   // Height of each frame
        this.frameCount = 7;     // Total number of frames
        this.spriteSheet = ASSET_MANAGER.getAsset("./sprites/missile.png");
        this.animation = new Animator(this.spriteSheet, 
            this.missileType.frameIndex * this.frameWidth, 0,
            this.frameWidth, this.frameHeight,
            1, 10, 0, false, true);
    }

    setMissileType(missileType) {
        this.missileType = missileType;
        this.fireRate = missileType.fireRate;
        this.damage = missileType.damage;
        this.projectileSpeed = missileType.speed;
    }
    
    createProjectile(targetX, targetY) {
        // Calculate angle from player to target
        const angle = Math.atan2(targetY - this.owner.y, targetX - this.owner.x);
        // Create projectile at player's position
        return new MissileProjectile(
            this.game,
            this.owner.x + this.owner.width / 2 - this.frameWidth / 2,
            this.owner.y + this.owner.height / 2 - this.frameHeight / 2,
            angle,
            this.damage,
            this.missileType
        );
    }

    draw(ctx) {
        if (this.isActive) {
            // Draw the specific missile type based on its frame index
            this.animation.drawFrame(this.game.clockTick, ctx,
                this.owner.x + this.owner.width / 2 - this.frameWidth / 2 - this.game.camera.x,
                this.owner.y + this.owner.height / 2 - this.frameHeight / 2 - this.game.camera.y,
                1, this.owner.degree);

            /*
            ctx.save();
            ctx.translate(this.owner.x, this.owner.y);
            ctx.rotate(this.owner.rotation); // Align with car's rotation
            
            ctx.drawImage(
                this.spriteSheet,
                this.missileType.frameIndex * this.frameWidth, 0,  // Source x, y
                this.frameWidth, this.frameHeight,                 // Source width, height
                -this.frameWidth / 2, -this.frameHeight / 2,      // Destination x, y
                this.frameWidth, this.frameHeight                  // Destination width, height
            );
            
            ctx.restore();
            */
        }
    }

}





