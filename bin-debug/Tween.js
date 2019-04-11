var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MyTween = (function () {
    function MyTween() {
    }
    MyTween.fadeOut = function (object, objectClass) {
        if (objectClass == undefined) {
            objectClass = null;
        }
        egret.Tween.get(object)
            .to({ alpha: 0.5 }, 1000)
            .call(function () {
            egret.Tween.removeTweens(object);
            //destroyを実装しているクラスにだけ実行したかったが、
            //なぜかif(objectClass == RectEnemyやobjectClass == Enemy)すると
            //destroyできなかったので場合分けしていないので注意
            if (objectClass != undefined || objectClass != null) {
                objectClass.destroy();
            }
        });
    };
    MyTween.enemyFadeOut = function (object, objectClass) {
        if (objectClass == undefined) {
            objectClass = null;
        }
        egret.Tween.get(object)
            .to({ alpha: 0.2 }, 1000)
            .call(function () {
            egret.Tween.removeTweens(object);
            //destroyを実装しているクラスにだけ実行したかったが、
            //なぜかif(objectClass == RectEnemyやobjectClass == Enemy)すると
            //destroyできなかったので場合分けしていないので注意
            if (objectClass != undefined || objectClass != null) {
                objectClass.destroy();
                GameScene.createEnemy();
            }
        });
    };
    MyTween.knockBack = function (object) {
        var objectPosY = object.y;
        egret.Tween.get(object)
            .to({ y: objectPosY - 50 }, 50, egret.Ease.elasticIn)
            .to({ y: objectPosY }, 50, egret.Ease.sineIn);
    };
    MyTween.dropMoneyTextFadeOut = function (object, objectClass) {
        if (objectClass == undefined) {
            objectClass = null;
        }
        var objectPosY = object.y;
        egret.Tween.get(object)
            .to({ y: objectPosY - 100 }, 100)
            .to({ alpha: 0.2 }, 900)
            .call(function () {
            egret.Tween.removeTweens(object);
            if (objectClass != undefined || objectClass != null) {
                objectClass.destroy();
            }
        });
    };
    MyTween.enemyRotate = function (object, rotateSpeed_ms) {
        var objectPosY = object.y;
        egret.Tween.get(object, { loop: true })
            .to({ rotation: 360 }, rotateSpeed_ms);
    };
    MyTween.autoSaveTextFadeInOut = function (object, objectClass) {
        if (objectClass == undefined) {
            objectClass = null;
        }
        object.alpha = 0;
        egret.Tween.get(object)
            .to({ alpha: 1 }, 10)
            .wait(2000)
            .to({ alpha: 0 }, 2000)
            .call(function () {
            egret.Tween.removeTweens(object);
        });
    };
    return MyTween;
}());
__reflect(MyTween.prototype, "MyTween");
//# sourceMappingURL=Tween.js.map