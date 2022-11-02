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


        //攻击范围
        this.attackArea = {
            x1 : 90,
            y1 : 65,
            x2 : 210,
            y2 : 100,
        }


        //存放角色的所有状态 gif的文件名必须与状态名相同
        this.allStates = [];


        // /*
        //    状态转移的映射
        //    键（字符串）： 当前状态+按住的键（按ASCII码排序）
        //    值 (函数)：新状态对应的函数
        // */
        // this.convertMap = new Map(); 

        this.initBasicSkills();
        
    }

    start(){

    }

    initBasicSkills(){
        this.allStates = ["idle","forward","backward","jump","squat","normalAttack","attacked","die"]
    }

    idle(){

        this.status = "idle";
        this.width = 140;
        this.height = 220;

        this.vx = 0;
        this.vy = 0;

        //动画相关
        this.offset_x = 0;
        this.offset_y =  0;
        this.animationRate = 6;

        
    }

    forward(){

        this.status = "forward";
        this.width = 120;
        this.height = 220;

        this.vx = this.direction*400;
        this.vy = 0;

        //动画相关
        this.offset_x = 0;
        this.offset_y =  10;
        this.animationRate = 6;
    }

    backward(){
        this.status = "backward";
        this.width = 120;
        this.height = 220;

        this.vx = -this.direction*400;
        this.vy = 0;

        //动画相关
        this.offset_x = 0;
        this.offset_y =  10;
        this.animationRate = 6; 
    }

    jump(){
        this.status = "jump";
        this.width = 140;
        this.height = 220;
        
        this.y -= 200;
        this.vy = -2000;

        //动画相关
        this.offset_x = 0;
        this.offset_y = 0;
        this.frameCurrentCount = 0;
        this.animationRate = 8;  
    }
    squat(){
        this.status = "squat";
        this.width = 140;
        this.height = 150;
        
        this.vx = 0;
        this.vy = 0;

        //动画相关
        this.offset_x = 0;
        this.offset_y = -50;
        this.frameCurrentCount = 0;
        this.animationRate = 16;  
    }

    normalAttack(){
        this.status = "normalAttack";

        this.width = 140;
        this.height = 220;

        this.vx = 0 ;
        this.vy = 0;

        //动画相关
        this.frameCurrentCount = 0;
        this.offset_x = 0;
        this.offset_y =  5;
        this.animationRate = 6;

        if(this.isSuccessfuleAttack()){
            this.root.players[1-this.id].attacked();
        }
    }

    attacked(){
        this.status = "attacked";

        this.width = 140;
        this.height = 220;
        this.vx = 0;
        this.vy = 0;

         //动画相关
         this.frameCurrentCount = 0;
         this.offset_x = -100;
         this.offset_y =  5;
         this.animationRate = 7;
    }

    die(){
        this.animationRate = 5;
        this.status = "die";
        this.width = 10;
        this.height = 10;

    }

    isCollision(r1,r2){
        if(Math.max(r1.x1,r2.x1) > Math.min(r1.x2,r2.x2)) return false;
        if(Math.max(r1.y1,r2.y1) > Math.min(r1.y2,r2.y2)) return false;
        return true;
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
        if(this.staus === "die"){
            return;
        }
        let w,a,d,s,space;
        if(this.id === 0){
            w = this.pressedKeys.has('w');
            a = this.pressedKeys.has('a');
            d = this.pressedKeys.has('d');
            s = this.pressedKeys.has('s');
            space = this.pressedKeys.has(' ');
        }else{
            w = this.pressedKeys.has("ArrowUp");
            a = this.pressedKeys.has("ArrowLeft");
            s = this.pressedKeys.has('ArrowDown');
            d = this.pressedKeys.has('ArrowRight');
            space = this.pressedKeys.has('Enter');
        }

        if(this.status === "idle"){
            if(w){
                this.jump();
            }else if(d){
                if(this.direction === 1) this.forward();
                else this.backward();
            }else if(a){
                if(this.direction === 1) this.backward();
                else this.forward();
            }else if(space){
                this.normalAttack();
            }else if(s){
                this.squat();
            }
            
        }else if(this.status ==="forward"){
            if(w){
                this.jump();
            }else if(d){
                if(this.direction === 1) this.forward();
                else this.backward();
            }else if(a){
                if(this.direction === 1) this.backward();
                else this.forward();
            }else if(space){
                this.normalAttack();
            }else if(s){
                this.squat();
            }else{
                this.idle();
            }
        
        }else if(this.status === "backward"){
            if(w){
                this.jump();
            }else if(d){
                if(this.direction === 1) this.forward();
                else this.backward();
            }else if(a){
                if(this.direction === 1) this.backward();
                else this.forward();
            }else if(space){
                this.normalAttack();
            }else if(s){
                this.squat();
            }else{
                this.idle();
            }

        }else if(this.status === "jump"){
            if(this.y === this.ctx.canvas.height-this.height-GROUND_HEIGHT){
                this.idle();
            }
            
        }else if(this.status === "squat"){
           if(w){
            this.idle();
           }

        }else if(this.status === "normalAttack"){
            if(this.frameCurrentCount < this.animationRate*this.animations.get(this.status).frameCnt){
                return;
            }
            this.idle();
        }else if(this.status === "attacked"){
           if(this.frameCurrentCount >= this.animationRate*this.animations.get(this.status).frameCnt){
                this.idle();
           }
        }
    }

    updateMove(){
        this.vy += GRAVITY*this.timedelta/1000;
        this.x +=this.vx* this.timedelta/1000;
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
        let me = this.root.players[this.id],you = this.root.players[1-this.id];
        if(me.x < you.x){
            me.direction = 1;
            you.direction = -1;
        }else{
            me.direction = -1;
            you.direction= 1;
        }
    }

    update(){
        // if(this.id == 0) console.log(this.status);
        this.updateStatus();
        this.updateMove();
        this.updateDirection();
        this.render();
    }

    render(){
        this.ctx.fillStyle = "green";
        this.ctx.fillRect(this.x,this.y,this.width,this.height);

        this.ctx.fillStyle = "red";
        if(this.direction===1){
            this.ctx.fillRect(this.x+this.attackArea.x1,this.y+this.attackArea.y1,
                this.attackArea.x2-this.attackArea.x1,
                this.attackArea.y2 - this.attackArea.y1,
            )
        }else {
            this.ctx.fillRect(this.x +this.width- this.attackArea.x2,this.y+this.attackArea.y1,
                this.attackArea.x2-this.attackArea.x1,
                this.attackArea.y2 - this.attackArea.y1)
        }
        
        console.log(this.offset_x);
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