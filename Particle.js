// Particle class to represent individual particles
/*
class Particle {
    constructor(game, x, y, color, speed, lifespan, angle) {
        Object.assign(this, { game, x, y, color, speed, lifespan, angle });
        this.velocity = {
            x: Math.cos(angle) * speed,
            y: Math.sin(angle) * speed
        };
        this.originalLifespan = lifespan;
        this.removeFromWorld = false;
    }

    update(deltaTime) {
        this.lifespan -= deltaTime;
        this.x += this.velocity.x * deltaTime;
        this.y += this.velocity.y * deltaTime;
        
        if (this.lifespan <= 0) {
            this.removeFromWorld = true;
        }
    }

    draw(ctx) {
        const alpha = this.lifespan / this.originalLifespan;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}
*/


