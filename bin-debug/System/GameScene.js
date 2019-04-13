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
    RandomEnemy[RandomEnemy["UMIBOUZU"] = 12] = "UMIBOUZU";
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
        var newArray = GameScene.enemy.filter(function (e) { return e.deadFlag !== true; });
        GameScene.enemy = newArray;
        var e;
        var createEnemy = Util.randomInt(RandomEnemy.RECT, GameScene.enemyLevel);
        var rectEnemyColor = Util.color(240, 187, 243);
        var circleEnemyColor = Util.color(240, 187, 243);
        var bossColor = Util.color(214, 175, 56);
        var enemyHP = 0;
        var enemyDropMoney = 0;
        //Circle関連の変数
        var cr = Game.width / 6; //radius
        var cw = cr; //width
        var ch = cr; //height
        //boss戦
        switch (Kill.I.kill) {
            case 10:
                createEnemy = RandomEnemy.UMIBOUZU;
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
                //GameScene.enemyLevel = RandomEnemy.UMIBOUZU;//これだけEnemy生成時にlevelを変更
                //Util.saveLocalStrage("GameScene.enemyLevel", GameScene.enemyLevel);
                break;
            case 500:
                createEnemy = RandomEnemy.BOSS_UMIBOUZU;
                GameScene.enemyLevel = RandomEnemy.BOSS_UMIBOUZU;
                Util.saveLocalStrage("GameScene.enemyLevel", GameScene.enemyLevel);
                break;
        }
        switch (createEnemy) {
            //雑魚キャラ
            case RandomEnemy.RECT:
                e = new RectEnemy(Game.width / 2, Game.height / 4, Game.width / 6, Game.height / 8, rectEnemyColor, 10 + Kill.I.kill * 1, 50 + Kill.I.kill * 1);
                GameScene.enemy.push(e);
                break;
            case RandomEnemy.CIRCLE:
                cr = Game.width / 8; //radius
                cw = cr; //width
                ch = cr; //height
                e = new CircleEnemy(Game.width / 2, Game.height / 4, cw, ch, cr, circleEnemyColor, 15 + Kill.I.kill * 1, 80 + Kill.I.kill * 1);
                GameScene.enemy.push(e);
                break;
            case RandomEnemy.DOUBLE_RECT:
                e = new DoubleRect(Game.width / 2, Game.height / 4, Game.width / 6, Game.height / 8, rectEnemyColor, 50 + Kill.I.kill * 2, 300 + Kill.I.kill * 2);
                GameScene.enemy.push(e);
                break;
            case RandomEnemy.DOUBLE_CIRCLE:
                cr = Game.width / 8; //radius
                cw = cr; //width
                ch = cr; //height
                e = new DoubleCircle(Game.width / 2, Game.height / 4, cw, ch, cr, circleEnemyColor, 80 + Kill.I.kill * 2, 500 + Kill.I.kill * 2);
                GameScene.enemy.push(e);
                break;
            case RandomEnemy.TRIPLE_RECT:
                e = new TripleRect(Game.width / 2, Game.height / 4, Game.width / 6, Game.height / 8, rectEnemyColor, 200 + Kill.I.kill * 3, 1000 + Kill.I.kill * 3);
                GameScene.enemy.push(e);
                break;
            case RandomEnemy.TRIPLE_CIRCLE:
                cr = Game.width / 8; //radius
                cw = cr; //width
                ch = cr; //height
                e = new TripleCircle(Game.width / 2, Game.height / 4, cw, ch, cr, circleEnemyColor, 300 + Kill.I.kill * 4, 1500 + Kill.I.kill * 4);
                GameScene.enemy.push(e);
                break;
            //Bossキャラ
            case RandomEnemy.UMIBOUZU:
                cr = Game.width; //radius
                cw = cr; //width
                ch = cr; //height
                e = new Umibouzu(Game.width / 2, Game.height / 4, cw, ch, cr, bossColor, 100 + Kill.I.kill * 1, 1500 + Kill.I.kill * 1);
                GameScene.enemy.push(e);
                if (GameScene.enemyLevel != RandomEnemy.UMIBOUZU && GameScene.enemyLevel != RandomEnemy.FINAL && GameScene.enemyLevel != RandomEnemy.BOSS_UMIBOUZU) {
                    e.bossFlag = true;
                    new BossEntryEffect();
                }
                break;
            case RandomEnemy.BOSS_RECT:
                e = new RectEnemy(Game.width / 2, Game.height / 4, Game.width / 3.6, Game.height / 5.2, bossColor, 100 + Kill.I.kill * 1, 1500);
                GameScene.enemy.push(e);
                if (GameScene.enemyLevel != RandomEnemy.UMIBOUZU && GameScene.enemyLevel != RandomEnemy.FINAL && GameScene.enemyLevel != RandomEnemy.BOSS_UMIBOUZU) {
                    e.bossFlag = true;
                    new BossEntryEffect();
                }
                break;
            case RandomEnemy.BOSS_CIRCLE:
                cr = Game.width / 5; //radius
                cw = cr; //width
                ch = cr; //height
                e = new CircleEnemy(Game.width / 2, Game.height / 4, cw, ch, cr, bossColor, 300 + Kill.I.kill * 2, 2000);
                GameScene.enemy.push(e);
                if (GameScene.enemyLevel != RandomEnemy.UMIBOUZU && GameScene.enemyLevel != RandomEnemy.FINAL && GameScene.enemyLevel != RandomEnemy.BOSS_UMIBOUZU) {
                    e.bossFlag = true;
                    new BossEntryEffect();
                }
                break;
            case RandomEnemy.BOSS_DOUBLE_RECT:
                e = new DoubleRect(Game.width / 2, Game.height / 4, Game.width / 6, Game.height / 8, bossColor, 1000 + Kill.I.kill * 3, 5000);
                GameScene.enemy.push(e);
                if (GameScene.enemyLevel != RandomEnemy.UMIBOUZU && GameScene.enemyLevel != RandomEnemy.FINAL && GameScene.enemyLevel != RandomEnemy.BOSS_UMIBOUZU) {
                    e.bossFlag = true;
                    new BossEntryEffect();
                }
                break;
            case RandomEnemy.BOSS_DOUBLE_CIRCLE:
                cr = Game.width / 8; //radius
                cw = cr; //width
                ch = cr; //height
                e = new DoubleCircle(Game.width / 2, Game.height / 4, cw, ch, cr, bossColor, 2000 + Kill.I.kill * 4, 7000);
                GameScene.enemy.push(e);
                if (GameScene.enemyLevel != RandomEnemy.UMIBOUZU && GameScene.enemyLevel != RandomEnemy.FINAL && GameScene.enemyLevel != RandomEnemy.BOSS_UMIBOUZU) {
                    e.bossFlag = true;
                    new BossEntryEffect();
                }
                break;
            case RandomEnemy.BOSS_TRIPLE_RECT:
                e = new TripleRect(Game.width / 2, Game.height / 4, Game.width / 6, Game.height / 8, bossColor, 5000 + Kill.I.kill * 5, 10000);
                GameScene.enemy.push(e);
                if (GameScene.enemyLevel != RandomEnemy.UMIBOUZU && GameScene.enemyLevel != RandomEnemy.FINAL && GameScene.enemyLevel != RandomEnemy.BOSS_UMIBOUZU) {
                    e.bossFlag = true;
                    new BossEntryEffect();
                }
                break;
            case RandomEnemy.BOSS_TRIPLE_CIRCLE:
                cr = Game.width / 8; //radius
                cw = cr; //width
                ch = cr; //height
                e = new TripleCircle(Game.width / 2, Game.height / 4, cw, ch, cr, bossColor, 7000 + Kill.I.kill * 6, 15000);
                GameScene.enemy.push(e);
                if (GameScene.enemyLevel != RandomEnemy.UMIBOUZU && GameScene.enemyLevel != RandomEnemy.FINAL && GameScene.enemyLevel != RandomEnemy.BOSS_UMIBOUZU) {
                    e.bossFlag = true;
                    new BossEntryEffect();
                    GameScene.enemyLevel = RandomEnemy.UMIBOUZU; //これだけ特別
                    Util.saveLocalStrage("GameScene.enemyLevel", GameScene.enemyLevel);
                }
                break;
            case RandomEnemy.BOSS_UMIBOUZU:
                new BossEntryEffect();
                cr = Game.width / 8 * 20; //radius
                cw = cr; //width
                ch = cr; //height
                e = new Umibouzu(Game.width / 2, Game.height / 4, cw, ch, cr, bossColor, 100000, 200000);
                GameScene.enemy.push(e);
                e.bossFlag = true;
                e.lastBossFlag = true;
                break;
        }
    };
    GameScene.prototype.addDestroyMethod = function () {
        GameScene.enemy = [];
    };
    GameScene.prototype.updateContent = function () {
    };
    GameScene.I = null;
    GameScene.enemyLevel = 1;
    //public object : egret.DisplayObjectContainer = null;
    GameScene.enemy = [];
    return GameScene;
}(GameObject));
__reflect(GameScene.prototype, "GameScene");
//# sourceMappingURL=GameScene.js.map