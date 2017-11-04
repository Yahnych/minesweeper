
"use strict";

class Minesweeper {
    constructor(context) {
        this.context = context;
        this.setScale(1);

        function loadImage(path) {
            return new Promise((resolve, reject) => {
                const image = new Image();
                image.onload = () => {
                    resolve(image);
                };
                image.onerror = () => reject(path);
                image.src = path;
            });
        }

        Promise.resolve()
            .then(() => loadImage("tiles.bmp"))
            .then((tiles) => {
                this.img_tiles = tiles;
                return loadImage("skin.bmp");
            })
            .then((skin) => {
                this.img_skin = skin;
                this.newGame(9, 9, 10);
            })
            .catch((name) => alert("Couldn't load image '" + name + "'"));
    }

    setScale(scale) {
        this.scale = scale;
    }

    newGame(width, height, mines) {
        const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

        this.width = clamp(width, 9, 30);
        this.height = clamp(height, 9, 24);
        this.mines = clamp(mines, 1, (this.width - 1) * (this.height - 1));
        this.draw();
    }

    draw() {
        const draw = (sx, sy, swidth, sheight, dx, dy, dwidth, dheight) =>
            this.context.drawImage(this.img_skin, sx, sy, swidth, sheight,
                dx * this.scale, dy * this.scale, dwidth * this.scale, dheight * this.scale);

        draw(0, 0, 12, 55, 0, 0, 12, 55);
        draw(40, 0, 8, 55, this.width * 16 + 12, 0, 8, 55);
        draw(12, 0, 20, 55, 12, 0, this.width * 16, 55);
        draw(0, 72, 12, 8, 0, 55 + this.height * 16, 12, 8);
        draw(20, 72, 8, 8, this.width * 16 + 12, 55 + this.height * 16, 8, 8);
        draw(0, 56, 12, 10, 0, 55, 12, this.height * 16);
        draw(12, 72, 8, 8, 12, 55 + this.height * 16, this.width * 16, 8);
        draw(20, 64, 8, 8, this.width * 16 + 12, 55, 8, this.height * 16);
        draw(48, 0, 41, 25, 16, 16, 41, 25);
        draw(48, 0, 41, 25, 12 + this.width * 16 - 4 - 41, 16, 41, 25);
    }
}
