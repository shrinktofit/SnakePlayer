"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DrawSnake_1 = require("./DrawSnake");
var Snake_1 = require("./Snake");
var Vec2_1 = require("./Vec2");
var snake = new Snake_1.Snake(new Vec2_1.Vec2(28, 9), [new Snake_1.SnakeBodySegment(Snake_1.Direction.right, 2), new Snake_1.SnakeBodySegment(Snake_1.Direction.down, 5),
    new Snake_1.SnakeBodySegment(Snake_1.Direction.left, 5),
    new Snake_1.SnakeBodySegment(Snake_1.Direction.down, 5)]);
;
// drawSnake(snake, 50, 50);
setInterval(function () {
    snake.step(); //前进一步
    DrawSnake_1.drawSnake(snake, 50, 50); //画
}, 3000);
//# sourceMappingURL=index.js.map