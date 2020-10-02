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
        this.body[length - 1].length--;
        if (this.body[length - 1].length == 0) {
            this.body.pop();
        }
    };
    ;
    return Snake;
}());
exports.Snake = Snake;
//# sourceMappingURL=Snake.js.map