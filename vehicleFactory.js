class VehicleFactory {

    createSpeed1() {
        return new Vehicle("Speed1", null, 100, ASSET_MANAGER.getAsset("INSERT_PATH"), boost(), 2, 1, 1)
    }

    async boost(thisOwner) {
        thisOwner.velocity += 5
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
        thisOwner.velocity = Math.min(thisOwner.velocity - 5, thisOwner.minVelocity)
    }
}