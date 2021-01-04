const { ccclass, property } = cc._decorator;
import { event, Event_Name } from "./containt"
@ccclass
export default class Player extends cc.Component {

    @property(cc.Prefab) star: cc.Prefab = null;
    @property(cc.Prefab) astroed: cc.Prefab = null;
    @property(cc.Node) picker: cc.Node = null;
    @property(cc.Node) homeWindow: cc.Node = null;
    @property(cc.Node) gamePlay: cc.Node = null;
    @property(cc.Node) gameOver: cc.Node = null;
    @property(cc.Button) upBtn: cc.Button = null;
    @property(cc.Button) downBtn: cc.Button = null;
    @property(cc.Label) score: cc.Label = null;

    basicScore :number = 0;
    speed: number = .7;

    gamePlayView() {
        this.gamePlay.active = true;
        this.homeWindow.active = false;
        this.gameOver.active = false;
    }
    gameOverView() {
        this.gamePlay.active = false;
        this.homeWindow.active = true;
        this.gameOver.active = false;
    }

    onLoad() {
        this.throwObject(false);
        this.throwObject(true);
    }
    
    checkPosition(block: cc.Vec2) {

        let currentVec2 = this.picker.getPosition();
        if(block.y == currentVec2.y-400){
            return true
        }
        return false

    }



    throwObject(value: boolean) {
        if (value) {

            setInterval(() => {
                var astroedPrefab
                astroedPrefab = cc.instantiate(this.astroed);
                astroedPrefab.setPosition(479.057, Math.floor(Math.random() * 400))
                astroedPrefab.active = true;
                this.node.addChild(astroedPrefab);
                this.moveStars(astroedPrefab)
                let block = this.checkPosition(astroedPrefab.getPosition());
                this.checkGame(block, 1)
            }, 1500)
        } else {
            setInterval(() => {
                var starsPrefab
                starsPrefab = cc.instantiate(this.star);
                starsPrefab.setPosition(479.057, Math.floor(Math.random() * 400))
                starsPrefab.active = true;
                this.node.addChild(starsPrefab);
                this.moveStars(starsPrefab)
                let block = this.checkPosition(starsPrefab.getPosition());
                this.checkGame(block, 2)
            }, 1000)
        }
    }
    checkGame(value: boolean, flag: number) {
        if(value)
        if (flag == 1) {
            
            this.gamePlay.active = false;
            this.gameOver.active = true;
            this.basicScore = 0;
            return
        } else {
            this.basicScore++
            this.score.string = this.basicScore.toString(); 
        }
    }
    moveStars(node: cc.Node) {
        cc.tween(node)
            .by(0.9,
                {
                    position: cc.v3(-1000,
                        -Math.floor(Math.random() * 400)),
                    angle: 180
                }).start()
    }

    playerUp() {
        cc.tween(this.picker)
            .to(this.speed,
                { position: cc.v3(0, this.upBtn.node.getPosition().y) })
            .start()
    }

    playerDown() {
        cc.tween(this.picker)
            .to(this.speed,
                { position: cc.v3(0, this.downBtn.node.getPosition().y) })
            .start()
    }
}
