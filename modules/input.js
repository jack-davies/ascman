"use strict";
import { V2 } from './vector.js';


function keydown(event) {
    switch(event.key) {
        case "ArrowUp":
            return new V2(-1, 0);
        case "ArrowDown":
            return new V2(1, 0);
        case "ArrowLeft":
            return new V2(0, -1);
        case "ArrowRight":
            return new V2(0, 1);
    }
    return false;
}


export { keydown };
