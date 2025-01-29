/**
 * Collection of items that players own.
 */
class Items {
    constructor() {
        this.weapons = [];
        this.powerups = [];
        this.vehicles = [];

        this.money = 0;
    }

    addWeapon(weapon) {
        if (weapon instanceof Weapon) {
            this.weapons.push(weapon);
        } else {
            console.log("You are trying to add something that's not a weapon to the weapon list");
        }
    }

    // TODO: function to add powerups
    // TODO: function to add vehicles
}