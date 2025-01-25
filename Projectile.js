
// TO BE CONTINUED

// Base projectile class
class Projectile {
    constructor(game, x, y, angle, damage, owner) {
        Object.assign(this, { game, x, y, angle, damage, owner });
        this.originalX = x;
        this.originalY = y;
        this.removeFromWorld = false;
    }

    update() {
        // Updates position
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        let xBound = this.game.player.x - this.game.ctx.canvas.width / 2;
        let yBound = this.game.player.y - this.game.ctx.canvas.height / 2;
        if (this.x < xBound || this.x > xBound + this.game.ctx.canvas.width ||
            this.y < yBound || this.y > yBound + this.game.ctx.canvas.height) {
            this.removeFromWorld = true;
        }
        
    }

    draw(ctx) {
        // Will be implemented by specific projectiles
    }
}





