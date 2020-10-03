import { Direction, Snake } from "./Snake";
import fs from "fs";
import { Vec2 } from "./Vec2";


export function drawSnake(snake: Snake, wight: number, height: number) {
    let gameScreen: string[][] = new Array(height);
    let trim: string = "";
    let cursor:Vec2= new Vec2(snake.head.x,snake.head.y);
    for (let i = 0; i < gameScreen.length; i++) {
        gameScreen[i] = new Array(wight);
    }
    for (let i = 0; i < gameScreen.length; i++) {
        for (let j = 0; j < gameScreen[i].length; j++) {
            gameScreen[i][j] = '  ';
        }
    }
    /**
     * 蛇头填充
     */
    gameScreen[cursor.y][cursor.x] = '* ';

    /**
     * 蛇身体填充
     */
    for (let k = 0; k < snake.body.length; k++) {
        for (let i = 0; i < snake.body[k].length; i++) {
            switch (snake.body[k].direction) {
                case Direction.up:
                    cursor.y--;
                    break;
                case Direction.down:
                    cursor.y++;
                    break;
                case Direction.left:
                    cursor.x--;
                    break;
                case Direction.right:
                    cursor.x++;
                    break;
            }
            gameScreen[cursor.y][cursor.x] = '+ ';
        }

    }
    // 打印出来看效果
    for (let i = 0; i < gameScreen.length; i++) {
        for (let j = 0; j < gameScreen[i].length; j++) {
            trim += gameScreen[i][j];
        }
        trim += "\n"
    }


    fs.writeFileSync("out.txt", trim);
}