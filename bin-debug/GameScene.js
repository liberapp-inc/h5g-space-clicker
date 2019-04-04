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
    RandomEnemy[RandomEnemy["NONE"] = 0] = "NONE";
    RandomEnemy[RandomEnemy["RECT"] = 1] = "RECT";
    RandomEnemy[RandomEnemy["CIRCLE"] = 2] = "CIRCLE";
    RandomEnemy[RandomEnemy["TRIANGLE"] = 3] = "TRIANGLE";
})(RandomEnemy || (RandomEnemy = {}));
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this) || this;
        _this.createStage();
        return _this;
    }
    GameScene.prototype.createStage = function () {
        this.createEnemy();
    };
    GameScene.prototype.createEnemy = function () {
        var createEnemy = 1; //Util.randomInt(RandomEnemy.NONE, RandomEnemy.TRIANGLE);
        switch (createEnemy) {
            case RandomEnemy.RECT:
                var e = new RectEnemy(Game.width / 2, Game.height / 4, Game.width / 4, Game.height / 6, Util.color(0, 0, 255), 10, 10);
                GameScene.enemy.push(e);
                break;
        }
    };
    GameScene.prototype.addDestroyMethod = function () {
    };
    GameScene.prototype.updateContent = function () {
    };
    //public object : egret.DisplayObjectContainer = null;
    GameScene.enemy = [];
    return GameScene;
}(GameObject));
__reflect(GameScene.prototype, "GameScene");
//# sourceMappingURL=GameScene.js.map