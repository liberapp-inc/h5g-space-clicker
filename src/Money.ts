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
        this.money = 0;
        this.text = Util.myText(0, 0, "MONEY : 0", 100, 0.5, this.textColor, true);
        GameObject.display.addChild( this.text );

        let bestMoney = window.localStorage.getItem("bestMoney"); // string
        if( bestMoney == null ){
            bestMoney = "0";
            window.localStorage.setItem("bestMoney", bestMoney);
        }
        this.bestMoney = parseInt( bestMoney );
        this.textBest = Util.myText(0, 50, "BEST : " + bestMoney, 100, 0.5, this.textColor, true);
        GameObject.display.addChild( this.textBest );
    }
    
    onDestroy() {
        GameObject.display.removeChild( this.text );
        this.text = null;
        GameObject.display.removeChild( this.textBest );
        this.textBest = null;
    }

    updateContent() {
        this.text.text = "MONEY : " + this.money.toFixed();
        if( this.bestMoney < this.money ){
            this.bestMoney = this.money;
            this.textBest.text = "BEST : " + this.money.toFixed();
        }
    }

    addMoney(){
        this.money += 1;
        
    }


}