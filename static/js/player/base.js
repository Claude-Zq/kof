import { GameObject } from "../game_object/base.js";
import { GRAVITY } from "../base.js";
import {GROUND_HEIGHT} from "../base.js";

export class Player extends GameObject{
    constructor(root,info) {
        super();
        
        this.root = root;
        this.id = info.id;
        this.x = info.x;
        this.y = info.y;

        this.width = 140;
        this.height = 220;
        this.vx = 0;
        this.vy = 0;


        this.direction = 1;
        this.status = "jump"; 

        this.ctx = this.root.gameMap.ctx;
        this.pressedKeys = this.root.controller.pressedKeys;
        this.frameCurrentCount = 0;


        /*
        存放动画
        键(字符串): 状态名
        值：动画
        */
        this.animations = new Map();

        this.animationRate = 5; //动画的播放速度
        this.animationScale = 2; //动画缩放倍数
        this.offset_x = 0;
        this.offset_y = 0; //动画偏移量

        this.hp = 100;
        this.$hp = this.root.$kof.find(`.kof-head-hp-${this.id}>div`);
        this.$hpDiv = this.$hp.find('div');
        this.damage = 20, //攻击力
        this.defense = 0; //防御力

        //攻击范围
        this.attackArea = {
            x1 : 90,
            y1 : 65,
            x2 : 210,
            y2 : 100,
        }

        //攻击次数
        this.attackCount = 0;
    }

    start(){

    }


    isCollision(r1,r2){
        if(Math.max(r1.x1,r2.x1) > Math.min(r1.x2,r2.x2)) return false;
        if(Math.max(r1.y1,r2.y1) > Math.min(r1.y2,r2.y2)) return false;
        return true;
    }

    isAnimationOver(){
        return this.frameCurrentCount > this.animationRate*this.animations.get(this.status).frameCnt;
    }

    //检测对方是否在攻击区域内
    isSuccessfuleAttack(){
         let you = this.root.players[1-this.id];
         let youR = {
             x1 : you.x,
             y1:you.y,
             x2:you.x+you.width,
             y2:you.y + you.height,
         }
 
         let myAttack;
         if(this.direction === 1){
            myAttack = {
                x1:this.x+this.attackArea.x1,
                y1:this.y + this.attackArea.y1,
                x2:this.x + this.attackArea.x2,
                y2:this.y + this.attackArea.y2,
            }
         }else{
           myAttack = {
            x1:this.x + this.width-this.attackArea.x2,
            y1 : this.y+this.attackArea.y1,
            x2:this.x + this.width-this.attackArea.x1,
            y2:this.y + this.attackArea.y2,
           } 
         }
         return this.isCollision(myAttack,youR);
    }

    updateStatus(){
    } 

    updateMove(){
        this.vy += GRAVITY*this.timedelta/1000;

        let you = this.root.players[1-this.id];
        if(this.isCollision({
            x1:this.x,
            y1:this.y,
            x2:this.x+this.width,
            y2:this.y+this.height,

        },{
            x1:you.x,
            y1:you.y,
            x2:you.x+you.width,
            y2:you.y+you.height,
        }) && (you.x-this.x)*this.vx>0){ 

            this.x += this.vx*this.timedelta/1000/2;
            you.x += this.vx * this.timedelta/1000/2;
        }else{
            this.x +=this.vx* this.timedelta/1000;
        }
        this.y += this.vy * this.timedelta/1000;
        //防止越出下边界
        if(this.y > this.ctx.canvas.height-this.height-GROUND_HEIGHT){
            this.y = this.ctx.canvas.height-this.height-GROUND_HEIGHT;
            this.vy = 0;
        }
        //防止左右越界
        if (this.x < 0) {
            this.x = 0;
        } else if (this.x + this.width > this.ctx.canvas.width) {
            this.x = this.ctx.canvas.width -this.width;
        }
    }

    updateDirection(){
        if(this.status === "die") return;
        let me = this.root.players[this.id],you = this.root.players[1-this.id];
        if(me.x < you.x)me.direction = 1;
        else me.direction = -1;
    }

    update(){
        console.log(this.root.gameStatus);
        if(this.pressedKeys.has("escape")){
            this.root.endGame();
        }
        if(this.root.gameStatus != "started"){
            return;
        }
        this.updateStatus();
        this.updateMove();
        this.updateDirection();
        this.render();
    }

    render(){
        // this.ctx.fillStyle = "green";
        // this.ctx.fillRect(this.x,this.y,this.width,this.height);

        // this.ctx.fillStyle = "red";
        // if(this.direction===1){
        //     this.ctx.fillRect(this.x+this.attackArea.x1,this.y+this.attackArea.y1,
        //         this.attackArea.x2-this.attackArea.x1,
        //         this.attackArea.y2 - this.attackArea.y1,
        //     )
        // }else {
        //     this.ctx.fillRect(this.x +this.width- this.attackArea.x2,this.y+this.attackArea.y1,
        //         this.attackArea.x2-this.attackArea.x1,
        //         this.attackArea.y2 - this.attackArea.y1)
        // }
        
        let obj =this.animations.get(this.status);
        if(obj && obj.loaded){
            let k = parseInt(this.frameCurrentCount/this.animationRate) %obj.frameCnt;
            let image = obj.gif.frames[k].image;

            if(this.direction === 1){
                this.ctx.drawImage(image,this.x+this.offset_x,this.y+this.offset_y,image.width*this.animationScale,image.height*this.animationScale);
            }else{
                this.ctx.save();
                this.ctx.scale(-1,1);
                this.ctx.translate(-this.ctx.canvas.width,0);
                this.ctx.drawImage(image,this.ctx.canvas.width - this.x-this.width+this.offset_x,this.y + this.offset_y,image.width*this.animationScale,image.height*this.animationScale);
                this.ctx.restore();
            }
            
        }
        this.frameCurrentCount++;
    }
}