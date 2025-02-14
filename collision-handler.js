class CollisionHandler {
    /**
     * This function will handle collision between entities. 
     * 
     * If collision happens between ...
     * 1. a player and an enemy, they will get bounce off from each other.
     * 2. a projectile come from an enemy and a player, the projectile will be removed from the game and make some damage to the player.
     * 3. a projectile come from a player and an enemy, the projectile will be removed from the game and make some damage to the enemy.
     * 4. two projectiles that come from different owner, they will both be removed from the game.
     * 5. a obstacle and a player, damage/effect to the player.
     * 6. a obstacle and an enemy, damage/effect to the enemy.
     * 7. the offroad area and a player, slow down the player and make small amount of damage every certain second.
     * 8. the offroad area and an enemy, slow down the enemy and make small amount of damage every certain second.
     * 9. the finish line and a player, finish this level
     * 10. a boon and a player
     * 11. two enemies, they will get bounce off from each other.
     * 
     * @param {*} entities List of entities to check.
     * @param {SceneManager} scene The scene manager.
     */
    handleCollision(entities, scene) {
        let length = entities.length;

        for (let i = 0; i < length - 1; i++) {
            let e1 = entities[i];

            // No collision will happen with map or weapon itself
            if (e1 instanceof Map || e1 instanceof Weapon || e1 instanceof Transition 
                || e1 instanceof Explosion || e1.removeFromWorld) continue;

            for (let j = i + 1; j < length; j++) {
                let e2 = entities[j];
                
                // No collision will happen with map or weapon itself
                if (e2 instanceof Map || e2 instanceof Weapon || e2 instanceof Transition 
                    || e2 instanceof Explosion ||e2.removeFromWorld) continue;

                // Check for player, enemy, and projectile because all collisions happen around them

                // Work for both player and AI racer
                if ((e1 instanceof Player || e2 instanceof Player ) && e1.BB.collide(e2.BB)) {
                    let racer = e1 instanceof Player ? e1 : e2;
                    let other = e1 instanceof Player ? e2 : e1;
                    if (other instanceof Player) {    // 1, 11
                        // Exchange velocity
                        let xv = racer.xVelocity;
                        let yv = racer.yVelocity;
                        racer.xVelocity = other.xVelocity;
                        racer.yVelocity = other.yVelocity;
                        other.xVelocity = xv;
                        other.yVelocity = yv;

                        // Bounce off each other
                        let angle = Math.atan2(other.BB.x - racer.BB.x, -(other.BB.y - racer.BB.y));
                        let distance = PARAMS.PLAYER_SIZE -  Math.sqrt((other.BB.y - racer.BB.y) * (other.BB.y - racer.BB.y) 
                                        + (other.BB.x - racer.BB.x) * (other.BB.x - racer.BB.x));
                        let dx = Math.sin(angle) * distance / 2;
                        let dy = Math.cos(angle) * distance / 2;
                        other.x += dx;
                        other.y -= dy;
                        racer.x -= dx;
                        racer.y += dy;
                    }
                    else if (other instanceof Mine) {    // 5, 6
                        other.removeFromWorld = true;
                        racer.health -= other.damage;
                        racer.power = 0;
                        scene.game.addEntity(new Explosion(scene.game, other.BB.x, other.BB.y));
                    }
                    else if (other instanceof Rock) {    // 5, 6
                        if (racer.power > 0.1) racer.power -= 0.4;
                    }
                    else if (other instanceof Spike && other.state == 1 && other.elapsedTime >= 0.32) {    // 5, 6
                        racer.health -= other.damage;
                    }
                    else if (other instanceof Suriken) {    // 5, 6
                        racer.health -= other.damage;
                    }
                    else if (other instanceof OffRoad) {    // 7, 8
                        if (racer instanceof AICar) {
                            if (racer.getDesiredSpeed() > 0) {
                                racer.power = Math.max(0.5, racer.power - 0.04);
                            } else {
                                racer.power = Math.max(0, racer.power - 0.04);
                            }
                        } else {
                            if (!scene.getGame().keyW) {
                                racer.power = Math.max(0, racer.power - 0.038);
                            } else {
                                racer.power = Math.max(0.5, racer.power - 0.038);
                            }
                        }
                        racer.power = Math.max(0, racer.power - 0.04);
                        racer.health -= 0.1;
                    }
                    else if (other instanceof Block) {
                        racer.x -= racer.xVelocity / racer.drag;
                        racer.y += racer.yVelocity / racer.drag;
                    }
                    else if (other instanceof FinishLine) {
                        racer.finished = true;
                    }
                }

                // Player
                if ((e1 instanceof Player && !(e1 instanceof AICar) || e2 instanceof Player && !(e2 instanceof AICar)) 
                    && e1.BB.collide(e2.BB)) {
                    let player = e1 instanceof Player && !(e1 instanceof AICar) ? e1 : e2;
                    let other = e1 instanceof Player && !(e1 instanceof AICar) ? e2 : e1;
                    if (other instanceof Projectile && other.owner instanceof AICar) {    // 2
                        other.removeFromWorld = true;
                        player.health -= other.missileType.damage;
                        player.power = 0;
                        scene.game.addEntity(new Explosion(scene.game, other.BB.x, other.BB.y));
                    } 
                    else if (other instanceof FinishLine) {    // 9
                        this.running = false;
                        ASSET_MANAGER.pauseBackgroundMusic();
                        scene.sceneType = 4;
                    }
                    // else if (other instanceof Boon) {    // 10

                    // }
                } 
                // AI racer
                if ((e1 instanceof AICar || e2 instanceof AICar) && e1.BB.collide(e2.BB)) {
                    let enemy = e1 instanceof AICar ? e1 : e2;
                    let other = e1 instanceof AICar ? e2 : e1;
                    if (other instanceof Projectile && !(other.owner instanceof AICar)) {    // 3
                        other.removeFromWorld = true;
                        enemy.health -= other.missileType.damage;
                        enemy.power = 0;
                        scene.game.addEntity(new Explosion(scene.game, other.BB.x, other.BB.y));
                    }
                    else if (other instanceof AICar) {    // 1
                        // Exchange velocity
                        let xv = enemy.xVelocity;
                        let yv = enemy.yVelocity;
                        enemy.xVelocity = other.xVelocity;
                        enemy.yVelocity = other.yVelocity;
                        other.xVelocity = xv;
                        other.yVelocity = yv;

                        // Bounce off each other
                        let angle = Math.atan2(other.BB.x - enemy.BB.x, -(other.BB.y - enemy.BB.y));
                        let distance = PARAMS.PLAYER_SIZE -  Math.sqrt((other.BB.y - enemy.BB.y) * (other.BB.y - enemy.BB.y) + (other.BB.x - enemy.BB.x) * (other.BB.x - enemy.BB.x))
                        let dx = Math.sin(angle) * distance / 2;
                        let dy = Math.cos(angle) * distance / 2;
                        other.x += dx;
                        other.y -= dy;
                        enemy.x -= dx;
                        enemy.y += dy;
                    }
                } 
                // Projectile
                else if (e1 instanceof Projectile && e2 instanceof Projectile && e1.BB.collide(e2.BB)) {  //4
                    e1.removeFromWorld = true;
                    e2.removeFromWorld = true;
                    let midX = (e1.x + e2.x) / 2;
                    let midY = (e1.y + e2.y) / 2;
                    scene.game.addEntity(new Explosion(scene.game, midX, midY));
                }
            }
        }
    }
}