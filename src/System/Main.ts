class Main extends eui.UILayer {

    public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
    }
 
    private addToStage() {

        GameObject.initial( this.stage );
        Util.init(this);
        Game.init();
        egret.startTick(this.tickLoop, this);
    }

    tickLoop(timeStamp:number):boolean{
        GameObject.update();
        return false;
    }

}

class Game{

    public static height: number;
    public static width: number;

    static init() {
        
        this.height = egret.MainContext.instance.stage.stageHeight;
        this.width  = egret.MainContext.instance.stage.stageWidth;
        const buttonColor :number = Util.color(220,20,60);
        /* new メソッドを記入*/
        new Background();
        new Kill();
        new Money();
        new Player(Game.width/2, Game.height/1.5, Game.width/3.4, Game.height/8, Util.color(220,20,60));
        new LevelUpBulletDamageButton(Game.width/6, Game.height/1.1, Game.width/4, Game.height/10.5, buttonColor, "Attack");
        new LevelUpBulletSpeedButton(Game.width/2, Game.height/1.1, Game.width/4, Game.height/10.5, buttonColor, "Speed");
        new LevelUpSalaryButton(Game.width/1.2, Game.height/1.1, Game.width/4, Game.height/10.5, buttonColor, "Salary");
        new ResetButton(Game.width/1.18, Game.height/10, Game.width/4.5, Game.height/14, buttonColor, "Delete\nData");
        new CheckDate();//Playerよりも後にインスタンス化すること
        new GameScene();

    }


}


class Background extends GameObject{

    static I : Background = null;

    constructor() {
        super();
        Background.I = this;
        this.shape = new egret.Shape();
        this.shape.graphics.beginFill(Util.color(0,10,90));
        this.shape.graphics.drawRect(0, 0, Game.width, Game.height);
        this.shape.graphics.endFill();
        GameObject.display.addChild(this.shape);
    }
    
    updateContent() {}
}

class CreateWorld extends PhysicsObject{

    static I : CreateWorld = null;

    constructor() {
        super();
        CreateWorld.I = this;
        CreateWorld.world.on("beginContact",  this.collision, this);

    }
    createWorld(){
        CreateWorld.world = new p2.World();
        CreateWorld.world.sleepMode = p2.World.BODY_SLEEPING;
        CreateWorld.world.gravity = [0, 9.8];

    }

    static worldBegin(dt : number) :boolean{
       
        CreateWorld.world.step(1/60, dt/1000, 10);
        return false;
    }

    //コリジョンイベントはここにまとめる
    private collision(evt : any){

    }

    addDestroyMethod(){CreateWorld.world.clear();}

    updateContent(){}


}