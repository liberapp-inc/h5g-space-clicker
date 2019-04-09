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
var Button = (function (_super) {
    __extends(Button, _super);
    function Button(x, y, width, height, index) {
        var _this = _super.call(this) || this;
        _this.object = null;
        _this.indexText = null;
        _this.indexTextColor = 0xffffff;
        //public cost : number = 0;
        _this.costText = null;
        _this.costTextColor = 0xffffff;
        //public parameter : number = 0;
        _this.parameterText = null;
        _this.parameterTextColor = 0xffffff;
        _this.setObject(x, y, width, height);
        _this.object.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.tap, _this);
        return _this;
    }
    Button.prototype.setObject = function (x, y, width, height) {
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
        this.object.touchEnabled = true;
        GameObject.display.addChild(this.object);
    };
    Button.prototype.setIndexText = function (x, y, width, height, index) {
        var size = 80;
        var ratio = 0.5;
        this.indexText = Util.myText(x, y, index, size, ratio, this.indexTextColor, true);
        this.indexText.width = this.object.width / ratio;
        this.indexText.height = this.object.height / ratio;
        this.indexText.textAlign = egret.HorizontalAlign.CENTER;
        //this.indexText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.object.addChild(this.indexText);
    };
    Button.prototype.setParameterText = function (x, y, width, height, parameter) {
        var size = 60;
        var ratio = 0.5;
        this.parameterText = Util.myText(x, y, parameter.toString(), size, ratio, this.parameterTextColor, false);
        this.parameterText.width = this.object.width / ratio;
        this.parameterText.height = this.object.height / ratio;
        this.parameterText.textAlign = egret.HorizontalAlign.CENTER;
        //this.parameterText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.object.addChild(this.parameterText);
    };
    Button.prototype.setCostText = function (x, y, width, height, cost) {
        var size = 60;
        var ratio = 0.5;
        this.costText = Util.myText(x, y, "Lv.UP\n" + " MONEY\n" + cost.toString(), size, ratio, this.costTextColor, false);
        this.costText.width = this.object.width / ratio;
        this.costText.height = this.object.height / ratio;
        this.costText.textAlign = egret.HorizontalAlign.CENTER;
        this.costText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.object.addChild(this.costText);
    };
    Button.prototype.delete = function () {
        if (this.shape) {
            GameObject.display.removeChild(this.object);
        }
        if (this.object.hasEventListener) {
            this.object.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.tap, this);
        }
    };
    return Button;
}(GameObject));
__reflect(Button.prototype, "Button");
var LevelUpBulletDamageButton = (function (_super) {
    __extends(LevelUpBulletDamageButton, _super);
    function LevelUpBulletDamageButton(x, y, width, height, color, index) {
        var _this = _super.call(this, x, y, width, height, index) || this;
        _this.setShape(x, y, width, height, color);
        _this.setIndexText(0, -100, width, height, index);
        _this.setParameterText(0, -50, width, height, Player.bulletDamage);
        _this.setCostText(0, 0, width, height, Player.damageLevelUpCost);
        return _this;
    }
    LevelUpBulletDamageButton.prototype.setShape = function (x, y, width, height, color) {
        if (this.shape) {
            GameObject.display.removeChild(this.shape);
        }
        this.shape = new egret.Shape();
        this.shape.x = 0;
        this.shape.y = 0;
        this.shape.graphics.beginFill(color);
        this.shape.graphics.drawRoundRect(0, 0, width, height, 30);
        this.shape.graphics.endFill();
        this.object.addChild(this.shape);
    };
    LevelUpBulletDamageButton.prototype.updateContent = function () {
        this.parameterText.text = Player.bulletDamage.toString();
        this.costText.text = "Lv.UP\n" + " MONEY\n" + Player.damageLevelUpCost.toString();
    };
    LevelUpBulletDamageButton.prototype.tap = function () {
        if (Money.I.money >= Player.damageLevelUpCost) {
            Money.I.money -= Player.damageLevelUpCost;
            Player.bulletDamage += 1;
            Player.damageLevelUpCost += 100;
            Util.savelocalStrage("Player.bulletDamage", Player.bulletDamage);
            Util.savelocalStrage("Player.damageLevelUpCost", Player.damageLevelUpCost);
        }
    };
    return LevelUpBulletDamageButton;
}(Button));
__reflect(LevelUpBulletDamageButton.prototype, "LevelUpBulletDamageButton");
var LevelUpBulletSpeedButton = (function (_super) {
    __extends(LevelUpBulletSpeedButton, _super);
    function LevelUpBulletSpeedButton(x, y, width, height, color, index) {
        var _this = _super.call(this, x, y, width, height, index) || this;
        _this.setShape(x, y, width, height, color);
        _this.setIndexText(0, -100, width, height, index);
        _this.setParameterText(0, -50, width, height, Player.bulletMoveSpeed);
        _this.setCostText(0, 0, width, height, Player.speedLevelUpCost);
        return _this;
    }
    LevelUpBulletSpeedButton.prototype.setShape = function (x, y, width, height, color) {
        if (this.shape) {
            GameObject.display.removeChild(this.shape);
        }
        this.shape = new egret.Shape();
        this.shape.x = 0;
        this.shape.y = 0;
        this.shape.graphics.beginFill(color);
        this.shape.graphics.drawRoundRect(0, 0, width, height, 30);
        this.shape.graphics.endFill();
        this.object.addChild(this.shape);
    };
    LevelUpBulletSpeedButton.prototype.updateContent = function () {
        this.parameterText.text = Player.bulletMoveSpeed.toString();
        this.costText.text = "Lv.UP\n" + " MONEY\n" + Player.speedLevelUpCost.toString();
    };
    LevelUpBulletSpeedButton.prototype.tap = function () {
        if (Money.I.money >= Player.speedLevelUpCost) {
            Money.I.money -= Player.speedLevelUpCost;
            Player.bulletMoveSpeed += 1;
            Player.speedLevelUpCost += 100;
            if (Player.shotInterval > 100) {
                Player.shotInterval = 1000 - Player.shotInterval;
            }
            Player.I.resetTimer();
            Util.savelocalStrage("Player.bulletMoveSpeed", Player.bulletMoveSpeed);
            Util.savelocalStrage("Player.speedLevelUpCost", Player.speedLevelUpCost);
            Util.savelocalStrage("Player.shotInterval", Player.shotInterval);
        }
    };
    return LevelUpBulletSpeedButton;
}(Button));
__reflect(LevelUpBulletSpeedButton.prototype, "LevelUpBulletSpeedButton");
var LevelUpSalaryButton = (function (_super) {
    __extends(LevelUpSalaryButton, _super);
    function LevelUpSalaryButton(x, y, width, height, color, index) {
        var _this = _super.call(this, x, y, width, height, index) || this;
        _this.setShape(x, y, width, height, color);
        _this.setIndexText(0, -100, width, height, index);
        _this.setParameterText(0, -50, width, height, Player.bulletMoveSpeed);
        _this.setCostText(0, 0, width, height, Player.speedLevelUpCost);
        return _this;
    }
    LevelUpSalaryButton.prototype.setShape = function (x, y, width, height, color) {
        if (this.shape) {
            GameObject.display.removeChild(this.shape);
        }
        this.shape = new egret.Shape();
        this.shape.x = 0;
        this.shape.y = 0;
        this.shape.graphics.beginFill(color);
        this.shape.graphics.drawRoundRect(0, 0, width, height, 30);
        this.shape.graphics.endFill();
        this.object.addChild(this.shape);
    };
    LevelUpSalaryButton.prototype.updateContent = function () {
        this.parameterText.text = Player.salary.toString();
        this.costText.text = "Lv.UP\n" + " MONEY\n" + Player.salaryLevelUpCost.toString();
    };
    LevelUpSalaryButton.prototype.tap = function () {
        if (Money.I.money >= Player.salaryLevelUpCost) {
            Money.I.money -= Player.salaryLevelUpCost;
            Player.salary += 1;
            Player.salaryLevelUpCost += 100;
            Util.savelocalStrage("Player.salary", Player.salary);
            Util.savelocalStrage("Player.salaryLevelUpCost", Player.salaryLevelUpCost);
        }
    };
    return LevelUpSalaryButton;
}(Button));
__reflect(LevelUpSalaryButton.prototype, "LevelUpSalaryButton");
//# sourceMappingURL=Button.js.map