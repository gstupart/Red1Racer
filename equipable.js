class Equipable {
    /*
    * thisCost: Cost of equipable in shop
    * thisSpriteSheet: The spritesheet to be drawn or animated
    * thisEffect: The function describing the activatable effect of this equipable
    * thisAnimatedBool: Whether this equipable is an animated or drawn sprite.
    */
    constructor(thisCost, thisSpriteSheet, thisEffect, thisAnimatedBool) {
        Object.assign(this, {myCost:thisCost, mySpriteSheet:thisSpriteSheet, myEffect:thisEffect, myAnimatedBool:thisAnimatedBool})
    }

    draw(thisX, thisY, thisScale) {

    }

    animate(thisX, thisY) {
        
    }
}