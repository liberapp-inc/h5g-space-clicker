class Player extends GameObject{

    static I : Player = null;
    static object : egret.DisplayObjectContainer = null;
    static shotTimer : egret.Timer = null;
    static shotInterval :number = 1000;
    static bullet : Bullet[] = [];
    static bulletDamage : number = 1;
    static bulletMoveSpeed : number = 5;
    static salary : number = 1;

    static damageLevelUpCost :number = 100;
    static speedLevelUpCost :number = 100;
    static salaryLevelUpCost :number = 100;

    constructor(x : number, y : number, width : number, height : number, color:number) {
        super();
        Player.I = this;
        this.setPlayerObject(x, y, width, height);
        this.setShape(x, y, width, height, color);
        this.loadStatus();

        Player.object.scaleX = Player.object.scaleY = 0.4;

        Player.shotTimer = new egret.Timer(Player.shotInterval,0);
        Player.shotTimer.addEventListener(egret.TimerEvent.TIMER,this.shot,this);
        Player.shotTimer.start();

        GameObject.display.addEventListener( egret.TouchEvent.TOUCH_BEGIN, this.shot, this );


    }

    private loadStatus(){

        
        Player.bulletDamage         = Util.loadLocalStrage("Player.bulletDamage", Player.bulletDamage);
        Player.bulletMoveSpeed      = Util.loadLocalStrage("Player.bulletMoveSpeed", Player.bulletMoveSpeed);
        Player.salary               = Util.loadLocalStrage("Player.salary", Player.salary);
        Player.shotInterval         = Util.loadLocalStrage("Player.shotInterval", Player.shotInterval);       

        Player.damageLevelUpCost    = Util.loadLocalStrage("Player.damageLevelUpCost", Player.damageLevelUpCost);
        Player.speedLevelUpCost     = Util.loadLocalStrage("Player.speedLevelUpCost", Player.speedLevelUpCost);
        Player.salaryLevelUpCost    = Util.loadLocalStrage("Player.salaryLevelUpCost", Player.salaryLevelUpCost);

        Kill.I.kill                 = Util.loadLocalStrage("Kill.I.kill", Kill.I.kill);
        Money.I.money               = Util.loadLocalStrage("Money.I.money", Money.I.money);
        GameScene.enemyLevel        = Util.loadLocalStrage("GameScene.enemyLevel", GameScene.enemyLevel);

    }

    resetStatus(){

        Player.bulletDamage         = 1;
        Player.bulletMoveSpeed      = 5;
        Player.salary               = 1;
        Player.shotInterval         = 1000;
        Player.damageLevelUpCost    = 100;
        Player.speedLevelUpCost     = 100;
        Player.salaryLevelUpCost    = 100;
        Kill.I.kill                 = 0;
        Money.I.money               = 0;
        GameScene.enemyLevel        = 0;

        //Player.I.resetTimer();
        Player.shotTimer.stop();
        Player.shotTimer.removeEventListener(egret.TimerEvent.TIMER,this.shot,this);

        Util.saveLocalStrage("Player.bulletDamage", Player.bulletDamage);
        Util.saveLocalStrage("Player.bulletMoveSpeed", Player.bulletMoveSpeed);
        Util.saveLocalStrage("Player.salary", Player.salary);
        Util.saveLocalStrage("Player.shotInterval", Player.shotInterval);       

        Util.saveLocalStrage("Player.damageLevelUpCost", Player.damageLevelUpCost);
        Util.saveLocalStrage("Player.speedLevelUpCost", Player.speedLevelUpCost);
        Util.saveLocalStrage("Player.salaryLevelUpCost", Player.salaryLevelUpCost);

        Util.saveLocalStrage("Kill.I.kill", Kill.I.kill);
        Util.saveLocalStrage("Money.I.money", Money.I.money);

        Util.saveLocalStrage("GameScene.enemyLevel", GameScene.enemyLevel);
        GameObject.transit = Game.init;

    }

    private setPlayerObject(x : number, y : number, width : number, height : number){
        Player.object = new egret.DisplayObjectContainer();
        Player.object.anchorOffsetX += width/2;
        Player.object.x = x;
        Player.object.y = y;
        Player.object.width = width;
        Player.object.height = height;
        GameObject.display.addChild(Player.object);

    }

    private setShape(x : number, y : number, width : number, height : number, color:number){
        if( this.shape ){
            GameObject.display.removeChild(this.shape);        
        }
        this.shape = new egret.Shape();
        this.shape.x = 0;
        this.shape.y = 0;
        this.shape.graphics.beginFill(color);
        this.shape.graphics.drawRect(0, 0, width , height);
        this.shape.graphics.endFill();


        //砲台部分をつくるため、背景色と同じ色を重ねている
        let leftMaskShape = this.setMask(this.shape.x, this.shape.y, this.shape.width/3, this.shape.height/2, Util.color(0, 0, 0));
        let rightMaskShape = this.setMask(this.shape.x + this.shape.width *2/3 , this.shape.y, this.shape.width/3, this.shape.height/2, Util.color(0, 0, 0));
        Player.object.addChild(this.shape);
        Player.object.addChild(leftMaskShape);
        Player.object.addChild(rightMaskShape);

        
    }

    private setMask(x : number, y : number, width : number, height : number, color:number):egret.Shape{
        let mask: egret.Shape = new egret.Shape();
        mask.x = x;
        mask.y = y;
        mask.graphics.beginFill(color);
        mask.graphics.drawRect(0, 0, width , height);
        mask.graphics.endFill();
        return mask;
    }

    public shot(){
        let b: Bullet =new Bullet(Game.width/2, Game.height/1.6, Game.width/24, Game.height/16, Util.color(255,255,0));
        Player.bullet.push(b);       
    }

    public resetTimer(){

        Player.shotTimer.stop();
        Player.shotTimer.removeEventListener(egret.TimerEvent.TIMER,this.shot,this);
        Player.shotTimer = new egret.Timer(Player.shotInterval,0);
        Player.shotTimer.addEventListener(egret.TimerEvent.TIMER,this.shot,this);
        Player.shotTimer.start();
        
    }

    addDestroyMethod(){
        GameObject.display.removeEventListener( egret.TouchEvent.TOUCH_BEGIN, this.shot, this );
        Player.shotTimer.stop();
        Player.shotTimer.removeEventListener(egret.TimerEvent.TIMER,this.shot,this);

        if( this.shape ){
            Player.object.removeChild(this.shape);
            Player.object.removeChildren();
            this.shape = null;
        }
        if( Player.object ){
            GameObject.display.removeChild(Player.object);
        }
    }

    updateContent(){
        Player.bullet.forEach(b => {
            b.object.y -= Player.bulletMoveSpeed;
            if(b.object.y < 0){
                b.destroy();
            }
            //Enemyとの接触判定(Enemyを一体ずつしか出さないならenemyをforEachする必要なし)
            GameScene.enemy.forEach(e =>{
                if(b.collisionFlag == false && e.deadFlag == false && e.object.y >= b.object.y && b.object.y >= 0){
                    e.hp -= Player.bulletDamage;
                    MyTween.knockBack(e.object);
                    b.destroy();
                    b.collisionFlag = true;
                    if(e.hp <= 0 ){
                        e.hp = 0;
                        e.deadFlag = true;
                        Money.addMoney(e.dropMoney);
                        new DropMoney(e.object.x, e.object.y, "+ " + e.dropMoney.toString() + " MONEY", 70, 0.5, 0xff0000, true, e.object);
                        //enemyFadeOut(フェードアウトしたいオブジェクト, e.destroy)としたかったが、
                        //e.destroyが即座に実行されてしまったため、直感的ではないがクラスを一旦取得し、destroyを実行
                        MyTween.enemyFadeOut(e.object, e);
                        Kill.I.addKill();

                        //e.destroy();
                    }

                }


            });
        });
    }
}