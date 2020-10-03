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
    }
    /**
     * 转向  
     * 当它转向的时候，新增第一段，长度为1
     * 第二段长度-1
     * 调整蛇头位置
     */
    public turn(direction: Direction) {
        //当蛇第一段身体的方向为左或者右时候，左右移动跳出函数；
        if ((direction ==Direction.left || direction==Direction.right)
            && (this.body[0].direction == Direction.left || this.body[0].direction==Direction.right)) {
            return;
        }
        //当蛇第一段身体的方向为上或者下时候，上下移动跳出函数；
        if ((direction ==Direction.up || direction==Direction.down)
            && (this.body[0].direction == Direction.up || this.body[0].direction==Direction.down)) {
            return;
        }
        this.body.unshift(new SnakeBodySegment(direction,1));
        this.body[1].length--; 
        //改变蛇头位置
        switch (direction) {
            
            case Direction.up:
                this.head.y--;
                break;
            case Direction.down:
                this.head.y++;
                break;
            case Direction.left:
                this.head.x--;
                break;
            case Direction.right:
                this.head.x++;
                break;  
               
        }
    }
}