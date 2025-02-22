# Color Matrix filters in Cocos Creator
Transform colors using matrix to make cool effects! <br>
Currently have 20+ presets, implementation and filters based on various sources (see [References](#references)) <br> 
## Presets
| | | |
|-|-|-|
|![](/capture/original.png)|![](/capture/brightness1.5.png)|![](/capture/grayscale.png)|
|![](/capture/hueShift135.png)|![](/capture/saturate3.png)|![](/capture/blackWhite.png)|
|![](/capture/contrast0.8.png)|![](/capture/negative.png)|![](/capture/desaturateLuminance.png)|
|![](/capture/sepia.png)|![](/capture/lsd.png)|![](/capture/brown.png)|
|![](/capture/vintage.png)|![](/capture/kodachrome.png)|![](/capture/technicolor.png)|
|![](/capture/polaroid.png)|![](/capture/toBGR.png)|![](/capture/night0.43.png)|
|![](/capture/predator0.43.png)|![](/capture/duoTone.png)|![](/capture/redBoost0.png)|
## Usage
### Setup
Effects can be applied to Sprite or Spine skeleton <br>
For <b>Sprite</b>, change Custom Material to <i>color-matrix-sprite.mtl</i>, then add component <i>2D/ColorMatrixSprite</i> <br>
For Spine skeleton (<b>sp.Skeleton</b>), change Custom Material to <i>color-matrix-spine.mtl</i>, then add component <i>2D/ColorMatrixSpine</i> <br>
### Coding
To apply filter from code, get reference to <i>ColorMatrix*</i> component and use its function, it's possible to animate the effect by changing filter continuously <br>
Function list: <br>
|Function|Usage|
|-|-|
|reset|Remove all effects|
|overrideMatrix|Override current matrix data|
|multiply|Multiply current matrix with a custom matrix|
|[effectName]filter|Apply an effect, if multiply = true, then multiply this effect on top of current matrix, else set current matrix to this effect|

## References
[Phaser's Color Matrix FX](https://github.com/phaserjs/phaser/blob/master/src/display/ColorMatrix.js) <br>
[rn-color-matrices](https://github.com/iyegoroff/rn-color-matrices/) <br>
[Affine HSV color manipulation](https://beesbuzz.biz/code/16-hsv-color-transforms)
