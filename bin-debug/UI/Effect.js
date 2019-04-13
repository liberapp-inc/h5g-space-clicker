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
//Effect終了後の削除はMyTween.backgroundFadeOutで行っている
var BossEntryEffect = (function (_super) {
    __extends(BossEntryEffect, _super);
    function BossEntryEffect() {
        var _this = _super.call(this) || this;
        _this.upperObject = null;
        _this.lowerObject = null;
        _this.background = null;
        _this.backgroundColor = Util.color(255, 240, 230);
        _this.leftText = null;
        _this.rightText = null;
        _this.textColor = Util.color(254, 0, 0);
        BossEntryEffect.I = _this;
        _this.setBackground();
        _this.setObject();
        _this.setUpperShape(0, 0, Game.width / 6, Game.height / 12);
        _this.setLowerShape(0, 0, Game.width / 6, Game.height / 12);
        _this.setRightText();
        _this.setLeftText();
        return _this;
    }
    BossEntryEffect.prototype.setObject = function () {
        this.upperObject = new egret.DisplayObjectContainer();
        this.lowerObject = new egret.DisplayObjectContainer();
        this.upperObject.x = Game.width;
        this.lowerObject.y = Game.height - Game.height / 12;
        GameObject.display.addChild(this.upperObject);
        GameObject.display.addChild(this.lowerObject);
    };
    BossEntryEffect.prototype.setUpperShape = function (x, y, width, height) {
        var color;
        for (var i = 0; i < 30; i++) {
            if (i % 2 == 0) {
                color = Util.color(0, 0, 0);
            }
            else {
                color = Util.color(255, 240, 39);
            }
            var s = new egret.Shape();
            s.graphics.beginFill(color);
            s.graphics.drawRect(width * i, y, width, height);
            s.graphics.endFill();
            this.upperObject.addChild(s);
            MyTween.bossSlide(s, -2500, 3000, 1000);
        }
    };
    BossEntryEffect.prototype.setLowerShape = function (x, y, width, height) {
        var color;
        for (var i = 0; i < 30; i++) {
            if (i % 2 == 0) {
                color = Util.color(0, 0, 0);
            }
            else {
                color = Util.color(255, 240, 39);
            }
            var s = new egret.Shape();
            s.graphics.beginFill(color);
            s.graphics.drawRect(-width * i, y, width, height);
            s.graphics.endFill();
            this.lowerObject.addChild(s);
            MyTween.bossSlide(s, 2500, 3000, 1000);
        }
    };
    BossEntryEffect.prototype.setLeftText = function () {
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
    BossEntryEffect.prototype.setRightText = function () {
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
    BossEntryEffect.prototype.setBackground = function () {
        this.background = new egret.Shape();
        this.background.graphics.beginFill(this.backgroundColor);
        this.background.graphics.drawRect(0, 0, Game.width, Game.height);
        this.background.graphics.endFill();
        this.background.alpha = 0.1;
        GameObject.display.addChild(this.background);
        MyTween.backgroundFadeOut(this.background, 300);
    };
    BossEntryEffect.prototype.addDestroyMethod = function () {
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
    BossEntryEffect.prototype.updateContent = function () { };
    BossEntryEffect.I = null;
    return BossEntryEffect;
}(GameObject));
__reflect(BossEntryEffect.prototype, "BossEntryEffect");
var BossDeadEffect = (function (_super) {
    __extends(BossDeadEffect, _super);
    function BossDeadEffect() {
        var _this = _super.call(this) || this;
        _this.background = null;
        _this.backgroundColor = Util.color(230, 230, 230);
        BossDeadEffect.I = _this;
        _this.setBackground();
        return _this;
    }
    BossDeadEffect.prototype.setBackground = function () {
        this.background = new egret.Shape();
        this.background.graphics.beginFill(this.backgroundColor);
        this.background.graphics.drawRect(0, 0, Game.width, Game.height);
        this.background.graphics.endFill();
        this.background.alpha = 0.5;
        GameObject.display.addChild(this.background);
        MyTween.bossDeadEffect(this.background);
    };
    BossDeadEffect.prototype.addDestroyMethod = function () {
        if (this.background) {
            GameObject.display.removeChild(this.background);
        }
    };
    BossDeadEffect.prototype.updateContent = function () { };
    BossDeadEffect.I = null;
    return BossDeadEffect;
}(GameObject));
__reflect(BossDeadEffect.prototype, "BossDeadEffect");
var GameClearEffect = (function (_super) {
    __extends(GameClearEffect, _super);
    function GameClearEffect() {
        var _this = _super.call(this) || this;
        _this.background = null;
        _this.backgroundColor = Util.color(230, 230, 230);
        _this.text = null;
        _this.textColor = Util.color(0, 0, 0);
        GameClearEffect.I = _this;
        _this.setBackground();
        _this.setText();
        return _this;
    }
    GameClearEffect.prototype.setBackground = function () {
        this.background = new egret.Shape();
        this.background.graphics.beginFill(this.backgroundColor);
        this.background.graphics.drawRect(0, 0, Game.width, Game.height);
        this.background.graphics.endFill();
        this.background.alpha = 0.5;
        GameObject.display.addChild(this.background);
        MyTween.gameClear(this.background, 1);
    };
    GameClearEffect.prototype.setText = function () {
        var size = 60;
        var ratio = 1;
        this.text = Util.myText(0, 0, "Thank You for Playing", size, ratio, this.textColor, true);
        this.text.width /= ratio;
        this.text.height /= ratio;
        this.text.anchorOffsetX = this.text.width / 2;
        this.text.anchorOffsetY = this.text.height / 2;
        this.text.x = Game.width / 2;
        this.text.y = Game.height / 2;
        this.text.alpha = 0.1;
        GameObject.display.addChild(this.text);
        MyTween.gameClear(this.text, 1);
    };
    GameClearEffect.prototype.tap = function () {
        GameObject.transit = Game.init;
    };
    GameClearEffect.prototype.addDestroyMethod = function () {
        GameObject.display.removeChild(this.text);
        this.text = null;
        GameObject.display.removeChild(this.background);
        this.background = null;
    };
    GameClearEffect.prototype.updateContent = function () { };
    GameClearEffect.I = null;
    return GameClearEffect;
}(GameObject));
__reflect(GameClearEffect.prototype, "GameClearEffect");
//# sourceMappingURL=Effect.js.map