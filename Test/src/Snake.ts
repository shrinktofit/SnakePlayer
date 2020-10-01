import {Vec2} from "./Vec2"
enum Direction {
    up,
    down,
    left,
    right,
}

class SnakeBodySegment {
    /**
     * 身子节的方向。
     */
    public direction: Direction;
    public length: number;

    constructor(direction: Direction, length: number) {
        this.direction = direction;
        this.length = length;
    }
}

export class Snake {
    public vec2: Vec2;
    public body: SnakeBodySegment[];
    constructor(ver2:Vec2,body:SnakeBodySegment[]){
        this.vec2=ver2;
        this.body=body;
    }
}