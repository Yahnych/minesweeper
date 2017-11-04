
"use strict";

class Minesweeper {
    constructor(context) {
        this.context = context;

        function loadImage(path, callback) {
            const image = new Image();
            image.onload = () => {
                callback(image);
            };
            image.onerror = () => {
                alert("Could't loading image '" + path + "'.");
            };
            image.src = path;
        }

        loadImage("tiles.bmp", (image) => this.img_tiles = image);
        loadImage("skin.bmp", (image) => this.img_skin = image);

        this.newGame(9, 9, 10);
    }

    newGame(width, height, mines) {
        const clamp = (value, min, max) => { Math.min(Math.max(value, min), max); };

        this.width = clamp(width, 9, 30);
        this.height = clamp(height, 9, 24);
        this.mines = clamp(mines, 1, (this.width - 1) * (this.height - 1));
        this.draw();
    }

    draw() {
        if (!this.img_skin || !this.img_tiles) {
            return;
        }

        this.context.drawImage(this.img_skin, 0, 0, 12, 55, 0, 0, 12, 55);
        this.context.drawImage(this.img_skin, 40, 0, 8, 55, this.width * 16 + 12, 0, 8, 55);
        this.context.drawImage(this.img_skin, 12, 0, 20, 55, 12, 0, this.width * 16, 55);
        this.context.drawImage(this.img_skin, 0, 72, 12, 8, 0, 55 + this.height * 16, 12, 8);
        this.context.drawImage(this.img_skin, 20, 72, 8, 8, this.width * 16 + 12, 55 + this.height * 16, 8, 8);
        this.context.drawImage(this.img_skin, 0, 56, 12, 10, 0, 55, 12, this.height * 16);
        this.context.drawImage(this.img_skin, 12, 72, 8, 8, 12, 55 + this.height * 16, this.width * 16, 8);
        this.context.drawImage(this.img_skin, 20, 64, 8, 8, this.width * 16 + 12, 55, 8, this.height * 16);
        this.context.drawImage(this.img_skin, 48, 0, 41, 25, 16, 16, 41, 25);
        this.context.drawImage(this.img_skin, 48, 0, 41, 25, 12 + this.width * 16 - 4 - 41, 16, 41, 25);
        // this.smile(0);
        // num(this.ost, 17, this.disp);
        // num(this.time, 12 + this.width * 16 - 4 - 40, this.disp);
        // for (var i = 0; i < this.width * this.height; i++) this.field[i].draw(this.disp, this.field[i].type);
    }
}
