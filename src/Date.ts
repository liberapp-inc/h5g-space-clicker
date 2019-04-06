class CheckDate extends GameObject{

    static I : CheckDate = null;
    static dateTimer : egret.Timer = null;
    static dateInterval :number = 1000;
    static timerCounter :number = 0;

    text:egret.TextField = null;
    textColor : number = 0xffffff;

    private s :number = 0;//現在時刻 - 最終記録時間 sec

    constructor() {
        super();
        CheckDate.I = this;
        this.getDate();

        CheckDate.dateTimer = new egret.Timer(CheckDate.dateInterval,0);
        CheckDate.dateTimer.addEventListener(egret.TimerEvent.TIMER,this.save,this);
        CheckDate.dateTimer.start();
    }

    getDate(){
        let getLastDate : string = window.localStorage.getItem("getLastDate"); // string
        if( getLastDate == null || getLastDate == undefined){
            getLastDate = (new Date().getTime()).toString();//ms
            window.localStorage.setItem("getLastDate", getLastDate);
        }
        let lastDate : number = parseInt(getLastDate);
        let now = new Date();
        this.s = (now.getTime() - lastDate)/1000;//sec
        this.s = parseInt(this.s.toString());

        //経過時間報酬の獲得
        Money.I.money += this.s * Player.salary;

        //現在時刻の更新
        getLastDate = (new Date().getTime()).toString();//ms
        window.localStorage.setItem("getLastDate", getLastDate);
        lastDate = parseInt(getLastDate);
        this.s = (now.getTime() - lastDate)/1000;//sec
        this.s = parseInt(this.s.toString());

        //AutoSave用テキスト
        this.text = Util.myText(Game.width/1.4, 0, "saving...", 80, 0.5, this.textColor, true);
        this.text.alpha = 0; 
        GameObject.display.addChild( this.text );
        
    }

    //30sec毎にセーブ
    save(){
        CheckDate.timerCounter　+= 1;
        this.salary();
        this.autoSaveText();
    }

    updateContent(){}

    salary(){
        Money.I.money += Player.salary;
        if(CheckDate.timerCounter >= 10){
            window.localStorage.setItem("money", Money.I.money.toString());        
        }
    }

    autoSaveText(){
        if(CheckDate.timerCounter >= 10){
            let getLastDate = (new Date().getTime()).toString();//ms
            window.localStorage.setItem("getLastDate", getLastDate);
            CheckDate.timerCounter = 0;

            //AutoSaveTextの表示
            MyTween.autoSaveTextFadeInOut(this.text);
            
        }
    }

}