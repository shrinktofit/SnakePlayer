import { drawSnake } from "./DrawSnake";
import { Snake, SnakeBodySegment, Direction } from "./Snake";
import { Vec2 } from "./Vec2";
let snake: Snake = new Snake(
    new Vec2(28, 9),
    [new SnakeBodySegment(Direction.right, 2),
        new SnakeBodySegment(Direction.up, 5),
        new SnakeBodySegment(Direction.right, 15),
    ]);
;
// drawSnake(snake, 50, 50);


drawSnake(snake,50,50);
let direction: Direction|null = null;
process.stdin.on('data', (keyBin) => {
    const key = keyBin.toString().trim();
    switch (key) {
        case "w":
            direction = Direction.up;
            break;
        case "s":
            direction = Direction.down;
            break;
        case "a":
            direction = Direction.left;
            break;
        case "d":
            direction = Direction.right; 
            break;
        default:
            return;
    }
})
setInterval(() => {
    if (direction != null) {
        snake.turn(direction);
        direction = null;
    }else{
        snake.step(); //前进一步
    }
    drawSnake(snake, 50,50); //画
}, 1500)