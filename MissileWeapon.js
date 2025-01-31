class MissileWeapon extends Weapon {
    constructor(game, owner, missileType = MissileType.MAVERICK) {
        super(game, owner);
        this.setMissileType(missileType);
        
        // Sprite sheet configuration
        this.frameWidth = 14;    // Width of each frame
        this.frameHeight = 34;   // Height of each frame
        this.frameCount = 7;     // Total number of frames
        this.spriteSheet = ASSET_MANAGER.getAsset("./sprites/missile.png");
        this.animation = new Animator(this.spriteSheet, 
            this.missileType.frameIndex * this.frameWidth + 2, 2,
            this.frameWidth - 4, this.frameHeight,
            1, 10, 0, false, true);
    }

    setMissileType(missileType) {
        this.missileType = missileType;
        this.fireRate = missileType.fireRate;
        this.damage = missileType.damage;
        this.projectileSpeed = missileType.speed;
    }
    
    createProjectile(srcX, srcY, targetX, targetY) {
        // Calculate angle from player to target
        const angle = Math.atan2(targetX - srcX, -(targetY - srcY)) - Math.PI / 2 + this.owner.degree;
        // Create projectile at player's position
        return new MissileProjectile(
            this.game,
            srcX - this.frameWidth / 2,
            srcY- this.frameHeight / 2,
            angle,
            this.damage,
            this.owner,
            this.missileType
        );
    }

    draw(ctx) {
        if (this.isActive) {
            // Draw the specific missile type based on its frame index
            this.animation.drawFrame(this.game.clockTick, ctx,
                this.owner.x + this.owner.width / 2 - this.frameWidth / 2 - this.game.camera.x,
                this.owner.y + this.owner.height / 2 - this.frameHeight / 2 - this.game.camera.y,
                1, Math.atan2(this.owner.targetX - this.owner.centerX, 
                    -(this.owner.targetY - this.owner.centerY)) + this.owner.degree);
        }
    }
}





