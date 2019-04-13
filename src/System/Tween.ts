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

    static lastBossFadeOut(object : any, objectClass?:any){

        if(objectClass == undefined){
            objectClass = null;
        }

        egret.Tween.get(object) 
            .to({alpha:0.2}, 3000)
            .call(()=> {
                egret.Tween.removeTweens(object);

                //destroyを実装しているクラスにだけ実行したかったが、
                //なぜかif(objectClass == RectEnemyやobjectClass == Enemy)すると
                //destroyできなかったので場合分けしていないので注意
                if(objectClass != undefined || objectClass != null){
                    objectClass.destroy();
                    //GameScene.createEnemy();
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

    static slide(object : any, toPos:number, time_ms:number){

        let objectPosX : number = object.x;
        let toPosX :number = toPos;

        egret.Tween.get(object) 
            .to({x:objectPosX + toPosX}, time_ms)
            .call(()=> {
                egret.Tween.removeTweens(object);
            });
    }

    static bossSlide(object : any, toPos:number, time_ms:number, fadeOutTime_ms :number){

        let objectPosX : number = object.x;
        let toPosX :number = toPos;

        egret.Tween.get(object) 
            .to({x:objectPosX + toPosX}, time_ms)
            .to({alpha:0}, fadeOutTime_ms)
            .call(()=> {
                egret.Tween.removeTweens(object);
            });
    }
    

    static bossTextSlide(object : egret.TextField, toPos:number, time_ms:number){

        let objectPosX : number = object.x;
        let toPosX :number = toPos;

        egret.Tween.get(object) 
            .to({x:objectPosX + toPosX}, time_ms)
            .wait(2400)
            .to({x:objectPosX + toPosX*3}, time_ms)
            .call(()=> {
                egret.Tween.removeTweens(object);
            });
    }

    static backgroundFadeOut(object : any, fadeOutTime_ms : number){

        egret.Tween.get(object)

            .to({alpha:0.5}, 0)
            .wait(50)
            .to({alpha:0}, fadeOutTime_ms)
            .wait(3950)
            .call(()=> {
                egret.Tween.removeTweens(object);
                BossEntryEffect.I.destroy();

            });
    }

    static bossDeadEffect(object : any){

        egret.Tween.get(object)

            .to({alpha:0.5}, 50)
            //.wait(200)
            .to({alpha:0}, 2000)
            .call(()=> {
                egret.Tween.removeTweens(object);
                BossDeadEffect.I.destroy();

            });
    }

    static gameClear(object : any, alpha : number){

        egret.Tween.get(object)

            .to({alpha:alpha}, 5000)
            .call(()=> {
                egret.Tween.removeTweens(object);
                GameObject.display.once( egret.TouchEvent.TOUCH_TAP, GameClearEffect.I.tap, this );

            });
    }
}

