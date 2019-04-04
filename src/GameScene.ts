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
        this.createEnemy();
    }

    createEnemy(){
        let createEnemy : number = 1;//Util.randomInt(RandomEnemy.NONE, RandomEnemy.TRIANGLE);

        switch(createEnemy){
            case RandomEnemy.RECT:
            let e = new RectEnemy(Game.width/2, Game.height/4, Game.width/4, Game.height/6, Util.color(0,0,255), 3, 10);
            GameScene.enemy.push(e);
            break;
        }
    }


    addDestroyMethod(){
    }


    updateContent(){
    }

}