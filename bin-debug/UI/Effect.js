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
//Effect終了後の削除はMyTween.BossSlideで行っている
var BossEffect = (function (_super) {
    __extends(BossEffect, _super);
    function BossEffect() {
        var _this = _super.call(this) || this;
        _this.upperObject = null;
        _this.lowerObject = null;
        _this.background = null;
        _this.leftText = null;
        _this.rightText = null;
        _this.textColor = 0xff0000;
        BossEffect.I = _this;
        _this.setBackground();
        _this.setObject();
        _this.setUpperShape(0, 0, Game.width / 6, Game.height / 12);
        _this.setLowerShape(0, 0, Game.width / 6, Game.height / 12);
        _this.setRightText();
        _this.setLeftText();
        return _this;
    }
    BossEffect.prototype.setObject = function () {
        this.upperObject = new egret.DisplayObjectContainer();
        this.lowerObject = new egret.DisplayObjectContainer();
        this.upperObject.x = Game.width;
        this.lowerObject.y = Game.height - Game.height / 12;
        GameObject.display.addChild(this.upperObject);
        GameObject.display.addChild(this.lowerObject);
    };
    BossEffect.prototype.setUpperShape = function (x, y, width, height) {
        var color;
        for (var i = 0; i < 20; i++) {
            if (i % 2 == 0) {
                color = 0x000000;
            }
            else {
                color = 0xffff00;
            }
            var s = new egret.Shape();
            s.graphics.beginFill(color);
            s.graphics.drawRect(width * i, y, width, height);
            s.graphics.endFill();
            this.upperObject.addChild(s);
            MyTween.bossSlide(s, -2500, 3000, 1000);
        }
    };
    BossEffect.prototype.setLowerShape = function (x, y, width, height) {
        var color;
        for (var i = 0; i < 50; i++) {
            if (i % 2 == 0) {
                color = 0x000000;
            }
            else {
                color = 0xffff00;
            }
            var s = new egret.Shape();
            s.graphics.beginFill(color);
            s.graphics.drawRect(-width * i, y, width, height);
            s.graphics.endFill();
            this.lowerObject.addChild(s);
            MyTween.bossSlide(s, 2500, 3000, 1000);
        }
    };
    BossEffect.prototype.setLeftText = function () {
        var size = 120;
        var ratio = 1;
        this.leftText = Util.myText(0, 0, "BO", size, ratio, this.textColor, true);
        this.leftText.width /= ratio;
        this.leftText.height /= ratio;
        this.leftText.anchorOffsetX = this.leftText.width;
        this.leftText.anchorOffsetY = this.leftText.height / 2;
        this.leftText.x = 0;
        this.leftText.y = Game.height / 2;
        this.leftText.alpha = 1;
        GameObject.display.addChild(this.leftText);
        MyTween.bossTextSlide(this.leftText, Game.width / 2, 300);
    };
    BossEffect.prototype.setRightText = function () {
        var size = 120;
        var ratio = 1;
        this.rightText = Util.myText(0, 0, "SS", size, ratio, this.textColor, true);
        this.rightText.width /= ratio;
        this.rightText.height /= ratio;
        this.rightText.anchorOffsetX = 0;
        this.rightText.anchorOffsetY = this.rightText.height / 2;
        this.rightText.x = Game.width;
        this.rightText.y = Game.height / 2;
        this.rightText.alpha = 1;
        GameObject.display.addChild(this.rightText);
        MyTween.bossTextSlide(this.rightText, -Game.width / 2, 300);
    };
    BossEffect.prototype.setBackground = function () {
        var color = 0xffffe0;
        this.background = new egret.Shape();
        this.background.graphics.beginFill(color);
        this.background.graphics.drawRect(0, 0, Game.width, Game.height);
        this.background.graphics.endFill();
        this.background.alpha = 0.1;
        GameObject.display.addChild(this.background);
    };
    BossEffect.prototype.addDestroyMethod = function () {
        if (this.upperObject) {
            this.upperObject.removeChildren();
            GameObject.display.removeChild(this.upperObject);
        }
        if (this.lowerObject) {
            this.lowerObject.removeChildren();
            GameObject.display.removeChild(this.lowerObject);
        }
        if (this.background) {
            GameObject.display.removeChild(this.background);
        }
    };
    BossEffect.prototype.updateContent = function () { };
    BossEffect.I = null;
    return BossEffect;
}(GameObject));
__reflect(BossEffect.prototype, "BossEffect");
//# sourceMappingURL=Effect.js.map