var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Button = (function (_super) {
    __extends(Button, _super);
    function Button(x, y, width, height, index) {
        var _this = _super.call(this) || this;
        _this.object = null;
        _this.indexText = null;
        _this.indexTextColor = 0xffffff;
        _this.parameter = 0;
        _this.parameterText = null;
        _this.parameterTextColor = 0xffffff;
        _this.setObject(x, y, width, height);
        return _this;
    }
    Button.prototype.setObject = function (x, y, width, height) {
        if (width <= 0) {
            width = 1;
            console.log("widthが0以下です");
        }
        else if (height <= 0) {
            height = 1;
            console.log("heightが0以下です");
        }
        this.object = new egret.DisplayObjectContainer();
        this.object.width = width;
        this.object.height = height;
        this.object.anchorOffsetX += width / 2;
        this.object.anchorOffsetY += height / 2;
        this.object.x = x;
        this.object.y = y;
        GameObject.display.addChild(this.object);
    };
    Button.prototype.setIndexText = function (x, y, width, height, index) {
        this.indexText = Util.myText(x, y, index, 60, 0.5, this.indexTextColor, false);
        this.indexText.textAlign = egret.HorizontalAlign.CENTER;
        this.indexText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.indexText.width = this.object.width;
        this.indexText.height = this.object.height;
        this.indexText.anchorOffsetX += this.object.width / 2;
        this.indexText.anchorOffsetY += this.object.height / 2;
        this.indexText.x = this.object.width / 2;
        this.indexText.y = this.object.height / 2;
        console.log(this.indexText.width);
        /*        this.indexText.anchorOffsetX = 0;
                this.indexText.anchorOffsetY = 0;*/
        this.object.addChild(this.indexText);
    };
    Button.prototype.setParameterText = function (x, y, width, height, parameter) {
        this.parameterText = Util.myText(x, y, parameter.toString(), 100, 0.5, this.parameterTextColor, false);
        this.parameterText.width = this.object.width;
        this.parameterText.height = this.object.height;
        /*        this.parameterText.anchorOffsetX += this.parameterText.width/2;
                this.parameterText.anchorOffsetY += this.parameterText.height/2;*/
        /*        this.parameterText.x = 0;
                this.parameterText.y = 0;  */
        this.object.addChild(this.parameterText);
    };
    Button.prototype.delete = function () {
        if (this.shape) {
            GameObject.display.removeChild(this.object);
        }
    };
    return Button;
}(GameObject));
__reflect(Button.prototype, "Button");
var BulletDamageButton = (function (_super) {
    __extends(BulletDamageButton, _super);
    function BulletDamageButton(x, y, width, height, color, index) {
        var _this = _super.call(this, x, y, width, height, index) || this;
        _this.setShape(x, y, width, height, color);
        _this.setIndexText(0, 0, width * 5, height, index);
        _this.setParameterText(x, y + 50, width, height, Player.bulletDamage);
        return _this;
    }
    BulletDamageButton.prototype.setShape = function (x, y, width, height, color) {
        if (this.shape) {
            GameObject.display.removeChild(this.shape);
        }
        this.shape = new egret.Shape();
        this.shape.x = 0;
        this.shape.y = 0;
        this.shape.graphics.beginFill(color);
        this.shape.graphics.drawRoundRect(0, 0, width, height, 30);
        this.shape.graphics.endFill();
        this.object.addChild(this.shape);
    };
    BulletDamageButton.prototype.updateContent = function () {
        this.parameterText.text = Player.bulletDamage.toString();
    };
    return BulletDamageButton;
}(Button));
__reflect(BulletDamageButton.prototype, "BulletDamageButton");
//# sourceMappingURL=Button.js.map