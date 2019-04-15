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
        GameObject.display.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.shot, _this);
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
        Kill.I.kill = Util.loadLocalStrage("Kill.I.kill", Kill.I.kill);
        Money.I.money = Util.loadLocalStrage("Money.I.money", Money.I.money);
        GameScene.enemyLevel = Util.loadLocalStrage("GameScene.enemyLevel", GameScene.enemyLevel);
        Player.gameClear = Util.loadLocalStrage("Player.gameClear", Player.gameClear);
    };
    Player.prototype.resetStatus = function () {
        Player.bulletDamage = 1;
        Player.bulletMoveSpeed = 5;
        Player.salary = 1;
        Player.shotInterval = 1000;
        Player.damageLevelUpCost = 100;
        Player.speedLevelUpCost = 100;
        Player.salaryLevelUpCost = 100;
        Kill.I.kill = 0;
        Money.I.money = 0;
        GameScene.enemyLevel = 1;
        Player.gameClear = 0;
        Player.shotTimer.stop();
        Player.shotTimer.removeEventListener(egret.TimerEvent.TIMER, this.shot, this);
        Util.saveLocalStrage("Player.bulletDamage", Player.bulletDamage);
        Util.saveLocalStrage("Player.bulletMoveSpeed", Player.bulletMoveSpeed);
        Util.saveLocalStrage("Player.salary", Player.salary);
        Util.saveLocalStrage("Player.shotInterval", Player.shotInterval);
        Util.saveLocalStrage("Player.damageLevelUpCost", Player.damageLevelUpCost);
        Util.saveLocalStrage("Player.speedLevelUpCost", Player.speedLevelUpCost);
        Util.saveLocalStrage("Player.salaryLevelUpCost", Player.salaryLevelUpCost);
        Util.saveLocalStrage("Kill.I.kill", Kill.I.kill);
        Util.saveLocalStrage("Money.I.money", Money.I.money);
        Util.saveLocalStrage("GameScene.enemyLevel", GameScene.enemyLevel);
        Util.saveLocalStrage("Player.gameClear", Player.gameClear);
        GameObject.transit = Game.init;
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
        var leftMaskShape = this.setMask(this.shape.x, this.shape.y, this.shape.width / 3, this.shape.height / 2, Background.I.color);
        var rightMaskShape = this.setMask(this.shape.x + this.shape.width * 2 / 3 + 1, this.shape.y, this.shape.width / 3, this.shape.height / 2, Background.I.color);
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
        var b = new Bullet(Game.width / 2, Game.height / 1.6, Game.width / 30, Game.height / 16, Util.color(254, 0, 0));
        Player.bullet.push(b);
        var newArray = Player.bullet.filter(function (b) { return b.collisionFlag !== true; });
        Player.bullet = newArray;
    };
    Player.prototype.resetTimer = function () {
        Player.shotTimer.stop();
        Player.shotTimer.removeEventListener(egret.TimerEvent.TIMER, this.shot, this);
        Player.shotTimer = new egret.Timer(Player.shotInterval, 0);
        Player.shotTimer.addEventListener(egret.TimerEvent.TIMER, this.shot, this);
        Player.shotTimer.start();
    };
    Player.prototype.addDestroyMethod = function () {
        GameObject.display.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.shot, this);
        Player.shotTimer.stop();
        Player.shotTimer.removeEventListener(egret.TimerEvent.TIMER, this.shot, this);
        Player.bullet = [];
        if (this.shape) {
            Player.object.removeChild(this.shape);
            Player.object.removeChildren();
            this.shape = null;
        }
        if (Player.object) {
            GameObject.display.removeChild(Player.object);
        }
    };
    Player.prototype.updateContent = function () {
        var _this = this;
        Player.bullet.forEach(function (b) {
            //bulletSpeedが速すぎると、弾が当たり判定に収まらず、当たらないことがあるので移動スピードを強制補正
            var bSpeed = Player.bulletMoveSpeed;
            if (bSpeed > 30) {
                bSpeed = 30;
            }
            b.object.y -= bSpeed;
            //b.object.y -= Player.bulletMoveSpeed;
            if (b.object.y < 0) {
                b.destroy();
                b.collisionFlag = true;
            }
            //Enemyとの接触判定(Enemyを一体ずつしか出さないならenemyをforEachする必要なし)
            GameScene.enemy.forEach(function (e) {
                if (b.collisionFlag == false && e.deadFlag == false && e.object.y >= b.object.y && b.object.y >= e.object.y - e.object.height / 2) {
                    e.hp -= Player.bulletDamage;
                    MyTween.knockBack(e.object);
                    b.destroy();
                    b.collisionFlag = true;
                    if (e.hp <= 0) {
                        e.hp = 0;
                        e.deadFlag = true;
                        Money.addMoney(e.dropMoney);
                        new DropMoney(e.object.x, e.object.y, "+ " + e.dropMoney.toString() + " MONEY", 80, 0.5, Util.color(0, 254, 252), false, e.object);
                        //enemyFadeOut(フェードアウトしたいオブジェクト, e.destroy)としたかったが、
                        //e.destroyが即座に実行されてしまったため、直感的ではないがクラスを一旦取得し、destroyを実行
                        if (e.lastBossFlag) {
                            MyTween.lastBossFadeOut(e.object, e);
                        }
                        else {
                            MyTween.enemyFadeOut(e.object, e);
                        }
                        Kill.I.addKill();
                        if (e.bossFlag) {
                            new BossDeadEffect();
                        }
                        if (e.lastBossFlag) {
                            e.lastBossFlag = false;
                            Player.shotTimer.stop();
                            Player.shotTimer.removeEventListener(egret.TimerEvent.TIMER, _this.shot, _this);
                            GameObject.display.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.shot, _this);
                            Player.gameClear = 1;
                            Util.saveLocalStrage("Player.gameClear", Player.gameClear);
                            new GameClearEffect();
                        }
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
    Player.damageLevelUpCost = 100;
    Player.speedLevelUpCost = 100;
    Player.salaryLevelUpCost = 100;
    Player.gameClear = 0; //0で未クリア, 1でクリア
    return Player;
}(GameObject));
__reflect(Player.prototype, "Player");
//# sourceMappingURL=Player.js.map