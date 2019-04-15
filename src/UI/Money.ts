class Money extends GameObject{

    static I:Money = null;   // singleton instance

    money:number = 0;

    bestMoney:number = 0;
    text:egret.TextField = null;
    textBest:egret.TextField = null;

    textColor : number = 0x00FF3B;

    constructor() {
        super();

        this.textColor = Util.color(230,230,230);

        Money.I = this;

/*        let money = window.localStorage.getItem("money"); // string
        
        if( money == null ){
            money = "0";
            window.localStorage.setItem("money", money);
        }*/
        this.money = Util.loadLocalStrage("Money.I.money", Money.I.money);

        this.text = Util.myText(0, 0, "MONEY : 0", 100, 0.5, this.textColor, true);
        GameObject.display.addChild( this.text );

    }
    
    addDestroyMethod() {
        GameObject.display.removeChild( this.text );
        this.text = null;
    }

    updateContent() {
        this.text.text = "MONEY : " + this.money.toFixed();
    }

    static addMoney(dropMoney : number){
        Money.I.money += dropMoney;
        Util.saveLocalStrage("Money.I.money", Money.I.money);
    }


}

class DropMoney extends GameObject{

    text:egret.TextField = null;
    //textColor : number = 0x00FF3B;
    display : egret.DisplayObjectContainer;

    constructor(x:number, y:number, text:string, size:number, ratio:number, color:number, bold:boolean, display:egret.DisplayObjectContainer) {
        super();

        //this.textColor = Util.color(90,205,39);
        this.display = display;

        this.text = Util.myText(x, y, text, size, ratio, color, true);  
        this.text.width  /= ratio;
        this.text.height /= ratio;
        this.text.anchorOffsetX = this.text.width /2;
        this.text.anchorOffsetY = this.text.height/2;
        this.text.x = this.display.anchorOffsetX; 
        this.text.y = this.display.anchorOffsetY; 
        this.text.textAlign = egret.HorizontalAlign.CENTER;
        this.text.verticalAlign = egret.VerticalAlign.MIDDLE;
        display.addChild( this.text );
        MyTween.dropMoneyTextFadeOut(this.text, this);
    }
    
    addDestroyMethod(){
        this.display.removeChild(this.text);
    }

    updateContent() {
    }



}