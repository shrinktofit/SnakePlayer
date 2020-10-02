import { drawSnake } from "./DrawSnake";
import { Snake, SnakeBodySegment, Direction } from "./Snake";
import { Vec2 } from "./Vec2";
let snake: Snake = new Snake(
    new Vec2(28, 9),
    [new SnakeBodySegment(Direction.right, 2), new SnakeBodySegment(Direction.down, 5),
    new SnakeBodySegment(Direction.left, 5)
        , new SnakeBodySegment(Direction.down, 5)]);
;
// drawSnake(snake, 50, 50);
setInterval(function(){
    snake.step(); //前进一步
    drawSnake(snake, 50,50); //画
}, 3000)