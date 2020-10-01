"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Snake = void 0;
var Direction;
(function (Direction) {
    Direction[Direction["up"] = 0] = "up";
    Direction[Direction["down"] = 1] = "down";
    Direction[Direction["left"] = 2] = "left";
    Direction[Direction["right"] = 3] = "right";
})(Direction || (Direction = {}));
var SnakeBodySegment = /** @class */ (function () {
    function SnakeBodySegment(direction, length) {
        this.direction = direction;
        this.length = length;
    }
    return SnakeBodySegment;
}());
var Snake = /** @class */ (function () {
    function Snake(ver2, body) {
        this.vec2 = ver2;
        this.body = body;
    }
    return Snake;
}());
exports.Snake = Snake;
