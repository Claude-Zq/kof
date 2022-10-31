import { GameMap } from "./game_map/base.js";
import { Player } from "./player/base.js";
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
                color: 'blue',
            }),

            new Player(this,{
                id: 1,
                x: window.innerWidth-120-200,
                y:0,
                width: 120,
                height: 200,
                color:"red",
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