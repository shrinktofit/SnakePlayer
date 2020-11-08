import { _decorator, Component, Node, Prefab, Animation, instantiate, AnimationClip, Vec3, math, AnimationState, Quat } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AnimalDecorator')
export class AnimalDecorator extends Component {
    @_decorator.type(Prefab)
    public model: Prefab = null!;

    @_decorator.type([AnimationClip])
    public walkClips: AnimationClip[] = [];

    @_decorator.type([AnimationClip])
    public otherClips: AnimationClip[] = [];

    @_decorator.integer
    public count = 0;

    @_decorator.float
    public wanderingRadius = 0;

    @_decorator.type(Vec3)
    public center = new Vec3();

    private _wanderingModels: WanderingModel[] = [];

    start () {
        for (let iModel = 0; iModel < this.count; ++iModel) {
            const modelNode = instantiate(this.model);
            modelNode.setParent(this.node);
            modelNode.active = true;
            const animtion = modelNode.getComponentInChildren(Animation);
            if (!animtion) {
                throw new Error(`No animation`);
            }
            this._wanderingModels.push(new WanderingModel(
                modelNode,
                animtion,
                this.walkClips,
                this.otherClips,
                this.center,
                this.wanderingRadius,
            ));
        }
    }

    update (deltaTime: number) {
        this._wanderingModels.forEach((model) => model.update(deltaTime));
    }
}

class WanderingModel {
    constructor(
        modelNode: Node,
        animation: Animation,
        walks: readonly AnimationClip[],
        others: readonly AnimationClip[],
        wanderingCenter: Vec3,
        wanderingRadius: number,
    ) {
        this._modelNode = modelNode;
        this._animation = animation;
        this._walks = walks;
        this._others = others;
        this._wanderingCenter = Vec3.clone(wanderingCenter);
        this._wanderingRadius = wanderingRadius;
        this._generatePoint(this._startPoint);
        this._updateDistance(0);
    }

    update (deltaTime: Readonly<number>) {
        let PROTECT = 0;
        for (let time = deltaTime; time; ) {
            if (PROTECT++ > 20) {
                debugger;
            }
            time = this._dispatchState(time);
        }
    }

    private _modelNode: Node;
    private _animation: Animation;
    private _walks: readonly AnimationClip[];
    private _others: readonly AnimationClip[];
    private _wanderingCenter: Vec3;
    private _wanderingRadius: number;

    private _state: 'enter' | 'select' | 'idle' | 'walk' = 'enter';

    private _startPoint: Vec3 = new Vec3();
    private _positionCache = new Vec3();
    private _dir: Vec3 = new Vec3();
    private _endPointDistance = 0;
    private _currentDistance = 0;
    private _speed = 0;

    private _idleStateRemainTime = 0;

    private _dispatchState(deltaTime: number) {
        switch (this._state) {
            case 'enter': return this._enterState(deltaTime);
            case 'idle': return this._idleState(deltaTime);
            case 'walk': return this._walkState(deltaTime);
            default: return 0;
        }
    }

    private _switchToSelect() {
        this._state = 'select';
        if (Math.random() > 0.5) {
            this._switchToIdle();
        } else {
            this._switchToWalk();
        }
    }

    private _switchToIdle() {
        this._state = 'idle';
        const state = this._randomSelectClip(this._others);
        this._idleStateRemainTime = math.randomRange(3, 5);
    }

    private _switchToWalk() {
        this._state = 'walk';
        const state = this._randomSelectClip(this._walks);
        this._generateLine();
    }

    private _enterState(deltaTime: number): number {
        this._switchToSelect();
        return deltaTime;
    }

    private _idleState(deltaTime: number): number {
        this._idleStateRemainTime -= deltaTime;
        if (this._idleStateRemainTime > 0) {
            return 0;
        } else {
            this._switchToSelect();
            return -this._idleStateRemainTime;
        }
    }

    private _walkState(deltaTime: number): number {
        if (this._speed === 0) {
            return deltaTime;
        }

        let PROTECTED = 0;
        
        let time = deltaTime;
        while (time > 1e-6) {
            if (PROTECTED++ > 20) {
                debugger;
            }

            // SHALL WE protect?
            const leftDistance = this._endPointDistance - this._currentDistance;
            if (leftDistance < 1e-5) {
                break;
            } else {
                const posentialForward = time * this._speed;
                if (leftDistance - posentialForward) { // 走完 `time` 还是没到终点
                    this._updateDistance(this._currentDistance + posentialForward);
                    return 0;
                } else {
                    time -= leftDistance / this._speed;
                }
            }
        }
        this._updateDistance(this._endPointDistance);
        this._switchToSelect();
        return time;
    }

    private _updateDistance(distance: number) {
        this._currentDistance = distance;
        Vec3.scaleAndAdd(this._positionCache, this._startPoint, this._dir, distance);
        this._modelNode.position = this._positionCache;
    }

    private _generateLine() {
        // 让起点成终点
        Vec3.scaleAndAdd(this._startPoint, this._startPoint, this._dir, this._endPointDistance);
        
        // 生成一个随机方向（以及距离）
        while (true) {
            this._generatePoint(this._dir);
            Vec3.subtract(this._dir, this._dir, this._startPoint);
            this._endPointDistance = Vec3.len(this._dir);
            if (this._endPointDistance !== 0) {
                break;
            }
        }
        Vec3.normalize(this._dir, this._dir);
        const q = new Quat();
        Quat.rotationTo(q, Vec3.UNIT_Z, this._dir);
        this._modelNode.rotation = q;

        this._updateDistance(0);

        while (true) {
            this._speed = math.randomRange(0.5, 2);
            if (this._speed > 1e-6) {
                break;
            }
        }
    }

    private _generatePoint(point: Vec3) {
        Vec3.copy(point, this._wanderingCenter);
        point.y += 0;
        const r = Math.random() * this._wanderingRadius;
        const angle = Math.random() * Math.PI * 2;
        const x = r * Math.cos(angle);
        const z = r * Math.sin(angle);
        point.x = x;
        point.z = z;
    }

    private _randomSelectClip(clips: readonly AnimationClip[]): AnimationState | undefined {
        const selectedIndex = math.randomRangeInt(0, clips.length);
        const selectedClipName = clips[selectedIndex]?.name;
        if (selectedClipName) {
            const state = this._animation.getState(selectedClipName);
            if (state) {
                this._animation.crossFade(selectedClipName);
                return state;
            }
        }
    }
}
