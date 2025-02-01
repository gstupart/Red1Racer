// Particle emitter to manage particles
/*
class ParticleSystem {
    constructor(game, x, y, config) {
        Object.assign(this, { game, x, y, config });
        this.particles = [];
        this.removeFromWorld = false;
        this.shakeIntensity = config.shakeIntensity || 0;
        this.duration = config.duration || 1;

        // Initialize particles
        for (let i = 0; i < config.count; i++) {
            this.particles.push(this.createParticle());
        }
    }

    createParticle() {
        const angle = (Math.random() * this.config.spread) + this.config.angle;
        const speed = this.config.speed + (Math.random() - 0.5) * this.config.speedVariation;
        const lifespan = this.config.lifespan + (Math.random() - 0.5) * this.config.lifespanVariation;
        
        return new Particle(
            this.game,
            this.x,
            this.y,
            this.config.colors[Math.floor(Math.random() * this.config.colors.length)],
            speed,
            lifespan,
            angle
        );
    }

    update() {
        // Update particles
        const deltaTime = this.game.clockTick;
        this.particles.forEach(particle => particle.update(deltaTime));
        
        // Remove expired particles
        this.particles = this.particles.filter(p => !p.removeFromWorld);
        
        // Handle system expiration
        this.duration -= deltaTime;
        if (this.duration <= 0 && this.particles.length === 0) {
            this.removeFromWorld = true;
        }
    }

    draw(ctx) {
        this.particles.forEach(p => p.draw(ctx));
    }
}
*/
