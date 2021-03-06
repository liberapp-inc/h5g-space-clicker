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
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.addToStage, _this);
        return _this;
    }
    Main.prototype.addToStage = function () {
        GameObject.initial(this.stage);
        Util.init(this);
        Game.init();
        egret.startTick(this.tickLoop, this);
    };
    Main.prototype.tickLoop = function (timeStamp) {
        GameObject.update();
        return false;
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
var Game = (function () {
    function Game() {
    }
    Game.init = function () {
        this.height = egret.MainContext.instance.stage.stageHeight;
        this.width = egret.MainContext.instance.stage.stageWidth;
        var buttonColor = Util.color(230, 230, 230);
        /* new メソッドを記入*/
        new Background();
        new Kill();
        new Money();
        new Player(Game.width / 2, Game.height / 1.5, Game.width / 3.4, Game.height / 8, Util.color(0, 254, 252));
        new LevelUpBulletDamageButton(Game.width / 6, Game.height / 1.1, Game.width / 4, Game.height / 10.5, buttonColor, "Attack");
        new LevelUpBulletSpeedButton(Game.width / 2, Game.height / 1.1, Game.width / 4, Game.height / 10.5, buttonColor, "Speed");
        new LevelUpSalaryButton(Game.width / 1.2, Game.height / 1.1, Game.width / 4, Game.height / 10.5, buttonColor, "Salary");
        new ResetButton(Game.width / 1.18, Game.height / 9.8, Game.width / 4.5, Game.height / 14, buttonColor, "Delete\nData");
        new CheckDate(); //Playerよりも後にインスタンス化すること
        new GameScene();
    };
    return Game;
}());
__reflect(Game.prototype, "Game");
var Background = (function (_super) {
    __extends(Background, _super);
    function Background() {
        var _this = _super.call(this) || this;
        _this.color = Util.color(0, 0, 0);
        Background.I = _this;
        _this.shape = new egret.Shape();
        _this.shape.graphics.beginFill(_this.color);
        _this.shape.graphics.drawRect(0, 0, Game.width, Game.height);
        _this.shape.graphics.endFill();
        GameObject.display.addChild(_this.shape);
        return _this;
    }
    Background.prototype.updateContent = function () { };
    Background.I = null;
    return Background;
}(GameObject));
__reflect(Background.prototype, "Background");
var CreateWorld = (function (_super) {
    __extends(CreateWorld, _super);
    function CreateWorld() {
        var _this = _super.call(this) || this;
        CreateWorld.I = _this;
        CreateWorld.world.on("beginContact", _this.collision, _this);
        return _this;
    }
    CreateWorld.prototype.createWorld = function () {
        CreateWorld.world = new p2.World();
        CreateWorld.world.sleepMode = p2.World.BODY_SLEEPING;
        CreateWorld.world.gravity = [0, 9.8];
    };
    CreateWorld.worldBegin = function (dt) {
        CreateWorld.world.step(1 / 60, dt / 1000, 10);
        return false;
    };
    //コリジョンイベントはここにまとめる
    CreateWorld.prototype.collision = function (evt) {
    };
    CreateWorld.prototype.addDestroyMethod = function () { CreateWorld.world.clear(); };
    CreateWorld.prototype.updateContent = function () { };
    CreateWorld.I = null;
    return CreateWorld;
}(PhysicsObject));
__reflect(CreateWorld.prototype, "CreateWorld");
//# sourceMappingURL=Main.js.map