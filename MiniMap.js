
class MiniMap {
    constructor(game, width = 200, height = 100, x = 10, y = 10) {
        this.game = game;
        this.width = width;
        this.height = height;
        this.posX = x;
        this.posY = y;
        this.entities = [];
        this.border = 0; // padding inside minimap
        this.backgroundOpacity = 0.9; // adjusted map visibility to 90%
        this.posX = 820;  // pixels from left
        this.posY = 6;  // pixels from top
    }

    update() {
        this.entities = this.game.entities.filter(e => 
            e instanceof Player || e instanceof AICar
        );
    }
    
    draw(ctx) {
        // Only shows mini-map during racing (sceneType 1)
        if (this.game.camera.sceneType !== 1) return; 

        if (!this.game.camera?.currentMap) return;
        const map = this.game.camera.currentMap;
    
        // Gets the map's actual background image
        const mapImage = map.spritesheet;
        if (!mapImage) return;

        // forces the background image to fit exactly within the mini-map frame
        ctx.save();
        ctx.globalAlpha = this.backgroundOpacity;
        ctx.drawImage(
            mapImage,
            0, 0, map.width, map.height, // source dimensions
            this.posX, this.posY, // mini-map frame position
            this.width, this.height // force fit to frame
        );
        ctx.globalAlpha = 1.0;

        // mini-map border
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 1;
        ctx.strokeRect(this.posX, this.posY, this.width, this.height);

        // scale calculations for entities
        const scaleX = this.width / (map.width * map.scale);
        const scaleY = this.height / (map.height * map.scale);

        // draws entities in correct positions
        this.entities.forEach(entity => {
            if (!entity.BB) return;

            // converts game world coordinates to mini-map coordinates
            const x = this.posX + (entity.x * scaleX);
            const y = this.posY + (entity.y * scaleY);

            // for entity
            ctx.beginPath();
            ctx.fillStyle = entity.constructor.name === "Player" ? "#00FF00" : "#FF0000";  //cars --> green & red
            ctx.arc(x, y, entity instanceof Player ? 4 : 3, 0, Math.PI * 2);
            ctx.fill();
        });

        // // circular camera viewport
        // if (this.game.camera) {
        //     const cameraX = this.posX + (this.game.camera.x * scaleX);
        //     const cameraY = this.posY + (this.game.camera.y * scaleY);
        //     const viewRadius = Math.max(PARAMS.CANVAS_WIDTH, PARAMS.CANVAS_HEIGHT) * scaleX / 2;

        //     ctx.strokeStyle = 'rgba(255, 255, 0, 0.8)';
        //     ctx.lineWidth = 2;
        //     ctx.beginPath();
        //     ctx.arc(cameraX, cameraY, viewRadius, 0, Math.PI * 2);
        //     ctx.stroke();
        // }

        ctx.restore();
    } 
}










