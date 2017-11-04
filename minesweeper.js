
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
    }
}
