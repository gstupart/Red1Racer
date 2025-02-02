
class Shop {
    constructor(game, x, y, playerMoney, player) {
        Object.assign(this, { game, x, y, playerMoney, player });
        this.items = [
            { name: "Turbo Boost", price: 200, type: "Power Up", effect: "Permanent Upgrade" },
            { name: "Maverick", price: 500, type: "Missile", damage: 40, speed: 6, fireRate: 0.4, frameIndex: 0, missileType: MissileType.MAVERICK },
            { name: "Side Winder", price: 1000, type: "Missile", damage: 35, speed: 7, fireRate: 0.5, frameIndex: 1, missileType: MissileType.SIDEWINDER },
            { name: "Storm Shadow", price: 10000, type: "Missile", damage: 45, speed: 5, fireRate: 0.3, frameIndex: 2, missileType: MissileType.STORM_SHADOW },
            { name: "Sparrow", price: 10500, type: "Missile", damage: 30, speed: 8, fireRate: 0.6, frameIndex: 3, missileType: MissileType.SPARROW },
            { name: "Torpedo", price: 10600, type: "Missile", damage: 50, speed: 4, fireRate: 0.2, frameIndex: 4, missileType: MissileType.TORPEDO },
            { name: "Alamo", price: 500, type: "Missile", damage: 38, speed: 6.5, fireRate: 0.45, frameIndex: 5, missileType: MissileType.ALAMO },
            { name: "Small Rocket", price: 600, type: "Missile", damage: 25, speed: 9, fireRate: 0.7, frameIndex: 6, missileType: MissileType.SMALL_ROCKET},
            { name: "Speedster", price: 1500, type: "New Car" },
            { name: "Tank", price: 2000, type: "New Tank" }
        ];
        this.playerInventory = [];
        this.isOpen = true; 
    }

    buyItem(item) {
        if (this.playerMoney >= item.price) {
            this.playerMoney -= item.price;
            this.playerInventory.push(item);

            if (item.type === "Missile") {
                this.player.weapons.push(new MissileWeapon(this.game, this.player, item.missileType));
            } else if (item.type === "New Car") {
                this.player.cars.push(item);
            } else if (item.type === "New Tank") {
                this.player.tanks.push(item);
            }

            console.log(`You bought ${item.name}!`);
        } else {
            console.log("Not enough coins.");
        }
    }

    draw(ctx) {
        if (this.isOpen) {
            // Draw shop UI background
            
            ctx.fillStyle = "rgba(186, 8, 8, 0.8)";
            ctx.fillRect(10, 10, 700, 750);
    
            // Player's money
            ctx.fillStyle = "blue";
            ctx.font = "20px Arial";
            ctx.fillText(`Player Coins: ${this.playerMoney}`, 300, 100);
            
            ctx.fillText(`#`, 120, 140);
            ctx.fillText(`NAME`, 160, 140);
            ctx.fillText(`PRICE`, 350, 140);
            ctx.fillText(`TYPE`, 550, 140);

            const evenspace = 30;

            // Iterate over items using a for loop
            for (let i = 0; i < this.items.length; i++) {
                const item = this.items[i];
                // y position start at 170 and give 30 px space between each index
                const y = 170 + i * 30;
                // mouse listeners from gameengine
                const mouse = this.game.mouse;
    
                // Hover detection
                const hover =
                    mouse &&
                    mouse.x >= 120 &&
                    mouse.x <= 420 && 
                    mouse.y >= y - 20 &&
                    mouse.y <= y - 20 + 25;
    
                // Changes the color when hovering
                ctx.fillStyle = hover ? "yellow" : "blue";
               
                ctx.fillText(`${i}.`, 120, y); // Item index
                ctx.fillText(`${item.name}`, 160, y); // Item name
                ctx.fillText(`${item.price}`, 350, y); // Item price
                ctx.fillText(`${item.type}`, 550, y); // Item type
                // Handle click to buy
                if (hover && this.game.click) {
                    this.game.click = false; // Reset click to prevent multiple triggers
                    this.buyItem(item);
                }
            }

            // Player purchased Invemtory on right
            ctx.fillStyle = "green";
            ctx.fillRect(710,10,310,750);
            // Inventory header
            ctx.fillStyle = "white";
            ctx.font = "18px Arial";
            ctx.fillText("Player Inventory", 800, 90);

            // total holds the sum of purchases
            let total = 0.0;

            // List inventory items
            for (let i = 0; i < this.playerInventory.length; i++) {
                const item = this.playerInventory[i];
                const y = 170 + i * 30; // Positioning of each inventory item
                ctx.fillStyle = "white";
                ctx.fillText(`${item.name}`, 800, y);
                total += item.price;
            }
            // Close shop instruction
            ctx.fillStyle = "white";
            // Display player purchase total
            ctx.fillText(`Total: ${total.toFixed(2)}`, 800, 170 + this.playerInventory.length * 30 + 40);
        }
    }
    
    update() {
        // No additional logic required here
    }
}
