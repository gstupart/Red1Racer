// still working on it 
class NavigationArrow {
    constructor(game, player, finishLine) {
        Object.assign(this, { game, player, finishLine });
        this.BB = new RectangularBB(-100, -100, 0, 0);  //dummy bounding box to satisfy collision handling.
    }
    
    update() { }
    
    //dummy collide method so the collision handler doesn't throw an error. 
    collide(other) { }
    
    draw(ctx) {
        let target = null;
        const waypoints = this.player.waypoints;
        //player's forward unit vector (based on current facing angle).
        let forward = { x: Math.cos(this.player.degree), y: Math.sin(this.player.degree) };
        let minDist = Infinity;
        
        //iterate over all waypoints to find the one in front with the smallest distance.
        if (waypoints && waypoints.length > 0) {
            for (let i = 0; i < waypoints.length; i++) {
                let wp = waypoints[i];
                let dx = wp.x - this.player.x;
                let dy = wp.y - this.player.y;
                // Dot product to check if waypoint is in front.
                let dot = dx * forward.x + dy * forward.y;
                if (dot > 0) { // waypoint is ahead
                    let dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < minDist) {
                        minDist = dist;
                        target = wp;
                    }
                }
            }
        }
        //if no waypoint is ahead, fallback to the finish line's center.
        if (!target) {
            target = {
                x: this.finishLine.x + this.finishLine.w / 2,
                y: this.finishLine.y + this.finishLine.h / 2
            };
        }
        
        //computes the absolute angle from the player's position to the target.
        let targetAngle = Math.atan2(target.y - this.player.y, target.x - this.player.x);
        // computes the relative angle (difference between target direction and player's heading).
        let relativeAngle = targetAngle - this.player.degree;
        //normalize to [-π, π]
        relativeAngle = Math.atan2(Math.sin(relativeAngle), Math.cos(relativeAngle));
        
        //draws the arrow as a HUD overlay.
        ctx.save();
        //resets transforms so the arrow is drawn in screen space.
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        let canvas = ctx.canvas;
        let arrowX = canvas.width / 2;  // center horizontally.
        let arrowY = 50;                // 50 pixels from the top.
        
        //translates to the fixed HUD position and rotate by the relative angle.
        ctx.translate(arrowX, arrowY);
        ctx.rotate(relativeAngle);
        
        //draws a simple triangular arrow.
        ctx.beginPath();
        ctx.moveTo(0, -20);    //tip of the arrow (points upward when no turn is needed).
        ctx.lineTo(-10, 10);
        ctx.lineTo(10, 10);
        ctx.closePath();
        ctx.fillStyle = "red";
        ctx.fill();
        
        ctx.restore();
    }

}








