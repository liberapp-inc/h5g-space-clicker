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
var Money = (function (_super) {
    __extends(Money, _super);
    function Money() {
        var _this = _super.call(this) || this;
        _this.money = 0;
        _this.bestMoney = 0;
        _this.text = null;
        _this.textBest = null;
        _this.textColor = 0x00FF3B;
        _this.textColor = Util.color(230, 230, 230);
        Money.I = _this;
        /*        let money = window.localStorage.getItem("money"); // string
                
                if( money == null ){
                    money = "0";
                    window.localStorage.setItem("money", money);
                }*/
        _this.money = Util.loadLocalStrage("Money.I.money", Money.I.money);
        _this.text = Util.myText(0, 0, "MONEY : 0", 100, 0.5, _this.textColor, true);
        GameObject.display.addChild(_this.text);
        return _this;
    }
    Money.prototype.addDestroyMethod = function () {
        GameObject.display.removeChild(this.text);
        this.text = null;
    };
    Money.prototype.updateContent = function () {
        this.text.text = "MONEY : " + this.money.toFixed();
    };
    Money.addMoney = function (dropMoney) {
        Money.I.money += dropMoney;
        Util.saveLocalStrage("Money.I.money", Money.I.money);
    };
    Money.I = null; // singleton instance
    return Money;
}(GameObject));
__reflect(Money.prototype, "Money");
var DropMoney = (function (_super) {
    __extends(DropMoney, _super);
    function DropMoney(x, y, text, size, ratio, color, bold, display) {
        var _this = _super.call(this) || this;
        _this.text = null;
        //this.textColor = Util.color(90,205,39);
        _this.display = display;
        _this.text = Util.myText(x, y, text, size, ratio, color, true);
        _this.text.width /= ratio;
        _this.text.height /= ratio;
        _this.text.anchorOffsetX = _this.text.width / 2;
        _this.text.anchorOffsetY = _this.text.height / 2;
        _this.text.x = _this.display.anchorOffsetX;
        _this.text.y = _this.display.anchorOffsetY;
        _this.text.textAlign = egret.HorizontalAlign.CENTER;
        _this.text.verticalAlign = egret.VerticalAlign.MIDDLE;
        display.addChild(_this.text);
        MyTween.dropMoneyTextFadeOut(_this.text, _this);
        return _this;
    }
    DropMoney.prototype.addDestroyMethod = function () {
        this.display.removeChild(this.text);
    };
    DropMoney.prototype.updateContent = function () {
    };
    return DropMoney;
}(GameObject));
__reflect(DropMoney.prototype, "DropMoney");
//# sourceMappingURL=Money.js.map