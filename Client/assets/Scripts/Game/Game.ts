import { Component, instantiate, Node, systemEvent, SystemEventType, Vec3, _decorator } from "cc";
import { Direction, flipDirection, Snake, SnakeBodySegment } from "../Snake";
import { Vec2 } from "../Vec2";

@_decorator.ccclass("Game")
export class Game extends Component {
    @_decorator.property(Node)
    public snakeBodySegmentModel: Node = null;

    @_decorator.property(Node)
    public foodModel: Node = null;

    @_decorator.property(Node)
    public snakeHeadModel: Node = null;

    start() {
        this._snake = new Snake(new Vec2(12, 13), [
            new SnakeBodySegment(Direction.right, 5),
            new SnakeBodySegment(Direction.up, 3),
        ]);

        this._food = new Vec2(0, 0);
        this._generateFood();

        this._foodNode = instantiate(this.foodModel);
        this._foodNode.active = true;
        this._foodNode.setParent(this.node.parent);

        this._headNode = instantiate(this.snakeHeadModel);
        this._headNode.active = true;
        this._headNode.setParent(this.node.parent);

        systemEvent.on(SystemEventType.KEY_UP, (event) => {
            let direction: Direction | null = null;
            switch (event.rawEvent.key) {
                case 'w': case 'W': direction = Direction.up; break;
                case 'a': case 'A': direction = Direction.left; break;
                case 's': case 'S': direction = Direction.down; break;
                case 'd': case 'D': direction = Direction.right; break;
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
        this._renderHead(snake.head);
        let currentStart = snake.head.clone();
        for (let iSegment = 0; iSegment < nSegments; ++iSegment) {
            const segment = snake.body[iSegment];
            const node = this._bodyBuffer[iSegment];
            let { x: posX, y: posY } = currentStart;
            let scaleX = 1;
            let scaleY = 1;
            const lenSeg = segment.length;
            switch (segment.direction) {
                case Direction.left:
                    posX = currentStart.x - lenSeg;
                    scaleX = lenSeg;

                    currentStart.x -= lenSeg;
                    break;
                case Direction.right:
                    posX = currentStart.x + 1;
                    scaleX = lenSeg;

                    currentStart.x += lenSeg;
                    break;
                case Direction.up:
                    posY = currentStart.y - lenSeg;
                    scaleY = lenSeg;

                    currentStart.y -= lenSeg;
                    break;
                case Direction.down:
                    posY = currentStart.y + 1;
                    scaleY = lenSeg;

                    currentStart.y += lenSeg;
                    break;
            }
            node.setPosition(posX, node.position.y, posY);
            node.setScale(scaleX, node.scale.y, scaleY);
            node.active = true;
        }
    }

    private _renderHead(head: Vec2) {
        this._headNode.setPosition(head.x, 0, head.y);
    }

    private _renderFood(food: Vec2) {
        this._foodNode.setPosition(food.x, 0, food.y);
    }

    private _createBody(): Node {
        const node = instantiate(this.snakeBodySegmentModel);
        node.setParent(this.node.parent);
        node.active = true;
        return node;
    }
    private _generateFood(){
        while (true) {
            this._food.x = Math.round(Math.random()*(25-1));
            this._food.y = Math.round(Math.random()*(25-1));
            if (!this._snake.includesPoint(this._food)) {
                return;
            } 
        }
    }

    private _snake: Snake;
    private _food: Vec2;
    private _headNode: Node;
    private _bodyBuffer: Node[] = [];
    private _foodNode: Node;
}