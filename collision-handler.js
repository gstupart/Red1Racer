class CollisionHandler {
    constructor(game) {  
        this.game = game;
    }
    createExplosion(x, y, scale = 1.5) {
        const explosion = new Explosion(this.game, x, y);
        this.game.addEntity(explosion);
    }

    /**
     * This function will handle collision between entities. 
     * 
     * If collision happens between ...
     * 1. a player and an enemy, they will get bounce off from each other.
     * 2. a projectile come from an enemy and a player, the projectile will be removed from the game and make some damage to the player.
     * 3. a projectile come from a player and an enemy, the projectile will be removed from the game and make some damage to the enemy.
     * 4. two projectiles that come from different owner, they will both be removed from the game.
     * 5. a obstacle and a player, damage to the player.
     * 6. a obstacle and an enemy, damage to the enemy.
     * 7. the offroad area and a player, slow down the player and make small amount of damage every certain second.
     * 8. the offroad area and an enemy, slow down the enemy and make small amount of damage every certain second.
     * 9. the finish line and a player, finish this level
     * 10. a boon and a player
     * 
     * @param {*} entities List of entities to check.
     * @param {SceneManager} scene The scene manager.
     */
    handleCollision(entities, scene) {
        let length = entities.length;

        for (let i = 0; i < length - 1; i++) {
            let e1 = entities[i];

            // No collision will happen with map or weapon itself
            if (e1 instanceof Map || e1 instanceof Weapon || e1 instanceof Transition || e1.removeFromWorld) continue;

            for (let j = i + 1; j < length; j++) {
                let e2 = entities[j];
                
                // No collision will happen with map or weapon itself
                if (e2 instanceof Map || e2 instanceof Weapon || e2 instanceof Transition || e2.removeFromWorld) continue;

                // Check for player, enemy, and projectile because all collisions happen around them
                if ((e1 instanceof Player && !(e1 instanceof AICar) || e2 instanceof Player && !(e2 instanceof AICar)) && e1.BB.collide(e2.BB)) {
                    let player = e1 instanceof Player && !(e1 instanceof AICar) ? e1 : e2;
                    let other = e1 instanceof Player && !(e1 instanceof AICar) ? e2 : e1;
                    if (other instanceof Projectile && !(other.owner instanceof Player)) {    // 2
                        
                        // New. Creates explosion effect at collision point
                        this.createExplosion(other.x, other.y);
                        // Plays explosion sound
                        ASSET_MANAGER.playAsset("./audios/explosion.wav");

                        other.removeFromWorld = true;
                        player.health -= other.missileType.damage;
                        player.power = 0;
                    } 
                    else if (other instanceof AICar) {    // 1
                        // Exchange velocity
                        let xv = player.xVelocity;
                        let yv = player.yVelocity;
                        player.xVelocity = other.xVelocity;
                        player.yVelocity = other.yVelocity;
                        other.xVelocity = xv;
                        other.yVelocity = yv;

                        // Bounce off each other
                        let angle = Math.atan2(other.BB.x - player.BB.x, -(other.BB.y - player.BB.y));
                        let distance = PARAMS.PLAYER_SIZE -  Math.sqrt((other.BB.y - player.BB.y) * (other.BB.y - player.BB.y) + (other.BB.x - player.BB.x) * (other.BB.x - player.BB.x))
                        let dx = Math.sin(angle) * distance / 2;
                        let dy = Math.cos(angle) * distance / 2;
                        other.x += dx;
                        other.y -= dy;
                        player.x -= dx;
                        player.y += dy;
                    }
                    else if (other instanceof Mine) {    // 5
                        
                        // New. //Creates explosion effect for landmine
                        this.createExplosion(other.x, other.y, 2.0);  
                        // Plays mine explosion sound
                        ASSET_MANAGER.playAsset("./audios/explosion.wav");

                        other.removeFromWorld = true;
                        player.health -= other.damage;
                        player.power = 0;
                    }   
                    /*else if (other instanceof Mine) {    // 5
                        // Gets position BEFORE removing
                        const minePos = other.BB.center(); 
                        // Removes the mine
                        other.removeFromWorld = true;
                        // Applys damage AFTER position retrieval
                        player.health -= other.damage;
                        player.power = 0;
                        // Creates explosion
                        this.createExplosion(minePos.x, minePos.y);  //this freezes the car and explosion sprite at the mine. I don't know why
                    }*/   
                    else if (other instanceof OffRoad) {    // 7
                        player.power = Math.max(0, player.power - 0.038);
                        player.health -= 0.1;
                    }
                    else if (other instanceof FinishLine) {    // 9
                        player.running = false;
                        ASSET_MANAGER.pauseBackgroundMusic();
                        scene.sceneType = 4;
                    }
                    else if (other instanceof Block) {
                        player.x -= player.xVelocity / player.drag;
                        player.y += player.yVelocity / player.drag;
                    }    
                    // else if (other instanceof Boon) {    // 10

                    // }
                } 
                else if ((e1 instanceof AICar || e2 instanceof AICar) && e1.BB.collide(e2.BB)) {
                    let enemy = e1 instanceof AICar ? e1 : e2;
                    let other = e1 instanceof AICar ? e2 : e1;
                    if (other instanceof Projectile && !(other.owner instanceof AICar)) {    // 3
                        other.removeFromWorld = true;
                        enemy.health -= other.missileType.damage;
                    }
                    else if (other instanceof Mine) {    // 6
                        other.removeFromWorld = true;
                        enemy.health -= other.damage;
                        enemy.power = 0;
                    }
                    else if (other instanceof OffRoad) {    // 8
                        enemy.power = Math.max(0, enemy.power - 0.04);
                        enemy.health -= 0.1;
                    }
                    else if (other instanceof Block) {
                        enemy.x -= enemy.xVelocity / enemy.drag;
                        enemy.y += enemy.yVelocity / enemy.drag;
                    }
                } 
                else if (e1 instanceof Projectile && e2 instanceof Projectile && e1.BB.collide(e2.BB)) {  //4

                    // New. Creates explosion at midpoint between projectiles
                    const midX = (e1.x + e2.x) / 2;
                    const midY = (e1.y + e2.y) / 2;
                    this.createExplosion(midX, midY);
                    // Plays explosion sound
                    ASSET_MANAGER.playAsset("./audios/explosion.wav");

                    e1.removeFromWorld = true;
                    e2.removeFromWorld = true;
                }
            }
        }
    }

    // All below codes are new for particles effects
    /*handleProjectileImpacts(e1, e2) {
        const isProjectileVehicleCollision = 
            (e1 instanceof Projectile && e2 instanceof Vehicle) ||
            (e2 instanceof Projectile && e1 instanceof Vehicle);

        if (isProjectileVehicleCollision) {
            this.game.camera.shake(10);               // for screen shake
            const projectile = e1 instanceof Projectile ? e1 : e2;
            const target = e1 instanceof Vehicle ? e1 : e2;
            const impactPos = projectile.BB.center();

            if (projectile instanceof MissileProjectile) {
                this.createExplosion(impactPos.x, impactPos.y);
            } else if (projectile instanceof LaserProjectile) {
                this.createSparks(impactPos.x, impactPos.y);
            }
        }
    }

    // EFFECT CREATION METHODS
    createExplosion(x, y) {
        // Adding sprite-based explosion
        this.game.addEntity(new Explosion(this.game, x, y));

        const config = {
            count: 100, // Increased from 50
            speed: 300, // Increased from 200
            speedVariation: 50,
            spread: Math.PI * 2,
            angle: 0,
            lifespan: 1,
            lifespanVariation: 0.3,
            size: 10, // Increased from 6
            colors: ['#ff3300', '#ff9900', '#ffff00'],
            shakeIntensity: 15,          // screen shake property
            fade: true,
            acceleration: { x: 0, y: 50 },
            duration: 1
        };
        this.game.addEntity(new ParticleSystem(this.game, x, y, config));
    }

    createSparks(x, y) {
        const config = {
            count: 40, // Increased from 20
            speed: 100,
            speedVariation: 30,
            spread: Math.PI,
            angle: -Math.PI/2,
            lifespan: 0.5,
            lifespanVariation: 0.2,
            size: 5, // Increased from 3
            //colors: ['#00ffff', '#ffffff'],
            colors: ['#00ff00', '#ffffff'], // Brighter colors
            fade: true,
            duration: 0.5
        };
        this.game.addEntity(new ParticleSystem(this.game, x, y, config));
    }*/

}



