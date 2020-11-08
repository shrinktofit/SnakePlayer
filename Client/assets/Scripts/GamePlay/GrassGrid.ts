import { _decorator, Component, Node, MeshRenderer, utils, primitives, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GrassGrid')
export class GrassGrid extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;

    @_decorator.float
    public width = 1;

    @_decorator.float
    public height = 1;

    @_decorator.integer
    public widthSegments = 1;

    @_decorator.integer
    public heightSegments = 1;

    start () {
        const mesh = utils.createMesh(
            createGrid(this),
            // primitives.plane({
            //     width: this.width,
            //     length: this.height,
            //     widthSegments: this.widthSegments,
            //     lengthSegments: this.heightSegments,
            // }),
        );
        const meshRenderer = this.node.getComponent(MeshRenderer)!;
        meshRenderer.mesh = mesh;
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}

const temp1 = new Vec3(0, 0, 0);
const temp2 = new Vec3(0, 0, 0);
const temp3 = new Vec3(0, 0, 0);
const r = new Vec3(0, 0, 0);
const c00 = new Vec3(0, 0, 0);
const c10 = new Vec3(0, 0, 0);
const c01 = new Vec3(0, 0, 0);

function createGrid({
    width,
    height,
    widthSegments,
    heightSegments,
}: Readonly<{
    width: number;
    height: number;
    widthSegments: number;
    heightSegments: number;
}>) {
    const hw = width * 0.5;
    const hl = height * 0.5;

    const positions: number[] = [];
    const uvs: number[] = [];
    const indices: number[] = [];
    const minPos = new Vec3(-hw, 0, -hl);
    const maxPos = new Vec3(hw, 0, hl);
    const boundingRadius = Math.sqrt(width * width + height * height);

    Vec3.set(c00, -hw, 0, hl);
    Vec3.set(c10, hw, 0, hl);
    Vec3.set(c01, -hw, 0, -hl);

    const pushP = (x: number, y: number) => {
        const u = x / widthSegments;
        const v = y / heightSegments;

        Vec3.lerp(temp1, c00, c10, u);
        Vec3.lerp(temp2, c00, c01, v);
        Vec3.subtract(temp3, temp2, c00);
        Vec3.add(r, temp1, temp3);

        positions.push(r.x, r.y, r.z);
    };

    let nVertices = 0;
    for (let y = 0; y < heightSegments; y++) {
        for (let x = 0; x < widthSegments; x++, nVertices += 4) {
            // v1 v2
            // v0 v3
            pushP(x, y);
            pushP(x, y + 1);
            pushP(x + 1, y + 1);
            pushP(x + 1, y);
            uvs.push(
                0, 0,
                0, 1,
                1, 1,
                1, 0,
            );

            const v0 = nVertices;
            const v1 = nVertices + 1;
            const v2 = nVertices + 2;
            const v3 = nVertices + 3;

            indices.push(
                v0, v2, v1,
                v0, v3, v2,
            );
        }
    }

    const result: primitives.IGeometry = {
        positions,
        uvs,
        indices,
        minPos,
        maxPos,
        boundingRadius,
    };

    return result;
}