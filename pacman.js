"use strict";
import { loadBoard, setupBoard } from "./modules/board.js";
import { keydown } from "./modules/input.js";
import { Player, Enemy } from "./modules/characters.js";


let t = 0;
let walls;
let player;
let enemy;
let textures = ["██", " ●", " ○", "▀▀", "  "];

let canvas = document.getElementById("canvas");
let counter = document.getElementById("counter");


function tick() {
    player.move();
    enemy.move();
    render();
    t += 1;
}

function render() {
    let output = walls.map(line => line.map(char => textures[char]));
    output[player.position.y][player.position.x] = " C";
    output[enemy.position.y][enemy.position.x] = " X";
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
        player = new Player(23, 13, walls);
        enemy = new Enemy(11, 12, walls);
        window.setInterval(tick, 80);
    }
    loadBoard(onLoad);
}

main();
