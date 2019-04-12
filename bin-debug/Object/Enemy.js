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
    function Enemy(x, y, width, height, color, hp, dropMoney) {
        var _this = _super.call(this) || this;
        _this.object = null;
        _this.initialY = 0;
        _this.dropMoney = 0;
        _this.hp = 0;
        _this.hpTextField = null;
        _this.hpTextFieldColor = 0xff0000;
        _this.deadFlag = false;
        _this.bossFlag = false;
        _this.lastBossFlag = false;
        _this.addShapes = [];
        _this.hp = hp;
        _this.dropMoney = dropMoney;
        _this.setObject(x, y, width, height);
        _this.setHpText(x, y, width, height);
        //ノックバックでobjectが上に行ってしまった時に、初期の位置に戻す用
        _this.initialY = _this.object.y;
        return _this;
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
        var index = GameObject.display.getChildIndex(Background.I.shape) + 1;
        GameObject.display.addChildAt(this.object, index);
        //GameObject.display.swapChildren(this.object,Player.object);
    };
    Enemy.prototype.setHpText = function (x, y, width, height) {
        var size = 100;
        var ratio = 0.5;
        this.hpTextField = Util.myText(0, 0, this.hp.toString(), size, ratio, this.hpTextFieldColor, true);
        this.hpTextField.width /= ratio;
        this.hpTextField.height /= ratio;
        this.hpTextField.anchorOffsetX = this.hpTextField.width / 2;
        this.hpTextField.anchorOffsetY = this.hpTextField.height / 2;
        this.hpTextField.x = this.object.anchorOffsetX;
        this.hpTextField.y = this.object.anchorOffsetY;
        this.hpTextField.textAlign = egret.HorizontalAlign.CENTER;
        this.hpTextField.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.object.addChild(this.hpTextField);
    };
    Enemy.prototype.setRectShape = function (dx, dy, width, height, color, rotation) {
        var s = new egret.Shape();
        this.addShapes.push(s);
        s.anchorOffsetX = this.object.anchorOffsetX;
        s.anchorOffsetY = this.object.anchorOffsetY;
        s.x = this.object.anchorOffsetX + dx;
        s.y = this.object.anchorOffsetY + dy;
        s.rotation = rotation || 0;
        s.graphics.beginFill(color);
        s.graphics.drawRect(0, 0, width, height);
        s.graphics.endFill();
        this.object.addChildAt(s, 0);
    };
    Enemy.prototype.setCircleShape = function (dx, dy, radius, color, rotation) {
        if (radius <= 0) {
            radius = 1;
            console.log("radiusが0以下です");
        }
        var s = new egret.Shape();
        this.addShapes.push(s);
        s.x = this.object.anchorOffsetX + dx;
        s.y = this.object.anchorOffsetY + dy;
        s.rotation = rotation || 0;
        s.graphics.beginFill(color);
        s.graphics.drawCircle(0, 0, radius);
        s.graphics.endFill();
        this.object.addChildAt(s, 0);
    };
    Enemy.prototype.updateContent = function () {
        this.hpTextField.text = this.hp.toString();
        if (this.initialY > this.object.y) {
            this.object.y = this.initialY;
        }
    };
    Enemy.prototype.addDestroyMethod = function () {
        var _this = this;
        egret.Tween.removeTweens(this.object);
        if (this.hpTextField) {
            this.object.removeChild(this.hpTextField);
            this.hpTextField = null;
        }
        this.addShapes.forEach(function (s) {
            _this.object.removeChild(s);
            s = null;
        });
        if (this.shape) {
            //this.object.removeChild(this.hpTextField);
            this.object.removeChildren();
            this.shape = null;
        }
        if (this.object) {
            GameObject.display.removeChild(this.object);
        }
    };
    return Enemy;
}(GameObject));
__reflect(Enemy.prototype, "Enemy");
var RectEnemy = (function (_super) {
    __extends(RectEnemy, _super);
    function RectEnemy(x, y, width, height, color, hp, dropMoney) {
        var _this = _super.call(this, x, y, width, height, color, hp, dropMoney) || this;
        _this.setRectShape(0, 0, width, height, color, 45);
        return _this;
    }
    return RectEnemy;
}(Enemy));
__reflect(RectEnemy.prototype, "RectEnemy");
var CircleEnemy = (function (_super) {
    __extends(CircleEnemy, _super);
    function CircleEnemy(x, y, width, height, radius, color, hp, dropMoney) {
        var _this = _super.call(this, x, y, width, height, color, hp, dropMoney) || this;
        _this.setCircleShape(0, 0, radius, color);
        return _this;
    }
    return CircleEnemy;
}(Enemy));
__reflect(CircleEnemy.prototype, "CircleEnemy");
var DoubleCircle = (function (_super) {
    __extends(DoubleCircle, _super);
    function DoubleCircle(x, y, width, height, radius, color, hp, dropMoney) {
        var _this = _super.call(this, x, y, width, height, color, hp, dropMoney) || this;
        _this.setCircleShape(-radius / 1.5, 0, radius, color);
        _this.setCircleShape(radius / 1.5, 0, radius, color);
        return _this;
    }
    return DoubleCircle;
}(Enemy));
__reflect(DoubleCircle.prototype, "DoubleCircle");
var DoubleRect = (function (_super) {
    __extends(DoubleRect, _super);
    function DoubleRect(x, y, width, height, color, hp, dropMoney) {
        var _this = _super.call(this, x, y, width, height, color, hp, dropMoney) || this;
        _this.setRectShape(-width / 4, -height / 4, width, height, color);
        _this.setRectShape(width / 4, height / 4, width, height, color);
        return _this;
    }
    return DoubleRect;
}(Enemy));
__reflect(DoubleRect.prototype, "DoubleRect");
var TripleCircle = (function (_super) {
    __extends(TripleCircle, _super);
    function TripleCircle(x, y, width, height, radius, color, hp, dropMoney) {
        var _this = _super.call(this, x, y, width, height, color, hp, dropMoney) || this;
        var interval = radius / 1;
        _this.setCircleShape(0, interval, radius, color);
        _this.setCircleShape(interval, 0, radius / 1.5, color);
        _this.setCircleShape(-interval, 0, radius / 1.5, color);
        return _this;
    }
    return TripleCircle;
}(Enemy));
__reflect(TripleCircle.prototype, "TripleCircle");
var TripleRect = (function (_super) {
    __extends(TripleRect, _super);
    function TripleRect(x, y, width, height, color, hp, dropMoney) {
        var _this = _super.call(this, x, y, width, height, color, hp, dropMoney) || this;
        var intervalX = width * 1.35;
        var intervalY = height * 1.35;
        _this.setRectShape(0, 0, width, height, color, 45);
        _this.setRectShape(-intervalX, intervalY, width, height, color, 45);
        _this.setRectShape(intervalX, intervalY, width, height, color, 45);
        return _this;
    }
    return TripleRect;
}(Enemy));
__reflect(TripleRect.prototype, "TripleRect");
var Umibouzu = (function (_super) {
    __extends(Umibouzu, _super);
    function Umibouzu(x, y, width, height, radius, color, hp, dropMoney) {
        var _this = _super.call(this, x, y, width, height, color, hp, dropMoney) || this;
        var interval = radius * 1.5;
        var eyeColor = Util.color(255, 0, 0);
        _this.setCircleShape(interval, interval, radius / 1.5, eyeColor);
        _this.setCircleShape(-interval, interval, radius / 1.5, eyeColor);
        _this.setCircleShape(0, interval * 2, radius / 1.5, eyeColor);
        _this.setCircleShape(0, 0, radius * 4, color);
        return _this;
    }
    return Umibouzu;
}(Enemy));
__reflect(Umibouzu.prototype, "Umibouzu");
//# sourceMappingURL=Enemy.js.map