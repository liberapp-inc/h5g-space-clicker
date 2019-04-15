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
var Panel = (function (_super) {
    __extends(Panel, _super);
    function Panel(x, y, width, height) {
        var _this = _super.call(this) || this;
        _this.object = null;
        _this.indexText = null;
        _this.indexTextColor = Util.color(230, 230, 230);
        _this.setObject(x, y, width, height);
        return _this;
    }
    Panel.prototype.setObject = function (x, y, width, height) {
        if (width <= 0) {
            width = 1;
            console.log("widthが0以下です");
        }
        else if (height <= 0) {
            height = 1;
            console.log("heightが0以下です");
        }
        this.object = new egret.DisplayObjectContainer();
        /*        this.object.width = width;
                this.object.height = height;
                this.object.anchorOffsetX += width/2;
                this.object.anchorOffsetY += height/2;*/
        this.object.x = x;
        this.object.y = y;
        //this.object.touchEnabled = true;
        GameObject.display.addChild(this.object);
    };
    Panel.prototype.setIndexText = function (x, y, width, height, index) {
        var size = 60;
        var ratio = 1;
        this.indexText = Util.myText(x, y, index, size, ratio, this.indexTextColor, false);
        this.indexText.width = Game.width / ratio;
        this.indexText.height = Game.height / ratio;
        this.indexText.textAlign = egret.HorizontalAlign.CENTER;
        this.indexText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.object.addChild(this.indexText);
    };
    Panel.prototype.addDestroyMethod = function () {
        egret.Tween.removeTweens(this.object);
        if (this.indexText) {
            this.object.removeChild(this.indexText);
            this.indexText = null;
        }
        if (this.shape) {
            this.shape = null;
        }
        if (this.object) {
            this.object.removeChildren();
            GameObject.display.removeChild(this.object);
        }
        CautionPanel.onPanel = false;
    };
    return Panel;
}(GameObject));
__reflect(Panel.prototype, "Panel");
var CautionPanel = (function (_super) {
    __extends(CautionPanel, _super);
    function CautionPanel(x, y, width, height) {
        var _this = _super.call(this, x, y, width, height) || this;
        CautionPanel.I = _this;
        _this.shapeColor = Util.color(0, 0, 0);
        _this.setShape(x, y, width, height);
        _this.setButton(x + 200, y + 600, Game.width / 4.5, Game.height / 14);
        _this.setIndexText(x, y - 200, width, height, "データを消去します\nよろしいですか？");
        return _this;
    }
    CautionPanel.prototype.setShape = function (x, y, width, height) {
        if (this.shape) {
            GameObject.display.removeChild(this.shape);
        }
        this.shape = new egret.Shape();
        this.shape.x = 0;
        this.shape.y = 0;
        this.shape.alpha = 0.95;
        this.shape.graphics.beginFill(this.shapeColor);
        this.shape.graphics.drawRoundRect(0, 0, width, height, 0);
        this.shape.graphics.endFill();
        this.object.addChild(this.shape);
    };
    CautionPanel.prototype.setButton = function (x, y, width, height) {
        new CautionYesButton(x, y, width, height, Util.color(230, 230, 230), "YES");
        new CautionNoButton(x + width * 2, y, width, height, Util.color(230, 230, 230), "NO");
    };
    CautionPanel.prototype.updateContent = function () { };
    CautionPanel.I = null;
    CautionPanel.onPanel = false;
    return CautionPanel;
}(Panel));
__reflect(CautionPanel.prototype, "CautionPanel");
var CautionYesButton = (function (_super) {
    __extends(CautionYesButton, _super);
    function CautionYesButton(x, y, width, height, color, index) {
        var _this = _super.call(this, x, y, width, height, index) || this;
        CautionYesButton.I = _this;
        _this.setShape(x, y, width, height, color);
        _this.setIndexText(0, 0, width, height, index);
        _this.shapeColor = color;
        _this.setMask(x, y, width, height);
        return _this;
    }
    CautionYesButton.prototype.setIndexText = function (x, y, width, height, index) {
        var size = 60;
        var ratio = 0.5;
        this.indexText = Util.myText(x, y, index, size, ratio, this.costTextColor, false);
        this.indexText.width = this.object.width / ratio;
        this.indexText.height = this.object.height / ratio;
        this.indexText.textAlign = egret.HorizontalAlign.CENTER;
        this.indexText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.object.addChild(this.indexText);
    };
    CautionYesButton.prototype.tap = function () {
        Player.I.resetStatus();
    };
    CautionYesButton.prototype.updateContent = function () {
    };
    CautionYesButton.I = null;
    return CautionYesButton;
}(Button));
__reflect(CautionYesButton.prototype, "CautionYesButton");
var CautionNoButton = (function (_super) {
    __extends(CautionNoButton, _super);
    function CautionNoButton(x, y, width, height, color, index) {
        var _this = _super.call(this, x, y, width, height, index) || this;
        CautionNoButton.I = _this;
        _this.setShape(x, y, width, height, color);
        _this.setIndexText(0, 0, width, height, index);
        _this.shapeColor = color;
        _this.setMask(x, y, width, height);
        return _this;
    }
    CautionNoButton.prototype.setIndexText = function (x, y, width, height, index) {
        var size = 60;
        var ratio = 0.5;
        this.indexText = Util.myText(x, y, index, size, ratio, this.costTextColor, false);
        this.indexText.width = this.object.width / ratio;
        this.indexText.height = this.object.height / ratio;
        this.indexText.textAlign = egret.HorizontalAlign.CENTER;
        this.indexText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.object.addChild(this.indexText);
    };
    CautionNoButton.prototype.tap = function () {
        CautionNoButton.I.destroy();
        CautionYesButton.I.destroy();
        CautionPanel.I.destroy();
    };
    CautionNoButton.prototype.updateContent = function () {
    };
    CautionNoButton.I = null;
    return CautionNoButton;
}(Button));
__reflect(CautionNoButton.prototype, "CautionNoButton");
//# sourceMappingURL=CautionPanel.js.map