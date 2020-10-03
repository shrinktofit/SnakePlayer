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
        this._decreaseLastBody();
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
        //direction为蛇的行动方向，bodydirection为蛇身体的方向，
        //蛇身体的方向是和蛇行动方向相反
        var bodyDirection;
        switch (direction) {
            case Direction.up:
                bodyDirection = Direction.down;
                break;
            case Direction.down:
                bodyDirection = Direction.up;
                break;
            case Direction.left:
                bodyDirection = Direction.right;
                break;
            case Direction.right:
                bodyDirection = Direction.left;
                break;
        }
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
    };
    /**
     * 最后一段长度-1，且当最后一段为0是，删掉最后为0的身体
     */
    Snake.prototype._decreaseLastBody = function () {
        this.body[this.body.length - 1].length--;
        if (this.body[this.body.length - 1].length == 0) {
            this.body.pop();
        }
    };
    return Snake;
}());
exports.Snake = Snake;
//# sourceMappingURL=Snake.js.map