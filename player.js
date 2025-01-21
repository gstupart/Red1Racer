class Player {

    /**
     * Create a player entity.
     * 
     * @param {GameEngine} game The game engine.
     * @param {number} x The x-coordinate of the upper-left corner of the player.
     * @param {number} y The y-coordinate of the upper-left corner of the player.
     */
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        /** Sprite sheet of the player. */
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/tank-sprite.png")

        /** Sound track of the running car. */
        this.runningSound = ASSET_MANAGER.getAsset("./audios/car-audio.wav");

        /** State: 0==left, 1=turning left, 2=forward, 3=turning right, 4=right. */
        this.state = 2;

        /** Level of speed: 0=slow, 1=median, 2=fast. */
        this.speed = 0;

        /** The scale of the player calculated by scale = desired size / size in spritsheet. */
        this.scale = PARAMS.PLAYER_SIZE / 435;


        // Information of player

        /** Whether the player  is running. */
        this.running = false;

        /** Minimum velocity of the player. */
        this.minVelocity = 1;
        /** Maximum velocity of the player. */
        this.maxVelocity = 10;
        /** Current velocity of the player. */
        this.velocity = 5;

        /** Current acceleration of the player. */
        this.acceleration = 0;


        /** Current health of the player. */
        this.health = 200;
        /** Maximum health of the player. */
        this.maxHealth = 200;


        /** Current attack of the player. */
        this.attack = 15;


        /** The direction the car is facing. Assume that upward is 0 degree and positive degree means rotated clockwise. */
        this.degree = Math.PI / 2;

        /** Time passed since the car start turning (moving from one state to another). */
        this.elapsedTurningTime = 0;

        /** Total time required to change the state of the car. */
        this.totalTurningTime = 0.15;

        /** The rate of change in degree (direction). */
        this.turningRate = 0;


        /** Collection of animations. */
        this.animations = [];

        /** An animation that has only one frame and used for stopped car. */
        this.stillAnimation = new Animator(this.spritesheet, 20, 1020, 435, 435, 1, 100, 20, false, true);

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
        this.animations[0][0] = new Animator(this.spritesheet, 960, 30, 435, 435, 2, 0.45, 20, false, true);
        this.animations[0][1] = new Animator(this.spritesheet, 960, 30, 435, 435, 2, 0.3, 20, false, true);
        this.animations[0][2] = new Animator(this.spritesheet, 960, 30, 435, 435, 2, 0.1, 20, false, true);

        // Turning left
        this.animations[1][0] = new Animator(this.spritesheet, 30, 30, 435, 435, 2, 0.45, 20, false, true);
        this.animations[1][1] = new Animator(this.spritesheet, 30, 30, 435, 435, 2, 0.3, 20, false, true);
        this.animations[1][2] = new Animator(this.spritesheet, 30, 30, 435, 435, 2, 0.1, 20, false, true);

        // Moving forward
        this.animations[2][0] = new Animator(this.spritesheet, 20, 1020, 435, 435, 2, 0.45, 20, false, true);
        this.animations[2][1] = new Animator(this.spritesheet, 20, 1020, 435, 435, 2, 0.3, 20, false, true);
        this.animations[2][2] = new Animator(this.spritesheet, 20, 1020, 435, 435, 2, 0.1, 20, false, true);

        // Turning right
        this.animations[3][0] = new Animator(this.spritesheet, 30, 525, 435, 435, 2, 0.45, 20, false, true);
        this.animations[3][1] = new Animator(this.spritesheet, 30, 525, 435, 435, 2, 0.3, 20, false, true);
        this.animations[3][2] = new Animator(this.spritesheet, 30, 525, 435, 435, 2, 0.1, 20, false, true);

        // Moving right
        this.animations[4][0] = new Animator(this.spritesheet, 960, 525, 435, 435, 2, 0.45, 20, false, true);
        this.animations[4][1] = new Animator(this.spritesheet, 960, 525, 435, 435, 2, 0.3, 20, false, true);
        this.animations[4][2] = new Animator(this.spritesheet, 960, 525, 435, 435, 2, 0.1, 20, false, true);
    }

    /**
     * Update velocity based on acceleration.
     * - Final velocity = current velocity + accleration * times in second.
     * - Check for minimum and maximum velocity.
     */
    updateVelocity() {
        if (this.game.keyW) {
            this.acceleration = 3;
            this.velocity = Math.min(this.velocity + this.acceleration * this.game.clockTick, this.maxVelocity);
        }
        else {
            this.acceleration = 0;
            if (this.game.keyS) this.acceleration = -3;
            this.velocity = Math.max(this.velocity + this.acceleration * this.game.clockTick, this.minVelocity);
        }
    }
    
    /**
     * Update level of speed.
     * - Slow(0): min <= velocity < 50
     * - Median(1): 50 <= velocity <= 100
     * - Fast(2): 100 < velocity
     */
    updateSpeed() {
        if (this.velocity < 5) this.speed = 0;
        else if (this.velocity > 10) this.speed = 2;
        else this.speed = 1;
    }

    /**
     * Update the state of player.
     * - Make sure the car goes through the turning state when changing direction.
     * - Make sure the car move straight forward again when key A and D are up.
     */
    updateState() {
        if (this.elapsedTurningTime >= this.totalTurningTime) {
            if (this.game.keyA && this.state > 0) {
                this.state--;
            } else if (this.game.keyD && this.state < 4) {
                this.state++;
            } else if (!this.game.keyA && !this.game.keyD && this.state != 2) {
                this.state += this.state < 2 ? 1 : -1;
            }
            this.elapsedTurningTime = 0;
        } else if (this.game.keyA || this.game.keyD || this.state != 2) {
            this.elapsedTurningTime += this.game.clockTick;
        }
    }

    /**
     * Update the turning rate and degree (direction) of the player.
     */
    updateDegree() {
        switch(this.state) {
            case 0:
                this.turningRate = -Math.PI / 64;
                break;
            case 1:
                this.turningRate = -Math.PI / 128;
                break;
            case 2:
                this.turningRate = 0;
                break;
            case 3:
                this.turningRate = Math.PI / 128;
                break;
            case 4:
                this.turningRate = Math.PI / 64;
                break;
        }
        this.degree += this.turningRate;
    }

    /**
     * Update the position based on velocity and direction.
     */
    updatePosition() {
        this.x += Math.cos(this.degree - Math.PI / 2) * this.velocity;
        this.y += Math.sin(this.degree - Math.PI / 2) * this.velocity;
    }
    
    /**
     * Update attributes of player when running, including:
     * - Velocity
     * - State
     * - Level of speed
     * - Audio volume
     * - Position
     * - Degree (direction its facing)
     */
    update() {
        // Placeholder; change to condition that means to start the game
        if (this.running) {
            this.updateVelocity();
            this.updateSpeed();
            this.updateState();
            this.updateDegree();
            this.updatePosition();
            if (this.velocity <= 10 && this.velocity >= 3) this.runningSound.volume = this.velocity / 10;
        } else if (this.game.click != null) {
            this.running = true;
            this.runningSound.volume = 0.3
            ASSET_MANAGER.playAsset("./audios/car-audio.wav");
        }
    }

    draw(ctx) {
        if (this.running) this.animations[this.state][this.speed].drawFrame(this.game.clockTick, 
            ctx, this.x - this.game.camera.x, this.y -  this.game.camera.y, this.scale, this.degree);
        else this.stillAnimation.drawFrame(this.game.clockTick, 
            ctx, this.x - this.game.camera.x, this.y -  this.game.camera.y, this.scale, this.degree);
    }
}