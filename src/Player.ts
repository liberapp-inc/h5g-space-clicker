class Player extends GameObject{

    static I : Player = null;
    static object : egret.DisplayObjectContainer = null;
    static shotTimer : egret.Timer = null;
    static shotInterval :number = 1000;
    static bullet : Bullet[] = [];
    static bulletDamage : number = 1;
    static bulletMoveSpeed : number = 5;
    static salary : number = 1;

    //statusアップ系
/*    static damageLevel :number = 100;
    static speedLevel :number = 100;
    static salaryLevel :number = 100;*/
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



    }

    private loadStatus(){

        
        Player.bulletDamage         = Util.loadLocalStrage("Player.bulletDamage", Player.bulletDamage);
        Player.bulletMoveSpeed      = Util.loadLocalStrage("Player.bulletMoveSpeed", Player.bulletMoveSpeed);
        Player.salary               = Util.loadLocalStrage("Player.salary", Player.salary);
        Player.shotInterval         = Util.loadLocalStrage("Player.shotInterval", Player.shotInterval);       

        Player.damageLevelUpCost    = Util.loadLocalStrage("Player.damageLevelUpCost", Player.damageLevelUpCost);
        Player.speedLevelUpCost     = Util.loadLocalStrage("Player.speedLevelUpCost", Player.speedLevelUpCost);
        Player.salaryLevelUpCost    = Util.loadLocalStrage("Player.salaryLevelUpCost", Player.salaryLevelUpCost);

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
        console.log(Player.shotInterval);
        
    }

    updateContent(){
        Player.bullet.forEach(b => {
            b.object.y -= Player.bulletMoveSpeed;
            if(b.object.y < 0){
                b.destroy();
            }
            //Enemyとの接触判定(Enemyを一体ずつしか出さないならenemyをforEachする必要なし)
            GameScene.enemy.forEach(e =>{
                if(b.collisionFlag == false && e.object.y >= b.object.y && e.deadFlag == false){
                    e.hp -= Player.bulletDamage;
                    MyTween.knockBack(e.object);
                    b.destroy();
                    b.collisionFlag = true;
                    if(e.hp <= 0 ){
                        e.hp = 0;
                        e.deadFlag = true;
                        Money.addMoney(e.dropMoney);
                        new DropMoney(0,0, "MONEY\n+" + e.dropMoney.toString(), 70, 0.5, 0xff0000, true, e.object);
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