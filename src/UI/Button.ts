abstract class Button extends GameObject{

    public object : egret.DisplayObjectContainer = null;
    public indexText : egret.TextField = null;
    public indexTextColor : number = 0xffffff;
    //public cost : number = 0;
    public costText : egret.TextField = null;
    public costTextColor : number = 0xffffff;
    //public parameter : number = 0;
    public parameterText : egret.TextField = null;
    public parameterTextColor : number = 0xffffff;

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
        if( this.shape ){
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

    updateContent(){
        this.parameterText.text = Player.bulletDamage.toString();
        this.costText.text = "Lv.UP\n" + " MONEY\n" + Player.damageLevelUpCost.toString();
    }

    tap(){
        if(Money.I.money >= Player.damageLevelUpCost){
            Money.I.money -= Player.damageLevelUpCost;
            Player.bulletDamage += 1;
            Player.damageLevelUpCost +=100;
            Util.savelocalStrage("Player.bulletDamage", Player.bulletDamage);
            Util.savelocalStrage("Player.damageLevelUpCost", Player.damageLevelUpCost);

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

    updateContent(){
        this.parameterText.text = Player.bulletMoveSpeed.toString();
        this.costText.text = "Lv.UP\n" + " MONEY\n" + Player.speedLevelUpCost.toString();
    }

    tap(){
        if(Money.I.money >= Player.speedLevelUpCost){
            Money.I.money -= Player.speedLevelUpCost;
            Player.bulletMoveSpeed += 1;
            Player.speedLevelUpCost +=100;
            if(Player.shotInterval > 100){Player.shotInterval = 1000 - Player.bulletMoveSpeed*10;}
            Util.savelocalStrage("Player.bulletMoveSpeed", Player.bulletMoveSpeed);
            Util.savelocalStrage("Player.speedLevelUpCost", Player.speedLevelUpCost);
            Util.savelocalStrage("Player.shotInterval", Player.shotInterval);

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

    updateContent(){
        this.parameterText.text = Player.salary.toString();
        this.costText.text = "Lv.UP\n" + " MONEY\n" + Player.salaryLevelUpCost.toString();
    }

    tap(){
        if(Money.I.money >= Player.salaryLevelUpCost){
            Money.I.money -= Player.salaryLevelUpCost;
            Player.salary += 1;
            Player.salaryLevelUpCost +=100;
            Util.savelocalStrage("Player.salary", Player.salary);
            Util.savelocalStrage("Player.salaryLevelUpCost", Player.salaryLevelUpCost);

        }
    }

}