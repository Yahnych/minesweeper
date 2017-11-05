
"use strict";

// Set up event handling
function initEvents(win, doc, canvas, minesweeper) {
    canvas.addEventListener("mouseup", (event) => {
        const { button, pageX, pageY } = event;
        minesweeper.mouseUp(pageX - canvas.offsetLeft, pageY - canvas.offsetTop, button);
    }, false);

    canvas.addEventListener("mousedown", (event) => {
        const { button, pageX, pageY } = event;
        minesweeper.mouseDown(pageX - canvas.offsetLeft, pageY - canvas.offsetTop, button);
    }, false);

    canvas.addEventListener("mousemove", (event) => {
        const { pageX, pageY } = event;
        minesweeper.mouseMove(pageX - canvas.offsetLeft, pageY - canvas.offsetTop);
    }, false);

    function blockMenu(e) {
        if (e.pageX - canvas.offsetLeft > 0 && e.pageY - canvas.offsetTop > 0 &&
            e.pageX < canvas.offsetLeft + canvas.width &&
            e.pageY < canvas.offsetTop + canvas.height) {
            e.returnValue = false;
            e.preventDefault();
        }
    }

    doc.addEventListener("mousedown", blockMenu);
    doc.addEventListener("contextmenu", blockMenu);
    // mozilla
    win.addEventListener("click", blockMenu, false);

    document.getElementById("Beginner").onclick = () => minesweeper.newGame(9, 9, 10);
    document.getElementById("Intermediate").onclick = () => minesweeper.newGame(16, 16, 40);
    document.getElementById("Expert").onclick = () => minesweeper.newGame(30, 16, 99);
    document.getElementById("Custom").onclick = () => {
        const width = parseInt(document.getElementById("width").value, 10);
        const height = parseInt(document.getElementById("height").value, 10);
        const mines = parseInt(document.getElementById("mines").value, 10);

        minesweeper.newGame(width, height, mines);

        document.getElementById("width").value = minesweeper.width;
        document.getElementById("height").value = minesweeper.height;
        document.getElementById("mines").value = minesweeper.mines;
    };

    document.getElementById("Zoom100").onclick = () => minesweeper.setScale(1);
    document.getElementById("Zoom150").onclick = () => minesweeper.setScale(1.5);
    document.getElementById("Zoom200").onclick = () => minesweeper.setScale(2);
}

function main() {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    const minesweeper = new Minesweeper(context);

    minesweeper.onsize = (width, height) => {
        canvas.width = width;
        canvas.height = height;
    };

    initEvents(window, document, canvas, minesweeper);
}
document.addEventListener("DOMContentLoaded", main);
