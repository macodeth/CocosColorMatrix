import { _decorator, sp } from 'cc';
import { ColorMatrix } from './ColorMatrix';
const { ccclass, property, requireComponent, executeInEditMode, disallowMultiple, menu } = _decorator;

@ccclass('ColorMatrixSpine')
@menu('2D/ColorMatrixSpine')
@executeInEditMode
@disallowMultiple(true)
@requireComponent(sp.Skeleton)
export class ColorMatrixSpine extends ColorMatrix {
    protected _updateMaterial(): void {
        // @ts-ignore
        let materials = this.node.getComponent(sp.Skeleton)._materialCache;
        for (let k in materials) {
            let material = materials[k];
            material.setProperty("colorMat", this._colorMat);
            material.setProperty("offset", this._offset);
        }
    }
}


