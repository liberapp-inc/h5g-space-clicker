abstract class Button extends GameObject{

    public object : egret.DisplayObjectContainer = null;
    public indexText : egret.TextField = null;
    public indexTextColor : number = 0xffffff;
    public costText : egret.TextField = null;
    public costTextColor : number = 0xffffff;
    public parameterText : egret.TextField = null;
    public parameterTextColor : number = 0xffffff;
    public mask : egret.Shape = null;
    public onMask : boolean = false;

    constructor(x : number, y : number, width : number, height : number, index : string){
        super();
        this.setObject(x, y, width, height);
        this.object.addEventListener( egret.TouchEvent.TOUCH_BEGIN, this.tap, this );
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
        this.object.touchEnabled = true;
        GameObject.display.addChild(this.object);

    }

    setShape(x : number, y : number, width : number, height : number, color:number){
        if( this.shape ){
            GameObject.display.removeChild(this.shape);        
        }


        this.shape = new egret.Shape();
        this.shape.x = 0;
        this.shape.y = 0;
        this.shape.graphics.beginFill(color);
        this.shape.graphics.drawRoundRect(0, 0, width , height, 30);
        this.shape.graphics.endFill();
        this.object.addChild(this.shape);
    }

    setMask(x : number, y : number, width : number, height : number){

        const color : number = Util.color(0,0,0);
        this.mask = new egret.Shape();
        this.mask.x = 0;
        this.mask.y = 0;
        this.mask.alpha = 0;
        this.mask.graphics.beginFill(color);
        this.mask.graphics.drawRoundRect(0, 0, width , height, 30);
        this.mask.graphics.endFill();
        this.object.addChild(this.mask);
    }
    

    setIndexText(x : number, y : number, width : number, height : number, index:string){
        const size :number = 80;
        const ratio :number = 0.5;
        this.indexText = Util.myText(x,y, index, size, ratio, this.indexTextColor, true);
        this.indexText.width = this.object.width/ratio;
        this.indexText.height = this.object.height/ratio;
        this.indexText.textAlign = egret.HorizontalAlign.CENTER;
        //this.indexText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.object.addChild(this.indexText);
    }


    setParameterText(x : number, y : number, width : number, height : number, parameter:number){
        const size :number = 60;
        const ratio :number = 0.5;
        this.parameterText = Util.myText(x,y, parameter.toString(), size, ratio, this.parameterTextColor, false);
        this.parameterText.width = this.object.width/ratio;
        this.parameterText.height = this.object.height/ratio;
        this.parameterText.textAlign = egret.HorizontalAlign.CENTER;
        //this.parameterText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.object.addChild(this.parameterText);
    }

    setCostText(x : number, y : number, width : number, height : number, cost:number){
        const size :number = 60;
        const ratio :number = 0.5;
        this.costText = Util.myText(x,y, "Lv.UP\n" + " MONEY\n" + cost.toString(), size, ratio, this.costTextColor, false);
        this.costText.width = this.object.width/ratio;
        this.costText.height = this.object.height/ratio;
        this.costText.textAlign = egret.HorizontalAlign.CENTER;
        this.costText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.object.addChild(this.costText);
    }

    protected delete(){
        if( this.object ){
            GameObject.display.removeChild(this.object);
        }
        if( this.object.hasEventListener ){
            this.object.removeEventListener( egret.TouchEvent.TOUCH_BEGIN, this.tap, this );
        }

    }

    abstract tap() :void;

}

class LevelUpBulletDamageButton extends Button{

    constructor(x : number, y : number, width : number, height : number,color:number, index : string){
        super(x, y, width, height, index);
        this.setShape(x, y, width, height, color);
        this.setIndexText(0, -100, width, height, index);
        this.setParameterText(0, -50, width, height, Player.bulletDamage);
        this.setCostText(0, 0, width, height, Player.damageLevelUpCost);
        this.setMask(x, y, width, height);

    }


    updateContent(){
        this.parameterText.text = Player.bulletDamage.toString();
        this.costText.text = "Lv.UP\n" + " MONEY\n" + Player.damageLevelUpCost.toString();
        if(Money.I.money >= Player.damageLevelUpCost){
            this.mask.alpha = 0;
        }
        else{
            this.mask.alpha = 0.5;
        }
    }

