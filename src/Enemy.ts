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

    constructor() {
        super();

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
        super();
        this.setObject(x, y, width, height);
        this.setShape(x, y, width, height, color);
        this.hp = hp;
        this.dropMoney = dropMoney;
        this.setHpText();
    }

    private setObject(x : number, y : number, width : number, height : number){
        this.object = new egret.DisplayObjectContainer();
        this.object.anchorOffsetX += width/2;
        this.object.anchorOffsetY += height/2;
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

/*    addDestroyMethod(){
        Money.I.money += this.dropMoney;
    }*/

/*    protected delete(){
        if( this.shape ){
            GameObject.display.removeChild(this.object);
        }
    }*/


}