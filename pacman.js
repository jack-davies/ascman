"use strict";
import { V2 } from "./modules/vector.js";
import { keydown } from "./modules/input.js";
import { loadBoard, setupBoard } from "./modules/board.js";


let t = 0;
let player = {
    position: new V2(23, 13),
    direction: new V2(0, 0),
    newDirection: new V2(0, 0),
};

let walls;
let textures = ["██", " ●", " ○", "▀▀", "  "];

let canvas = document.getElementById("canvas");
let counter = document.getElementById("counter");


function tick() {
    player.move();
    render();
    t += 1;
}

function move() {
    let newPosition = player.position.add(player.newDirection);
    if (legal(newPosition)) {
        player.direction = player.newDirection;
        player.position = newPosition;
    } else {
        newPosition = player.position.add(player.direction);
        if (legal(newPosition)) {
            player.position = newPosition;
        }
    }
}

function legal(position) {
    try {
        let wall = walls[position.y][position.x];
        return wall !== 0 && wall !== undefined;
    } catch {
        return false;
    }
}

function render() {
    let output = walls.map(wall => wall.slice());
    output = output.map(line => line.map(char => textures[char]));
    output[player.position.y][player.position.x] = " X";
    output = output.map(line => line.join("")).join("\n");
    canvas.innerHTML = output;
    counter.innerHTML = (
        "tick: " + t + 
        "\nplayer: " + player.position.show() +
        "\ndirection: " + player.direction.show()
    );
}


function main() {
    // add controls
    window.addEventListener("keydown", function(event) {
        let newDirection = keydown(event);
        if (newDirection) player.newDirection = newDirection;
    });

    // begin
    function onLoad() {
        let boardData = this.responseText;
        walls = setupBoard(boardData);
        console.log(walls);
        window.setInterval(tick, 80);
    }
    loadBoard(onLoad);
}

main();
