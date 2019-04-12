//Effect終了後の削除はMyTween.BossSlideで行っている
class BossEffect extends GameObject{

    static I : BossEffect = null;

    upperObject : egret.DisplayObjectContainer = null;
    lowerObject : egret.DisplayObjectContainer = null;
    background : egret.Shape = null;
    leftText : egret.TextField = null;
    rightText : egret.TextField = null;
    textColor : number = 0xff0000;
    constructor(){
        super();
        BossEffect.I = this;
        this.setBackground();
        this.setObject();
        this.setUpperShape(0,0,Game.width/6, Game.height/12);
        this.setLowerShape(0,0 ,Game.width/6, Game.height/12);
        this.setRightText();
        this.setLeftText();
    }

    setObject(){
        this.upperObject = new egret.DisplayObjectContainer();
        this.lowerObject = new egret.DisplayObjectContainer();
        this.upperObject.x = Game.width;
        this.lowerObject.y = Game.height - Game.height/12;
        GameObject.display.addChild(this.upperObject);
        GameObject.display.addChild(this.lowerObject);

    }

    setUpperShape(x : number, y : number, width : number, height : number){
        let color : number;
        for(let i = 0; i < 20; i++){
            if(i%2 == 0){
                color = 0x000000;
            }
            else{
                color = 0xffff00;
            }
            let s = new egret.Shape();
            s.graphics.beginFill(color);
            s.graphics.drawRect(width * i, y, width, height);
            s.graphics.endFill();
            this.upperObject.addChild(s);
            MyTween.bossSlide(s, -2500, 3000, 1000);
        }
    }

    setLowerShape(x : number, y : number, width : number, height : number){
        let color : number;
        for(let i = 0; i < 50; i++){
            if(i%2 == 0){
                color = 0x000000;
            }
            else{
                color = 0xffff00;
            }
            let s = new egret.Shape();
            s.graphics.beginFill(color);
            s.graphics.drawRect(-width * i, y, width, height);
            s.graphics.endFill();
            this.lowerObject.addChild(s);
            MyTween.bossSlide(s, 2500, 3000, 1000);

        }
    }

    setLeftText(){
        const size :number = 120;
        const ratio :number = 1;
        this.leftText = Util.myText(0,0, "BO", size, ratio, this.textColor, true);
        this.leftText.width  /= ratio;
        this.leftText.height /= ratio;
        this.leftText.anchorOffsetX = this.leftText.width;
        this.leftText.anchorOffsetY = this.leftText.height/2;
        this.leftText.x = 0; 
        this.leftText.y = Game.height/2; 
        this.leftText.alpha = 1;
        GameObject.display.addChild(this.leftText);
        MyTween.bossTextSlide(this.leftText, Game.width/2, 300);
        
    }
    setRightText(){
        const size :number = 120;
        const ratio :number = 1;
        this.rightText = Util.myText(0,0, "SS", size, ratio, this.textColor, true);
        this.rightText.width  /= ratio;
        this.rightText.height /= ratio;
        this.rightText.anchorOffsetX = 0;
        this.rightText.anchorOffsetY = this.rightText.height/2;
        this.rightText.x = Game.width; 
        this.rightText.y = Game.height/2; 
        this.rightText.alpha = 1;
        GameObject.display.addChild(this.rightText);
        MyTween.bossTextSlide(this.rightText, -Game.width/2, 300);
    }

    setBackground(){
        const color :number = 0xffffe0;
        this.background = new egret.Shape();
        this.background.graphics.beginFill(color);
        this.background.graphics.drawRect(0, 0, Game.width, Game.height);
        this.background.graphics.endFill();
        this.background.alpha = 0.1;
        GameObject.display.addChild(this.background);
    }

    addDestroyMethod(){

        if( this.upperObject ){
            this.upperObject.removeChildren();
            GameObject.display.removeChild(this.upperObject);
        }
        if( this.lowerObject ){
            this.lowerObject.removeChildren();
            GameObject.display.removeChild(this.lowerObject);
        }
        if(this.background){
            GameObject.display.removeChild(this.background);
        }

    }

    updateContent(){}


}