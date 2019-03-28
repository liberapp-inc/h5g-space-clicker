class Bullet extends GameObject{

    public object : egret.DisplayObjectContainer = null;
    //static bulletColor : number = Util.color(255,255,255);



    constructor(x : number, y : number, width : number, height : number, color:number) {
        super();
        this.setObject(x, y, width, height);
        this.setShape(x, y, width, height, color);

        this.object.scaleX = 0.5;
        this.object.scaleY = 0.5;


    }

    private setObject(x : number, y : number, width : number, height : number){
        this.object = new egret.DisplayObjectContainer();
        this.object.anchorOffsetX += width/2;
        this.object.x = x;
        this.object.y = y;
        this.object.width = width;
        this.object.height = height;
        GameObject.display.addChild(this.object);

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
        this.object.addChild(this.shape);

        
    }

    protected delete(){
        if( this.shape ){
            //this.object.removeChild(this.shape);
            //this.shape = null;
            GameObject.display.removeChild(this.object);
        }
    }

    updateContent(){
        //this.object.y -= 1;
    }

}