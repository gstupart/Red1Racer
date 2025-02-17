
class BossAI {
    constructor(boss) {
        this.boss = boss;
        this.phaseTransitionCooldown = false;
        this.attackTimers = { main: 0, special: 0 };
        
        this.PHASE_BEHAVIORS = {
            1: this.phase1Behavior.bind(this),
            2: this.phase2Behavior.bind(this),
            3: this.phase3Behavior.bind(this)
        };
    }

    update() {
        this.checkPhaseTransition();
        this.PHASE_BEHAVIORS[this.boss.currentPhase]();
    }

    checkPhaseTransition() {
        if (this.phaseTransitionCooldown) return;
        
        const healthThreshold = this.boss.PHASE_CONFIG.THRESHOLDS[this.boss.currentPhase - 1];
        if ((this.boss.health / this.boss.maxHealth) <= healthThreshold) {
            this.advancePhase();
        }
    }

    advancePhase() {
        if (this.boss.currentPhase >= 3) return;

        this.boss.currentPhase++;
        this.boss.equipWeapon(this.boss.currentPhase);
        this.applyPhaseModifiers();
        this.triggerTransitionEffect();
        this.activateCooldown();
    }

    applyPhaseModifiers() {
        const modifiers = this.boss.PHASE_CONFIG.STAT_MODIFIERS[this.boss.currentPhase];
        if (!modifiers) return;

        this.boss.speed *= modifiers.speed;
        this.boss.primaryWeapon.damage *= modifiers.damageMultiplier;
    }

    triggerTransitionEffect() {
        this.boss.game.addEntity(
            new PhaseTransitionEffect(
                this.boss.game, 
                this.boss.x, 
                this.boss.y,
                this.boss.currentPhase
            )
        );
    }

    activateCooldown() {
        this.phaseTransitionCooldown = true;
        setTimeout(() => {
            this.phaseTransitionCooldown = false;
        }, 3000);
    }

    phase1Behavior() {
        // Basic tracking and firing
        this.attackTimers.main += this.boss.game.clockTick;
        if (this.attackTimers.main >= 1.0) {
            this.boss.primaryWeapon.fire();
            this.attackTimers.main = 0;
        }
    }

    phase2Behavior() {
        // Add mine laying to existing behavior
        this.phase1Behavior();
        
        this.attackTimers.special += this.boss.game.clockTick;
        if (this.attackTimers.special >= 2.5) {
            this.layMines();
            this.attackTimers.special = 0;
        }
    }

    phase3Behavior() {
        // Enraged rapid fire and movement
        this.attackTimers.main += this.boss.game.clockTick;
        if (this.attackTimers.main >= 0.3) {
            this.boss.primaryWeapon.fire();
            this.attackTimers.main = 0;
        }
    }

    layMines() {
        for (let i = 0; i < 3; i++) {
            const mine = new Mine(
                this.boss.game,
                this.boss.x + (i * 50) - 50,
                this.boss.y + (i * 50) - 50
            );
            mine.damage *= 1.5;
            this.boss.game.addEntity(mine);
        }
    }
}









