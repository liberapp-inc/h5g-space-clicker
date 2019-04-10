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
var DropItem;
(function (DropItem) {
    DropItem[DropItem["NONE"] = 0] = "NONE";
    DropItem[DropItem["A"] = 1] = "A";
    DropItem[DropItem["B"] = 2] = "B";
})(DropItem || (DropItem = {}));
var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy(x, y, width, height) {
        var _this = _super.call(this) || this;
        _this.object = null;
        _this.dropMoney = 10;
        _this.hp = 0;
        _this.hpTextField = null;
        _this.hpTextFieldColor = 0xff0000;
        _this.deadFlag = false;
        _this.setObject(x, y, width, height);
        return _this;
        //this.setHpText(x, y, width, height);
    }
    Enemy.prototype.setObject = function (x, y, width, height) {
        if (width <= 0) {
            width = 1;
            console.log("widthが0以下です");
        }
        else if (height <= 0) {
            height = 1;
            console.log("heightが0以下です");
        }
        this.object = new egret.DisplayObjectContainer();
        this.object.width = width;
        this.object.height = height;
        this.object.anchorOffsetX += width / 2;
        this.object.anchorOffsetY += height / 2;
        this.object.x = x;
        this.object.y = y;
        GameObject.display.addChild(this.object);
        GameObject.display.swapChildren(this.object, Player.object);
    };
    Enemy.prototype.setHpText = function (x, y, width, height) {
        var size = 100;
        var ratio = 0.5;
        this.hpTextField = Util.myText(0, 0, this.hp.toString(), size, ratio, this.hpTextFieldColor, true);
        this.hpTextField.width = this.object.width / ratio;
        this.hpTextField.height = this.object.height / ratio;
        this.hpTextField.textAlign = egret.HorizontalAlign.CENTER;
        this.hpTextField.verticalAlign = egret.VerticalAlign.MIDDLE;
        /*        this.hpTextField.anchorOffsetX += this.hpTextField.width/2;
                this.hpTextField.anchorOffsetY += this.hpTextField.height/2;
                this.hpTextField.x = 0;
                this.hpTextField.y = 0;  */
        this.object.addChild(this.hpTextField);
    };
    Enemy.prototype.addDestroyMethod = function () {
        Money.I.money += this.dropMoney;
    };
    Enemy.prototype.updateContent = function () {
        this.hpTextField.text = this.hp.toString();
    };
    Enemy.prototype.delete = function () {
        if (this.shape) {
            GameObject.display.removeChild(this.object);
        }
    };
    return Enemy;
}(GameObject));
__reflect(Enemy.prototype, "Enemy");
var RectEnemy = (function (_super) {
    __extends(RectEnemy, _super);
    function RectEnemy(x, y, width, height, color, hp, dropMoney) {
        var _this = _super.call(this, x, y, width, height) || this;
        //this.setObject(x, y, width, height);
        _this.setShape(x, y, width, height, color);
        _this.hp = hp;
        _this.dropMoney = dropMoney;
        _this.setHpText(x, y, width, height);
        return _this;
    }
    RectEnemy.prototype.setShape = function (x, y, width, height, color) {
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
    return RectEnemy;
}(Enemy));
__reflect(RectEnemy.prototype, "RectEnemy");
var CircleEnemy = (function (_super) {
    __extends(CircleEnemy, _super);
    function CircleEnemy(x, y, width, height, radius, color, hp, dropMoney) {
        var _this = _super.call(this, x, y, width, height) || this;
        _this.setShape(x, y, radius, color);
        _this.hp = hp;
        _this.dropMoney = dropMoney;
        _this.setHpText(x, y, width, height);
        return _this;
    }
    CircleEnemy.prototype.setShape = function (x, y, radius, color) {
        if (this.shape) {
            GameObject.display.removeChild(this.shape);
        }
        if (radius <= 0) {
            radius = 1;
            console.log("radiusが0以下です");
        }
        this.shape = new egret.Shape();
        this.shape.x = this.object.anchorOffsetX;
        this.shape.y = this.object.anchorOffsetY;
        this.shape.graphics.beginFill(color);
        this.shape.graphics.drawCircle(0, 0, radius);
        this.shape.graphics.endFill();
        this.object.addChild(this.shape);
    };
    return CircleEnemy;
}(Enemy));
__reflect(CircleEnemy.prototype, "CircleEnemy");
var DoubleCircle = (function (_super) {
    __extends(DoubleCircle, _super);
    function DoubleCircle(x, y, width, height, radius, color, hp, dropMoney) {
        var _this = _super.call(this, x, y, width, height, radius, color, hp, dropMoney) || this;
        _this.shape2 = null;
        _this.shape.x -= radius / 1.5;
        _this.setShape2(x, y, radius, color);
        return _this;
    }
    DoubleCircle.prototype.setShape2 = function (x, y, radius, color) {
        if (this.shape2) {
            GameObject.display.removeChild(this.shape2);
        }
        if (radius <= 0) {
            radius = 1;
            console.log("radiusが0以下です");
        }
        this.shape2 = new egret.Shape();
        this.shape2.x = this.object.anchorOffsetX + radius / 1.5;
        this.shape2.y = this.object.anchorOffsetY;
        this.shape2.graphics.beginFill(color);
        this.shape2.graphics.drawCircle(0, 0, radius);
        this.shape2.graphics.endFill();
        this.object.addChildAt(this.shape2, 0);
    };
    return DoubleCircle;
}(CircleEnemy));
__reflect(DoubleCircle.prototype, "DoubleCircle");
var DoubleRect = (function (_super) {
    __extends(DoubleRect, _super);
    function DoubleRect(x, y, width, height, color, hp, dropMoney) {
        var _this = _super.call(this, x, y, width, height, color, hp, dropMoney) || this;
        _this.shape2 = null;
        _this.shape.x -= width / 4;
        _this.shape.y -= height / 4;
        _this.setShape2(x, y, width, height, color);
        return _this;
    }
    DoubleRect.prototype.setShape2 = function (x, y, width, height, color) {
        if (this.shape2) {
            GameObject.display.removeChild(this.shape2);
        }
        this.shape2 = new egret.Shape();
        this.shape2.x += width / 4;
        this.shape2.y += height / 4;
        this.shape2.graphics.beginFill(color);
        this.shape2.graphics.drawRect(0, 0, width, height);
        this.shape2.graphics.endFill();
        this.object.addChild(this.shape2);
    };
    return DoubleRect;
}(RectEnemy));
__reflect(DoubleRect.prototype, "DoubleRect");
//# sourceMappingURL=Enemy.js.map