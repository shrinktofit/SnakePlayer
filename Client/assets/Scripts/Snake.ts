import { Vec2 } from "./Vec2";

export enum Direction {
    up,
    down,
    left,
    right,
}
export function flipDirection(direction: Direction) {
    switch (direction) {
        case Direction.right: return Direction.left;
        case Direction.left: return Direction.right;
        case Direction.up: return Direction.down;
        case Direction.down: return Direction.up;
    }
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
        this.body[0].length++;
        this._decreaseLastBody();
    }

    /**
     * 
     *    *-------
     *   *--------
     * 
     *     *
     *   * |
     *   | |
     *   
     * 
     * 触碰食物,第一段身体长度+1
     * 头部坐标对应调1
     */
    public grow(){
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
        this.body[0].length++;
    }

    /**
     * 转向  
     * 当它转向的时候，新增第一段，长度为1
     * 第二段长度-1
     * 调整蛇头位置
     */
    public turn(direction: Direction) {
        //当蛇第一段身体的方向为左或者右时候，左右移动跳出函数；
        if ((direction == Direction.left || direction == Direction.right)
            && (this.body[0].direction == Direction.left || this.body[0].direction == Direction.right)) {
            return;
        }
        //当蛇第一段身体的方向为上或者下时候，上下移动跳出函数；
        if ((direction == Direction.up || direction == Direction.down)
            && (this.body[0].direction == Direction.up || this.body[0].direction == Direction.down)) {
            return;
        }
        //direction为蛇的行动方向，bodydirection为蛇身体的方向，
        //蛇身体的方向是和蛇行动方向相反
        const bodyDirection = flipDirection(direction);
        this.body.unshift(new SnakeBodySegment(bodyDirection, 1));
        this._decreaseLastBody();

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

    public getPoints(){
        let points: Vec2[] = new Array();
        let currentPoint: Vec2 = this.head.clone();
        for (let i = 0; i < this.body.length; i++) {
            for (let j = 0; j < this.body[i].length; j++) {
                switch (this.body[i].direction) {
                    case Direction.up:
                        currentPoint.y--;
                        break;
                    case Direction.down:
                        currentPoint.y++;
                        break;
                    case Direction.left:
                        currentPoint.x--;
                        break;
                    case Direction.right:
                        currentPoint.x++;
                        break;
                }
                points.push(currentPoint.clone());  
            }          
        }  
        let food: Vec2 = new Vec2(0,0);
        //
        if (food.equal(points[0])) {
            
        }
        Vec2.equal2(food,points[0]);

        return points;
    }
    /**
     * 判断食物是否与身体重合
     * true 为重合
     */
    public includesPoint(point: Vec2): boolean {
        const points = this.getPoints();
        for (let i = 0; i < points.length; i++) {
            if (points[i].equal(point)){
                return true;
            }
        }
        return false;
    }
    
    /**
     * 最后一段长度-1，且当最后一段为0是，删掉最后为0的身体
     */
    private _decreaseLastBody() {
        const lastBody = this.body[this.body.length - 1];
        lastBody.length--;
        if (lastBody.length == 0) {
            this.body.pop();
        }
    }
    
}