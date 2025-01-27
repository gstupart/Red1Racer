
class LaserProjectile extends Projectile {
    constructor(game, x, y, angle, damage) {
        super(game, x, y, angle, damage);
        this.speed = 10;
        this.width = 20;
        this.height = 4;

        //new
        // for particle effect system
        //this.particles = [];
    }

    // new
    /*update() {
        super.update();
        // Update laser trail particles
        this.updateParticles();
    }*/

    draw(ctx) {
        // new
        // Draw particles first
        this.particles.forEach(particle => particle.draw(ctx));

        // Draw laser beam
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        // new
        // Laser glow effect
        const gradient = ctx.createLinearGradient(
            -this.width/2, 0,
            this.width/2, 0
        );
        gradient.addColorStop(0, "rgba(255, 0, 0, 0)");
        gradient.addColorStop(0.5, "rgba(255, 0, 0, 0.7)");
        gradient.addColorStop(1, "rgba(255, 0, 0, 0)");

        ctx.fillStyle = gradient;
        //ctx.fillStyle = "rgba(255, 0, 0, 0.7)";
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();

        super.draw(ctx); // Draw debug bounding box if enabled
    }

    // new
    updateParticles() {
        // Add new particles at laser position
        if (Math.random() < 0.3) {
            this.particles.push(new LaserParticle(this.x, this.y));
        }
        // Update and remove old particles
        this.particles = this.particles.filter(particle => {
            particle.update();
            return particle.alpha > 0;
        });
    }
    
}




