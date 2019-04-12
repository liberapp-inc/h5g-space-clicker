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
            .to({y:objectPosY-150}  , 100)
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

