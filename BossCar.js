
// Actuall sprite sheet needed. 

class BossCar extends AICar {
    constructor(game, x, y) {
        super(game, x, y, "Final Boss", []);
        
        // Asset management
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/boss-sheet.png");
        if (!this.spritesheet) throw new Error("Missing boss sprite sheet");
        
        // Phase configuration
        this.PHASE_CONFIG = {
            THRESHOLDS: [0.7, 0.4, 0.1],
            WEAPONS: {
                1: MissileType.MAVERICK,
                2: MissileType.STORM_SHADOW,
                3: MissileType.TORPEDO
            },
            STAT_MODIFIERS: {
                2: { fireRate: 1.5, speed: 1.2, damageMultiplier: 1.2 },
                3: { fireRate: 2.0, speed: 1.5, damageMultiplier: 1.5 }
            }
        };

        // Animation setup
        this.animations = this.createAnimations();
        this.currentAnimation = this.animations.phase1;

        // Combat stats
        this.maxHealth = 1000;
        this.health = this.maxHealth;
        this.currentPhase = 1;
        
        // Systems
        this.ai = new BossAI(this);
        this.weapons = this.createPhaseWeapons();
        this.equipWeapon(1);
    }

    createAnimations() {
        return {
            //phase1: new Animator(ASSET_MANAGER.getAsset("./sprites/boss-phase1.png"), startX, startY, frameWidth, frameHeight, frameCount, frameDuration, padding, true, false),
            phase1: new Animator(this.spritesheet, startX, startY, frameWidth, frameHeight, frameCount, frameDuration, padding, loop, reverse),
            phase2: new Animator(this.spritesheet, startX, startY, frameWidth, frameHeight, frameCount, frameDuration, padding, loop, reverse),
            phase3: new Animator(this.spritesheet, startX, startY, frameWidth, frameHeight, frameCount, frameDuration, padding, loop, reverse)
        };
    }

    createPhaseWeapons() {
        return {
            1: new MissileWeapon(this.game, this, this.PHASE_CONFIG.WEAPONS[1]),
            2: new MissileWeapon(this.game, this, this.PHASE_CONFIG.WEAPONS[2]),
            3: new MissileWeapon(this.game, this, {
                ...this.PHASE_CONFIG.WEAPONS[3],
                damage: this.PHASE_CONFIG.WEAPONS[3].damage * 
                        this.PHASE_CONFIG.STAT_MODIFIERS[3].damageMultiplier
            })
        };
    }

    equipWeapon(phase) {
        this.primaryWeapon = this.weapons[phase];
        this.primaryWeapon.fireRate *= this.PHASE_CONFIG.STAT_MODIFIERS[phase]?.fireRate || 1;
    }

    update() {
        super.update();
        this.ai.update();
        this.currentAnimation = this.animations[`phase${this.currentPhase}`];
    }

    draw(ctx) {
        // Draw boss car
        this.currentAnimation.drawFrame(
            this.game.clockTick, ctx,
            this.x - 64 - this.game.camera.x,
            this.y - 64 - this.game.camera.y,
            1.0, this.degree
        );

        // Draw health bar
        const barWidth = 120;
        const barHeight = 8;
        const barX = this.x - 60 - this.game.camera.x;
        const barY = this.y - 80 - this.game.camera.y;
        
        ctx.fillStyle = 'rgba(255,0,0,0.7)';
        ctx.fillRect(barX, barY, barWidth, barHeight);
        ctx.fillStyle = 'rgba(0,255,0,0.7)';
        ctx.fillRect(barX, barY, barWidth * (this.health/this.maxHealth), barHeight);
    }

    takeDamage(amount) {
        this.health = Math.max(0, this.health - amount);
        return this.health > 0;
    }
}









