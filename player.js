class Player {

    /**
     * Create a player entity.
     * 
     * @param {GameEngine} game The game engine.
     * @param {number} x The x-coordinate of the player.
     * @param {number} y The y-coordinate of the player.
     */
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        /** Sprite sheet of the player. */
        this.spritsheet = ASSET_MANAGER.getAsset("./sprites/tank-sprit.png")

        /** State: 0==left, 1=turning left, 2=forward, 3=turning right, 4=right. */
        this.state = 2;

        /** Level of speed: 0=slow, 1=median, 2=fast. */
        this.speed = 0;

        // Information of player

        /** Whether the player  is running. */
        this.running = true;

        /** Minimum velocity of the player. */
        this.minVelocity = 10;
        /** Maximum velocity of the player. */
        this.maxVelocity = 100;
        /** Current velocity of the player. */
        this.velocity = 10;

        /** Current acceleration of the player. */
        this.acceleration = 0;

        /** Current health of the player. */
        this.health = 200;
        /** Maximum health of the player. */
        this.maxHealth = 200;

        /** Current attack of the player. */
        this.attack = 15;

        /** The direction the player is facing (in degreee). */
        this.direction = 90;

        /** The scale of the player calculated by scale = desired size / size in spritsheet. */
        this.scale = 200 / 435;

        /** Collection of animations. */
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

        // Moving left
        this.animations[0][0] = new Animator(this.spritsheet, 960, 30, 435, 435, 2, 0.5, 20, false, true);
        this.animations[0][1] = new Animator(this.spritsheet, 960, 30, 435, 435, 2, 0.3, 20, false, true);
        this.animations[0][2] = new Animator(this.spritsheet, 960, 30, 435, 435, 2, 0.1, 20, false, true);

        // Turning left
        this.animations[1][0] = new Animator(this.spritsheet, 30, 30, 435, 435, 2, 0.5, 20, false, true);
        this.animations[1][1] = new Animator(this.spritsheet, 30, 30, 435, 435, 2, 0.3, 20, false, true);
        this.animations[1][2] = new Animator(this.spritsheet, 30, 30, 435, 435, 2, 0.1, 20, false, true);

        // Moving forward
        this.animations[2][0] = new Animator(this.spritsheet, 20, 1020, 435, 435, 2, 0.5, 20, false, true);
        this.animations[2][1] = new Animator(this.spritsheet, 20, 1020, 435, 435, 2, 0.3, 20, false, true);
        this.animations[2][2] = new Animator(this.spritsheet, 20, 1020, 435, 435, 2, 0.1, 20, false, true);

        // Turning right
        this.animations[3][0] = new Animator(this.spritsheet, 30, 525, 435, 435, 2, 0.5, 20, false, true);
        this.animations[3][1] = new Animator(this.spritsheet, 30, 525, 435, 435, 2, 0.3, 20, false, true);
        this.animations[3][2] = new Animator(this.spritsheet, 30, 525, 435, 435, 2, 0.1, 20, false, true);

        // Moving right
        this.animations[4][0] = new Animator(this.spritsheet, 960, 525, 435, 435, 2, 0.5, 20, false, true);
        this.animations[4][1] = new Animator(this.spritsheet, 960, 525, 435, 435, 2, 0.3, 20, false, true);
        this.animations[4][2] = new Animator(this.spritsheet, 960, 525, 435, 435, 2, 0.1, 20, false, true);
    }

    /**
     * Update velocity based on acceleration.
     * - Final velocity = current velocity + accleration * times in ms.
     * - Check for minimum and maximum velocity.
     */
    updateVelocity() {
        if (this.game.keyW) {
            this.acceleration = 50;
            this.velocity = Math.min(this.velocity + this.acceleration * this.game.clockTick, this.maxVelocity);
        }
        else {
            this.acceleration = -10;
            if (this.game.keyS) this.acceleration = -50;
            this.velocity = Math.max(this.velocity + this.acceleration * this.game.clockTick, this.minVelocity);
        }
    }
    
    /**
     * Update attributes of player including:
     * - Velocity
     * - State
     * - Level of speed
     * - Direction
     */
    update() {
        this.updateVelocity();
        if (PARAMS.DEBUG) console.log("Velocity", this.velocity, this.acceleration);
    }

    draw(ctx) {
        this.animations[this.state][this.speed].drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);
    }
}