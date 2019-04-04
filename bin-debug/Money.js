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
        _this.textColor = Util.color(0, 255, 0);
        Money.I = _this;
        var money = window.localStorage.getItem("money"); // string
        if (money == null) {
            money = "0";
            window.localStorage.setItem("money", money);
        }
        _this.money = parseInt(money);
        console.log(_this.money);
        _this.text = Util.myText(0, 0, "MONEY : 0", 100, 0.5, _this.textColor, true);
        GameObject.display.addChild(_this.text);
        return _this;
        /*        let bestMoney = window.localStorage.getItem("bestMoney"); // string
                if( bestMoney == null ){
                    bestMoney = "0";
                    window.localStorage.setItem("bestMoney", bestMoney);
                }
                this.bestMoney = parseInt( bestMoney );
                this.textBest = Util.myText(0, 50, "BEST : " + bestMoney, 100, 0.5, this.textColor, true);
                GameObject.display.addChild( this.textBest );*/
    }
    Money.prototype.onDestroy = function () {
        GameObject.display.removeChild(this.text);
        this.text = null;
        /*        GameObject.display.removeChild( this.textBest );
                this.textBest = null;*/
    };
    Money.prototype.updateContent = function () {
        this.text.text = "MONEY : " + this.money.toFixed();
        /*        if( this.bestMoney < this.money ){
                    this.bestMoney = this.money;
                    this.textBest.text = "BEST : " + this.money.toFixed();
                }*/
    };
    Money.addMoney = function (dropMoney) {
        Money.I.money += dropMoney;
        window.localStorage.setItem("money", Money.I.money.toString());
    };
    Money.I = null; // singleton instance
    return Money;
}(GameObject));
__reflect(Money.prototype, "Money");
//# sourceMappingURL=Money.js.map