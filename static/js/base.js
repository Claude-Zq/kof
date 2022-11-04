import { GameMap } from "./game_map/base.js";
import { Controller } from "./controller/controller.js";
import { Ryo } from "./player/ryo/ryo.js";
import { Yuri } from "./player/yuri/yuri.js";
export const GRAVITY = 5000;  //地面高度
export const GROUND_HEIGHT = 50;
export const STATUS_CNT = 8; // 0:idle 1:向前 2:向后 3:跳跃 4:攻击 5:被打: 6:死亡 7:大招
export class KOF{
    constructor(id){
        this.$kof = $('#'+id);
        this.gameMap = new GameMap(this);
        this.controller = new Controller(this.gameMap.$canvas);
        this.players = [
            new Ryo(this,{
                id:0,
                x:200,
                y:0,
                width: 120,
                height: 200,
                speedx:400,
                speedy:-1000,
            }),

            new Yuri(this,{
                id: 1,
                x: window.innerWidth-120-200,
                y:0,
                width: 120,
                height: 200,
                speedx:400,
                speedy:-1000, 
            })
        ]
    }

}