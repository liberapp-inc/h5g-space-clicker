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
var Kill = (function (_super) {
    __extends(Kill, _super);
    function Kill() {
        var _this = _super.call(this) || this;
        _this.kill = 0;
        _this.text = null;
        //textBest:egret.TextField = null;
        _this.textColor = 0x00FF3B;
        Kill.I = _this;
        _this.textColor = Util.color(0, 255, 0);
        var kill = window.localStorage.getItem("kill"); // string
        if (kill == null) {
            kill = "0";
            window.localStorage.setItem("kill", kill);
        }
        _this.kill = parseInt(kill);
        _this.text = Util.myText(0, 0, "KILL : " + _this.kill.toString() + " / 1000", 100, 0.5, _this.textColor, true);
        GameObject.display.addChild(_this.text);
        return _this;
    }
    Kill.prototype.onDestroy = function () {
        GameObject.display.removeChild(this.text);
        this.text = null;
    };
    Kill.prototype.updateContent = function () {
        this.text.text = "KILL : " + this.kill.toString() + " / 1000";
    };
    Kill.prototype.addKill = function () {
        this.kill += 1;
        window.localStorage.setItem("kill", this.kill.toString());
    };
    Kill.I = null; // singleton instance
    return Kill;
}(GameObject));
__reflect(Kill.prototype, "Kill");
//# sourceMappingURL=Kill.js.map