"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DrawSnake_1 = require("./DrawSnake");
var Snake_1 = require("./Snake");
var Vec2_1 = require("./Vec2");
var snake = new Snake_1.Snake(new Vec2_1.Vec2(28, 9), [new Snake_1.SnakeBodySegment(Snake_1.Direction.right, 2),
    new Snake_1.SnakeBodySegment(Snake_1.Direction.up, 5),
    new Snake_1.SnakeBodySegment(Snake_1.Direction.right, 15),
]);
;
// drawSnake(snake, 50, 50);
DrawSnake_1.drawSnake(snake, 50, 50);
var direction = null;
process.stdin.on('data', function (keyBin) {
    var key = keyBin.toString().trim();
    switch (key) {
        case "w":
            direction = Snake_1.Direction.up;
            break;
        case "s":
            direction = Snake_1.Direction.down;
            break;
        case "a":
            direction = Snake_1.Direction.left;
            break;
        case "d":
            direction = Snake_1.Direction.right;
            break;
        default:
            return;
    }
});
setInterval(function () {
    if (direction != null) {
        snake.turn(direction);
        direction = null;
    }
    else {
        snake.step(); //前进一步
    }
    DrawSnake_1.drawSnake(snake, 50, 50); //画
}, 1500);
//# sourceMappingURL=index.js.map