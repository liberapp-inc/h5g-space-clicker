abstract class Button extends GameObject{

    public object : egret.DisplayObjectContainer = null;
    public indexText : egret.TextField = null;
    public indexTextColor : number = 0xffffff;
    public parameter : number = 0;
    public parameterText : egret.TextField = null;
    public parameterTextColor : number = 0xffffff;

    constructor(x : number, y : number, width : number, height : number, index : string){
        super();
        this.setObject(x, y, width, height);

    }

    protected setObject(x : number, y : number, width : number, height : number){
        if(width <= 0){
            width = 1;
            console.log("widthが0以下です");
        }
        else if(height <= 0){
            height = 1;
            console.log("heightが0以下です");
        }
        this.object = new egret.DisplayObjectContainer();
        this.object.width = width;
        this.object.height = height;
        this.object.anchorOffsetX += width/2;
        this.object.anchorOffsetY += height/2;
        this.object.x = x;
        this.object.y = y;
        GameObject.display.addChild(this.object);

    }

    setIndexText(x : number, y : number, width : number, height : number, index:string){
        this.indexText = Util.myText(x,y, index, 60, 0.5, this.indexTextColor, false);
        this.indexText.textAlign = egret.HorizontalAlign.CENTER;
        this.indexText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.indexText.width = this.object.width;
        this.indexText.height = this.object.height;
        this.indexText.anchorOffsetX += this.object.width/2;
        this.indexText.anchorOffsetY += this.object.height/2;
        this.indexText.x = this.object.width/2;
        this.indexText.y = this.object.height/2;
        this.object.addChild(this.indexText);
    }

    setParameterText(x : number, y : number, width : number, height : number, parameter:number){
        this.parameterText = Util.myText(x,y, parameter.toString(), 100, 0.5, this.parameterTextColor, false);
        this.parameterText.width = this.object.width;
        this.parameterText.height = this.object.height;
/*        this.parameterText.anchorOffsetX += this.parameterText.width/2;
        this.parameterText.anchorOffsetY += this.parameterText.height/2;*/
/*        this.parameterText.x = 0;
        this.parameterText.y = 0;  */  

        this.object.addChild(this.parameterText);
    }

    protected delete(){
        if( this.shape ){
            GameObject.display.removeChild(this.object);
        }
    }

    

}

class BulletDamageButton extends Button{

    constructor(x : number, y : number, width : number, height : number,color:number, index : string){
        super(x, y, width, height, index);
        this.setShape(x, y, width, height, color);
        this.setIndexText(0, 0, width*5, height, index);
        this.setParameterText(x, y+50, width, height, Player.bulletDamage);
    }

    setShape(x : number, y : number, width : number, height : number, color:number){
        if( this.shape ){
            GameObject.display.removeChild(this.shape);        
        }


        this.shape = new egret.Shape();
        this.shape.x = 0;
        this.shape.y = 0;
        this.shape.graphics.beginFill(color);
        this.shape.graphics.drawRoundRect(0, 0, width , height, 30);
        this.shape.graphics.endFill();
        this.object.addChild(this.shape);

        
    }

    updateContent(){
        this.parameterText.text = Player.bulletDamage.toString();
    }

}