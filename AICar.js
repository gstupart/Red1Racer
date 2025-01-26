class AICar extends Player {

    /**
     * Create a player entity.
     * 
     * @param {GameEngine} game The game engine.
     * @param {number} x The x-coordinate of the upper-left corner of the player.
     * @param {number} y The y-coordinate of the upper-left corner of the player.
     */
    constructor(game, x, y) {
        super(game, x, y);
        this.desiredSpeed = .6;
        this.desiredDegree = 0;
        this.waypoints = [new Point(0, -100)];
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
        if (this.desiredSpeed > this.power) {
            this.acceleration = 2;
        }
        else {
            this.acceleration = -4;
            if (this.desiredSpeed + 2 < this.power) this.acceleration = -6;
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
        let cappedDegrees = (this.degree) % (Math.PI);
        console.log(cappedDegrees);
        if (this.elapsedTurningTime >= this.totalTurningTime && this.power > 0) {
            if (this.desiredDegree + .2 < cappedDegrees && this.state > 0) {
                this.state--;
            } else if (this.desiredDegree - .2 > cappedDegrees && this.state < 4) {
                this.state++;
            } else if (this.state != 2) {
                this.state += this.state < 2 ? 1 : -1;
            }
            this.elapsedTurningTime = 0;
        } else if (!(this.desiredDegree < cappedDegrees) || !(this.desiredDegree > cappedDegrees) || this.state != 2) {
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
        console.log([this.x, this.y]);
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
            this.decideMove();
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

    decideMove() {
        const deltaY = this.waypoints[0].y - this.y;
        const deltaX = this.waypoints[0].x - this.x;
        // Calculate the angle in radians from the positive x-axis (counterclockwise-positive)
        const normalRadiansToTarget = Math.atan2(
            deltaY,
            deltaX
        );

        // Flip the direction to make clockwise positive
        let flippedRadians = -normalRadiansToTarget;

        // Adjust to make 0 radians point along the positive y-axis
        let adjustedRadians = (flippedRadians + Math.PI / 2) % (2 * Math.PI);

        // Ensure the angle is in [0, 2π)
        adjustedRadians = (adjustedRadians % (Math.PI))

        this.desiredDegree = adjustedRadians;

        console.log({
            deltaX: this.waypoints[0].x - this.x,
            deltaY: this.waypoints[0].y - this.y,
            currentDegree: this.degree,
            desiredDegree: this.desiredDegree
        });
    }
}