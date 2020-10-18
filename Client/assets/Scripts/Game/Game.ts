import { Component, instantiate, Node, systemEvent, SystemEventType, Vec3, _decorator } from "cc";
import { Direction, flipDirection, Snake, SnakeBodySegment } from "../Snake";
import { Vec2 } from "../Vec2";

@_decorator.ccclass("Game")
export class Game extends Component {
    @_decorator.property(Node)
    public cube: Node = null;

    @_decorator.property(Node)
    public foodModel: Node = null;

    start() {
        this._snake = new Snake(new Vec2(25, 25), [
            new SnakeBodySegment(Direction.right, 5),
            new SnakeBodySegment(Direction.up, 3),
        ]);

        this._food = new Vec2(0, 0);
        this._generateFood();

        this._foodNode = instantiate(this.foodModel);
        this._foodNode.active = true;
        this._foodNode.setParent(this.node.parent);

        systemEvent.on(SystemEventType.KEY_UP, (event) => {
            let direction: Direction | null = null;
            switch (event.rawEvent.key) {
                case 'w': direction = Direction.up; break;
                case 'a': direction = Direction.left; break;
                case 's': direction = Direction.down; break;
                case 'd': direction = Direction.right; break;
            }
            if (direction !== null) {
                if (direction === flipDirection(this._snake.body[0].direction)) {
                    this._snake.step();
                } else {
                    this._snake.turn(direction);
                }
            }

            if (this._snake.head.equal(this._food)) {
                this._snake.grow();
                this._generateFood();
            }

        });
    }

    update () {
        this._render(this._snake);
        this._renderFood(this._food);
    }

    private _render(snake: Snake) {
        const nSegments = snake.body.length;
        if (nSegments > this._bodyBuffer.length) {
            const nDiff = nSegments - this._bodyBuffer.length;
            for (let i = 0; i < nDiff; ++i) {
                this._bodyBuffer.push(this._createBody());
            }
        }
        for (const node of this._bodyBuffer) {
            node.active = false;
        }
        let currentStart = snake.head.clone();
        for (let iSegment = 0; iSegment < nSegments; ++iSegment) {
            const segment = snake.body[iSegment];
            const node = this._bodyBuffer[iSegment];
            let scale: Vec3;
            switch (segment.direction) {
                case Direction.left:
                    scale = new Vec3(segment.length, 1, 1);
                    node.setPosition(new Vec3(currentStart.x - segment.length / 2, 0.5, currentStart.y));
                    currentStart.x -= segment.length;
                    break;
                case Direction.right:
                    scale = new Vec3(segment.length, 1, 1);
                    node.setPosition(new Vec3(currentStart.x + segment.length / 2, 0.5, currentStart.y));
                    currentStart.x += segment.length;
                    break;
                case Direction.up:
                    scale = new Vec3(1, 1, segment.length);
                    node.setPosition(new Vec3(currentStart.x, 0.5, currentStart.y - segment.length / 2));
                    currentStart.y -= segment.length;
                    break;
                case Direction.down:
                    scale = new Vec3(1, 1, segment.length);
                    node.setPosition(new Vec3(currentStart.x, 0.5, currentStart.y + segment.length / 2));
                    currentStart.y += segment.length;
                    break;
            }
            node.setScale(scale);
            node.active = true;
        }
    }

    private _renderFood(food: Vec2) {
        this._foodNode.setPosition(food.x, 0, food.y);
    }

    private _createBody(): Node {
        const node = instantiate(this.cube);
        node.setParent(this.node.parent);
        node.active = true;
        return node;
    }
    private _generateFood(){
        while (true) {
            this._food.x = Math.round(Math.random()*50);
            this._food.y = Math.round(Math.random()*50);
            if (!this._snake.includesPoint(this._food)) {
                return;
            } 
        }
    }

    private _snake: Snake;
    private _food: Vec2;
    private _bodyBuffer: Node[] = [];
    private _foodNode: Node;
}