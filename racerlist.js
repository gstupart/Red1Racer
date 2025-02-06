class RacerList {
    constructor(game) {
        this.game = game;
        this.list = [];
    }

    /**
     * Add a racer to the racer list. The racer most be a Player or AICar.
     * 
     * @param {Player} racer The racer to be added.
     */
    addRacer(racer) {
        let length = this.list.length;
        this.list.push(new RacerListItem(this.game, racer, length + 1));
    }

    /**
     * Sort the racer list and update each racer list item based on their new order.
     */
    update() {
        // Sort racers
        this.list.sort((a, b) => {
            if (a.racer.finished && !b.racer.finished) return -1;       // a finished first
            else if (!a.racer.finished && b.racer.finished) return 1;   // b finished first
            else if (a.racer.finished && b.racer.finished) return 0;    // noth finished, keep current order
            else {
                let finish = {x: this.game.camera.finishLine.x, y: this.game.camera.finishLine.y};
                return getDistance(finish, {x: a.racer.x, y: a.racer.y}) - getDistance(finish, {x: b.racer.x, y: b.racer.y});
            }
        });

        // Update each racer list item
        for (let i = 0; i < this.list.length; i++) {
            this.list[i].rank = i + 1;
            this.list[i].update();
        }
    }

    draw(ctx) {
        this.list.forEach(item => {
            item.draw(ctx);
        });
    }
}

class RacerListItem {
    /**
     * Create an item on the racer list to represent a racer.
     * 
     * @param {GameEngine} game The game engine
     * @param {Player} racer A player or AI car.
     * @param {number} rank The rank of the racer. Rank start with 1.
     */
    constructor(game, racer, rank) {
        Object.assign(this, { game, racer, rank });
        this.x = 10;
        this.y = 60 + 90 * rank;
    }

    /**
     * Change the position of the item by changing y-coordinate only.
     */
    update() {
        let expectedY = 60 + 90 * this.rank;
        if (this.y < expectedY) this.y += 5;
        else if (this.y > expectedY) this.y -= 5;
        // console.log(this.rank, this.racer.label, expectedY, this.y);
    }

    draw(ctx) {
        // Draw background
        let grad = ctx.createLinearGradient(150, 0, 200, 0);
        if (this.racer instanceof AICar) grad.addColorStop(0, "rgba(140, 146, 172, 0.8)");
        else grad.addColorStop(0, "rgba(14, 134, 212, 0.8)");
        grad.addColorStop(1, "rgba(256, 256, 256, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(this.x, this.y, 200, 85);

        ctx.fillStyle = "white";

        // Rank
        ctx.font = '25px "Jersey 15"';
        ctx.fillText(this.rank, this.x + 5, this.y + 25);

        // Label
        ctx.font = '35px "Jersey 15"';
        ctx.fillText(this.racer.label, this.x + 30, this.y + 25);

        // Health
        ctx.font = '30px "Jersey 15"';
        ctx.fillText(`HP: ${Math.round(this.racer.health)} / ${this.racer.maxHealth}`, this.x + 30, this.y + 50);

        // Whether the facer finished the level
        if (this.racer.finished) {
            ctx.font = '30px "Jersey 15"';
            ctx.fillText("Finished", this.x + 30, this.y + 75);
        }
    }
}