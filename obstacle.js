class Mine {
    constructor(game, x, y, angle, owner) {
        Object.assign(this, { game, x, y, angle, owner });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/mineSheet.png");
        this.animation = new Animator(this.spritesheet, 19, 9, 207, 175, 4, .1, 38, false, true);
        this.damage = 20;
        this.radius = 25;
        this.scale = this.radius * 2 / 208;
        this.BB = new CircularBB(x + this.radius, y + this.radius, this.radius);
    };

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, 
            this.x - this.game.camera.x, this.y - this.game.camera.y, this.scale, this.angle);
    };

    update() {

    };
}

class Rock {
    constructor(game, x, y, angle) {
        Object.assign(this, { game, x, y, angle });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/rockpack.png");
        this.scale = 50 / 26;
        this.BB = new CircularBB(x + 25, y + 9.5 * this.scale, 20);
        this.animation = new Animator(this.spritesheet, 4, 7, 26, 19, 1, 10, 0, false, true);
    }

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, 
            this.x - this.game.camera.x, this.y - this.game.camera.y, this.scale, this.angle);
    }

    update() {

    }
}

class Spike {
    constructor(game, x, y, angle) {
        Object.assign(this, { game, x, y, angle });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/spike-trap.png");
        this.scale = 100 / 32;
        this.damage = 1;
        this.BB = new RectangularBB(this.x, this.y, 100, 100);

        this.elapsedTime = 0;
        this.waitTime = 0.8;
        this.attackTime = 0.08 * 11;

        this.state = 0; // 0=waiting, 1=attacking
        this.animations = [
            new Animator(this.spritesheet, 0, 0, 32, 32, 11, 10, 0, false, true),
            new Animator(this.spritesheet, 96, 0, 32, 32, 11, 0.08, 0, false, true)
        ];
    }

    draw(ctx) {
        this.animations[this.state].drawFrame(this.game.clockTick, ctx, 
            this.x - this.game.camera.x, this.y - this.game.camera.y, this.scale, this.angle);
    }

    update() {
        this.elapsedTime += this.game.clockTick;
        if (this.state == 0 && this.elapsedTime >= this.waitTime) {
            this.state = 1;
            this.elapsedTime = 0;
        } else if (this.state == 1 && this.elapsedTime >= this.attackTime) {
            this.state = 0;
            this.elapsedTime = 0;
            this.animations[1].elapsedTime = 0;
        }
    }
}

class Suriken {
    constructor(game, x, y, direction, totalStep) {
        Object.assign(this, { game, x, y, direction, totalStep });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/suriken.png");
        this.animation = new Animator(this.spritesheet, 0, 0, 32, 32, 8, .1, 0, false, true);
        this.damage = 2;
        this.radius = 30;
        this.scale = this.radius * 2 / 32;
        this.speed = 2;
        this.currentStep = 0;
        this.updateBB();
    };

    updateBB() {
        this.BB = new CircularBB(this.x + this.radius, this.y + this.radius, this.radius);
    }

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, 
            this.x - this.game.camera.x, this.y - this.game.camera.y, this.scale, 0);
    };

    update() {
        this.x += Math.sin(this.direction) * this.speed;
        this.y -= Math.cos(this.direction) * this.speed;
        this.currentStep++;

        if (this.currentStep == this.totalStep) {
            this.currentStep = 0;
            this.direction = (this.direction + Math.PI) % (Math.PI * 2);
        }

        this.updateBB();
    };
}