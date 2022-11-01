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

        this.width = 100;
        this.height = 200;
        this.vx = 0;
        this.vy = 0;


        this.direction = 1;
        this.status = "jump"; 

        this.ctx = this.root.gameMap.ctx;
        this.pressedKeys = this.root.controller.pressedKeys;


        // /*
        //    状态转移的映射
        //    键（字符串）： 当前状态+按住的键（按ASCII码排序）
        //    值 (函数)：新状态对应的函数
        // */
        // this.convertMap = new Map(); 

        // initBasicSkill();
        
    }

    start(){

    }

    idle(){
        this.status = "idle";
        this.vx = 0;
        this.vy = 0;
    }

    forward(){
        this.status = "forward";
        this.vx = 400;

    }

    backward(){
        this.status = "backward";
        this.vx = -400;
    }

    jump(){
        this.height = 200;
        this.status = "jump";
        this.vy = -2000;

    }
    squat(){
        this.status = "squat";
        this.height = 50;
    }

    normalAttack(){
        this.status = "normalAttack";
    }

    attacked(){
        this.status = "attack";
    }

    die(){
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
                this.forward();
            }else if(a){
                this.backward();
            }else if(space){
                this.normalAttack();
            }else if(s){
                this.squat();
            }
            
        }else if(this.status ==="forward"){
            if(w){
                this.jump();
            }else if(d){
                this.forward();
            }else if(a){
                this.backward();
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
                this.forward();
            }else if(a){
                this.backward();
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
        if(this.id == 0) console.log(this.status);
        this.updateStatus();
        this.updateMove();
        this.render();
    }

    render(){
        this.ctx.fillStyle = "green";
        this.ctx.fillRect(this.x,this.y,this.width,this.height);
    }
}