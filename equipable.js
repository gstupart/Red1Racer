class Equipable {
    /*
    * thisName: The name of the equipable.
    * thisOwner: The current owner of the equipable. Null if unowned.
    * thisCost: Cost of equipable in shop
    * thisSpriteSheet: The spritesheet to be drawn or animated
    * thisEffect: The function describing the activatable effect of this equipable
    */
    constructor(thisName, thisOwner, thisCost, thisSpriteSheet, thisEffect) {
        Object.assign(this, {myName:thisName, myOwner:thisOwner, myCost:thisCost, mySpriteSheet:thisSpriteSheet, myEffect:thisEffect})
    }
}