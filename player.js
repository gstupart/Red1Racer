class Player {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.spritsheet = ASSET_MANAGER.getAsset("./sprites/tank-sprite.png");

        // State: 0=forward, 1=left, 2=turning left, 3=turning right, 4=right
        this.state = 0;

        // Level of speed: 0=slow, 1=median, 2=fasr
        this.speed = 0;

        // Information of player
        this.running = true;

        this.velocity = 10;
        this.maxVelocity = 100;

        this.acceleration = 5;
        this.maxAcceleration = 10;

        this.health = 200;
        this.maxHealth = 200;

        this.attack = 15;


        this.animations = [];
        this.loadAnimations();
    }

    loadAnimations() {
        for (var i = 0; i < 5; i++) { // 5 states
            this.animations.push([]);
            for (var j = 0; j < 3; j++) { // 3 levels of speed
                this.animations[i].push([]);
            }
        }

        this.animations[0][0] = new Animator(this.spritesheet, 0, 890, 435, 435, 2, 0.5, 10, false, true);
    }
    
    update() {
        
    }

    draw(ctx) {
        this.animations[this.state][this.speed].drawFrame(this.game.clockTick, ctx, this.x, this.y, PARAMS.PLAYER_SCLAE);
    }
}