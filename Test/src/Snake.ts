import {Vec2} from "./Vec2"
export enum Direction {
    up,
    down,
    left,
    right,
}

export class SnakeBodySegment {
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
    public head: Vec2;
    public body: SnakeBodySegment[];
    constructor(head:Vec2,body:SnakeBodySegment[]){
        this.head=head;
        this.body=body;
    }
}