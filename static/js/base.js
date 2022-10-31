import { GameMap } from "./game_map/base.js";
import { Player } from "./player/base.js";
export const GRAVITY = 50; //重力加速度

export class KOF{
    constructor(id){
        this.$kof = $('#'+id);
        this.gameMap = new GameMap(this);
        this.players = [
            new Player(this,{
                id:0,
                x:200,
                y:0,
                width: 120,
                height: 200,
                speedx:400,
                speedy:-1000,
            }),

            new Player(this,{
                id: 1,
                x: window.innerWidth-120-200,
                y:0,
                width: 120,
                height: 200,
                speedx:400,
                speedy:-1000, 
            })
        ]



        $('#'+id).css({
            "width":window.innerWidth,
            "height":window.innerHeight,
            "background-image": "url('/static/images/background/0.gif')",
            "background-size": "100% 100%",
            "background-position": "top",
            "position": "absolute",
        })
    }

}