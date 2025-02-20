import { _decorator, CCBoolean, CCFloat, color, Color, Component, debug, error, Label, mat4, Mat4, Material, Node, Sprite, UIRenderer, UITransform, v4, Vec4 } from 'cc';
const { ccclass, property, executeInEditMode, executionOrder, help, menu, requireComponent, type } = _decorator;

@ccclass('ColorMatrix')
@executeInEditMode
@menu("2D/ColorMatrix")
export class ColorMatrix extends Component {
    private _colorMat = Mat4.IDENTITY.clone();  // color matrix
    private _offset = Vec4.ZERO.clone();  // translate vector
    private _brightness = 0.0;
    @property({type: CCFloat, slide: true, max: 10.0, min: 0.0, step: 0.01})
    public get brightness () {
        return this._brightness;
    }
    private set brightness (value: number) {
        this._brightness = value;
        this._updateData();
    }
    private _saturate = 0.0;
    @property({type: CCFloat, slide: true, max: 10.0, min: 0.0, step: 0.01})
    public get saturate () {
        return this._saturate;
    }
    private set saturate (value: number) {
        this._saturate = value;
        this._updateData();
    }
    private _grayscale = false;
    @property
    public get grayscale () {
        return this._grayscale;
    }
    private set grayscale (value: boolean) {
        this._grayscale = value;
        this._updateData();
    }
    private _hue = 0;
    @property({type: CCFloat, slide: true, max: 360.0, min: 0.0, step: 1.0})
    public get hueShift () {
        return this._hue;
    }
    private set hueShift (value: number) {
        this._hue = value;
        this._updateData();
    }
    private _blackWhite = false;
    @property
    public get blackWhite () {
        return this._blackWhite;
    }
    private set blackWhite (value: boolean) {
        this._blackWhite = value;
        this._updateData()
    }
    private _contrast = 0;
    @property({type: CCFloat, slide: true, max: 10.0, min: 0.0, step: 0.1})
    public get contrast () {
        return this._contrast;
    }
    private set contrast (value: number) {
        this._contrast = value;
        this._updateData();
    }
    private _negative = false;
    @property
    public get negative () {
        return this._negative;
    }
    private set negative (value: boolean) {
        this._negative = value;
        this._updateData()
    }
    private _desaturateLuminance = false;
    @property
    public get desaturateLuminance () {
        return this._desaturateLuminance;
    }
    private set desaturateLuminance (value: boolean) {
        this._desaturateLuminance = value;
        this._updateData()
    }
    private _sepia = false;
    @property
    public get sepia () {
        return this._sepia;
    }
    private set sepia (value: boolean) {
        this._sepia = value;
        this._updateData()
    }
    private _lsd = false;
    @property
    public get lsd () {
        return this._lsd;
    }
    private set lsd (value: boolean) {
        this._lsd = value;
        this._updateData()
    }
    private _brown = false;
    @property
    public get brown () {
        return this._brown;
    }
    private set brown (value: boolean) {
        this._brown = value;
        this._updateData()
    }
    private _vintage = false;
    @property
    public get vintage () {
        return this._vintage;
    }
    private set vintage (value: boolean) {
        this._vintage = value;
        this._updateData()
    }
    private _kodachrome = false;
    @property
    public get kodachrome () {
        return this._kodachrome;
    }
    private set kodachrome (value: boolean) {
        this._kodachrome = value;
        this._updateData()
    }
    private _technicolor = false;
    @property
    public get technicolor () {
        return this._technicolor
    }
    private set technicolor (value: boolean) {
        this._technicolor = value;
        this._updateData()
    }
    private _polaroid = false;
    @property
    public get polaroid () {
        return this._polaroid;
    }
    private set polaroid (value: boolean) {
        this._polaroid = value;
        this._updateData()
    }
    private _bgrShift = false;
    @property
    public get toBGR () {
        return this._bgrShift
    }
    private set toBGR (value: boolean) {
        this._bgrShift = value;
        this._updateData()
    }
    private _night = false;
    private _nightIntensity = 0.1;
    @property
    public get night () {
        return this._night;
    }
    private set night (value: boolean) {
        this._night = value;
        this._nightIntensity = 0.1;
        this._updateData()
    }
    @property({type: CCFloat, slide: true, max: 10.0, min: 0.0, step: 0.1, visible: function (this: ColorMatrix){ return this._night;}})
    public get nightIntensity () {
        return this._nightIntensity;
    }
    private set nightIntensity (value: number) {
        this._nightIntensity = value;
        this._updateData()
    }
    private _predator = false;
    private _predatorIntensity = 0.1;
    @property
    public get predator () {
        return this._predator;
    }
    private set predator (value: boolean) {
        this._predator = value;
        this._predatorIntensity = 0.1;
        this._updateData()
    }
    @property({type: CCFloat, slide: true, max: 10.0, min: 0.0, step: 0.1, visible: function (this: ColorMatrix){ return this._predator;}})
    public get predatorIntensity () {
        return this._predatorIntensity;
    }
    private set predatorIntensity (value: number) {
        this._predatorIntensity = value;
        this._updateData()
    }
    private _duoTone = false;
    private _duoToneColor1 = color(255, 229, 128)
    private _duoToneColor2 = color(51, 128, 0)
    @property
    public get duoTone () {
        return this._duoTone;
    }
    private set duoTone (value: boolean) {
        this._duoTone = value;
        this._updateData()
    }
    @property({type: Color, visible: function (this: ColorMatrix) { return this._duoTone}})
    public get duoToneColor1 () {
        return this._duoToneColor1;
    }
    public set duoToneColor1 (color: Color) {
        this._duoToneColor1 = color;
        this._updateData()
    }
    @property({type: Color, visible: function (this: ColorMatrix) { return this._duoTone}})
    public get duoToneColor2 () {
        return this._duoToneColor2;
    }
    public set duoToneColor2 (color: Color) {
        this._duoToneColor2 = color;
        this._updateData()
    }
    
