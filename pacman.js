"use strict";
import { V2 } from "./modules/vector.js";
import { keydown } from "./modules/input.js";


let t = 0;
let player = {
    position: new V2(0, 0),
    direction: new V2(0, 0)
};

let walls = [
    [0,0,0,1],
    [1,1,0,1],
    [0,0,0,1],
    [0,1,1,1]
];

let canvas = document.getElementById("canvas");
let counter = document.getElementById("counter");


function tick() {
    move();
    render();
    t += 1;
}

function move() {
    let newPosition = player.position.add(player.direction);
    if (legal(newPosition)) {
        player.position = newPosition;
    }
}

function legal(position) {
    try {
        return walls[position.y][position.x] === 0;
    } catch {
        return false;
    }
}

function render() {
    let output = walls.map(wall => wall.slice());
    output[player.position.y][player.position.x] = "X";
    output = output.map(line => line.join("")).join("\n");
    canvas.innerHTML = output;
    counter.innerHTML = (
        "tick: " + t + 
        "\nplayer: " + player.position.show() +
        "\ndirection: " + player.direction.show()
    );
}


function main() {
    window.addEventListener("keydown", function(event) {
        let newDirection = keydown(event);
        if (newDirection) player.direction = newDirection;
    });
    window.setInterval(tick, 100);
}

main();
