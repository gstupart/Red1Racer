class Button {
    /**
     * Create a button on specific position with specific style.
     * 
     * @param {GameEngine} game The game engine.
     * @param {number} x The x-coordinate of the upper-left corner of the button.
     * @param {*} y The y-coordinate of the upper-left corner of the button.
     * @param {*} w The width of the button.
     * @param {*} h The height of the button.
     * @param {*} originalStyle The style of the button.
     * @param {*} selectedStyle The style of the selected button.
     * @param {*} text The text on the button.
     * @param {*} textStyle The fill style of the text.
     * @param {*} textY The y-coordinate of the baseline of the text.
     */
    constructor(game, x, y, w, h, originalStyle, selectedStyle, text, textStyle, textY) {
        Object.assign(this, { game, x, y, w, h, originalStyle, selectedStyle, text, textStyle, textY });
        this.selected = false;
    }

    /**
     * @returns Whether the button is clicked.
     */
    isClicked() {
        return this.game.click && this.game.click.x > this.x && this.game.click.x < this.x + this.w 
            && this.game.click.y > this.y && this.game.click.y < this.y + this.h;
    }

    update() {

    }

    draw(ctx) {
        // Style
        if (this.selected) {
            for (const key in this.selectedStyle) {
                ctx[key] = this.selectedStyle[key];
            }
        } else {
            for (const key in this.originalStyle) {
                ctx[key] = this.originalStyle[key];
            }
        }

        // Draw
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.fillStyle = this.textStyle;
        ctx.fillText(this.text, this.x + this.w / 2 - ctx.measureText(this.text).width / 2, this.textY);
    }
}