class RectangularBB extends BoundingBox {
    /**
     * Create a rectangular bounding box for the entity.
     * 
     * @param {number} x The x-coordinate of the upper left corner of the bounding box.
     * @param {number} y The y-coordinate of the upper left corner of the bounding box.
     * @param {number} width The width of the bounding box.
     * @param {number} height The height of the boundng box.
     */
    constructor(x, y, width, height) {
        super(x, y);
        this.width = width;
        this.height = height;

        this.left = x;
        this.top = y;
        this.right = this.left + this.width;
        this.bottom = this.top + this.height;
    };
}