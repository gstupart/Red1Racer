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
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/tank-sprite.png");

        /** Sound track of the running car. */
        this.runningSound = ASSET_MANAGER.getAsset("./audios/car-audio.wav");

        this.runningSound.volume = 0;

        /** State: 0==left, 1=turning left, 2=forward, 3=turning right, 4=right. */
        this.state = 2;

        /** Level of speed: 0=slow, 1=median, 2=fast. */
        this.speed = 0;

        /** The scale of the player calculated by scale = desired size / size in spritsheet. */
        this.scale = PARAMS.PLAYER_SIZE / 435;
        this.width = PARAMS.PLAYER_SIZE;
        this.height = PARAMS.PLAYER_SIZE;


        // Information of player

        /** Whether the player  is running. */
        this.running = true;

        /** Current health of the player. */
        this.health = 400;
        /** Maximum health of the player. */
        this.maxHealth = 400;

        /** Current attack of the player. */
        this.attack = 15;

        // TODO: Add initial weapons
        this.primaryWeapon = null;

        this.secondaryWeapon = null;


        // Physics

        /** Change in x-coordinate of the position */
        this.xVelocity = 0;

        /** Change in y-coordinate of the position */
        this.yVelocity = 0;

        /** The current power of the car that move the car forward. */
        this.power = 0;

        /** Maximum power that move the car forward. */
        this.maxPower = 1.5;

        /** Current acceleration of the player. */
        this.acceleration = 0;

        /** 
         * The force that decrease the velocity by a certain rate. 
         * Should always be in range (0, 1).
         * The greater this number is, the fast the vehicle can move.
         */
        this.drag = 0.9;

        /** Current rate of change in angle. */
        this.angularVelocity = 0;

        /** 
         * The force that decrease the angular velocity by a certain rate. 
         * Should always be in range (0, 1).
         * The greater this number is, the fast the vehicle can turn.
         */
        this.angularDrag = 0.85;

        /** The rate of change in degree (direction). */
        this.turningRate = 0.008;

        /** The direction the car is facing. Assume that upward is 0 degree and positive degree means rotated clockwise. */
        this.degree = 0;
        

        /** Time passed since the car start turning (moving from one state to another). */
        this.elapsedTurningTime = 0;

        /** Total time required to change the state of the car. */
        this.totalTurningTime = 0.15;


        /** Collection of animations. */
        this.animations = [];

        /** An animation that has only one frame and used for stopped car. */
        this.stillAnimation = new Animator(this.spritesheet, 20, 1020, 435, 435, 1, 100, 20, false, true);;

        this.loadAnimations();
        this.updateBB();
        ASSET_MANAGER.playAsset("./audios/car-audio.wav");
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

    updateBB() {
        this.BB = new RectangularBB(this.x, this.y, this.width, this.height);
    }

    /**
     * Update velocity based on acceleration.
     * - Final power = current power + accleration * times in second.
     * - Check for minimum and maximum power.
     * - Update x and y velocity based on current power.
     */
    updateVelocity() {
        if (this.game.keyW) {
            this.acceleration = 2;
        }
        else {
            this.acceleration = -4;
            if (this.game.keyS) this.acceleration = -6;
        }
        this.power = Math.max(0, Math.min(this.power + this.acceleration * this.game.clockTick, this.maxPower));
        this.xVelocity += Math.sin(this.degree) * this.power;
        this.yVelocity += Math.cos(this.degree) * this.power;
    }
    
    /**
     * Update level of speed.
     * - Slow(0): 0 <= power < 0.5
     * - Median(1): 0.5 <= power <= 1
     * - Fast(2): 1 < power
     */
    updateSpeedLevel() {
        if (this.power < 0.5) this.speed = 0;
        else if (this.power > 1) this.speed = 2;
        else this.speed = 1;
    }

    /**
     * Update the state of player.
     * - Make sure the car goes through the turning state when changing direction.
     * - Make sure the car move straight forward again when key A and D are up.
     */
    updateState() {
        if (this.elapsedTurningTime >= this.totalTurningTime && this.power > 0) {
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
     * Update the angular velocity and degree (direction) of the player based on turnign rate.
     */
    updateDegree() {
        switch(this.state) {
            case 0: case 1:
                this.angularVelocity -= this.turningRate;
                break;
            case 2:
                this.angularVelocity = 0;
                break;
            case 3: case 4:
                this.angularVelocity += this.turningRate;
                break;
        }
        if (this.power == 0) this.angularVelocity = 0;
        else this.angularVelocity *= this.angularDrag;
        
        this.degree += this.angularVelocity;
    }

    /**
     * Update the position based on velocity and direction.
     */
    updatePosition() {
        this.x += this.xVelocity;
        this.y -= this.yVelocity;
        this.xVelocity *= this.drag;
        this.yVelocity *= this.drag;
    }
    
    /**
     * Update attributes of player when running, including:
     * - Velocity
     * - State
     * - Level of speed
     * - Audio volume
     * - Position
     * - Degree (direction its facing)
     * - Bounding box
     */
    update() {
        // Placeholder; change to condition that means to start the game
        if (this.running) {
            this.updateVelocity();
            this.updateSpeedLevel();
            this.updateState();
            this.updateDegree();
            this.updatePosition();
            this.updateBB();
            if (this.power <= 1) this.runningSound.volume = this.power / 2;
        }
        this.updateBB();
    }

    draw(ctx) {
        if (this.running && this.power != 0) this.animations[this.state][this.speed].drawFrame(this.game.clockTick, 
            ctx, this.x - this.game.camera.x, this.y -  this.game.camera.y, this.scale, this.degree);
        else this.stillAnimation.drawFrame(this.game.clockTick, 
            ctx, this.x - this.game.camera.x, this.y -  this.game.camera.y, this.scale, this.degree);
    }
}