class InfoPage {
    constructor(game, title, body, pageCount, x, y, w, h, originalStyle, selectedStyle, textY, buttonColor) {
        Object.assign(this, {game, title, body, pageCount})
        this.isOpen = false;
        this.currentPage = 0;
        this.toggle = new Button(game, x, y, w, h, originalStyle, selectedStyle, 
            "Help", buttonColor, textY);
        if (pageCount == 1) {
            originalStyle = { font: "20px Arial", fillStyle: "rgb(85, 81, 81)" }
            selectedStyle = { font: "20px Arial", fillStyle: "rgb(85, 81, 81)" }
        }
        let originalStylePageChanger = { font: "20px Arial", fillStyle: "rgb(200, 200, 200)" };
        let selectedStylePageChanger = { font: "20px Arial", fillStyle: "rgb(85, 81, 81)" };
        let pageChangerHeight = 3 * PARAMS.CANVAS_HEIGHT / 4 + 60;
        this.previous = new Button(game, PARAMS.CANVAS_WIDTH / 2 - 140, pageChangerHeight, 120, 30, originalStylePageChanger, selectedStylePageChanger, 
            "PREVIOUS", "black", pageChangerHeight + 24);
        this.next = new Button(game, PARAMS.CANVAS_WIDTH / 2 + 140, pageChangerHeight, 80, 30, originalStylePageChanger, selectedStylePageChanger, 
            "NEXT", "black", pageChangerHeight + 24);

        this.previous.selected = true;
    }

    draw(ctx) {
        this.toggle.draw(ctx);
        if (this.isOpen) {
            if (this.pageCount > 1) {
                this.next.draw(ctx);
                this.previous.draw(ctx);
            }
            ctx.fillStyle = "White";
            ctx.font = '35px "Jersey 15"';
            let page = this.body[this.currentPage];
            let lines = page.split('\n');
            let midPos = PARAMS.CANVAS_HEIGHT / 4;

            for (let i = 0; i < lines.length; i++) {
                let midNum = PARAMS.CANVAS_WIDTH / 2 - ctx.measureText(lines[i]).width / 2;
                ctx.fillText(lines[i], midNum, midPos + (i*35));
            }
            ctx.font = '50px "Jersey 15"';
            ctx.fillText(this.title, PARAMS.CANVAS_WIDTH / 2 - ctx.measureText(this.title).width / 2, midPos - 80);
        }
    }

    update() {
        if (this.toggle.isClicked()) {
            console.log("Open/Close", this.isOpen);
            this.isOpen = !this.isOpen;
            this.toggle.selected = this.isOpen;
            this.currentPage = 0;
            this.previous.selected = true;
            this.next.selected = false;
            this.game.click = false; // Reset click to prevent multiple triggers
        } else if (this.next.isClicked()) {
            this.currentPage = Math.min(this.pageCount - 1, this.currentPage + 1)
            console.log("Next");
            this.game.click = false; // Reset click to prevent multiple triggers
            if (this.currentPage == this.pageCount - 1) {
                this.next.selected = true;
            }
            this.previous.selected = false;
        } else if (this.previous.isClicked()) {
            this.currentPage = Math.max(0, this.currentPage - 1)
            console.log("Previous");
            this.game.click = false; // Reset click to prevent multiple triggers
            if (this.currentPage == 0) {
                this.previous.selected = true;
            }
            this.next.selected = false;
        }
        return this.isOpen;
    }
}