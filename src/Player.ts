class Player extends GameObject{

    static I : Player = null;
    static object : egret.DisplayObjectContainer = null;
    static shotTimer : egret.Timer = null;
    static shotInterval :number = 300;
    static bullet : Bullet[] = [];
    static bulletMoveSpeed : number = 5;


    constructor(x : number, y : number, width : number, height : number, color:number) {
        super();
        Player.I = this;
        this.setPlayerObject(x, y, width, height);
        this.setShape(x, y, width, height, color);

        Player.object.scaleX = 0.5;
        Player.object.scaleY = 0.5;

        Player.shotTimer = new egret.Timer(Player.shotInterval,0);
        Player.shotTimer.addEventListener(egret.TimerEvent.TIMER,this.shot,this);
        Player.shotTimer.start();



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
        let b: Bullet =new Bullet(Game.width/2, Game.height/1.35, Game.width/12, Game.height/12, Util.color(255,255,0));
        Player.bullet.push(b);
    }


    updateContent(){
        Player.bullet.forEach(b => {
            b.object.y -= Player.bulletMoveSpeed;
            if(b.object.y < 0){
                b.destroy();
            }
        });
    }
}