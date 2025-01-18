

class MissileDemo {
    constructor(game) {
        this.game = game;
        this.missiles = [
            new MissileWeapon(game, this, MissileType.MAVERICK),
            new MissileWeapon(game, this, MissileType.SIDEWINDER),
            new MissileWeapon(game, this, MissileType.STORM_SHADOW),
            new MissileWeapon(game, this, MissileType.SPARROW),
            new MissileWeapon(game, this, MissileType.TORPEDO),
            new MissileWeapon(game, this, MissileType.ALAMO),
            new MissileWeapon(game, this, MissileType.SMALL_ROCKET)
        ];
        
        // Animation properties
        this.rotation = 0;
        this.frameTimer = 0;
        this.currentFrame = 0;
        this.frameDuration = 0.2; // Seconds per frame
        
        // Position for rendering
        this.baseX = 150; // Moved further right to accommodate names
        this.baseY = 100;
        this.spacing = 90; // Increased spacing between missiles
    }

    update() {
        // Update animation frame
        this.frameTimer += this.game.clockTick;
        if (this.frameTimer >= this.frameDuration) {
            this.frameTimer = 0;
            this.rotation += Math.PI / 32; // Rotate slightly each frame
        }

        // Update each missile
        this.missiles.forEach(missile => {
            missile.isActive = true;
            missile.update();
        });
    }

    draw(ctx) {
        // Draw title
        ctx.font = "24px Arial";
        ctx.fillStyle = "black";
        ctx.fillText("Missile Types:", 50, 50);

        // Draw each missile
        this.missiles.forEach((missile, index) => {
            // Calculate position
            this.x = this.baseX;
            this.y = this.baseY + (index * this.spacing);
            
            // Save context for missile rotation
            ctx.save();
            ctx.translate(this.x, this.y);
            
            // Draw missile name and stats
            ctx.font = "16px Arial";
            ctx.fillStyle = "black";
            ctx.fillText(missile.missileType.name, -125, 5); // moves names right/left and up/down
            
            // Draw stats in smaller font
            ctx.font = "12px Arial";
            ctx.fillStyle = "gray";
            ctx.fillText(`Damage: ${missile.missileType.damage}`, 50, -10);
            ctx.fillText(`Speed: ${missile.missileType.speed}`, 50, 5);
            ctx.fillText(`Fire Rate: ${missile.missileType.fireRate}`, 50, 20);
            
            // Rotate context for missile animation
            ctx.rotate(this.rotation);
            
            // Draw the missile
            ctx.drawImage(
                missile.spriteSheet,
                missile.missileType.frameIndex * 14, // frame width and added +1 to trim left side
                0,  // Top of sprite
                14, // Frame width increased to prevent cutoff (Source width)
                36, // Frame height (Source height)
                -7, // Center the missile sprite
                -18, // moves sprite up/down
                14, // Display width
                36  // Display height
            ); 
            
            ctx.restore();
        });
    }
}







