import { _decorator, Camera, color, Component, Director, director, game, gfx, Input, input, Label, native, Node, RenderTexture, UITransform } from 'cc';
import { ColorMatrixSpine } from './ColorMatrixSpine';
const { ccclass, property } = _decorator;

@ccclass('Test')
export class Test extends Component {
    @property(ColorMatrixSpine)
    cm: ColorMatrixSpine = null;
    @property(Label)
    lb: Label = null;
    @property
    count = 0;
    start() {
        input.on(Input.EventType.TOUCH_END, () => {
            this.count = (this.count + 1) % 21;
            switch (this.count) {
                case 0:
                    this.cm.reset()
                    this.saveSS("original")
                    break;
                case 1:
                    this.cm.brightnessFilter(1.5, false);
                    this.saveSS("brightness1.5")
                    break;
                case 2:
                    this.cm.grayscaleFilter(false);
                    this.saveSS("grayscale")
                    break;
                case 3:
                    this.cm.hueShiftFilter(135, false);
                    this.saveSS("hueShift135");
                    break;
                case 4:
                    this.cm.saturateFilter(3, false);
                    this.saveSS("saturate3");
                    break;
                case 5:
                    this.cm.blackWhiteFilter(false);
                    this.saveSS("blackWhite");
                    break;
                case 6:
                    this.cm.contrastFilter(0.8, false);
                    this.saveSS("contrast0.8");
                    break;
                case 7:
                    this.cm.negativeFilter(false);
                    this.saveSS("negative");
                    break;
                case 8:
                    this.cm.desaturateLuminanceFilter(false);
                    this.saveSS("desaturateLuminance");
                    break;
                case 9:
                    this.cm.sepiaFilter(false);
                    this.saveSS("sepia");
                    break;
                case 10:
                    this.cm.lsdFilter(false);
                    this.saveSS("lsd");
                    break;
                case 11:
                    this.cm.brownFilter(false);
                    this.saveSS("brown");
                    break;
                case 12:
                    this.cm.vintageFilter(false);
                    this.saveSS("vintage");
                    break;
                case 13:
                    this.cm.kodachromeFilter(false);
                    this.saveSS("kodachrome");
                    break;
                case 14:
                    this.cm.technicolorFilter(false);
                    this.saveSS("technicolor");
                    break;
                case 15:
                    this.cm.polaroidFilter(false);
                    this.saveSS("polaroid");
                    break;
                case 16:
                    this.cm.toBGRFilter(false);
                    this.saveSS("toBGR");
                    break;
                case 17:
                    this.cm.nightFilter(0.43, false);
                    this.saveSS("night0.43");
                    break;
                case 18:
                    this.cm.predatorFilter(0.43, false);
                    this.saveSS("predator0.43");
                    break;
                case 19:
                    this.cm.duoToneFilter(color(224, 148, 160), color(20, 24, 18), false);
                    this.saveSS("duoTone")
                    break;
                case 20:
                    this.cm.redBoostFilter(0, false);
                    this.saveSS("redBoost0");
                    break;
            }
        }, this)
    }
    saveSS (filename: string) {
        this.lb.string = filename;
        // save screenshot for demo
        // director.once(Director.EVENT_AFTER_RENDER, () => {
        //     let camera = this.node.getComponentInChildren(Camera);
        //     let uiTransform = this.node.getComponent(UITransform)
        //     let width = uiTransform.width;
        //     let height = uiTransform.height;


        //     let texture = new RenderTexture();
        //     texture.reset({width: width, height: height});
        //     camera.targetTexture = texture;

        //     let canvas = gfx.Device.canvas;
        //     let dataURL = canvas.toDataURL("image/jpeg");
        //     let img = document.createElement("a");
        //     img.href = dataURL;
        //     img.target = "_self";
        //     img.download = `${filename}.png`
        //     img.click()
        // })
    }
}


