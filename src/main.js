
"use strict";

// Set up event handling
function initEvents(win, doc, canvas) {
    canvas.addEventListener("mouseup", (event) => {
    }, false);

    canvas.addEventListener("mousedown", (event) => {
    }, false);

    canvas.addEventListener("mousemove", (event) => {
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
}

/* eslint-disable no-undef */
function main() {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    const minesweeper = new Minesweeper(context);

    minesweeper.onsize = (width, height) => {
        canvas.width = width;
        canvas.height = height;
    };

    initEvents(window, document, canvas);
}
document.addEventListener("DOMContentLoaded", main);
/* eslint-enable no-undef */
