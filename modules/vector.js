"use strict";


class V2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(vector) {
        return new V2(this.x + vector.x, this.y + vector.y);
    }

    show() {
        return "(" + this.y + ", " + this.x + ")";
    }
}


export { V2 };
