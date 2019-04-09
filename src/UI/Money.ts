class Money extends GameObject{

    static I:Money = null;   // singleton instance

    money:number = 0;

    bestMoney:number = 0;
    text:egret.TextField = null;
    textBest:egret.TextField = null;

    textColor : number = 0x00FF3B;

    constructor() {
        super();

        this.textColor = Util.color(0,255,0);

        Money.I = this;

        let money = window.localStorage.getItem("money"); // string
        
        if( money == null ){
            money = "0";
            window.localStorage.setItem("money", money);
        }
        this.money = parseInt( money );

        this.text = Util.myText(0, 0, "MONEY : 0", 100, 0.5, this.textColor, true);
        GameObject.display.addChild( this.text );

    }
    
    onDestroy() {
        GameObject.display.removeChild( this.text );
        this.text = null;
    }

    updateContent() {
        this.text.text = "MONEY : " + this.money.toFixed();
    }

    static addMoney(dropMoney : number){
        Money.I.money += dropMoney;
        window.localStorage.setItem("money", Money.I.money.toString());        
    }


}

class DropMoney extends GameObject{

    text:egret.TextField = null;
    textColor : number = 0x00FF3B;

    constructor(x:number, y:number, text:string, size:number, ratio:number, color:number, bold:boolean, display:egret.DisplayObjectContainer) {
        super();

        this.textColor = Util.color(0,255,0);

        this.text = Util.myText(x, y, text, size, ratio, color, true);  
        this.text.width = display.width/ratio;
        this.text.height = display.height/ratio;
        this.text.textAlign = egret.HorizontalAlign.CENTER;
        this.text.verticalAlign = egret.VerticalAlign.MIDDLE;
        display.addChild( this.text );
        MyTween.dropMoneyTextFadeOut(this.text, this);
    }
    
    onDestroy() {
    }

    updateContent() {
    }



}