abstract class Panel extends GameObject{

    object : egret.DisplayObjectContainer = null;
    //button : Button[] = [];
    shapeColor : number;
    indexText : egret.TextField = null;
    indexTextColor : number = Util.color(230,230,230);

    constructor(x : number, y : number, width : number, height : number){
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
/*        this.object.width = width;
        this.object.height = height;
        this.object.anchorOffsetX += width/2;
        this.object.anchorOffsetY += height/2;*/
        this.object.x = x;
        this.object.y = y;
        //this.object.touchEnabled = true;
        GameObject.display.addChild(this.object);

    }

    setIndexText(x : number, y : number, width : number, height : number, index:string){
        const size :number = 60;
        const ratio :number = 1;
        this.indexText = Util.myText(x,y, index, size, ratio, this.indexTextColor, false);
        this.indexText.width = Game.width/ratio;
        this.indexText.height =Game.height/ratio;
        this.indexText.textAlign = egret.HorizontalAlign.CENTER;
        this.indexText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.object.addChild(this.indexText);
    }

    addDestroyMethod(){

        egret.Tween.removeTweens(this.object);
        if(this.indexText){
            this.object.removeChild(this.indexText);
            this.indexText = null;

        }

        if(this.shape){
            this.shape = null;

        }
        
        if( this.object ){
            this.object.removeChildren();
            GameObject.display.removeChild(this.object);
        }

        CautionPanel.onPanel = false;
    }


}

class CautionPanel extends Panel{

    static I : CautionPanel = null;
    static onPanel : boolean = false;

    constructor(x : number, y : number, width : number, height : number){
        super(x, y, width, height);
        CautionPanel.I = this;
        this.shapeColor = Util.color(0,0,0);
        this.setShape(x, y, width, height);
        this.setButton(x + 200, y + 600, Game.width/4.5, Game.height/14);
        this.setIndexText(x, y-200, width, height, "データを消去します\nよろしいですか？");

    }

    setShape(x : number, y : number, width : number, height : number){
        if( this.shape ){
            GameObject.display.removeChild(this.shape);        
        }
        this.shape = new egret.Shape();
        this.shape.x = 0;
        this.shape.y = 0;
        this.shape.alpha = 0.95;
        this.shape.graphics.beginFill(this.shapeColor);
        this.shape.graphics.drawRoundRect(0, 0, width , height, 0);
        this.shape.graphics.endFill();
        this.object.addChild(this.shape);
    }

    setButton(x : number, y : number, width : number, height : number){
        new CautionYesButton(x, y, width, height,Util.color(230,230,230),"YES");
        new CautionNoButton(x + width*2, y, width, height,Util.color(230,230,230),"NO");
    }

    updateContent(){}

}

class CautionYesButton extends Button{
    shapeColor :number;
    static I : CautionYesButton = null;

    constructor(x : number, y : number, width : number, height : number,color:number, index : string){
        super(x, y, width, height, index);
        CautionYesButton.I = this;
        this.setShape(x, y, width, height, color);
        this.setIndexText(0, 0, width, height, index);
        this.shapeColor = color;
        this.setMask(x, y, width, height);

    }


    setIndexText(x : number, y : number, width : number, height : number, index:string){
        const size :number = 60;
        const ratio :number = 0.5;
        this.indexText = Util.myText(x,y, index, size, ratio, this.costTextColor, false);
        this.indexText.width = this.object.width/ratio;
        this.indexText.height = this.object.height/ratio;
        this.indexText.textAlign = egret.HorizontalAlign.CENTER;
        this.indexText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.object.addChild(this.indexText);
    }


    tap(){
        Player.I.resetStatus();
    }

    updateContent(){

    }
}

class CautionNoButton extends Button{
    shapeColor :number;
    static I : CautionNoButton = null;

    constructor(x : number, y : number, width : number, height : number,color:number, index : string){
        super(x, y, width, height, index);
        CautionNoButton.I = this;
        this.setShape(x, y, width, height, color);
        this.setIndexText(0, 0, width, height, index);
        this.shapeColor = color;
        this.setMask(x, y, width, height);

    }


    setIndexText(x : number, y : number, width : number, height : number, index:string){
        const size :number = 60;
        const ratio :number = 0.5;
        this.indexText = Util.myText(x,y, index, size, ratio, this.costTextColor, false);
        this.indexText.width = this.object.width/ratio;
        this.indexText.height = this.object.height/ratio;
        this.indexText.textAlign = egret.HorizontalAlign.CENTER;
        this.indexText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.object.addChild(this.indexText);
    }


    tap(){
        CautionNoButton.I.destroy();
        CautionYesButton.I.destroy();
        CautionPanel.I.destroy();

    }

    updateContent(){

    }
}