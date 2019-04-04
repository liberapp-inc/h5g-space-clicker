class Kill extends GameObject{

    static I:Kill = null;   // singleton instance

    kill:number = 0;

    text:egret.TextField = null;
    //textBest:egret.TextField = null;

    textColor : number = 0x00FF3B;

    constructor() {
        super();
        Kill.I = this;

        this.textColor = Util.color(0,255,0);

        let kill = window.localStorage.getItem("kill"); // string
        if( kill == null ){
            kill = "0";
            window.localStorage.setItem("kill", kill);
        }
        this.kill = parseInt( kill );

        this.text = Util.myText(0, 0, "KILL : " + this.kill.toString() + " / 1000", 100, 0.5, this.textColor, true);
        GameObject.display.addChild( this.text );


    }
    
    onDestroy() {
        GameObject.display.removeChild( this.text );
        this.text = null;

    }

    updateContent() {
        this.text.text = "KILL : " + this.kill.toString() + " / 1000";

    }

    addKill(){
        this.kill += 1;
        window.localStorage.setItem("kill", this.kill.toString());
        
    }


}