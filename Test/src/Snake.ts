import { Vec2 } from "./Vec2"
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
    constructor(head: Vec2, body: SnakeBodySegment[]) {
        this.head = head;
        this.body = body;
    }
    /**
     * 行动一步
     */
    public step() {
        switch (this.body[0].direction) {
            case Direction.up:
                this.head.y++;
                break;
            case Direction.down:
                this.head.y--;
                break;
            case Direction.left:
                this.head.x++;
                break;
            case Direction.right:
                this.head.x--;
                break;
        }
        this.body[0].length ++;
        this.body[this.body.length-1].length --;
        if (this.body[this.body.length-1].length==0) {
            this.body.pop();
        }
    };
}