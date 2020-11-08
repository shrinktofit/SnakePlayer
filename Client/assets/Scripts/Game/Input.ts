import { _decorator, Component, Node, Eventify, EventTouch, systemEvent, SystemEventType } from 'cc';
const { ccclass, property } = _decorator;

/**
 * 处理游戏输入。
 * 会响应虚拟按键的 wasd 事件。
 * 如果键盘有效，**也**会响应键盘的 wasd 事件。
 */
@ccclass('Input')
export class Input extends Eventify(Component) {
    public static readonly CLICKED = 'clicked';

    /**
     * `true` for pressing; `false` for released.
     */
    // _keyStates: Record<string, boolean> = {};

    start () {
        systemEvent.on(SystemEventType.KEY_UP, (event) => {
            let key: undefined | string;
            switch (event?.rawEvent?.key) {
                case 'w': case 'W': key = 'w'; break;
                case 'a': case 'A': key = 'a'; break;
                case 's': case 'S': key = 's'; break;
                case 'd': case 'D': key = 'd'; break;
            }
            if (key) {
                this.emit(Input.CLICKED, key);
            }
        });
    }

    public onKeyClicked(event: EventTouch, key: string) {
        this.emit(Input.CLICKED, key);
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }

    // public onKeyDown(key: string) {

    // }

    // public onKeyUp(key: string) {

    // }
}
