"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Snake = exports.SnakeBodySegment = exports.Direction = void 0;
var Direction;
(function (Direction) {
    Direction[Direction["up"] = 0] = "up";
    Direction[Direction["down"] = 1] = "down";
    Direction[Direction["left"] = 2] = "left";
    Direction[Direction["right"] = 3] = "right";
})(Direction = exports.Direction || (exports.Direction = {}));
var SnakeBodySegment = /** @class */ (function () {
    function SnakeBodySegment(direction, length) {
        this.direction = direction;
        this.length = length;
    }
    return SnakeBodySegment;
}());
exports.SnakeBodySegment = SnakeBodySegment;
var Snake = /** @class */ (function () {
    function Snake(head, body) {
        this.head = head;
        this.body = body;
    }
    /**
     * 行动一步
     */
    Snake.prototype.step = function () {
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
        this.body[this.body.length - 1].length--;
        if (this.body[this.body.length - 1].length == 0) {
            this.body.pop();
        }
    };
    /**
     * 转向
     * 当它转向的时候，新增第一段，长度为1
     * 第二段长度-1
     * 调整蛇头位置
     */
    Snake.prototype.turn = function (direction) {
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
        this.body.unshift(new SnakeBodySegment(direction, 1));
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
    };
    return Snake;
}());
exports.Snake = Snake;
//# sourceMappingURL=Snake.js.map