    private get _material () {
        let comp = this.node.getComponent(UIRenderer);
        return comp.material;
    }
    protected onEnable(): void {
        let comp = this.node.getComponent(UIRenderer);
        let material = new Material();
        material.copy(comp.material);
        comp.material = material;
        return;
    }
    protected start(): void {
        this._updateData()
    }
    public overrideMatrix (colorMat: Mat4, offset: Vec4) {
        this._colorMat = colorMat;
        this._offset = offset;
        this._updateMaterial()
    }
    public reset (update = true) {
        this._colorMat.zero()
        this._colorMat.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        this._offset.set(0, 0, 0, 0);
        if (update)
            this._updateMaterial()
    }
    private _updateData () {
        this.reset(false)
        this.brightnessFilter(this._brightness)
        this.saturateFilter(this._saturate)
        if (this._grayscale)
            this.grayscaleFilter()
        this.hueShiftFilter(this._hue)
        if (this._blackWhite)
            this.blackWhiteFilter()
        this.contrastFilter(this._contrast)
        if (this._negative)
            this.negativeFilter()
        if (this._desaturateLuminance)
            this.desaturateLuminanceFilter()
        if (this._sepia)
            this.sepiaFilter()
        if (this._lsd)
            this.lsdFilter()
        if (this._brown)
            this.brownFilter()
        if (this._vintage)
            this.vintageFilter()
        if (this._kodachrome)
            this.kodachromeFilter()
        if (this._technicolor)
            this.technicolorFilter()
        if (this._polaroid)
            this.polaroidFilter()
        if (this._bgrShift)
            this.toBGRFilter()
        if (this._night)
            this.nightFilter(this._nightIntensity)
        if (this._predator)
            this.predatorFilter(this._predatorIntensity)
        if (this._duoTone)
            this.duoToneFilter(this._duoToneColor1, this._duoToneColor2)
    }
    private _updateMaterial () {
        this._material.setProperty("colorMat", this._colorMat);
        this._material.setProperty("offset", this._offset);
    }
    public multiply (matrix: Mat4, offset: Vec4, multiply: boolean = true) {
        if (!multiply) {
            this.reset(false);
        }
        this._offset = v4(
            this._colorMat.m00 * offset.x + this._colorMat.m01 * offset.y + this._colorMat.m02 * offset.z + this._colorMat.m03 * offset.w + this._offset.x,
            this._colorMat.m04 * offset.x + this._colorMat.m05 * offset.y + this._colorMat.m06 * offset.z + this._colorMat.m07 * offset.w + this._offset.y,
            this._colorMat.m08 * offset.x + this._colorMat.m09 * offset.y + this._colorMat.m10 * offset.z + this._colorMat.m11 * offset.w + this._offset.z,
            this._colorMat.m12 * offset.x + this._colorMat.m13 * offset.y + this._colorMat.m14 * offset.z + this._colorMat.m15 * offset.w + this._offset.w
        )
        this._colorMat.multiply(matrix)
        this._updateMaterial()
    }
    public brightnessFilter (value: number, multiply: boolean = true) {
        value += 1;
        let mat = mat4(
            value, 0, 0, 0,
            0, value, 0, 0,
            0, 0, value, 0,
            0, 0, 0, 1
        );
        this.multiply(mat, Vec4.ZERO, multiply);
    }
    public saturateFilter (value: number, multiply: boolean = true) {
        let x = value * 2 / 3 + 1;
        let y = (1 - x) / 2;
        let mat = mat4(
            x, y, y, 0,
            y, x, y, 0,
            y, y, x, 0,
            0, 0, 0, 1
        );
        this.multiply(mat, Vec4.ZERO, multiply);
    }
    public grayscaleFilter (multiply: boolean = true) {
        this.multiply(GRAY_SCALE, Vec4.ZERO, multiply)
    }
    public hueShiftFilter (rotation: number, multiply: boolean = true) {

        rotation = rotation / 180 * Math.PI;
        var cos = Math.cos(rotation);
        var sin = Math.sin(rotation);
        var lumR = 0.213;
        var lumG = 0.715;
        var lumB = 0.072;

        let mat = mat4(
            lumR + cos * (1 - lumR) + sin * (-lumR), lumG + cos * (-lumG) + sin * (-lumG), lumB + cos * (-lumB) + sin * (1 - lumB), 0,
            lumR + cos * (-lumR) + sin * (0.143), lumG + cos * (1 - lumG) + sin * (0.140), lumB + cos * (-lumB) + sin * (-0.283), 0,
            lumR + cos * (-lumR) + sin * (-(1 - lumR)), lumG + cos * (-lumG) + sin * (lumG), lumB + cos * (1 - lumB) + sin * (lumB), 0,
            0, 0, 0, 1
        );
        this.multiply(mat, Vec4.ZERO, multiply)
    }
    public blackWhiteFilter (multiply: boolean = true) {
        this.multiply(BLACK_WHITE, BLACK_WHITE_OFFSET, multiply)
    }
    public contrastFilter (value: number, multiply: boolean = true) {
        let v = value + 1;
        let o = (1 - v) / 510;
        let mat = mat4(
            v, 0, 0, 0,
            0, v, 0, 0,
            0, 0, v, 0,
            0, 0, 0, 1
        );
        let offset = v4(o, o, o, 0);
        this.multiply(mat, offset, multiply);
    }
    public negativeFilter (multiply: boolean = true) {
        this.multiply(NEGATIVE, Vec4.ZERO, multiply);
    }
    public desaturateLuminanceFilter (multiply: boolean = true) {
        this.multiply(DESATURATE_LUMINANCE, DESATURATE_LUMINANCE_OFFSET, multiply)
    }
    public sepiaFilter (multiply: boolean = true) {
        this.multiply(SEPIA, Vec4.ZERO, multiply);
    }
    public nightFilter (intensity: number, multiply: boolean = true) {
        let mat = mat4(
            -2 * intensity, -intensity, 0, 0,
            -intensity, 0, intensity, 0,
            0, intensity, intensity * 2, 0,
            0, 0, 0, 1
        )
        this.multiply(mat, Vec4.ZERO, multiply);
    }
    public lsdFilter (multiply: boolean = true) {
        this.multiply(LSD, Vec4.ZERO, multiply);
    }
    public brownFilter (multiply: boolean = true) {
        this.multiply(BROWN, BROWN_OFFSET, multiply);
    }
    public vintageFilter (multiply: boolean = true) {
        this.multiply(VINTAGE, VINTAGE_OFFSET, multiply);
    }
    public kodachromeFilter (multiply: boolean = true) {
        this.multiply(KODACHROME, KODACHROME_OFFSET, multiply);
    }
    public technicolorFilter (multiply: boolean = true) {
        this.multiply(TECHNICOLOR, TECHNICOLOR_OFFSET, multiply);
    }
    public polaroidFilter (multiply: boolean = true) {
        this.multiply(POLAROID, Vec4.ZERO, multiply);
    }
    public toBGRFilter (multiply: boolean = true) {
        this.multiply(SHIFT_BGR, Vec4.ZERO, multiply);
    }
    public predatorFilter (intensity: number, multiply: boolean = true) {
        let mat = mat4(
            11.224130630493164 * intensity, -4.794486999511719 * intensity, -2.8746118545532227 * intensity, 0,
            -3.6330697536468506 * intensity, 9.193157196044922 * intensity, -2.951810836791992 * intensity, 0,
            -3.2184197902679443 * intensity, -4.2375030517578125 * intensity, 7.476448059082031 * intensity, 0,
            0, 0, 0, 1)
        let offset = v4(0.40342438220977783 * intensity, -1.316135048866272 * intensity, 0.8044459223747253 * intensity, 0);
        this.multiply(mat, offset, multiply)
    }
    public duoToneFilter (color1: Color, color2: Color, multiply: boolean = true) {
        let mat = mat4(
            (color1.r - color2.r) / 255, 0, 0, 0,
            (color1.g - color2.g) / 255, 0, 0, 0,
            (color1.b - color2.b) / 255, 0, 0, 0,
            0, 0, 0, 1);
        let offset = v4(color2.r / 255, color2.g / 255, color2.b / 255, 0);
        this.multiply(mat, offset, multiply)
    }
}

