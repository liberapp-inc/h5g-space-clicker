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
    RandomEnemy[RandomEnemy["UMIBOUZU"] = 6] = "UMIBOUZU";
    RandomEnemy[RandomEnemy["BOSS_RECT"] = 7] = "BOSS_RECT";
    RandomEnemy[RandomEnemy["BOSS_CIRCLE"] = 8] = "BOSS_CIRCLE";
    RandomEnemy[RandomEnemy["BOSS_DOUBLE_RECT"] = 9] = "BOSS_DOUBLE_RECT";
    RandomEnemy[RandomEnemy["BOSS_DOUBLE_CIRCLE"] = 10] = "BOSS_DOUBLE_CIRCLE";
    RandomEnemy[RandomEnemy["BOSS_TRIPLE_RECT"] = 11] = "BOSS_TRIPLE_RECT";
    RandomEnemy[RandomEnemy["BOSS_TRIPLE_CIRCLE"] = 12] = "BOSS_TRIPLE_CIRCLE";
    RandomEnemy[RandomEnemy["BOSS_UMIBOUZU"] = 13] = "BOSS_UMIBOUZU";
    RandomEnemy[RandomEnemy["FINAL"] = 14] = "FINAL";
})(RandomEnemy || (RandomEnemy = {}));
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    /**/
    function GameScene() {
        var _this = _super.call(this) || this;
        GameScene.I = _this;
        GameScene.enemyLevel = Util.loadLocalStrage("GameScene.enemyLevel", GameScene.enemyLevel);
        _this.createStage();
        return _this;
    }
    GameScene.prototype.createStage = function () {
        GameScene.createEnemy();
    };
    GameScene.createEnemy = function () {
        var e;
        var createEnemy = 0; //Util.randomInt(RandomEnemy.RECT, GameScene.enemyLevel);
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
                GameScene.enemyLevel = RandomEnemy.CIRCLE;
                Util.saveLocalStrage("GameScene.enemyLevel", GameScene.enemyLevel);
                break;
            case 50:
                createEnemy = RandomEnemy.BOSS_CIRCLE;
                GameScene.enemyLevel = RandomEnemy.DOUBLE_RECT;
                Util.saveLocalStrage("GameScene.enemyLevel", GameScene.enemyLevel);
                break;
            case 100:
                createEnemy = RandomEnemy.BOSS_DOUBLE_RECT;
                GameScene.enemyLevel = RandomEnemy.DOUBLE_CIRCLE;
                Util.saveLocalStrage("GameScene.enemyLevel", GameScene.enemyLevel);
                break;
            case 200:
                createEnemy = RandomEnemy.BOSS_DOUBLE_CIRCLE;
                GameScene.enemyLevel = RandomEnemy.TRIPLE_RECT;
                Util.saveLocalStrage("GameScene.enemyLevel", GameScene.enemyLevel);
                break;
            case 300:
                createEnemy = RandomEnemy.BOSS_TRIPLE_RECT;
                GameScene.enemyLevel = RandomEnemy.TRIPLE_CIRCLE;
                Util.saveLocalStrage("GameScene.enemyLevel", GameScene.enemyLevel);
                break;
            case 400:
                createEnemy = RandomEnemy.BOSS_TRIPLE_CIRCLE;
                GameScene.enemyLevel = RandomEnemy.BOSS_UMIBOUZU;
                Util.saveLocalStrage("GameScene.enemyLevel", GameScene.enemyLevel);
                break;
            case 500:
                createEnemy = RandomEnemy.BOSS_UMIBOUZU;
                GameScene.enemyLevel = RandomEnemy.FINAL;
                Util.saveLocalStrage("GameScene.enemyLevel", GameScene.enemyLevel);
                break;
        }
        switch (createEnemy) {
            //雑魚キャラ
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
                e = new DoubleCircle(Game.width / 2, Game.height / 4, cw, ch, cr, Util.color(0, 150, 55), 50, 200);
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
            //BOSSキャラ
            case RandomEnemy.UMIBOUZU:
                cr = Game.width / 20; //radius
                cw = cr; //width
                ch = cr; //height
                e = new Umibouzu(Game.width / 2, Game.height / 4, cw, ch, cr, Util.color(160, 90, 240), 100, 1500);
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
            case RandomEnemy.BOSS_UMIBOUZU:
                cr = Game.width / 8; //radius
                cw = cr; //width
                ch = cr; //height
                e = new Umibouzu(Game.width / 2, Game.height / 4, cw, ch, cr, Util.color(255, 255, 0), 10000, 15000);
                GameScene.enemy.push(e);
                break;
        }
    };
    GameScene.prototype.addDestroyMethod = function () {
        GameScene.enemy = [];
    };
    GameScene.prototype.updateContent = function () {
    };
    GameScene.I = null;
    GameScene.enemyLevel = 0;
    //public object : egret.DisplayObjectContainer = null;
    GameScene.enemy = [];
    return GameScene;
}(GameObject));
__reflect(GameScene.prototype, "GameScene");
//# sourceMappingURL=GameScene.js.map