enum RandomEnemy{
    NONE,
    RECT,
    CIRCLE,
    TRIANGLE
}

class GameScene extends GameObject{

    //public object : egret.DisplayObjectContainer = null;
    static enemy : Enemy[] = [];

    constructor() {
        super();
        this.createStage();

    }

    createStage(){
        GameScene.createEnemy();
    }

    static createEnemy(){
        let createEnemy : number = 2;//Util.randomInt(RandomEnemy.NONE, RandomEnemy.TRIANGLE);

        switch(createEnemy){
            case RandomEnemy.RECT:
            let re = new RectEnemy(Game.width/2, Game.height/4, Game.width/4, Game.height/6, Util.color(0,0,255), 3, 10);
            GameScene.enemy.push(re);
            break;
            case RandomEnemy.CIRCLE:
            let cr :number = Game.width/6;//radius
            let cw = cr;//width
            let ch = cr;//height
            let ce = new CircleEnemy(Game.width/2, Game.height/4, cw, ch, cr,Util.color(0,0,255), 3, 10);
            GameScene.enemy.push(ce);
            break;
        }
    }


    addDestroyMethod(){
    }


    updateContent(){
    }

}