const GRAY_SCALE = mat4(0.2126, 0.7152, 0.0722, 0,
    0.2126, 0.7152, 0.0722, 0, 
    0.2126, 0.7152, 0.0722, 0,
    0, 0, 0, 1);
const BLACK_WHITE = mat4(1.5, 1.5, 1.5, 0, 
    1.5, 1.5, 1.5, 0, 
    1.5, 1.5, 1.5, 0, 
    0, 0, 0, 1);
const BLACK_WHITE_OFFSET = v4(-1, -1, -1, 0);
const NEGATIVE = mat4(-1, 0, 0, 1, 
    0, -1, 0, 1, 
    0, 0, -1, 1, 
    0, 0, 0, 1);
const DESATURATE_LUMINANCE = mat4(0.2764723, 0.9297080, 0.0938197, 0, 
    0.2764723, 0.9297080, 0.0938197, 0, 
    0.2764723, 0.9297080, 0.0938197, 0, 
    0, 0, 0, 1);
const DESATURATE_LUMINANCE_OFFSET = v4(-37.1 / 255, -37.1 / 255, -37.1 / 255, 0);
const SEPIA = mat4(0.393, 0.7689999, 0.18899999, 0, 
    0.349, 0.6859999, 0.16799999, 0, 
    0.272, 0.5339999, 0.13099999, 0, 
    0, 0, 0, 1);
