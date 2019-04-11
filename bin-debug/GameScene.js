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
var RandomEnemy;
(function (RandomEnemy) {
    //NONE,
    RandomEnemy[RandomEnemy["RECT"] = 0] = "RECT";
    RandomEnemy[RandomEnemy["CIRCLE"] = 1] = "CIRCLE";
    RandomEnemy[RandomEnemy["DOUBLE_RECT"] = 2] = "DOUBLE_RECT";
    RandomEnemy[RandomEnemy["DOUBLE_CIRCLE"] = 3] = "DOUBLE_CIRCLE";
    RandomEnemy[RandomEnemy["TRIPLE_RECT"] = 4] = "TRIPLE_RECT";
    RandomEnemy[RandomEnemy["TRIPLE_CIRCLE"] = 5] = "TRIPLE_CIRCLE";
    RandomEnemy[RandomEnemy["BOSS_RECT"] = 6] = "BOSS_RECT";
    RandomEnemy[RandomEnemy["BOSS_CIRCLE"] = 7] = "BOSS_CIRCLE";
    RandomEnemy[RandomEnemy["BOSS_DOUBLE_RECT"] = 8] = "BOSS_DOUBLE_RECT";
    RandomEnemy[RandomEnemy["BOSS_DOUBLE_CIRCLE"] = 9] = "BOSS_DOUBLE_CIRCLE";
    RandomEnemy[RandomEnemy["BOSS_TRIPLE_RECT"] = 10] = "BOSS_TRIPLE_RECT";
    RandomEnemy[RandomEnemy["BOSS_TRIPLE_CIRCLE"] = 11] = "BOSS_TRIPLE_CIRCLE";
})(RandomEnemy || (RandomEnemy = {}));
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    /**/
    function GameScene() {
        var _this = _super.call(this) || this;
        GameScene.I = _this;
        _this.createStage();
        return _this;
    }
    GameScene.prototype.createStage = function () {
        GameScene.createEnemy();
    };
    GameScene.createEnemy = function () {
        var e;
        var createEnemy = 11; //Util.randomInt(RandomEnemy.RECT, RandomEnemy.BOSS_CIRCLE);
        var enemyColor = 0xffffff;
        var enemyHP = 0;
        var enemyDropMoney = 0;
        //Circle関連の変数
        var cr = Game.width / 6; //radius
        var cw = cr; //width
        var ch = cr; //height
        //boss戦
        switch (Kill.I.kill) {
            case 10:
                createEnemy = RandomEnemy.BOSS_RECT;
                break;
            case 50:
                createEnemy = RandomEnemy.BOSS_CIRCLE;
                break;
            case 100:
                createEnemy = RandomEnemy.BOSS_DOUBLE_RECT;
                break;
            case 200:
                createEnemy = RandomEnemy.BOSS_DOUBLE_CIRCLE;
                break;
            case 300:
                break;
            case 400:
                break;
            case 500:
                break;
            case 600:
                break;
            case 700:
                break;
            case 800:
                break;
            case 800:
                break;
            case 900:
                break;
            case 1000:
                break;
        }
        switch (createEnemy) {
            case RandomEnemy.RECT:
                e = new RectEnemy(Game.width / 2, Game.height / 4, Game.width / 6, Game.height / 8, Util.color(0, 0, 255), 10, 50);
                GameScene.enemy.push(e);
                break;
            case RandomEnemy.CIRCLE:
                cr = Game.width / 8; //radius
                cw = cr; //width
                ch = cr; //height
                e = new CircleEnemy(Game.width / 2, Game.height / 4, cw, ch, cr, Util.color(0, 0, 255), 10, 50);
                GameScene.enemy.push(e);
                break;
            case RandomEnemy.DOUBLE_RECT:
                e = new DoubleRect(Game.width / 2, Game.height / 4, Game.width / 6, Game.height / 8, Util.color(10, 130, 180), 50, 200);
                GameScene.enemy.push(e);
                break;
            case RandomEnemy.DOUBLE_CIRCLE:
                cr = Game.width / 8; //radius
                cw = cr; //width
                ch = cr; //height
                e = new DoubleCircle(Game.width / 2, Game.height / 4, cw, ch, cr, Util.color(0, 50, 55), 50, 200);
                GameScene.enemy.push(e);
                break;
            case RandomEnemy.TRIPLE_RECT:
                e = new TripleRect(Game.width / 2, Game.height / 4, Game.width / 6, Game.height / 8, Util.color(10, 130, 180), 200, 3000);
                GameScene.enemy.push(e);
                break;
            case RandomEnemy.TRIPLE_CIRCLE:
                cr = Game.width / 8; //radius
                cw = cr; //width
                ch = cr; //height
                e = new TripleCircle(Game.width / 2, Game.height / 4, cw, ch, cr, Util.color(0, 50, 55), 200, 3000);
                GameScene.enemy.push(e);
                break;
            case RandomEnemy.BOSS_RECT:
                e = new RectEnemy(Game.width / 2, Game.height / 4, Game.width / 3.6, Game.height / 5.2, Util.color(255, 255, 0), 100, 1000);
                GameScene.enemy.push(e);
                break;
            case RandomEnemy.BOSS_CIRCLE:
                cr = Game.width / 5; //radius
                cw = cr; //width
                ch = cr; //height
                e = new CircleEnemy(Game.width / 2, Game.height / 4, cw, ch, cr, Util.color(255, 255, 0), 300, 2000);
                GameScene.enemy.push(e);
                break;
            case RandomEnemy.BOSS_DOUBLE_RECT:
                e = new DoubleRect(Game.width / 2, Game.height / 4, Game.width / 6, Game.height / 8, Util.color(255, 255, 0), 500, 1000);
                GameScene.enemy.push(e);
                break;
            case RandomEnemy.BOSS_DOUBLE_CIRCLE:
                cr = Game.width / 8; //radius
                cw = cr; //width
                ch = cr; //height
                e = new DoubleCircle(Game.width / 2, Game.height / 4, cw, ch, cr, Util.color(255, 255, 0), 500, 1000);
                GameScene.enemy.push(e);
                break;
            case RandomEnemy.BOSS_TRIPLE_RECT:
                e = new TripleRect(Game.width / 2, Game.height / 4, Game.width / 6, Game.height / 8, Util.color(255, 255, 0), 2000, 8000);
                GameScene.enemy.push(e);
                break;
            case RandomEnemy.BOSS_TRIPLE_CIRCLE:
                cr = Game.width / 8; //radius
                cw = cr; //width
                ch = cr; //height
                e = new TripleCircle(Game.width / 2, Game.height / 4, cw, ch, cr, Util.color(255, 255, 0), 2000, 8000);
                GameScene.enemy.push(e);
                break;
        }
    };
    GameScene.prototype.addDestroyMethod = function () {
    };
    GameScene.prototype.updateContent = function () {
    };
    GameScene.I = null;
    //public object : egret.DisplayObjectContainer = null;
    GameScene.enemy = [];
    return GameScene;
}(GameObject));
__reflect(GameScene.prototype, "GameScene");
//# sourceMappingURL=GameScene.js.map