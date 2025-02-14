class SceneManager {
    constructor(game) {
        this.game = game;

        // Used for camera system
        this.game.camera = this;
        this.x = 0;
        this.y = 0;
        this.midpointX = PARAMS.CANVAS_WIDTH / 2 - PARAMS.PLAYER_SIZE / 2;
        this.midpointY = PARAMS.CANVAS_HEIGHT / 2 - PARAMS.PLAYER_SIZE / 2;

        // Indicate what type of scene is on canvas
        // 0=title, 1=racing, 2=shop, 3=game over, 4=transition
        this.sceneType = 0;

        // Add entities and load scene
        this.currentMap = null;
        this.player = new Player(game, 0, 0, "Player");
        this.aiRacers = [];
        this.game.player = this.player;

        this.shop = new Shop(game, 0, 0, 0, this.player);
        this.transition = new Transition(game);
        this.racerList = new RacerList(game);
        this.hud = new HUD(game, this.player);
    }

    loadScene(scene) {
        this.sceneType = scene.type;
        this.level = scene.level;
        this.racerList.list = [];
        this.hud.startTime = Date.now();
        this.hud.time = 0;

        // Load map
        this.currentMap = new Map(this.game, scene.background.width, scene.background.height, scene.background.scale,
            ASSET_MANAGER.getAsset(scene.background.src));
        this.game.addEntity(this.currentMap);

        // Load finish line
        let scale = this.currentMap.scale;
        let l = scene.finishLine;
        this.finishLine = new FinishLine(this.game, l.x * scale, l.y * scale,
            (l.endX - l.x) * scale, (l.endY - l.y) * scale);
        this.game.addEntity(this.finishLine);

        // Load off road area
        if (scene.offRoad) {
            scene.offRoad.forEach(e => {
                this.game.addEntity(new OffRoad(this.game, e.x * scale, e.y * scale,
                    (e.endX - e.x) * scale, (e.endY - e.y) * scale));
            });
        }

        // Load obstacles
        if (scene.obstacles) {
            scene.obstacles.forEach(e => {
                let rand = Math.floor(Math.random() * 3);
                if (rand == 0) this.game.addEntity(new Mine(this.game, e.x * scale, e.y * scale, e.angle));
                else if (rand == 1) this.game.addEntity(new Rock(this.game, e.x * scale, e.y * scale, e.angle));
                else this.game.addEntity(new Spike(this.game, e.x * scale, e.y * scale, e.angle));
            });
        }
        if (scene.suriken) {
            scene.suriken.forEach(e => {
                this.game.addEntity(new Suriken(this.game, e.x * scale, e.y * scale, e.direction, e.totalStep));
            });
        }

        // Load blocks
        if (scene.block) {
            scene.block.forEach(e => {
                this.game.addEntity(new Block(this.game, e.x * scale, e.y * scale,
                    (e.endX - e.x) * scale, (e.endY - e.y) * scale));
            });
        }

        // Load player
        this.player.resetStatus();
        this.player.x = scene.player.x;
        this.player.y = scene.player.y;
        this.player.degree = scene.player.degree;
        this.player.running = true;
        this.player.waypoints = WaypointFactory[scene.waypoint]();
        this.currentWaypoint = -1;
        ASSET_MANAGER.playAsset("./audios/car-audio.wav");
        this.game.addEntity(this.player);
        this.racerList.addRacer(this.player);

        // Load player weapon
        if (scene.playerWeapon) {
            let weapon = new MissileWeapon(this.game, this.player, scene.playerWeapon.type);
            this.player.weapons.push(weapon);
            this.player.setPrimaryWeapon(weapon);
        }
        this.game.addEntity(this.player.primaryWeapon);

        // TODO: Load AI racer
        // for (let i = 0; i < this.aiRacers.length; i++) {
        //     this.aiRacers[i].x = scene.player.x;
        //     this.aiRacers[i].y = scene.player.y;
        //     this.aiRacers[i].degree = scene.player.degree;
        //     this.aiRacers[i].running = true;
        //     ASSET_MANAGER.playAsset("./audios/car-audio.wav");
        //     this.game.addEntity(this.aiRacers[i]);
        // }
        for (let i = 0; i < 2; i++) {
            this.aiRacers.push(new AICar(this.game, 0, 0, "Racer " + (i + 1), WaypointFactory[scene.waypoint]()));
            this.aiRacers[i].x = scene.player.x;
            this.aiRacers[i].y = scene.player.y + PARAMS.PLAYER_SIZE * (i + 1);
            this.aiRacers[i].degree = scene.player.degree;
            this.aiRacers[i].running = true;
            this.aiRacers[i].finished = false;
            this.game.addEntity(this.aiRacers[i]);
            this.racerList.addRacer(this.aiRacers[i]);
        }
        for (let i = 0; i < 2; i++) {
            let racer = this.aiRacers[i];
            racer.setTargets(this.aiRacers.filter(target => target !== racer));
            racer.addTarget(this.player);
            // Set AI Weapon TEMP
            racer.setPrimaryWeapon(new MissileWeapon(this.game, racer, scene.playerWeapon.type));
            this.game.addEntity(racer.primaryWeapon);
            console.log(racer);
        }
    }

    /**
     * Load the shop scene
     */
    loadShop() {
        // Shop scene, clear entities from canvas
        this.game.entities.forEach((entity) => {
            entity.removeFromWorld = true;
        });
        this.shop.playerMoney += 3000;
        this.sceneType = 2;
    }

    /**
     * Thing to update:
     * - "Position" of the camera
     */
    update() {
        // Move camera; the car is always in enter
        this.x = this.player.x - this.midpointX;
        this.y = this.player.y - this.midpointY;

        if (this.sceneType == 1) {
            this.racerList.update();
            this.hud.update();
        }
        else if (this.sceneType == 2) this.shop.update();
        else if (this.sceneType == 0 && this.game.click != null) this.loadScene(LEVEL_ONE);
        else if (this.sceneType == 4) this.transition.update();
    }

    draw(ctx) {
        // TODO: Replace with actual HUD
        ctx.font = "20px serif";
        switch(this.sceneType) {
            case 0:     // Titel
                this.transition.drawTitle(ctx);
                break;
            case 1:     // Racing; draw racer list, minimap, and HUD
                this.racerList.draw(ctx);
                this.hud.draw(ctx);
                break;
            case 2:     // Shop
                this.shop.draw(ctx);
                break;
            case 3:     // Player is dead, game over
                this.transition.drawDeath(ctx);
                break;
            case 4:     // Transition between level and shop
                this.transition.draw(ctx);
                break
        }
    }

    getGame() {
        console.log(this.game)
        return this.game;
    }
}