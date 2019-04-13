enum RandomEnemy{
    //NONE,
    RECT,
    CIRCLE,
    DOUBLE_RECT,
    DOUBLE_CIRCLE,
    TRIPLE_RECT,
    TRIPLE_CIRCLE,
    BOSS_RECT,
    BOSS_CIRCLE,
    BOSS_DOUBLE_RECT,
    BOSS_DOUBLE_CIRCLE,
    BOSS_TRIPLE_RECT,
    BOSS_TRIPLE_CIRCLE,
    UMIBOUZU,
    BOSS_UMIBOUZU,
    FINAL,
}

class GameScene extends GameObject{

    static I : GameScene = null;
    static enemyLevel : number = 1;

    //public object : egret.DisplayObjectContainer = null;
    static enemy : Enemy[] = [];
/**/
    constructor() {
        super();
        GameScene.I = this;
        GameScene.enemyLevel = Util.loadLocalStrage("GameScene.enemyLevel",GameScene.enemyLevel)
        this.createStage();

    }

    createStage(){
        GameScene.createEnemy();
    }

    static createEnemy(){
        
        const newArray :Enemy[] = GameScene.enemy.filter(e => e.deadFlag !== true);
        GameScene.enemy = newArray;

        let e : Enemy;
        let createEnemy : number = Util.randomInt(RandomEnemy.RECT, GameScene.enemyLevel);
        let rectEnemyColor : number =  Util.color(0,254,0);
        let circleEnemyColor : number =  Util.color(255,100,255);
        let bossColor : number = Util.color(255,240,39);
        let bossHpTextColor : number = Util.color(254,0,0);
        let enemyHP : number = 0;
        let enemyDropMoney : number = 0;

        //Circle関連の変数
        let cr :number = Game.width/6;//radius
        let cw = cr;//width
        let ch = cr;//height



        //boss戦
        switch(Kill.I.kill){
            case 10 :
            createEnemy = RandomEnemy.UMIBOUZU;
            GameScene.enemyLevel = RandomEnemy.CIRCLE;
            Util.saveLocalStrage("GameScene.enemyLevel", GameScene.enemyLevel);
            break;
            case 50 :
            createEnemy = RandomEnemy.BOSS_CIRCLE;
            GameScene.enemyLevel = RandomEnemy.DOUBLE_RECT;
            Util.saveLocalStrage("GameScene.enemyLevel", GameScene.enemyLevel);
            break;
            case 100 :
            createEnemy = RandomEnemy.BOSS_DOUBLE_RECT;
            GameScene.enemyLevel = RandomEnemy.DOUBLE_CIRCLE;
            Util.saveLocalStrage("GameScene.enemyLevel", GameScene.enemyLevel);
            break;
            case 200 :
            createEnemy = RandomEnemy.BOSS_DOUBLE_CIRCLE;
            GameScene.enemyLevel = RandomEnemy.TRIPLE_RECT;
            Util.saveLocalStrage("GameScene.enemyLevel", GameScene.enemyLevel);
            break;
            case 300 :
            createEnemy = RandomEnemy.BOSS_TRIPLE_RECT;
            GameScene.enemyLevel = RandomEnemy.TRIPLE_CIRCLE;
            Util.saveLocalStrage("GameScene.enemyLevel", GameScene.enemyLevel);
            break;
            case 400 :
            createEnemy = RandomEnemy.BOSS_TRIPLE_CIRCLE;
            //GameScene.enemyLevel = RandomEnemy.UMIBOUZU;//これだけEnemy生成時にlevelを変更
            //Util.saveLocalStrage("GameScene.enemyLevel", GameScene.enemyLevel);
            break;
            case 500 :
            createEnemy = RandomEnemy.BOSS_UMIBOUZU;
            GameScene.enemyLevel = RandomEnemy.BOSS_UMIBOUZU;
            Util.saveLocalStrage("GameScene.enemyLevel", GameScene.enemyLevel);
            break;

        }       
       

        switch(createEnemy){
            //雑魚キャラ
            case RandomEnemy.RECT:
            e = new RectEnemy(Game.width/2, Game.height/4, Game.width/6, Game.height/8, rectEnemyColor, 10 + Kill.I.kill*1, 50 + Kill.I.kill*1);
            GameScene.enemy.push(e);
            break;
            case RandomEnemy.CIRCLE:
            cr = Game.width/8;//radius
            cw = cr;//width
            ch = cr;//height
            e = new CircleEnemy(Game.width/2, Game.height/4, cw, ch, cr, circleEnemyColor, 15 + Kill.I.kill*1, 80 + Kill.I.kill*1);
            GameScene.enemy.push(e);
            break;
            case RandomEnemy.DOUBLE_RECT:
            e = new DoubleRect(Game.width/2, Game.height/4, Game.width/6, Game.height/8, rectEnemyColor, 50 + Kill.I.kill*2, 300 + Kill.I.kill*2);
            GameScene.enemy.push(e);
            break;
            case RandomEnemy.DOUBLE_CIRCLE:
            cr = Game.width/8;//radius
            cw = cr;//width
            ch = cr;//height
            e = new DoubleCircle(Game.width/2, Game.height/4, cw, ch, cr, circleEnemyColor, 80 + Kill.I.kill*2, 500 + Kill.I.kill*2);
            GameScene.enemy.push(e);
            break;
            case RandomEnemy.TRIPLE_RECT:
            e = new TripleRect(Game.width/2, Game.height/4, Game.width/6, Game.height/8, rectEnemyColor, 200 + Kill.I.kill*3, 1000 + Kill.I.kill*3);
            GameScene.enemy.push(e);
            break;
            case RandomEnemy.TRIPLE_CIRCLE:
            cr = Game.width/8;//radius
            cw = cr;//width
            ch = cr;//height
            e = new TripleCircle(Game.width/2, Game.height/4, cw, ch, cr, circleEnemyColor, 300 + Kill.I.kill*4, 1500 + Kill.I.kill*4);
            GameScene.enemy.push(e);
            break;

            //Bossキャラ
            case RandomEnemy.UMIBOUZU:
            cr = Game.width;//radius
            cw = cr;//width
            ch = cr;//height
            e = new Umibouzu(Game.width/2, Game.height/4, cw, ch, cr,bossColor, 100+ Kill.I.kill*1, 1500+ Kill.I.kill*1);
            GameScene.enemy.push(e);
            e.hpTextField.textColor = bossHpTextColor;
            if(GameScene.enemyLevel != RandomEnemy.UMIBOUZU && GameScene.enemyLevel != RandomEnemy.FINAL && GameScene.enemyLevel != RandomEnemy.BOSS_UMIBOUZU){
                e.bossFlag = true;
                new BossEntryEffect();
            }            
            break;
            case RandomEnemy.BOSS_RECT:
            e = new RectEnemy(Game.width/2, Game.height/4, Game.width/3.6, Game.height/5.2, bossColor, 100+ Kill.I.kill*1, 1500);
            GameScene.enemy.push(e);
            e.hpTextField.textColor = bossHpTextColor;
            if(GameScene.enemyLevel != RandomEnemy.UMIBOUZU && GameScene.enemyLevel != RandomEnemy.FINAL && GameScene.enemyLevel != RandomEnemy.BOSS_UMIBOUZU){
                e.bossFlag = true;
                new BossEntryEffect();
            }            
            break;
            case RandomEnemy.BOSS_CIRCLE:
            cr = Game.width/5;//radius
            cw = cr;//width
            ch = cr;//height
            e = new CircleEnemy(Game.width/2, Game.height/4, cw, ch, cr,bossColor, 300+ Kill.I.kill*2, 2000);
            GameScene.enemy.push(e);
            e.hpTextField.textColor = bossHpTextColor;
            if(GameScene.enemyLevel != RandomEnemy.UMIBOUZU && GameScene.enemyLevel != RandomEnemy.FINAL && GameScene.enemyLevel != RandomEnemy.BOSS_UMIBOUZU){
                e.bossFlag = true;
                new BossEntryEffect();
            }            
            break;
            case RandomEnemy.BOSS_DOUBLE_RECT:
            e = new DoubleRect(Game.width/2, Game.height/4, Game.width/6, Game.height/8, bossColor, 1000+ Kill.I.kill*3, 5000);
            GameScene.enemy.push(e);
            e.hpTextField.textColor = bossHpTextColor;
            if(GameScene.enemyLevel != RandomEnemy.UMIBOUZU && GameScene.enemyLevel != RandomEnemy.FINAL && GameScene.enemyLevel != RandomEnemy.BOSS_UMIBOUZU){
                e.bossFlag = true;
                new BossEntryEffect();
            }            
            break;
            case RandomEnemy.BOSS_DOUBLE_CIRCLE:
            cr = Game.width/8;//radius
            cw = cr;//width
            ch = cr;//height
            e = new DoubleCircle(Game.width/2, Game.height/4, cw, ch, cr,bossColor, 2000+ Kill.I.kill*4, 7000);
            GameScene.enemy.push(e);
            e.hpTextField.textColor = bossHpTextColor;
            if(GameScene.enemyLevel != RandomEnemy.UMIBOUZU && GameScene.enemyLevel != RandomEnemy.FINAL && GameScene.enemyLevel != RandomEnemy.BOSS_UMIBOUZU){
                e.bossFlag = true;
                new BossEntryEffect();
            }            
            break;
            case RandomEnemy.BOSS_TRIPLE_RECT:
            e = new TripleRect(Game.width/2, Game.height/4, Game.width/6, Game.height/8, bossColor, 5000+ Kill.I.kill*5, 10000);
            GameScene.enemy.push(e);
            e.hpTextField.textColor = bossHpTextColor;
            if(GameScene.enemyLevel != RandomEnemy.UMIBOUZU && GameScene.enemyLevel != RandomEnemy.FINAL && GameScene.enemyLevel != RandomEnemy.BOSS_UMIBOUZU){
                e.bossFlag = true;
                new BossEntryEffect();
            }
            break;
            case RandomEnemy.BOSS_TRIPLE_CIRCLE:
            cr = Game.width/8;//radius
            cw = cr;//width
            ch = cr;//height
            e = new TripleCircle(Game.width/2, Game.height/4, cw, ch, cr,bossColor, 7000+ Kill.I.kill*6, 15000);
            GameScene.enemy.push(e);
            e.hpTextField.textColor = bossHpTextColor;
            if(GameScene.enemyLevel != RandomEnemy.UMIBOUZU && GameScene.enemyLevel != RandomEnemy.FINAL && GameScene.enemyLevel != RandomEnemy.BOSS_UMIBOUZU){
                e.bossFlag = true;
                new BossEntryEffect();
                GameScene.enemyLevel = RandomEnemy.UMIBOUZU;//これだけ特別
                Util.saveLocalStrage("GameScene.enemyLevel", GameScene.enemyLevel);
            }            
            break;
            case RandomEnemy.BOSS_UMIBOUZU:
            new BossEntryEffect();
            cr = Game.width/8*20;//radius
            cw = cr;//width
            ch = cr;//height
            e = new Umibouzu(Game.width/2, Game.height/4, cw, ch, cr,bossColor, 100000, 200000);
            GameScene.enemy.push(e);
            e.hpTextField.textColor = bossHpTextColor;
            e.bossFlag = true;
            e.lastBossFlag = true;
            break;
        }
        
    }



    addDestroyMethod(){
        GameScene.enemy = [];
    }


    updateContent(){
    }

}