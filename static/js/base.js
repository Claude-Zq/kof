import { GameMap } from "./game_map/base.js";
export class KOF{
    constructor(id){
        this.$kof = $('#'+id);
        this.gameMap = new GameMap(this);
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