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
        this.object.anchorOffsetX += width/2;
        this.object.anchorOffsetY += height/2;
        this.object.x = x;
        this.object.y = y;
        this.object.width = width;
        this.object.height = height;
        GameObject.display.addChild(this.object);

    }

    setHpText(){
        this.hpTextField = Util.myText(0, 0, this.hp.toString(), 100, 0.5, this.hpTextFieldColor, true);
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
        this.setHpText();
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
        this.setHpText();
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
        this.object.anchorOffsetX -= radius/2;//Circleのアンカーは円の中心なのでRectにあわせて左上にもっていく
        this.object.anchorOffsetY -= radius/2;
        this.shape.x = 0;
        this.shape.y = 0;
        this.shape.graphics.beginFill(color);
        this.shape.graphics.drawCircle(0, 0, radius);
        this.shape.graphics.endFill();
        this.object.addChild(this.shape);

        
    }

    setHpText(){
        this.hpTextField = Util.myText(0, 0, this.hp.toString(), 100, 0.5, this.hpTextFieldColor, true);
        this.hpTextField.anchorOffsetX = this.hpTextField.width/2;
        this.hpTextField.anchorOffsetY = this.hpTextField.height/2;
        this.object.addChild(this.hpTextField);
    }

}