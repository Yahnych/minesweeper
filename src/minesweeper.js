
"use strict";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const rand = (n) => Math.random() * n | 0;

class Tile {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.value = 0;
        this.opened = false;
        this.flag = false;
    }

    /* eslint-disable camelcase */
    draw(ctx, img, scale, forced_empty) {
        const draw = (sx, sy) => {
            ctx.drawImage(img, sx, sy, 16, 16,
                (12 + 16 * this.x) * scale, (55 + 16 * this.y) * scale, 16 * scale, 16 * scale);
        };

        const can_be_empty = !this.opened && !this.flag;

        if ((forced_empty && can_be_empty) || (this.opened && this.value === 0)) draw(0, 0);
        else if (!this.opened && !this.flag) draw(0, 32);
        else if (this.opened && this.value > 0 && this.value <= 8) {
            draw(16 + 16 * ((this.value - 1) & 3), 16 * (this.value - 1 >> 2));
        }
        else if (this.flag && !this.opened) draw(32, 32);
        else if (this.opened && this.value === -1 && this.flag) draw(64, 32);
        else if (this.opened && this.value === -1 && !this.flag) draw(48, 32);
        else if (this.opened && this.value === 0 && this.flag) draw(0, 16);
    }
    /* eslint-enable camelcase */
}

class Minesweeper {
    constructor(context) {
        this.context = context;
        this.scale = 1;
        this.onsize = () => { };

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
            .then(() => loadImage("images/tiles.bmp"))
            .then((tiles) => {
                this.img_tiles = tiles;
                return loadImage("images/skin.bmp");
            })
            .then((skin) => {
                this.img_skin = skin;
                this.newGame(9, 9, 10);
            })
            .catch((name) => alert("Couldn't load image '" + name + "'"));
    }

    setScale(scale) {
        this.scale = scale;
        this.applySize();
    }

    applySize() {
        /* eslint-disable indent */
        this.onsize(this.width * 16 * this.scale + 24 * this.scale,
            this.height * 16 * this.scale + 67 * this.scale);
        /* eslint-enable indent */
        this.draw();
    }

    newGame(width, height, mines) {
        this.left_down = false;
        this.middle_down = false;
        this.width = clamp(width, 9, 30);
        this.height = clamp(height, 9, 24);
        this.mines = clamp(mines, 1, (this.width - 1) * (this.height - 1));
        this.mines_left = this.mines;
        this.drawMinesLeft = () => this.drawNumber(this.mines_left, 17);

        this.tiles = new Array(this.width * this.height);
        for (let i = 0; i < this.tiles.length; i++) {
            const x = i % this.width | 0;
            const y = i / this.width | 0;
            this.tiles[i] = new Tile(x, y);
        }

        this.applySize();
    }

    drawRect(sx, sy, swidth, sheight, dx, dy, dwidth, dheight) {
        this.context.drawImage(this.img_skin, sx, sy, swidth, sheight,
            dx * this.scale, dy * this.scale, dwidth * this.scale, dheight * this.scale);
    }

    draw() {
        this.drawRect(0, 0, 12, 55, 0, 0, 12, 55);
        this.drawRect(40, 0, 12, 55, this.width * 16 + 12, 0, 12, 55);
        this.drawRect(12, 0, 20, 55, 12, 0, this.width * 16, 55);
        this.drawRect(0, 72, 12, 12, 0, 55 + this.height * 16, 12, 12);
        this.drawRect(20, 72, 12, 12, this.width * 16 + 12, 55 + this.height * 16, 12, 12);
        this.drawRect(0, 56, 12, 10, 0, 55, 12, this.height * 16);
        this.drawRect(12, 72, 8, 12, 12, 55 + this.height * 16, this.width * 16, 12);
        this.drawRect(20, 64, 12, 8, this.width * 16 + 12, 55, 12, this.height * 16);
        this.drawRect(52, 0, 41, 25, 16, 16, 41, 25);
        this.drawRect(52, 0, 41, 25, 12 + this.width * 16 - 4 - 41, 16, 41, 25);

        this.tiles.forEach((tile) => {
            tile.draw(this.context, this.img_tiles, this.scale, false);
        });

        this.drawMinesLeft();
        this.drawNumber(314, 12 + this.width * 16 - 4 - 40);
        this.drawSmile(0);
    }

    drawNumber(number, pos) {
        const num = clamp(number, 0, 999);
        const elem = new Array(3);
        elem[0] = num / 100 | 0;
        elem[1] = num / 10 % 10 | 0;
        elem[2] = num % 10 | 0;

        let posx = pos;
        elem.forEach((e) => {
            this.drawRect(94 + e * 13, 0, 13, 23, posx, 17, 13, 23);
            posx += 13;
        });
    }

    drawSmile(state) {
        this.drawRect(52 + 26 * state, 25, 26, 26, this.width * 8 - 1, 16, 26, 26);
    }

    isSmile(x, y) {
        return x > (this.width * 8 - 1) * this.scale &&
               x < (this.width * 8 - 1 + 26) * this.scale &&
               y > 16 * this.scale &&
               y < (16 + 26) * this.scale;
    }

    mouseDown(x, y, button) {
        switch (button) {
        case 0:
            this.left_down = true;
            if (this.isSmile(x, y)) this.drawSmile(1);
            break;
        case 1:
            this.middle_down = true;
            break;
        case 2:
            break;
        default:
            throw new Error("Unknown button " + button);
        }
    }

    mouseUp(x, y, button) {
        switch (button) {
        case 0:
            this.left_down = false;
            if (this.isSmile(x, y)) {
                this.drawSmile(0);
                this.newGame(this.width, this.height, this.mines);
            }
            break;
        case 1:
            this.middle_down = false;
            break;
        case 2:
            break;
        default:
            throw new Error("Unknown button " + button);
        }
    }

    mouseMove(x, y) {
        if (this.left_down) {
            if (this.isSmile(x, y)) this.drawSmile(1);
            else this.drawSmile(0);
        }
    }
}
