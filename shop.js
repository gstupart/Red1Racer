class Shop {
    constructor(game, x, y, playerMoney, player) {
        Object.assign(this, { game, x, y, playerMoney, player });
        this.items = [
            { name: "Turbo Boost",  price: 200,     type: "Power Up", 
                effect: "Permanent Upgrade" },
            { name: "Maverick",     price: 500,     type: "Missile", 
                damage: MissileType.MAVERICK.damage, speed: MissileType.MAVERICK.speed, 
                fireRate: MissileType.MAVERICK.fireRate, frameIndex: MissileType.MAVERICK.frameIndex, 
                missileType: MissileType.MAVERICK },
            { name: "Side Winder",  price: 600,    type: "Missile", 
                damage: MissileType.SIDEWINDER.damage, speed: MissileType.SIDEWINDER.speed, 
                fireRate: MissileType.SIDEWINDER.fireRate, frameIndex: MissileType.SIDEWINDER.frameIndex, 
                missileType: MissileType.SIDEWINDER },
            { name: "Storm Shadow", price: 650,   type: "Missile", 
                damage: MissileType.STORM_SHADOW.damage, speed: MissileType.STORM_SHADOW.speed, 
                fireRate: MissileType.STORM_SHADOW.fireRate, frameIndex: MissileType.STORM_SHADOW.frameIndex, 
                missileType: MissileType.STORM_SHADOW },
            { name: "Sparrow",      price: 700,   type: "Missile", 
                damage: MissileType.SPARROW.damage, speed: MissileType.SPARROW.speed, 
                fireRate: MissileType.SPARROW.fireRate, frameIndex: MissileType.SPARROW.frameIndex, 
                missileType: MissileType.SPARROW },
            { name: "Torpedo",      price: 800,   type: "Missile", 
                damage: MissileType.TORPEDO.damage, speed: MissileType.TORPEDO.speed, 
                fireRate: MissileType.TORPEDO.fireRate, frameIndex: MissileType.TORPEDO.frameIndex, 
                missileType: MissileType.TORPEDO },
            { name: "Alamo",        price: 555,     type: "Missile", 
                damage: MissileType.ALAMO.damage, speed: MissileType.ALAMO.speed, 
                fireRate: MissileType.ALAMO.fireRate, frameIndex: MissileType.ALAMO.frameIndex, 
                missileType: MissileType.ALAMO },
            { name: "Small Rocket", price: 600,     type: "Missile", 
                damage: MissileType.SMALL_ROCKET.damage, speed: MissileType.SMALL_ROCKET.speed, 
                fireRate: MissileType.SMALL_ROCKET.fireRate, frameIndex: MissileType.SMALL_ROCKET.frameIndex, 
                missileType: MissileType.SMALL_ROCKET },
        ];
        this.vehicles = [
            { name: "Cyber Storm",  price: 440,    type: "Vehicle", vType: VehicleType.CYBER_STORM,
                damage: VehicleType.CYBER_STORM.damage, health: VehicleType.CYBER_STORM.health },
            { name: "Thunderbolt",  price: 420,    type: "Vehicle", vType: VehicleType.THUNDERBOLT,
                damage: VehicleType.THUNDERBOLT.damage, health: VehicleType.THUNDERBOLT.health },
            { name: "Razor Fang",  price: 440,    type: "Vehicle", vType: VehicleType.RAZOR_FANG,
                damage: VehicleType.RAZOR_FANG.damage, health: VehicleType.RAZOR_FANG.health },
            { name: "Rampage",  price: 450,    type: "Vehicle", vType: VehicleType.RAMPAGE,
                damage: VehicleType.RAMPAGE.damage, health: VehicleType.RAMPAGE.health },
        ]

        this.playerInventory = [];
        this.isOpen = true; 
        this.clickSound = new Audio("./audios/menuSound.mp3"); // new sound object 
        this.clickSound.volume = 0.1; // the sound valume initially be 0.2

        // 0=shop, 1=items
        this.state = 0;

        // Which weapon is displaying on "Available Items" section
        this.weaponIdx = 0;

        // Which vehicleis displaying on "Available Items" section
        this.vehicleIdx = 0;

        // Buttons
        let originalStyle = { font: "20px Arial", fillStyle: "rgb(200, 200, 200)" }
        let selectedStyle = { font: "20px Arial", fillStyle: "white" }
        this.shopBtn = new Button(game, 15, 15, 80, 30, originalStyle, selectedStyle, 
            "SHOP", "black", 38);
        this.itemBtn = new Button(game, 100, 15, 80, 30, originalStyle, selectedStyle, 
            "ITEMS", "black", 38);
        this.shopBtn.selected = true;

        // Buttons for switching weapons
        this.missileLeftBtn = new Button(game, 240, 355, 30, 30, originalStyle, selectedStyle, 
            "<", "black", 378);
        this.missileRightBtn = new Button(game, 920, 355, 30, 30, originalStyle, selectedStyle, 
            ">", "black", 378);
        this.setPrimaryBtn = new Button(game, 320, 400, 200, 30, originalStyle, selectedStyle, 
            "Set Primary Weapon", "black", 423);
        this.setSecondaryBtn = new Button(game, 530, 400, 230, 30, originalStyle, selectedStyle, 
            "Set Secondary Weapon", "black", 423);

        // Buttons for switching vehicles
        this.vehicleLeftBtn = new Button(game, 240, 485, 30, 30, originalStyle, selectedStyle, 
            "<", "black", 508);
        this.vehicleRightBtn = new Button(game, 920, 485, 30, 30, originalStyle, selectedStyle, 
            ">", "black", 508);
        this.setVehicleBtn = new Button(game, 320, 530, 200, 30, originalStyle, selectedStyle, 
            "Set Vehicle", "black", 553);

        this.itemBtns = [
            this.missileLeftBtn, this.missileRightBtn, this.setPrimaryBtn, this.setSecondaryBtn,
            this.vehicleLeftBtn, this.vehicleRightBtn, this.setVehicleBtn,
        ];

        // Next level Button
        this.continueBtn = new Button(game, 480, 720, 120, 30, originalStyle, selectedStyle, 
            "Next Race", "black", 743);

        // this.playerMoney = 10000;
    }

    buyItem(item) {
        if (this.playerMoney >= item.price) {
            this.playerMoney -= item.price;
            this.playerInventory.push(item);

            if (item.type === "Missile") {
                this.player.weapons.push(new MissileWeapon(this.game, this.player, item.missileType));
            } else if (item.type === "Vehicle") {
                this.player.vehicles.push(item.vType);
            }

            console.log(`You bought ${item.name}!`);
        } else {
            console.log("Not enough coins.");
        }
    }

    draw(ctx) {
        if (this.isOpen) {
            if (this.state == 0) {
                this.drawShop(ctx);
            } else if (this.state == 1) {
                this.drawItems(ctx);
            }
            
            // Tab selector
            this.shopBtn.draw(ctx);
            this.itemBtn.draw(ctx);
            this.continueBtn.draw(ctx);
        }
    }

    // Draw the item page
    drawItems(ctx) {
        // Draw shop UI background
        ctx.fillStyle = "green";
        ctx.fillRect(10, 10, PARAMS.CANVAS_WIDTH - 20, PARAMS.CANVAS_HEIGHT - 20);
        ctx.fillStyle = "#FFA500";
        ctx.fillRect(10, 280, PARAMS.CANVAS_WIDTH - 20, 300);

        // Draw player weapon text
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText(`Current Equipments`, 
            PARAMS.CANVAS_WIDTH / 2 - ctx.measureText("Current Equipments").width / 2, 90);

        // Horizontal labels
        let labels = ["NAME", "SPEED", "DAMAGE", "FIRE RATE", "HEALTH"];
        for (let i = 0; i < labels.length; i++) {
            ctx.fillText(labels[i], 250 + i * 150, 140);
        }

        // Vertical labels
        labels = ["Primary Weapon", "Secondary Weapon", "Vehicle"];
        for (let i = 0; i < labels.length; i++) {
            ctx.fillText(labels[i], 210 - ctx.measureText(labels[i]).width, 180 + i * 40);
        }

        // Values
        ctx.font = "18px Arial";
        let values = []
        // Primary weapon
        let item = this.player.primaryWeapon;
        let hasItem = item instanceof MissileWeapon;
        values.push([
            hasItem ? item.missileType.name : "-", hasItem ? item.projectileSpeed : "-", 
            hasItem ? item.damage : "-", hasItem ? item.fireRate : "-", "-"
        ]);
        // Secondary weapon
        item = this.player.secondaryWeapon;
        hasItem = item instanceof MissileWeapon;
        values.push([
            hasItem ? item.missileType.name : "-", hasItem ? item.projectileSpeed : "-", 
            hasItem ? item.damage : "-", hasItem ? item.fireRate : "-", "-"
        ]);
        // Vehicle
        item = this.player.type;
        values.push([item.name, "-", item.damage, "-", item.health]);
        // Fill values
        for (let i = 0; i < values.length; i++) {
            for (let j = 0; j < values[i].length; j++) {
                ctx.fillText(values[i][j], 250 + j * 150, 180 + i * 40);
            }
        }

        // Available items
        ctx.font = "20px Arial";
        ctx.fillText(`Available Equipments`, 
            PARAMS.CANVAS_WIDTH / 2 - ctx.measureText("Available Equipments").width / 2, 310);

        // Weapons
        // Labels
        labels = ["NAME", "SPEED", "DAMAGE", "FIRE RATE"];
        for (let i = 0; i < labels.length; i++) {
            ctx.fillText(labels[i], 330 + i * 150, 350);
        }
        ctx.fillText("Missle", 180 - ctx.measureText("Missle").width, 380);
        // Values
        let weapon = this.player.weapons.length > 0 ? this.player.weapons[this.weaponIdx] : null;
        if (weapon == null) {
            for (let i = 0; i < 4; i++) {
                ctx.fillText("-", 330 + i * 150, 380);
            }
        } else {
            let values = [weapon.missileType.name, weapon.projectileSpeed, 
                weapon.damage, weapon.fireRate];
            for (let i = 0; i < values.length; i++) {
                ctx.fillText(values[i], 330 + i * 150, 380);
            }
        }
        ctx.fillText(this.player.weapons.length > 0 ? `${this.weaponIdx + 1} of ${this.player.weapons.length}` : "0 of 0", 
            240, 420);

        // Vehicles
        // Labels
        labels = ["NAME", "HEALTH", "DAMAGE"];
        for (let i = 0; i < labels.length; i++) {
            ctx.fillText(labels[i], 330 + i * 150, 480);
        }
        ctx.fillText("Vehicle", 180 - ctx.measureText("Vehicle").width, 510);
        // Values
        let v = this.player.vehicles[this.vehicleIdx];
        values = [v.name, v.health, v.damage];
        for (let i = 0; i < values.length; i++) {
            ctx.fillText(values[i], 330 + i * 150, 510);
        }
        ctx.fillText(`${this.vehicleIdx + 1} of ${this.player.vehicles.length}`, 240, 550);

        this.itemBtns.forEach(btn => { btn.draw(ctx) });

        // Display player status
        ctx.fillStyle = "white";
        ctx.fillText("PLAYER INFO", 30, 620);
        let damageText = `Damage: ${this.player.primaryWeapon ? this.player.type.damage + this.player.primaryWeapon.damage : 0}, ${this.player.secondaryWeapon ? this.player.type.damage + this.player.secondaryWeapon.damage : 0}`;
        ctx.fillText(damageText, 30, 660);
        let healthText = `Health: ${this.player.maxHealth}`;
        ctx.fillText(healthText, 270, 660);
        // Display tooltip
        const mouse = this.game.mouse;
        let inRow = mouse && mouse.y >= 640 && mouse.y <= 660;
        if (inRow && mouse.x >= 30 && mouse.x <= 30 + ctx.measureText(damageText).width)
            ctx.fillText("Damage of each weapon equals to the damage of the vehicle plus its owen damage", 30, 690);
        else if (inRow && mouse.x >= 270 && mouse.x <= 230 + ctx.measureText(healthText).width)
            ctx.fillText("Maximum health equals to the health of vehicle", 30, 690);
    }

    // Draw the shop page
    drawShop(ctx) {
        // Draw shop UI background
        ctx.fillStyle = "rgba(186, 8, 8, 0.8)";
        ctx.fillRect(10, 10, 700, PARAMS.CANVAS_HEIGHT - 20);

        // Player's money
        ctx.font = "20px Arial";
        ctx.fillStyle = "blue";
        ctx.fillText(`Player Coins: ${this.playerMoney}`, 300, 100);
        
        ctx.fillText(`#`, 30, 140);
        ctx.fillText(`NAME`, 80, 140);
        ctx.fillText(`PRICE`, 250, 140);
        ctx.fillText(`TYPE`, 350, 140);
        ctx.fillText('Speed', 480, 140);
        ctx.fillText('Damage', 600, 140);

        const evenspace = 30;
        // if click then play sound
        if(this.game.click){
            this.clickSound.play();
        }
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
           
            ctx.fillText(`${i}.`, 30, y); // Item index
            ctx.fillText(`${item.name}`, 80, y); // Item name
            ctx.fillText(`${item.price}`, 250, y); // Item price
            ctx.fillText(`${item.type}`, 350, y); // Item type
            ctx.fillText(`${item.speed ? item.speed : "-"}`, 480, y); // Item Speed
            ctx.fillText(`${item.damage ? item.damage : "-"}`, 600, y); // Item Damage
            // Handle click to buy
            if (hover && this.game.click) {
                this.game.click = false; // Reset click to prevent multiple triggers
                this.buyItem(item);
            }
        }

        let tempY = 170 + (this.items.length + 1) * 30;
        ctx.fillStyle = "blue";
        ctx.fillText('Health', 480, tempY);
        ctx.fillText('Damage', 600, tempY);
        if (this.vehicles.length == 0) ctx.fillText("No vehicle available", 30, tempY + 40);
        // Iterate over vehicles using a for loop
        for (let i = 0; i < this.vehicles.length; i++) {
            const v = this.vehicles[i];
            // y position start at 170 and give 30 px space between each index
            const y = 170 + (i + this.items.length + 2) * 30;
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
           
            ctx.fillText(`${i + this.items.length}.`, 30, y); // Item index
            ctx.fillText(`${v.name}`, 80, y); // Item name
            ctx.fillText(`${v.price}`, 250, y); // Item price
            ctx.fillText(`${v.type}`, 350, y); // Item type
            ctx.fillText(`${v.health}`, 480, y); // Item Speed
            ctx.fillText(`${v.damage}`, 600, y); // Item Damage
            // Handle click to buy
            if (hover && this.game.click) {
                this.game.click = false; // Reset click to prevent multiple triggers
                this.buyItem(v);
                this.vehicles.splice(i, 1);
                i--;
            }
        }

        // Player purchased Invemtory on right
        ctx.fillStyle = "green";
        ctx.fillRect(710, 10, PARAMS.CANVAS_WIDTH - 720, PARAMS.CANVAS_HEIGHT - 20);
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
    
    update() {
        // Update tab selector
        if (this.shopBtn.isClicked()) {
            this.shopBtn.selected = true;
            this.itemBtn.selected = false;
            this.state = 0;
        } else if (this.itemBtn.isClicked()) {
            this.shopBtn.selected = false;
            this.itemBtn.selected = true;
            this.state = 1;
        }

        if (this.continueBtn.isClicked()) {
            this.game.camera.sceneType = 5;
            this.isOpen = false;
            this.game.entities.forEach((entity) => {
                entity.removeFromWorld = true;
            });
            console.log("Continue clicked", this.game.camera.sceneType);
        }

        // In Item tab
        if (this.state == 1) {
            // Update weapon selector
            if (this.missileLeftBtn.isClicked() && this.weaponIdx > 0) 
                this.weaponIdx--;
            else if (this.missileRightBtn.isClicked() && this.weaponIdx < this.player.weapons.length - 1) 
                this.weaponIdx++;
            else if (this.setPrimaryBtn.isClicked()) {
                if (this.player.weapons[this.weaponIdx] === this.player.secondaryWeapon) {
                    let temp = this.player.primaryWeapon;
                    this.player.setPrimaryWeapon(this.player.weapons[this.weaponIdx]);
                    this.player.setSecondaryWeapon(temp);
                } else {
                    this.player.setPrimaryWeapon(this.player.weapons[this.weaponIdx]);
                }
            } else if (this.setSecondaryBtn.isClicked()) {
                if (this.player.weapons[this.weaponIdx] === this.player.primaryWeapon) {
                    let temp = this.player.secondaryWeapon;
                    this.player.setSecondaryWeapon(this.player.weapons[this.weaponIdx]);
                    this.player.setPrimaryWeapon(temp);
                } else {
                    this.player.setSecondaryWeapon(this.player.weapons[this.weaponIdx]);
                }
            }
            let weapon = this.player.weapons[this.weaponIdx];
            this.setPrimaryBtn.selected = (weapon === this.player.primaryWeapon);
            this.setSecondaryBtn.selected = (weapon === this.player.secondaryWeapon);

            // Update vehicle selector
            if (this.vehicleLeftBtn.isClicked() && this.vehicleIdx > 0) 
                this.vehicleIdx--;
            else if (this.vehicleRightBtn.isClicked() && this.vehicleIdx < this.player.vehicles.length - 1) 
                this.vehicleIdx++;
            else if (this.setVehicleBtn.isClicked()) {
                this.player.setVehicle(this.player.vehicles[this.vehicleIdx]);
            }
            let v = this.player.vehicles[this.vehicleIdx];
            this.setVehicleBtn.selected = (this.player.type === v);
        }

        if (this.state == 1 && this.game.click) this.game.click = null;
    }
}