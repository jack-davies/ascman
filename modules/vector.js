"use strict";


class V2 {
    constructor(y, x) {
        this.x = x;
        this.y = y;
    }

    add(vector) {
        return new V2(this.y + vector.y, this.x + vector.x);
    }

    show() {
        return "(" + this.y + ", " + this.x + ")";
    }
}


export { V2 };
