class CircularBB extends BoundingBox {
    /**
     * Create a circular bounding box.
     * 
     * @param {number} x The x-coordinate of the center point of the bounding box.
     * @param {number} y The y-coordinate of the center point of the bounding box.
     * @param {number} radius The radius of the circle.
     */
    constructor(x, y, radius) {
        super(x, y);
        this.radius = radius;
    };
}