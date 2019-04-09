enum DropItem{
    NONE,
    A,
    B
}

abstract class Enemy extends GameObject{

    public object : egret.DisplayObjectContainer = null;
    public dropMoney : number = 10;
    public hp : number = 0;
    public hpTextField : egret.TextField = null;
    public hpTextFieldColor : number = 0xff0000;
    public deadFlag : boolean = false;

    constructor(x : number, y : number, width : number, height : number) {
        super();
        this.setObject(x, y, width, height);
        //this.setHpText(x, y, width, height);

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

    setHpText(x : number, y : number, width : number, height : number){
        const size :number = 100;
        const ratio :number = 0.5;
        this.hpTextField = Util.myText(0,0, this.hp.toString(), size, ratio, this.hpTextFieldColor, true);
        this.hpTextField.width = this.object.width/ratio;
        this.hpTextField.height = this.object.height/ratio;
        this.hpTextField.textAlign = egret.HorizontalAlign.CENTER;
        this.hpTextField.verticalAlign = egret.VerticalAlign.MIDDLE;

/*        this.hpTextField.anchorOffsetX += this.hpTextField.width/2;
        this.hpTextField.anchorOffsetY += this.hpTextField.height/2;
        this.hpTextField.x = 0;
        this.hpTextField.y = 0;  */  

        this.object.addChild(this.hpTextField);
    }

    addDestroyMethod(){
        Money.I.money += this.dropMoney;
    }

    updateContent() {
        this.hpTextField.text = this.hp.toString();

    }

    protected delete(){
        if( this.shape ){
            GameObject.display.removeChild(this.object);
        }
    }

}

class RectEnemy extends Enemy{

    constructor(x : number, y : number, width : number, height : number, color:number, hp:number, dropMoney:number) {
        super(x, y, width, height);
        //this.setObject(x, y, width, height);
        this.setShape(x, y, width, height, color);
        this.hp = hp;
        this.dropMoney = dropMoney;
        this.setHpText(x, y, width, height);
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


}

class CircleEnemy extends Enemy{

    constructor(x : number, y : number, width : number, height : number, radius : number, color:number, hp:number, dropMoney:number) {
        super(x, y, width, height);
        this.setShape(x, y, radius, color);
        this.hp = hp;
        this.dropMoney = dropMoney;
        this.setHpText(x, y, width, height);

    }


    private setShape(x : number, y : number, radius : number, color:number){
        if( this.shape ){
            GameObject.display.removeChild(this.shape);        
        }
        if(radius <= 0){
            radius = 1;
            console.log("radiusが0以下です");
        }

        this.shape = new egret.Shape();
        this.shape.x = this.object.anchorOffsetX;
        this.shape.y = this.object.anchorOffsetY;
        this.shape.graphics.beginFill(color);
        this.shape.graphics.drawCircle(0, 0, radius);
        this.shape.graphics.endFill();
        this.object.addChild(this.shape);
    }


}