import { GameMap } from "./game_map/base.js";
import { Controller } from "./controller/controller.js";
import { Karakuri} from './player/karakuri/karakuri.js';
import {Tsunade} from './player/tsunade/tsunade.js';
import { Ryo } from "./player/ryo/ryo.js";
import {ZhuGeliang} from './player/zhuGeliang/zhuGeliang.js';
import { RedRobot} from "./player/redRobot/redRobot.js";
import { Menu } from "./menu/base.js";
import { Yuri } from "./player/yuri/yuri.js";
export const GRAVITY = 5000;  //地面高度
export const GROUND_HEIGHT = 50;
export const STATUS_CNT = 8; // 0:idle 1:向前 2:向后 3:跳跃 4:攻击 5:被打: 6:死亡 7:大招
export class KOF{
    constructor(id){
        this.$kof = $('#'+id);
        this.bgId = 5; //背景图片Id
        this.player0Id = 1; //玩家0的角色Id
        this.player1Id = 0; //晚间1的角色Id
        this.gameResult = "平局"; //游戏结果
        this.id = id;
        this.menu = new Menu(this);
    }

    startGame(){
        this.gameMap = new GameMap(this);
        this.controller = new Controller(this.gameMap.$canvas);

        let player0,player1;
        switch(this.player0Id){
            case 0: player0 = new Karakuri(this,{id:0,x:200,y:0});break;
            case 1: player0 = new Tsunade(this,{id:0,x:200,y:0});break;
            case 2: player0 = new Ryo(this,{id:0,x:200,y:0});break;
            case 3: player0 = new ZhuGeliang(this,{id:0,x:200,y:0});break;
            case 4: player0 = new RedRobot(this,{id:0,x:200,y:0});break;
            case 5: player0 = new Yuri(this,{id:0,x:200,y:0});break;
        }
       switch(this.player1Id){
            case 0: player1 = new Karakuri(this,{id:1,x:1280-120-200,y:0});break;
            case 1: player1 = new Tsunade(this,{id:1,x:1280-120-200,y:0});break;
            case 2: player1 = new Ryo(this,{id:1,x:1280-120-200,y:0});break;
            case 3: player1 = new ZhuGeliang(this,{id:1,x:1280-120-200,y:0});break;
            case 4: player1 = new RedRobot(this,{id:1,x:1280-120-200,y:0});break;
            case 5: player1 = new Yuri(this,{id:1,x:1280-120-200,y:0});break;
       }
        this.players = [player0,player1];
    }

    endGame(){
        if(this.players[0].hp > this.players[1].hp){
            this.gameResult = "左边获胜";
        }else if(this.players[0].hp === this.players[1].hp){
            this.gameResult = "平局";
        }else{
            this.gameResult = "右边获胜";
        }
        this.menu.endGame();
    }

}