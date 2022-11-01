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
        this.offset_y = 0; //动画偏移量


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
        this.frameCurrentCount = 0;
        this.animationRate = 6;  
    }
    squat(){
        this.status = "squat";
        this.width = 140;
        this.height = 150;
        
        this.vx = 0;
        this.vy = 0;

        //动画相关
        this.frameCurrentCount = 0;
        this.offset_y = -50;
        this.animationRate = 8;  
    }

    normalAttack(){
        this.status = "normalAttack";

        this.width = 140;
        this.height = 220;

        this.vx = 0 ;
        this.vy = 0;

        //动画相关
        this.frameCurrentCount = 0;
        this.offset_y =  5;
        this.animationRate = 6; 
        
    }

    attacked(){
        this.animationRate = 5;
        this.status = "attacked";
    }

    die(){
        this.animationRate = 5;
        this.status = "die";
        this.width = 10;
        this.height = 10;

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
            if(w){
                this.jump();
            }else if(d){
                if(this.direction === 1) this.forward();
                else this.backward();
            }else if(a){
                if(this.direction === 1) this.backward();
                else this.forward();
            }else if(s){
                this.squat();
            }else if(this.frameCurrentCount >= this.animationRate*this.animations.get(this.status).frameCnt){
                this.idle();
            } 

        }else if(this.status === "attacked"){

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

    update(){
        // if(this.id == 0) console.log(this.status);
        this.updateStatus();
        this.updateMove();
        this.render();
    }

    render(){
        this.ctx.fillStyle = "green";
        this.ctx.fillRect(this.x,this.y,this.width,this.height);

        let obj =this.animations.get(this.status);
        if(obj && obj.loaded){
            let k = parseInt(this.frameCurrentCount/this.animationRate) %obj.frameCnt;
            let image = obj.gif.frames[k].image;
            this.ctx.drawImage(image,this.x,this.y+this.offset_y,image.width*this.animationScale,image.height*this.animationScale);
        }
        this.frameCurrentCount++;
    }
}