    tap(){
        if(Money.I.money >= Player.damageLevelUpCost){
            Money.I.money -= Player.damageLevelUpCost;
            Player.bulletDamage += 1;
            Player.damageLevelUpCost +=100;
            Util.saveLocalStrage("Player.bulletDamage", Player.bulletDamage);
            Util.saveLocalStrage("Player.damageLevelUpCost", Player.damageLevelUpCost);

        }
    }

}

class LevelUpBulletSpeedButton extends Button{

    constructor(x : number, y : number, width : number, height : number,color:number, index : string){
        super(x, y, width, height, index);
        this.setShape(x, y, width, height, color);
        this.setIndexText(0, -100, width, height, index);
        this.setParameterText(0, -50, width, height, Player.bulletMoveSpeed);
        this.setCostText(0, 0, width, height, Player.speedLevelUpCost);
        this.setMask(x, y, width, height);
    }


    updateContent(){
        this.parameterText.text = Player.bulletMoveSpeed.toString();
        this.costText.text = "Lv.UP\n" + " MONEY\n" + Player.speedLevelUpCost.toString();
        if(Money.I.money >= Player.speedLevelUpCost){
            this.mask.alpha = 0;
        }
        else{
            this.mask.alpha = 0.5;
        }
    }

    tap(){
        if(Money.I.money >= Player.speedLevelUpCost){
            Money.I.money -= Player.speedLevelUpCost;
            Player.bulletMoveSpeed += 1;
            Player.speedLevelUpCost +=100;
            if(Player.shotInterval >= 100){
                Player.shotInterval = 1000 - Player.bulletMoveSpeed*5;
                if(Player.shotInterval < 100){Player.shotInterval = 100;}
            }

            Player.I.resetTimer();
            Util.saveLocalStrage("Player.bulletMoveSpeed", Player.bulletMoveSpeed);
            Util.saveLocalStrage("Player.speedLevelUpCost", Player.speedLevelUpCost);
            Util.saveLocalStrage("Player.shotInterval", Player.shotInterval);

        }
    }

}

class LevelUpSalaryButton extends Button{

    constructor(x : number, y : number, width : number, height : number,color:number, index : string){
        super(x, y, width, height, index);
        this.setShape(x, y, width, height, color);
        this.setIndexText(0, -100, width, height, index);
        this.setParameterText(0, -50, width, height, Player.bulletMoveSpeed);
        this.setCostText(0, 0, width, height, Player.speedLevelUpCost);
        this.setMask(x, y, width, height);

    }


    updateContent(){
        this.parameterText.text = Player.salary.toString() + "/sec";
        this.costText.text = "Lv.UP\n" + " MONEY\n" + Player.salaryLevelUpCost.toString();
        if(Money.I.money >= Player.salaryLevelUpCost){
            this.mask.alpha = 0;
        }
        else{
            this.mask.alpha = 0.5;
        }
    }

    tap(){
        if(Money.I.money >= Player.salaryLevelUpCost){
            Money.I.money -= Player.salaryLevelUpCost;
            Player.salary += 1;
            Player.salaryLevelUpCost +=100;
            Util.saveLocalStrage("Player.salary", Player.salary);
            Util.saveLocalStrage("Player.salaryLevelUpCost", Player.salaryLevelUpCost);

        }
    }

}

class ResetButton extends Button{

    shapeColor :number;

    constructor(x : number, y : number, width : number, height : number,color:number, index : string){
        super(x, y, width, height, index);
        this.setShape(x, y, width, height, color);
        this.setIndexText(0, 0, width, height, index);
        this.shapeColor = color;
        this.setMask(x, y, width, height);

        

    }


    setIndexText(x : number, y : number, width : number, height : number, index:string){
        const size :number = 60;
        const ratio :number = 0.5;
        this.indexText = Util.myText(x,y, index, size, ratio, this.indexTextColor, false);
        this.indexText.width = this.object.width/ratio;
        this.indexText.height = this.object.height/ratio;
        this.indexText.textAlign = egret.HorizontalAlign.CENTER;
        this.indexText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.object.addChild(this.indexText);
    }

    tap(){
        egret.Tween.removeAllTweens();
        Player.I.resetStatus();

    }

    updateContent(){}

}