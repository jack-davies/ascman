"use strict";


function loadBoard(onLoad) {
    let boardRequest = new XMLHttpRequest();
    boardRequest.addEventListener("load", onLoad);
    boardRequest.open("GET", "./board.txt");
    boardRequest.send();
}

function setupBoard(boardData) {
    let board = boardData.split("\n");
    board = board.map(line => line + line.split("").reverse().join(""));
    board = board.map(line => line.split(""));
    board = board.map(line => line.map(val => parseInt(val)));
    return board;
}


export { loadBoard, setupBoard };
