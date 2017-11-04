
"use strict";

// Set up event handling
function initEvents() {
    const canvas = document.getElementById("canvas");

    canvas.addEventListener("mouseup", (event) => {
    }, false);

    canvas.addEventListener("mousedown", (event) => {
    }, false);

    canvas.addEventListener("mousemove", (event) => {
    }, false);

    function blockMenu(e) {
        if (e.pageX - canvas.offsetLeft > 0 && e.pageY - canvas.offsetTop > 0 &&
            e.pageX < canvas.offsetLeft + canvas.width &&
            e.pageY < canvas.offsetTop + canvas.height)
        {
            e.returnValue = false;
            e.preventDefault();
        }
    }
       
    document.onmousedown = blockMenu;
    document.oncontextmenu = blockMenu; 
    //mozilla
    window.addEventListener("click", blockMenu, false);
}

function main() {
    initEvents();
}
document.addEventListener("DOMContentLoaded", main);