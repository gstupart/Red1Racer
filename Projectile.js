
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
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        
        if (this.x < this.game.camera.x - 128 || this.x > this.game.camera.x + 1152 ||
            this.y < this.game.camera.y - 256 || this.y > this.game.camera.y + 1024) {
            this.removeFromWorld = true;
        }
    }

    draw(ctx) {
        // Will be implemented by specific projectiles
    }
}





