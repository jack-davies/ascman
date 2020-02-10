import { V2 } from "./vector.js";


let directions = [new V2(-1, 0), new V2(1, 0), new V2(0, -1), new V2(0, 1)];

function randInt(lower, upper) {
    let min = Math.ceil(lower);
    let max = Math.floor(upper);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

function legal(position, walls) {
    try {
        let wall = walls[position.y][position.x];
        return wall !== 0 && wall !== undefined;
    } catch {
        return false;
    }
}

class Player {
    constructor(y, x, walls) {
        this.position = new V2(y, x);
        this.direction = new V2(0, 0);
        this.newDirection = new V2(0, 0);
        this.walls = walls;
        this.eaten = 0;
    }

    move() {
        let newPosition = this.position.add(this.newDirection);
        if (legal(newPosition, this.walls)) {
            this.direction = this.newDirection;
            this.position = newPosition;
        } else {
            newPosition = this.position.add(this.direction);
            if (legal(newPosition, this.walls)) {
                this.position = newPosition;
            }
        }
        this.eat();
    }

    eat() {
        if (this.walls[this.position.y][this.position.x] === 1) {
            this.walls[this.position.y][this.position.x] = 4;
            this.eaten += 1;
        } else if (this.walls[this.position.y][this.position.x] === 2) {
            this.walls[this.position.y][this.position.x] = 4;
            this.powerup();
        }
    }

    powerup() {

    }
};

class Enemy {
    constructor(y, x, walls) {
        this.position = new V2(y, x);
        this.direction = new V2(-1, 0);
        this.walls = walls;
    }

    move() {
        let newPosition = this.position.add(this.direction);
        while (!legal(newPosition, this.walls)) {
            this.direction = directions[randInt(0, 3)];
            newPosition = this.position.add(this.direction);
        }
        this.position = newPosition;
    }
}


export { Player, Enemy };
