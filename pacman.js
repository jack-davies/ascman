"use strict";
import { V2 } from './modules/vector.js';
import { keydown } from './modules/input.js';


let t = 0;
let player = {
    position: new V2(0, 0),
    direction: new V2(1, 0)
}


function tick() {
    player.position = player.position.add(player.direction);

    render();
    t += 1;
}

function render() {
    console.log("tick " + t);
    console.log(player.position.x + ", " + player.position.y);
}


function main() {
    window.addEventListener("keydown", function(event) {
        player.direction = keydown(event);
    });
    window.setInterval(tick, 1000);
}

main();
