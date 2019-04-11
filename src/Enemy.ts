enum DropItem{
    NONE,
    A,
    B
}

abstract class Enemy extends GameObject{

    public object : egret.DisplayObjectContainer = null;
    public dropMoney : number = 0;
    public hp : number = 0;
    public hpTextField : egret.TextField = null;
    public hpTextFieldColor : number = 0xff0000;
    public deadFlag : boolean = false;
    
    addShapes : egret.Shape[] = [];


    constructor(x : number, y : number, width : number, height : number, color:number, hp:number, dropMoney:number) {
        super();
        this.hp = hp;
        this.dropMoney = dropMoney;
        this.setObject(x, y, width, height);
        this.setHpText(x, y, width, height);


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
        GameObject.display.swapChildren(this.object,Player.object);

    }

    setHpText(x : number, y : number, width : number, height : number){
        const size :number = 100;
        const ratio :number = 0.5;
        this.hpTextField = Util.myText(0,0, this.hp.toString(), size, ratio, this.hpTextFieldColor, true);
        this.hpTextField.width = this.object.width/ratio;
        this.hpTextField.height = this.object.height/ratio;
        this.hpTextField.textAlign = egret.HorizontalAlign.CENTER;
        this.hpTextField.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.object.addChild(this.hpTextField);
    }

    setRectShape(dx : number, dy : number, width : number, height : number, color:number){

        let s = new egret.Shape();
        this.addShapes.push(s);
        s.x = dx;
        s.y = dy;
        s.graphics.beginFill(color);
        s.graphics.drawRect(0, 0, width , height);
        s.graphics.endFill();
        this.object.addChildAt(s,0);
    }

    setCircleShape(dx : number,dy : number, radius : number, color:number){

        if(radius <= 0){
            radius = 1;
            console.log("radiusが0以下です");
        }

        let s = new egret.Shape();
        this.addShapes.push(s);
        s.x = this.object.anchorOffsetX + dx;
        s.y = this.object.anchorOffsetY + dy;
        s.graphics.beginFill(color);
        s.graphics.drawCircle(0, 0, radius);
        s.graphics.endFill();
        this.object.addChildAt(s,0);
    }


    updateContent() {
        this.hpTextField.text = this.hp.toString();

    }

    addDestroyMethod(){
        this.addShapes.forEach(s =>{
                this.object.removeChild(s);
                s=null;
        });
    }
    //オーバーライドしてるので、delete関連は注意
    protected delete(){
        this.addDestroyMethod();
        if( this.shape ){
            GameObject.display.removeChild(this.object);
        }
    }

}

class RectEnemy extends Enemy{

    constructor(x : number, y : number, width : number, height : number, color:number, hp:number, dropMoney:number) {
        super(x, y, width, height, color, hp, dropMoney);
        this.setRectShape(0, 0, width, height, color);
    }

}

class CircleEnemy extends Enemy{
    
    constructor(x : number, y : number, width : number, height : number, radius : number, color:number, hp:number, dropMoney:number) {
        super(x, y, width, height, color, hp, dropMoney);
        this.setCircleShape(0, 0, radius, color);

    }

}

class DoubleCircle extends Enemy{

    constructor(x : number, y : number, width : number, height : number, radius : number, color:number, hp:number, dropMoney:number) {
        super(x, y, width, height, color, hp, dropMoney);
        this.setCircleShape(-radius/1.5, 0, radius, color);
        this.setCircleShape(radius/1.5, 0, radius, color);
    }

}

class DoubleRect extends Enemy{

    constructor(x : number, y : number, width : number, height : number, color:number, hp:number, dropMoney:number) {
        super(x, y, width, height, color, hp, dropMoney);
        this.setRectShape(-width/4, -width/4, width, height, color);
        this.setRectShape(width/4, width/4, width, height, color);

    }


}