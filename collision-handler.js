class CollisionHandler {
    /**
     * This function will handle collision between entities. 
     * 
     * If collision happens between ...
     * 1. a player and an enemy, they will get bounce off from each other.
     * 2. a projectile come from an enemy and a player, the projectile will be removed from the 
     * game and make some damage to the player.
     * 3. a projectile come from a player and an enemy, the projectile will be removed from the 
     * game and make some damage to the enemy.
     * 4. two projectiles that come from different owner, they will both be removed from the game.
     * 5. a obstacle and a player, damage to the player.
     * 6. a obstacle and an enemy, damage to the enemy.
     * 7. the grass and a player, slow down the player and make small amount of damage every certain second.
     * 8. the grass and an enemy, slow down the enemy and make small amount of damage every certain second.
     * 9. the finish line and a player, finish this level
     * 10. a boon and a player
     */
    handleCollision(entities) {
        let length = entities.length;

        for (let i = 0; i < length - 1; i++) {
            let e1 = entities[i];

            // No collision will happen with map or weapon itself
            if (e1 instanceof Map ||  e1 instanceof Weapon || e1.removeFromWorld) continue;

            for (let j = i + 1; j < length; j++) {
                let e2 = entities[j];
                
                // No collision will happen with map or weapon itself
                if (e2 instanceof Map || e2 instanceof Weapon || e2.removeFromWorld) continue;

                // Check for player, enemy, and projectile because all collisions happen around them
                if ((e1 instanceof Player || e2 instanceof Player) && e1.BB.collide(e2.BB)) {
                    let player = e1 instanceof Player ? e1 : e2;
                    let other = e2 instanceof Player ? e1 : e2;
                    if (other instanceof Projectile && !(other.owner instanceof Player)) {    // 2
                        other.removeFromWorld = true;
                        player.health -= other.missileType.damage;
                    } 
                    // else if (other instanceof AICar) {    // 1

                    // }
                    // TODO: Implement other collisions (1, 5, 7, 9, 10) for player
                } 
                // else if ((e1 instanceof AICar || e2 instanceof AICar) && e1.BB.collide(e2.BB)) {
                //     // TODO: Implement other collisions (3, 6, 8) for enemy
                // } 
                else if (e1 instanceof Projectile && e2 instanceof Projectile && e1.BB.collide(e2.BB)) {  //4
                    e1.removeFromWorld = true;
                    e2.removeFromWorld = true;
                }
            }
        }
    }
}