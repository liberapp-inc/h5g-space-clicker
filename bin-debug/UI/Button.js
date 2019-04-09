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
        //public cost : number = 0;
        _this.costText = null;
        _this.costTextColor = 0xffffff;
        //public parameter : number = 0;
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
        var size = 80;
        var ratio = 0.5;
        this.indexText = Util.myText(x, y, index, size, ratio, this.indexTextColor, true);
        this.indexText.width = this.object.width / ratio;
        this.indexText.height = this.object.height / ratio;
        this.indexText.textAlign = egret.HorizontalAlign.CENTER;
        //this.indexText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.object.addChild(this.indexText);
    };
    Button.prototype.setParameterText = function (x, y, width, height, parameter) {
        var size = 60;
        var ratio = 0.5;
        this.parameterText = Util.myText(x, y, parameter.toString(), size, ratio, this.parameterTextColor, false);
        this.parameterText.width = this.object.width / ratio;
        this.parameterText.height = this.object.height / ratio;
        this.parameterText.textAlign = egret.HorizontalAlign.CENTER;
        //this.parameterText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.object.addChild(this.parameterText);
    };
    Button.prototype.setCostText = function (x, y, width, height, cost) {
        var size = 60;
        var ratio = 0.5;
        this.costText = Util.myText(x, y, "LEVEL UP\n" + cost.toString(), size, ratio, this.costTextColor, false);
        this.costText.width = this.object.width / ratio;
        this.costText.height = this.object.height / ratio;
        this.costText.textAlign = egret.HorizontalAlign.CENTER;
        this.costText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.object.addChild(this.costText);
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
        _this.setIndexText(0, -100, width, height, index);
        _this.setParameterText(0, -50, width, height, Player.bulletDamage);
        _this.setCostText(0, 0, width, height, Player.damageLevelUpCost);
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