enum RandomEnemy{
    //NONE,
    RECT,
    CIRCLE,
    DOUBLE_RECT,
    DOUBLE_CIRCLE,
    TRIPLE_RECT,
    TRIPLE_CIRCLE,
    UMIBOUZU,
    BOSS_RECT,
    BOSS_CIRCLE,
    BOSS_DOUBLE_RECT,
    BOSS_DOUBLE_CIRCLE,
    BOSS_TRIPLE_RECT,
    BOSS_TRIPLE_CIRCLE,
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
        let e : Enemy;
        let createEnemy : number = 1;//Util.randomInt(RandomEnemy.RECT, GameScene.enemyLevel);
        let enemyColor : number = 0xffffff;
        let enemyHP : number = 0;
        let enemyDropMoney : number = 0;

        //Circle関連の変数
        let cr :number = Game.width/6;//radius
        let cw = cr;//width
        let ch = cr;//height
        //boss戦
        switch(Kill.I.kill){
            case 10 :
            createEnemy = RandomEnemy.BOSS_RECT;
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
            GameScene.enemyLevel = RandomEnemy.UMIBOUZU;
            Util.saveLocalStrage("GameScene.enemyLevel", GameScene.enemyLevel);
            break;
            case 500 :
            createEnemy = RandomEnemy.BOSS_UMIBOUZU;
            GameScene.enemyLevel = RandomEnemy.FINAL;
            Util.saveLocalStrage("GameScene.enemyLevel", GameScene.enemyLevel);
            break;

        }

        switch(createEnemy){
            //雑魚キャラ
            case RandomEnemy.RECT:
            e = new RectEnemy(Game.width/2, Game.height/4, Game.width/6, Game.height/8, 0x28ffff, 10, 50);
            GameScene.enemy.push(e);
            break;
            case RandomEnemy.CIRCLE:
            cr = Game.width/8;//radius
            cw = cr;//width
            ch = cr;//height
            e = new CircleEnemy(Game.width/2, Game.height/4, cw, ch, cr, 0xaaff56, 15, 80);
            GameScene.enemy.push(e);
            break;
            case RandomEnemy.DOUBLE_RECT:
            e = new DoubleRect(Game.width/2, Game.height/4, Game.width/6, Game.height/8, 0x28ffff, 50, 300);
            GameScene.enemy.push(e);
            break;
            case RandomEnemy.DOUBLE_CIRCLE:
            cr = Game.width/8;//radius
            cw = cr;//width
            ch = cr;//height
            e = new DoubleCircle(Game.width/2, Game.height/4, cw, ch, cr, 0xaaff56, 80, 500);
            GameScene.enemy.push(e);
            break;
            case RandomEnemy.TRIPLE_RECT:
            e = new TripleRect(Game.width/2, Game.height/4, Game.width/6, Game.height/8, 0x28ffff, 200, 1000);
            GameScene.enemy.push(e);
            break;
            case RandomEnemy.TRIPLE_CIRCLE:
            cr = Game.width/8;//radius
            cw = cr;//width
            ch = cr;//height
            e = new TripleCircle(Game.width/2, Game.height/4, cw, ch, cr, 0xaaff56, 300, 1500);
            GameScene.enemy.push(e);
            break;

            //Bossキャラ
            case RandomEnemy.UMIBOUZU:
            cr = Game.width/20;//radius
            cw = cr;//width
            ch = cr;//height
            e = new Umibouzu(Game.width/2, Game.height/4, cw, ch, cr,0xffff28, 100, 1500);
            GameScene.enemy.push(e);
            break;
            case RandomEnemy.BOSS_RECT:
            e = new RectEnemy(Game.width/2, Game.height/4, Game.width/3.6, Game.height/5.2, Util.color(255,255,0), 100, 1500);
            GameScene.enemy.push(e);
            break;
            case RandomEnemy.BOSS_CIRCLE:
            cr = Game.width/5;//radius
            cw = cr;//width
            ch = cr;//height
            e = new CircleEnemy(Game.width/2, Game.height/4, cw, ch, cr,Util.color(255,255,0), 300, 2000);
            GameScene.enemy.push(e);
            break;
            case RandomEnemy.BOSS_DOUBLE_RECT:
            e = new DoubleRect(Game.width/2, Game.height/4, Game.width/6, Game.height/8, Util.color(255,255,0), 1000, 5000);
            GameScene.enemy.push(e);
            break;
            case RandomEnemy.BOSS_DOUBLE_CIRCLE:
            cr = Game.width/8;//radius
            cw = cr;//width
            ch = cr;//height
            e = new DoubleCircle(Game.width/2, Game.height/4, cw, ch, cr,Util.color(255,255,0), 2000, 7000);
            GameScene.enemy.push(e);
            break;
            case RandomEnemy.BOSS_TRIPLE_RECT:
            e = new TripleRect(Game.width/2, Game.height/4, Game.width/6, Game.height/8, Util.color(255,255,0), 5000, 10000);
            GameScene.enemy.push(e);
            break;
            case RandomEnemy.BOSS_TRIPLE_CIRCLE:
            cr = Game.width/8;//radius
            cw = cr;//width
            ch = cr;//height
            e = new TripleCircle(Game.width/2, Game.height/4, cw, ch, cr,Util.color(255,255,0), 7000, 15000);
            GameScene.enemy.push(e);
            break;
            case RandomEnemy.BOSS_UMIBOUZU:
            cr = Game.width/8;//radius
            cw = cr;//width
            ch = cr;//height
            e = new Umibouzu(Game.width/2, Game.height/4, cw, ch, cr,Util.color(255,255,0), 10000, 20000);
            GameScene.enemy.push(e);
            break;
        }
    }



    addDestroyMethod(){
        GameScene.enemy = [];
    }


    updateContent(){
    }

}