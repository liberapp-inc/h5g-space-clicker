//時間報酬Money.I.money += this.s * Player.salary;の式があるので、
//Playerをインスタンス化してからCheckDateをインスタンス化する必要あり
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
var CheckDate = (function (_super) {
    __extends(CheckDate, _super);
    function CheckDate() {
        var _this = _super.call(this) || this;
        _this.text = null;
        _this.textColor = 0xffffff;
        _this.s = 0; //現在時刻 - 最終記録時間 sec
        CheckDate.I = _this;
        _this.getDate();
        CheckDate.dateTimer = new egret.Timer(CheckDate.dateInterval, 0);
        CheckDate.dateTimer.addEventListener(egret.TimerEvent.TIMER, _this.save, _this);
        CheckDate.dateTimer.start();
        return _this;
    }
    CheckDate.prototype.getDate = function () {
        var getLastDate = window.localStorage.getItem("getLastDate"); // string
        if (getLastDate == null || getLastDate == undefined) {
            getLastDate = (new Date().getTime()).toString(); //ms
            window.localStorage.setItem("getLastDate", getLastDate);
        }
        var lastDate = parseInt(getLastDate);
        var now = new Date();
        this.s = (now.getTime() - lastDate) / 1000; //sec
        this.s = parseInt(this.s.toString());
        //経過時間報酬の獲得
        Money.I.money += this.s * Player.salary;
        //現在時刻の更新
        getLastDate = (new Date().getTime()).toString(); //ms
        window.localStorage.setItem("getLastDate", getLastDate);
        lastDate = parseInt(getLastDate);
        this.s = (now.getTime() - lastDate) / 1000; //sec
        this.s = parseInt(this.s.toString());
        //AutoSave用テキスト
        this.text = Util.myText(Game.width / 1.4, 0, "saving...", 80, 0.5, this.textColor, true);
        this.text.alpha = 0;
        GameObject.display.addChild(this.text);
    };
    //30sec毎にセーブ
    CheckDate.prototype.save = function () {
        CheckDate.timerCounter += 1;
        this.salary();
        this.autoSaveText();
    };
    CheckDate.prototype.updateContent = function () { };
    CheckDate.prototype.addDestroyMethod = function () {
        CheckDate.dateTimer.stop();
        CheckDate.dateTimer.removeEventListener(egret.TimerEvent.TIMER, this.save, this);
    };
    CheckDate.prototype.salary = function () {
        Money.I.money += Player.salary;
        if (CheckDate.timerCounter >= 10) {
            Util.saveLocalStrage("Money.I.money", Money.I.money);
        }
    };
    CheckDate.prototype.autoSaveText = function () {
        if (CheckDate.timerCounter >= 10) {
            var getLastDate = (new Date().getTime()).toString(); //ms
            window.localStorage.setItem("getLastDate", getLastDate);
            CheckDate.timerCounter = 0;
            //AutoSaveTextの表示
            MyTween.autoSaveTextFadeInOut(this.text);
        }
    };
    CheckDate.I = null;
    CheckDate.dateTimer = null;
    CheckDate.dateInterval = 1000;
    CheckDate.timerCounter = 0;
    return CheckDate;
}(GameObject));
__reflect(CheckDate.prototype, "CheckDate");
//# sourceMappingURL=Date.js.map