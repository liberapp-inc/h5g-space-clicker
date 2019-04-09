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
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(x, y, width, height, color) {
        var _this = _super.call(this) || this;
        Player.I = _this;
        _this.setPlayerObject(x, y, width, height);
        _this.setShape(x, y, width, height, color);
        _this.loadStatus();
        Player.object.scaleX = Player.object.scaleY = 0.4;
        Player.shotTimer = new egret.Timer(Player.shotInterval, 0);
        Player.shotTimer.addEventListener(egret.TimerEvent.TIMER, _this.shot, _this);
        Player.shotTimer.start();
        return _this;
    }
    Player.prototype.loadStatus = function () {
        Player.bulletDamage = Util.loadLocalStrage("Player.bulletDamage", Player.bulletDamage);
        Player.bulletMoveSpeed = Util.loadLocalStrage("Player.bulletMoveSpeed", Player.bulletMoveSpeed);
        Player.salary = Util.loadLocalStrage("Player.salary", Player.salary);
        Player.shotInterval = Util.loadLocalStrage("Player.shotInterval", Player.shotInterval);
        Player.damageLevelUpCost = Util.loadLocalStrage("Player.damageLevelUpCost", Player.damageLevelUpCost);
        Player.speedLevelUpCost = Util.loadLocalStrage("Player.speedLevelUpCost", Player.speedLevelUpCost);
        Player.salaryLevelUpCost = Util.loadLocalStrage("Player.salaryLevelUpCost", Player.salaryLevelUpCost);
    };
    Player.prototype.setPlayerObject = function (x, y, width, height) {
        Player.object = new egret.DisplayObjectContainer();
        Player.object.anchorOffsetX += width / 2;
        Player.object.x = x;
        Player.object.y = y;
        Player.object.width = width;
        Player.object.height = height;
        GameObject.display.addChild(Player.object);
    };
    Player.prototype.setShape = function (x, y, width, height, color) {
        if (this.shape) {
            GameObject.display.removeChild(this.shape);
        }
        this.shape = new egret.Shape();
        this.shape.x = 0;
        this.shape.y = 0;
        this.shape.graphics.beginFill(color);
        this.shape.graphics.drawRect(0, 0, width, height);
        this.shape.graphics.endFill();
        //砲台部分をつくるため、背景色と同じ色を重ねている
        var leftMaskShape = this.setMask(this.shape.x, this.shape.y, this.shape.width / 3, this.shape.height / 2, Util.color(0, 0, 0));
        var rightMaskShape = this.setMask(this.shape.x + this.shape.width * 2 / 3, this.shape.y, this.shape.width / 3, this.shape.height / 2, Util.color(0, 0, 0));
        Player.object.addChild(this.shape);
        Player.object.addChild(leftMaskShape);
        Player.object.addChild(rightMaskShape);
    };
    Player.prototype.setMask = function (x, y, width, height, color) {
        var mask = new egret.Shape();
        mask.x = x;
        mask.y = y;
        mask.graphics.beginFill(color);
        mask.graphics.drawRect(0, 0, width, height);
        mask.graphics.endFill();
        return mask;
    };
    Player.prototype.shot = function () {
        var b = new Bullet(Game.width / 2, Game.height / 1.6, Game.width / 24, Game.height / 16, Util.color(255, 255, 0));
        Player.bullet.push(b);
    };
    Player.prototype.resetTimer = function () {
        Player.shotTimer.stop();
        Player.shotTimer.removeEventListener(egret.TimerEvent.TIMER, this.shot, this);
        Player.shotTimer = new egret.Timer(Player.shotInterval, 0);
        Player.shotTimer.addEventListener(egret.TimerEvent.TIMER, this.shot, this);
        Player.shotTimer.start();
        console.log(Player.shotInterval);
    };
    Player.prototype.updateContent = function () {
        Player.bullet.forEach(function (b) {
            b.object.y -= Player.bulletMoveSpeed;
            if (b.object.y < 0) {
                b.destroy();
            }
            //Enemyとの接触判定(Enemyを一体ずつしか出さないならenemyをforEachする必要なし)
            GameScene.enemy.forEach(function (e) {
                if (b.collisionFlag == false && e.object.y >= b.object.y && e.deadFlag == false) {
                    e.hp -= Player.bulletDamage;
                    MyTween.knockBack(e.object);
                    b.destroy();
                    b.collisionFlag = true;
                    if (e.hp <= 0) {
                        e.hp = 0;
                        e.deadFlag = true;
                        Money.addMoney(e.dropMoney);
                        new DropMoney(0, 0, "MONEY\n+" + e.dropMoney.toString(), 70, 0.5, 0xff0000, true, e.object);
                        //enemyFadeOut(フェードアウトしたいオブジェクト, e.destroy)としたかったが、
                        //e.destroyが即座に実行されてしまったため、直感的ではないがクラスを一旦取得し、destroyを実行
                        MyTween.enemyFadeOut(e.object, e);
                        Kill.I.addKill();
                        //e.destroy();
                    }
                }
            });
        });
    };
    Player.I = null;
    Player.object = null;
    Player.shotTimer = null;
    Player.shotInterval = 1000;
    Player.bullet = [];
    Player.bulletDamage = 1;
    Player.bulletMoveSpeed = 5;
    Player.salary = 1;
    //statusアップ系
    /*    static damageLevel :number = 100;
        static speedLevel :number = 100;
        static salaryLevel :number = 100;*/
    Player.damageLevelUpCost = 100;
    Player.speedLevelUpCost = 100;
    Player.salaryLevelUpCost = 100;
    return Player;
}(GameObject));
__reflect(Player.prototype, "Player");
//# sourceMappingURL=Player.js.map