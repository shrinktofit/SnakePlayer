import { director, GFXAttributeName, GFXBufferUsageBit, GFXDevice, GFXFormat, GFXMemoryUsageBit, GFXPrimitiveMode, Node, renderer, RenderingSubMesh, Scene, Vec3 } from "cc";
import { Direction, Snake } from "./Snake";
import { Vec2 } from "./Vec2";

export class SnakeRenderer {
    constructor(node: Node) {
        const renderScene = (node.scene as Scene).renderScene;
        this._model = director.root.createModel(renderer.scene.Model);
        this._model.initialize(node);
        this._model.attachToScene(renderScene);
    }

    render(snake: Snake) {
        const keyPoints = this._getKeyPoints(snake);
        if (keyPoints.length === 0) {
            return;
        }

        for (let iSubModel = 0, iFirstKeyPoint = 0;
            iFirstKeyPoint < keyPoints.length;
            ++iSubModel) {
            if (!(iSubModel in this._model.subModels)) {
                this._createSubModel(iSubModel);
            }

            const subModel = this._model.subModels[iSubModel];
            const nKeyPointsThisSubMesh = Math.min(
                maxCylindersPerSubModel, keyPoints.length - iFirstKeyPoint);

            this._subMeshPositionCache.fill(0);
            const positionCache = this._subMeshPositionCache;
            for (let iFace = 0; iFace < nKeyPointsThisSubMesh; ++iFace) {
                const iControlFace = iFirstKeyPoint + iFace;
                const controlFace = keyPoints[iControlFace];
                const [p1, p2] = controlFace; // upper
                const iFaceVertexStart = 4 * iFace;
                const v = new Vec3();
                const lowY = 0;
                const highY = 1;

                v.x = p1.x;
                v.z = p1.y;
                v.y = lowY;
                Vec3.toArray(positionCache, v, 3 * (iFaceVertexStart + 0));
                v.y = highY;
                Vec3.toArray(positionCache, v, 3 * (iFaceVertexStart + 1));

                v.x = p2.x;
                v.z = p2.y;
                v.y = lowY;
                Vec3.toArray(positionCache, v, 3 * (iFaceVertexStart + 2));
                v.y = highY;
                Vec3.toArray(positionCache, v, 3 * (iFaceVertexStart + 3));
            }

            const positionVertexBuffer = subModel.subMesh.vertexBuffers[0];
            positionVertexBuffer.update(this._subMeshPositionCache);

            iFirstKeyPoint += nKeyPointsThisSubMesh;
        }
    }

    private _model: renderer.scene.Model;
    private _device: GFXDevice;
    private _keyPointsCache: ControlFace[] = [];
    private _subMeshPositionCache = new Float32Array(3 * 4 * (maxCylindersPerSubModel + 1));

    private _getKeyPoints(snake: Snake): ControlFace[] {
        const nSegments = snake.body.length;
        let currentStart = snake.head.clone();
        for (let iSegment = 0; iSegment < nSegments; ++iSegment) {
            const segment = snake.body[iSegment];
            switch (segment.direction) {
                case Direction.left:
                    break;
                case Direction.right:
                    break;
                case Direction.up:
                    break;
                case Direction.down:
                    break;
            }
        }

        return this._keyPointsCache;
    }

    private _createSubModel(index: number) {
        const positionVertexBuffer = this._device.createBuffer({
            usage: GFXBufferUsageBit.VERTEX | GFXBufferUsageBit.TRANSFER_DST,
            memUsage: GFXMemoryUsageBit.DEVICE,
            size: this._subMeshPositionCache.byteLength,
            stride: 3 * this._subMeshPositionCache.BYTES_PER_ELEMENT,
        });
         this._subMeshPositionCache.length;
        const renderingSubMesh = new RenderingSubMesh(
            [positionVertexBuffer],
            [{
                name: GFXAttributeName.ATTR_POSITION,
                format: GFXFormat.RGB32F,
            }],
            GFXPrimitiveMode.TRIANGLE_LIST,
        );
        this._model.setSubModelMesh(index, renderingSubMesh);
    }
}

const maxCylindersPerSubModel = 1;

type ControlFace = [Vec2, Vec2];
