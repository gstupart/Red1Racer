class Vehicle extends Equipable {
    /*
    * thisSpeedRating: The bonus to vehicle speed the car provides
    * thisHealthRating: The bonus to vehicle health the car provides
    * thisDamageRating: The bonus to vehicle damage the car provides
    */
    constructor(thisName, thisOwner, thisCost, thisSpriteSheet, thisEffect, thisSpeedRating, thisHealthRating, thisDamageRating) {
        super(thisName, thisOwner, thisCost, thisSpriteSheet, thisEffect)
        Object.assign(this, {mySpeedRating:thisSpeedRating, myHealthRating:thisHealthRating, myDamageRating:thisDamageRating})
    }



}