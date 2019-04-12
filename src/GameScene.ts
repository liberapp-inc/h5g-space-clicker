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
    BOSS_Umibouzu,
}

class GameScene extends GameObject{

    static I : GameScene = null;

    //public object : egret.DisplayObjectContainer = null;
    static enemy : Enemy[] = [];
/**/
    constructor() {
        super();
        GameScene.I = this;
        this.createStage();

    }

    createStage(){
        GameScene.createEnemy();
    }

    static createEnemy(){
        let e : Enemy;
        let createEnemy : number = 0;//Util.randomInt(RandomEnemy.RECT, RandomEnemy.BOSS_Umibouzu);
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
            break;
            case 50 :
            createEnemy = RandomEnemy.BOSS_CIRCLE;
            break;
            case 100 :
            createEnemy = RandomEnemy.BOSS_DOUBLE_RECT;
            break;
            case 200 :
            createEnemy = RandomEnemy.BOSS_DOUBLE_CIRCLE;
            break;
            case 300 :
            createEnemy = RandomEnemy.BOSS_TRIPLE_RECT;
            break;
            case 400 :
            createEnemy = RandomEnemy.BOSS_TRIPLE_CIRCLE;
            break;
            case 500 :
            createEnemy = RandomEnemy.BOSS_Umibouzu;
            break;
            case 600 :
            break;
            case 700 :
            break;
            case 800 :
            break;
            case 800 :
            break;
            case 900 :
            break;
            case 1000 :
            break;
        }

        switch(createEnemy){
            case RandomEnemy.RECT:
            e = new RectEnemy(Game.width/2, Game.height/4, Game.width/6, Game.height/8, Util.color(0,0,255), 10, 50);
            GameScene.enemy.push(e);
            break;
            case RandomEnemy.CIRCLE:
            cr = Game.width/8;//radius
            cw = cr;//width
            ch = cr;//height
            e = new CircleEnemy(Game.width/2, Game.height/4, cw, ch, cr,Util.color(0,0,255), 10, 50);
            GameScene.enemy.push(e);
            break;
            case RandomEnemy.DOUBLE_RECT:
            e = new DoubleRect(Game.width/2, Game.height/4, Game.width/6, Game.height/8, Util.color(10,130,180), 50, 200);
            GameScene.enemy.push(e);
            break;
            case RandomEnemy.DOUBLE_CIRCLE:
            cr = Game.width/8;//radius
            cw = cr;//width
            ch = cr;//height
            e = new DoubleCircle(Game.width/2, Game.height/4, cw, ch, cr,Util.color(0,150,55), 50, 200);
            GameScene.enemy.push(e);
            break;
            case RandomEnemy.TRIPLE_RECT:
            e = new TripleRect(Game.width/2, Game.height/4, Game.width/6, Game.height/8, Util.color(10,130,180), 200, 3000);
            GameScene.enemy.push(e);
            break;
            case RandomEnemy.TRIPLE_CIRCLE:
            cr = Game.width/8;//radius
            cw = cr;//width
            ch = cr;//height
            e = new TripleCircle(Game.width/2, Game.height/4, cw, ch, cr,Util.color(0,50,55), 200, 3000);
            GameScene.enemy.push(e);
            break;
            case RandomEnemy.BOSS_RECT:
            e = new RectEnemy(Game.width/2, Game.height/4, Game.width/3.6, Game.height/5.2, Util.color(255,255,0), 100, 1000);
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
            e = new DoubleRect(Game.width/2, Game.height/4, Game.width/6, Game.height/8, Util.color(255,255,0), 500, 1000);
            GameScene.enemy.push(e);
            break;
            case RandomEnemy.BOSS_DOUBLE_CIRCLE:
            cr = Game.width/8;//radius
            cw = cr;//width
            ch = cr;//height
            e = new DoubleCircle(Game.width/2, Game.height/4, cw, ch, cr,Util.color(255,255,0), 500, 1000);
            GameScene.enemy.push(e);
            break;
            case RandomEnemy.BOSS_TRIPLE_RECT:
            e = new TripleRect(Game.width/2, Game.height/4, Game.width/6, Game.height/8, Util.color(255,255,0), 2000, 8000);
            GameScene.enemy.push(e);
            break;
            case RandomEnemy.BOSS_TRIPLE_CIRCLE:
            cr = Game.width/8;//radius
            cw = cr;//width
            ch = cr;//height
            e = new TripleCircle(Game.width/2, Game.height/4, cw, ch, cr,Util.color(255,255,0), 2000, 8000);
            GameScene.enemy.push(e);
            break;
            case RandomEnemy.BOSS_Umibouzu:
            cr = Game.width/8;//radius
            cw = cr;//width
            ch = cr;//height
            e = new Umibouzu(Game.width/2, Game.height/4, cw, ch, cr,Util.color(255,255,0), 10000, 15000);
            GameScene.enemy.push(e);
            break;
        }
    }



    addDestroyMethod(){
    }


    updateContent(){
    }

}