
// TO BE CONTINUED

// Base projectile class
class Projectile {
    constructor(game, x, y, angle, damage) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.damage = damage;
        this.removeFromWorld = false;
    }

    update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        // Remove if off screen
        if (this.x < 0 || this.x > this.game.ctx.canvas.width ||
            this.y < 0 || this.y > this.game.ctx.canvas.height) {
            this.removeFromWorld = true;
        }
    }

    draw(ctx) {
        // Will be implemented by specific projectiles
    }
}