const LSD = mat4(2, -0.4, 0.5, 0, -0.5, 2, -0.4, 0, -0.4, -0.5, 3, 0, 0, 0, 0, 1);
const BROWN = mat4(0.5997023498159715, 0.34553243048391263, -0.2708298674538042, 0, 
    -0.037703249837783157, 0.8609577587992641, 0.15059552388459913, 0, 
    0.24113635128153335, -0.07441037908422492, 0.44972182064877153, 0, 
    0, 0, 0, 1);
const BROWN_OFFSET = v4(47.43192855600873 / 255, -36.96841498319127 / 255, -7.562075277591283 / 255, 0);
const VINTAGE = mat4(0.6279345635605994, 0.3202183420819367, -0.03965408211312453, 0, 
    0.02578397704808868, 0.6441188644374771, 0.03259127616149294, 0, 
    0.0466055556782719, -0.0851232987247891, 0.5241648018700465, 0, 
    0, 0, 0, 1);
const VINTAGE_OFFSET = v4(9.651285835294123 / 255, 7.462829176470591 / 255, 5.159190588235296 / 255, 0);
const KODACHROME = mat4(1.1285582396593525, -0.3967382283601348, -0.03992559172921793, 0, 
    -0.16404339962244616, 1.0835251566291304, -0.05498805115633132, 0, 
    -0.16786010706155763, -0.5603416277695248, 1.6014850761964943, 0, 
    0, 0, 0, 1);
const KODACHROME_OFFSET = v4(63.72958762196502 / 255, 24.732407896706203 / 255, 35.62982807460946 / 255, 0);
const TECHNICOLOR = mat4(1.9125277891456083, -0.8545344976951645, -0.09155508482755585, 0, 
    -0.3087833385928097, 1.7658908555458428, -0.10601743074722245, 0, 
    -0.231103377548616, -0.7501899197440212, 1.847597816108189, 0, 
    0, 0, 0, 1);
const TECHNICOLOR_OFFSET = v4(11.793603434377337 / 255, -70.35205161461398 / 255, 30.950940869491138 / 255, 0);
const POLAROID = mat4(1.438, -0.062, -0.062, 0, 
    -0.122, 1.378, -0.122, 0, 
    -0.016, -0.016, 1.483, 0, 
    0, 0, 0, 1);
const SHIFT_BGR = mat4(0, 0, 1, 0,
    0, 1, 0, 0, 
    1, 0, 0, 0, 
    0, 0, 0, 1);