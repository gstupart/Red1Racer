// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class GameEngine {
    constructor(options) {
        this.entities = [];
        this.ctx = null;
       
        // Information on the mouse input
        this.click = null;
        this.rightClick = null;
        this.mouse = null;
        this.wheel = null;
        
        // Information on the key input
        this.keyA = false;
        this.keyD = false;
        this.keyW = false;
        this.keyS = false;
        this.keyR = false;

        this.clockTick = null;

        // Event listeners
        this.listeners = [];

        this.collisionHandler = new CollisionHandler();

        // Options and the Details
        // this.options = options || {
        //     debugging: false,
        // };
        this.options = {
            debugging: false,
        };

        // new. only for "particle" stuff 
        this.collisionHandler = new CollisionHandler(this);

        // mini-map
        this.miniMap = new MiniMap(this); 

    };

    init(ctx) { // called after page has loaded
        this.ctx = ctx;
        this.surfaceWidth = this.ctx.canvas.width;
        this.surfaceHeight = this.ctx.canvas.height;
        this.startInput();
        this.timer = new Timer();
    };

    start() {
        this.background = ASSET_MANAGER.getAsset("./maps/general-background.png");
        this.running = true;
        const gameLoop = () => {
            this.loop();
            requestAnimFrame(gameLoop, this.ctx.canvas);
        };
        gameLoop();
    };

    startInput() {
        const getXandY = e => ({
            x: e.clientX - this.ctx.canvas.getBoundingClientRect().left,
            y: e.clientY - this.ctx.canvas.getBoundingClientRect().top
        });
        
        // Mouse move listener
        const mouseMoveListener = e => {
            if (this.options.debugging) {
                console.log("MOUSE_MOVE", getXandY(e));
            }
            this.mouse = getXandY(e);
        };
        this.ctx.canvas.addEventListener("mousemove", mouseMoveListener, false);
        this.listeners.move = mouseMoveListener;

        // Mouse left-click listener
        const leftClickListener = e => {
            if (this.options.debugging) {
                console.log("CLICK", getXandY(e));
            }
            this.click = getXandY(e);
        };
        this.ctx.canvas.addEventListener("click", leftClickListener, false);
        this.listeners.leftClick = leftClickListener;

        // Mouse right-click listener
        const rightClickListener = e => {
            if (this.options.debugging) {
                console.log("RIGHT_CLICK", getXandY(e));
            }
            e.preventDefault(); // Prevent Context Menu
            this.rightClick = getXandY(e);
        };
        this.ctx.canvas.addEventListener("contextmenu", rightClickListener, false);
        this.listeners.rightClick = rightClickListener;

        // Mouse wheel listener
        const wheelListener = e => {
            if (this.options.debugging) {
                console.log("WHEEL", getXandY(e), e.wheelDelta);
            }
            e.preventDefault(); // Prevent Scrolling
            this.wheel = e.wheelDelta;
        };
        this.ctx.canvas.addEventListener("wheel", wheelListener, false);
        this.listeners.wheel = wheelListener;

        // Key down listener
        const keyDownListener = e => {
            switch (e.code) {
                case "KeyA":
                    if (!this.keyD) this.keyA= true;
                    break;
                case "KeyD":
                    if (!this.keyA) this.keyD = true;
                    break;
                case "KeyW":
                    if (!this.keyS) this.keyW = true;
                    break;
                case "KeyS":
                    if (!this.keyW) this.keyS = true;
                    break;
                case "KeyR":
                    this.keyR = true;
                    break;
            }
        };
        this.ctx.canvas.addEventListener("keydown", keyDownListener, false);
        this.listeners.keyDown = keyDownListener;

        // Key up listener
        const keyUpListener = e => {
            switch (e.code) {
                case "KeyA":
                    this.keyA = false;
                    break;
                case "KeyD":
                    this.keyD = false;
                    break;
                case "KeyW":
                    this.keyW = false;
                    break;
                case "KeyS":
                    this.keyS = false;
                    break;
                case "KeyR":
                    this.keyR = false;
                    if (this.camera.sceneType == 1 && this.player.currentWaypoint > -1) this.player.resetPosition();
                    break;
            }
        };
        this.ctx.canvas.addEventListener("keyup", keyUpListener, false);
        this.listeners.keyUp = keyUpListener;
    };
  
    addEntity(entity) {
        entity.removeFromWorld = false;
        this.entities.push(entity);
    };

    draw() {
        // Clear the whole canvas with transparent color (rgba(0, 0, 0, 0))
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        // Load a general background to fill whitespace as camera rotate
        this.ctx.drawImage(this.background, 0, 0, this.ctx.canvas.width, this.ctx.canvas.width,
            0, 0, this.ctx.canvas.width, this.ctx.canvas.width);

        // Rotate the canvas so it looks like the car is running forward
        this.ctx.save();
        this.ctx.translate(this.ctx.canvas.width / 2, this.ctx.canvas.height / 2);
        this.ctx.rotate(-this.player.degree);
        this.ctx.translate(-this.ctx.canvas.width/ 2, -this.ctx.canvas.height / 2)

        for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].draw(this.ctx);
        }
        
        this.ctx.restore();
        
        this.camera.draw(this.ctx);

        //New. for mini-map. 
        this.miniMap.draw(this.ctx);

    };

    update() {
        let entitiesCount = this.entities.length;

        for (let i = 0; i < entitiesCount; i++) {
            let entity = this.entities[i];

            if (!entity.removeFromWorld) {
                entity.update();
            }
        }
        this.camera.update();

        // Update the position, then handle collision
        this.collisionHandler.handleCollision(this.entities, this.camera);

        this.camera.update();
        
        for (var i = this.entities.length - 1; i >= 0; --i) {
            if (this.entities[i].removeFromWorld) {
                this.entities.splice(i, 1);
            }
        }

        //New. for mini-map.
        // this.miniMap.update(); 

    };

    loop() {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();
        this.click = null;
        this.rightClick = null;
    };

};

