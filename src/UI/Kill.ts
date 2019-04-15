class Kill extends GameObject{

    static I:Kill = null;   // singleton instance

    kill:number = 0;

    text:egret.TextField = null;
    //textBest:egret.TextField = null;

    textColor : number = 0x00FF3B;

    constructor() {
        super();
        Kill.I = this;

        this.textColor = Util.color(230,230,230);

        this.kill = Util.loadLocalStrage("Kill.I.kill", Kill.I.kill);

        this.text = Util.myText(0, 50, "KILL : " + this.kill.toString() + " / 500", 100, 0.5, this.textColor, true);
        GameObject.display.addChild( this.text );


    }
    
    addDestroyMethod() {
        GameObject.display.removeChild( this.text );
        this.text = null;

    }

    updateContent() {
        this.text.text = "KILL : " + this.kill.toString() + " / 500";

    }

    addKill(){
        this.kill += 1;
        Util.saveLocalStrage("Kill.I.kill", Kill.I.kill);
        
    }


}