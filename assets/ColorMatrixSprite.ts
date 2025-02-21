import { _decorator, Sprite } from 'cc';
import { ColorMatrix } from './ColorMatrix';
const { ccclass, property, requireComponent, executeInEditMode, disallowMultiple } = _decorator;

@ccclass('ColorMatrixSprite')
@executeInEditMode
@disallowMultiple(true)
@requireComponent(Sprite)
export class ColorMatrixSprite extends ColorMatrix {
    protected _updateMaterial(): void {
        let material = this.node.getComponent(Sprite).material;
        material.setProperty("colorMat", this._colorMat);
        material.setProperty("offset", this._offset);
    }
}


