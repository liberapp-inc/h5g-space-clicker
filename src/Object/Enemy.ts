enum DropItem{
    NONE,
    A,
    B
}

abstract class Enemy extends GameObject{

    public object : egret.DisplayObjectContainer = null;
    public initialY : number = 0;
    public dropMoney : number = 0;
    public hp : number = 0;
    public hpTextField : egret.TextField = null;
    public hpTextFieldColor : number = 0xff0000;
    public deadFlag : boolean = false;
    public bossFlag : boolean = false;
    public lastBossFlag : boolean = false;
    
    addShapes : egret.Shape[] = [];


    constructor(x : number, y : number, width : number, height : number, color:number, hp:number, dropMoney:number) {
        super();
        this.hp = hp;
        this.dropMoney = dropMoney;
        this.setObject(x, y, width, height);
        this.setHpText(x, y, width, height);
        
        //ノックバックでobjectが上に行ってしまった時に、初期の位置に戻す用
        this.initialY = this.object.y;
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

        let index : number = GameObject.display.getChildIndex(Background.I.shape) + 1;
        GameObject.display.addChildAt(this.object, index);


        //GameObject.display.swapChildren(this.object,Player.object);
    }

    setHpText(x : number, y : number, width : number, height : number){
        const size :number = 100;
        const ratio :number = 0.5;
        this.hpTextField = Util.myText(0,0, this.hp.toString(), size, ratio, this.hpTextFieldColor, true);
        this.hpTextField.width  /= ratio;
        this.hpTextField.height /= ratio;
        this.hpTextField.anchorOffsetX = this.hpTextField.width /2;
        this.hpTextField.anchorOffsetY = this.hpTextField.height/2;
        this.hpTextField.x = this.object.anchorOffsetX; 
        this.hpTextField.y = this.object.anchorOffsetY; 
        this.hpTextField.textAlign = egret.HorizontalAlign.CENTER;
        this.hpTextField.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.object.addChild(this.hpTextField);
    }

    setRectShape(dx : number, dy : number, width : number, height : number, color:number, rotation?:number){

        let s = new egret.Shape();
        this.addShapes.push(s);
        s.anchorOffsetX = this.object.anchorOffsetX;
        s.anchorOffsetY = this.object.anchorOffsetY;
        s.x = this.object.anchorOffsetX + dx;
        s.y = this.object.anchorOffsetY + dy;
        s.rotation = rotation || 0;

        s.graphics.beginFill(color);
        s.graphics.drawRect(0, 0, width , height);
        s.graphics.endFill();
        this.object.addChildAt(s,0);
    }

    setCircleShape(dx : number,dy : number, radius : number, color:number, rotation?:number){

        if(radius <= 0){
            radius = 1;
            console.log("radiusが0以下です");
        }

        let s = new egret.Shape();
        this.addShapes.push(s);
        s.x = this.object.anchorOffsetX + dx;
        s.y = this.object.anchorOffsetY + dy;
        s.rotation = rotation || 0;
        s.graphics.beginFill(color);
        s.graphics.drawCircle(0, 0, radius);
        s.graphics.endFill();
        this.object.addChildAt(s,0);
    }


    updateContent() {
        this.hpTextField.text = this.hp.toString();
        if(this.initialY > this.object.y){
            this.object.y = this.initialY;
        }

    }

    addDestroyMethod(){

        egret.Tween.removeTweens(this.object);
        if(this.hpTextField){
            this.object.removeChild(this.hpTextField);
            this.hpTextField = null;

        }

        this.addShapes.forEach(s =>{
            this.object.removeChild(s);
            s=null;
        });
        
        if(this.shape){
            //this.object.removeChild(this.hpTextField);
            this.object.removeChildren();
            this.shape = null;

        }
        
        if( this.object ){
            GameObject.display.removeChild(this.object);
        }
    }

}

class RectEnemy extends Enemy{

    constructor(x : number, y : number, width : number, height : number, color:number, hp:number, dropMoney:number) {
        super(x, y, width, height, color, hp, dropMoney);
        this.setRectShape(0, 0, width, height, color, 45);
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
        this.setRectShape(-width/4, -height/4, width, height, color);
        this.setRectShape(width/4, height/4, width, height, color);

    }


}

class TripleCircle extends Enemy{

    constructor(x : number, y : number, width : number, height : number, radius : number, color:number, hp:number, dropMoney:number) {
        super(x, y, width, height, color, hp, dropMoney);
        const interval :number = radius/1;
        this.setCircleShape(0, interval, radius, color);
        this.setCircleShape(interval, 0, radius/1.5, color);
        this.setCircleShape(-interval, 0, radius/1.5, color);
    }

}

class TripleRect extends Enemy{

    constructor(x : number, y : number, width : number, height : number, color:number, hp:number, dropMoney:number) {
        super(x, y, width, height, color, hp, dropMoney);
        const intervalX :number = width*1.35;
        const intervalY :number = height*1.35;
        this.setRectShape(0, 0, width, height, color, 45);
        this.setRectShape(-intervalX, intervalY, width, height, color, 45);
        this.setRectShape(intervalX, intervalY, width, height, color, 45);

    }


}

class Umibouzu extends Enemy{
    constructor(x : number, y : number, width : number, height : number, radius : number, color:number, hp:number, dropMoney:number) {
        super(x, y, width, height, color, hp, dropMoney);
        const interval :number = radius*1.5;
        const eyeColor :number = Util.color(255,0,0);
        this.setCircleShape(interval, interval, radius/1.5, eyeColor);
        this.setCircleShape(-interval, interval, radius/1.5, eyeColor);
        this.setCircleShape(0, interval*2, radius/1.5, eyeColor);
        this.setCircleShape(0, 0, radius*4, color);
    }
}

