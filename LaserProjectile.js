
class LaserProjectile extends Projectile {
    constructor(game, x, y, angle, damage) {
        super(game, x, y, angle, damage);
        this.speed = 10;
        this.width = 20;
        this.height = 4;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = "rgba(255, 0, 0, 0.7)";
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
    }
}





