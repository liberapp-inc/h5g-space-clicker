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
var Bullet = (function (_super) {
    __extends(Bullet, _super);
    //static bulletColor : number = Util.color(255,255,255);
    function Bullet(x, y, width, height, color) {
        var _this = _super.call(this) || this;
        _this.object = null;
        _this.setObject(x, y, width, height);
        _this.setShape(x, y, width, height, color);
        _this.object.scaleX = 0.5;
        _this.object.scaleY = 0.5;
        return _this;
    }
    Bullet.prototype.setObject = function (x, y, width, height) {
        this.object = new egret.DisplayObjectContainer();
        this.object.anchorOffsetX += width / 2;
        this.object.x = x;
        this.object.y = y;
        this.object.width = width;
        this.object.height = height;
        GameObject.display.addChild(this.object);
    };
    Bullet.prototype.setShape = function (x, y, width, height, color) {
        if (this.shape) {
            GameObject.display.removeChild(this.shape);
        }
        this.shape = new egret.Shape();
        this.shape.x = 0;
        this.shape.y = 0;
        this.shape.graphics.beginFill(color);
        this.shape.graphics.drawRect(0, 0, width, height);
        this.shape.graphics.endFill();
        this.object.addChild(this.shape);
    };
    Bullet.prototype.delete = function () {
        if (this.shape) {
            //this.object.removeChild(this.shape);
            //this.shape = null;
            GameObject.display.removeChild(this.object);
        }
    };
    Bullet.prototype.updateContent = function () {
        //this.object.y -= 1;
    };
    return Bullet;
}(GameObject));
__reflect(Bullet.prototype, "Bullet");
//# sourceMappingURL=Bullet.js.map