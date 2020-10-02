"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawSnake = void 0;
var Snake_1 = require("./Snake");
var fs_1 = __importDefault(require("fs"));
var Vec2_1 = require("./Vec2");
function drawSnake(snake, wight, height) {
    var gameScreen = new Array(height);
    var trim = "";
    var cursor = new Vec2_1.Vec2(snake.head.x, snake.head.y);
    for (var i = 0; i < gameScreen.length; i++) {
        gameScreen[i] = new Array(wight);
    }
    for (var i = 0; i < gameScreen.length; i++) {
        for (var j = 0; j < gameScreen[i].length; j++) {
            gameScreen[i][j] = ' ';
        }
    }
    /**
     * 蛇头填充
     */
    gameScreen[cursor.y][cursor.x] = '*';
    /**
     * 蛇身体填充
     */
    for (var k = 0; k < snake.body.length; k++) {
        for (var i = 0; i < snake.body[k].length; i++) {
            switch (snake.body[k].direction) {
                case Snake_1.Direction.up:
                    cursor.y--;
                    break;
                case Snake_1.Direction.down:
                    cursor.y++;
                    break;
                case Snake_1.Direction.left:
                    cursor.x--;
                    break;
                case Snake_1.Direction.right:
                    cursor.x++;
                    break;
            }
            gameScreen[cursor.y][cursor.x] = '+';
        }
    }
    // 打印出来看效果
    for (var i = 0; i < gameScreen.length; i++) {
        for (var j = 0; j < gameScreen[i].length; j++) {
            trim += gameScreen[i][j];
        }
        trim += "\n";
    }
    fs_1.default.writeFileSync("out.txt", trim);
}
exports.drawSnake = drawSnake;
//# sourceMappingURL=DrawSnake.js.map