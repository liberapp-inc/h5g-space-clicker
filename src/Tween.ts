class Tween extends egret.DisplayObjectContainer {

    public object : egret.DisplayObjectContainer = null;

    constructor() {
        super();
        var shape:egret.Shape = new egret.Shape();
        shape.graphics.beginFill(0xff0000);
        shape.graphics.drawRect(0, 0, 100, 100);
        shape.graphics.endFill();
        shape.x = shape.y = 400;
        GameObject.display.addChild(shape);

        //创建 Tween 对象
        egret.Tween.get(shape, {
            loop: true,//设置循环播放
            onChange: this.onChange,//设置更新函数
            onChangeObj: this//更新函数作用域
        })
            .to({rotation: 360}, 1000)//设置2000毫秒内 rotation 属性变为360
            //.wait(1000)//设置等待1000毫秒
            .call(this.onComplete, this, ["param1", {key: "key", value: 3}]);//设置回调函数及作用域，可用于侦听动画完成
    }

    private onChange():void {
        //egret.log("onChange");
    }

    private onComplete(param1:string, param2:any):void {
/*        egret.log("onComplete");
        egret.log(param1);
        egret.log(param2);*/
    }
}

class MyTween {

    static fadeOut(object : any, objectClass?:any){

        if(objectClass == undefined){
            objectClass = null;
        }

        egret.Tween.get(object) 
            .to({alpha:0.5 }, 1000)
            .call(()=> {
                egret.Tween.removeTweens(object);

                //destroyを実装しているクラスにだけ実行したかったが、
                //なぜかif(objectClass == RectEnemyやobjectClass == Enemy)すると
                //destroyできなかったので場合分けしていないので注意
                if(objectClass != undefined || objectClass != null){objectClass.destroy();}
            });
    }

    static enemyFadeOut(object : any, objectClass?:any){

        if(objectClass == undefined){
            objectClass = null;
        }

        egret.Tween.get(object) 
            .to({alpha:0.2}, 1000)
            .call(()=> {
                egret.Tween.removeTweens(object);

                //destroyを実装しているクラスにだけ実行したかったが、
                //なぜかif(objectClass == RectEnemyやobjectClass == Enemy)すると
                //destroyできなかったので場合分けしていないので注意
                if(objectClass != undefined || objectClass != null){
                    objectClass.destroy();
                    GameScene.createEnemy();
                }
            });
    }
    
    static knockBack(object : any){

        let objectPosY : number = object.y;

        egret.Tween.get(object) 
            .to({y:objectPosY - 50}, 50, egret.Ease.elasticIn)
            .to({y:objectPosY}, 50, egret.Ease.sineIn);
    }

    static dropMoneyTextFadeOut(object : egret.TextField, objectClass?:DropMoney){

        if(objectClass == undefined){
            objectClass = null;
        }

        let objectPosY : number = object.y;

        egret.Tween.get(object) 
            .to({y:objectPosY-100}  , 100)
            .to({alpha:0.2}         , 900)
            .call(()=> {
                egret.Tween.removeTweens(object);
                if(objectClass != undefined || objectClass != null){
                    objectClass.destroy();
                   
                }
            });
    }

    static enemyRotate(object : any, rotateSpeed_ms : number){
        let objectPosY : number = object.y;
        egret.Tween.get(object,{loop:true})
        .to({rotation:360}, rotateSpeed_ms);
    }

    static autoSaveTextFadeInOut(object : egret.TextField, objectClass?:DropMoney){

        if(objectClass == undefined){
            objectClass = null;
        }

        object.alpha = 0;

        egret.Tween.get(object) 
            .to({alpha:1} ,   10)
            .wait(2000)
            .to({alpha:0} ,   2000)
            .call(()=> {
                egret.Tween.removeTweens(object);
            });
    }



}

