import { Player } from "../base.js";
import { GIF } from "../../utils/gif.js";
import { GROUND_HEIGHT } from "../../base.js";

export class Ryo extends Player{
    constructor(root,info){
        super(root,info);
        
         //存放角色的所有状态 gif的文件名必须与状态名相同
        this.allStates = [];
        this.initSkills();
        this.initAnimations();
    }

    initSkills(){
        this.allStates = ["idle","forward","backward","jump","squat","normalAttack","attacked","die"]
    }

    initAnimations(){
        let outer = this;
        for(let i = 0;i < this.allStates.length;i++){
            let gif = GIF();
            gif.load(`/static/images/player/ryo/${this.allStates[i]}.gif`)
            this.animations.set(this.allStates[i],{
                gif:gif,
                frameCnt:0, //总图片数
                loaded:false, //是否加载完成
            });

            gif.onload = function(){
                let obj = outer.animations.get(outer.allStates[i]);
                obj.frameCnt = gif.frames.length;
                obj.loaded = true;
            }
        }
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
        this.attackCount = 1;

        this.width = 140;
        this.height = 220;

        this.vx = 0 ;
        this.vy = 0;

        //动画相关
        this.frameCurrentCount = 0;
        this.offset_x = 0;
        this.offset_y =  5;
        this.animationRate = 6;

    }

    attacked(){
        if(this.hp <= 0) return;
        this.status = "attacked";

        this.hp -= this.root.players[1-this.id].damage;
        this.$hpDiv.animate({
            width: this.$hp.parent().width() * this.hp / 100
        }, 300)
        this.$hp.animate({
            width: this.$hp.parent().width() * this.hp / 100
        }, 600)
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
        this.status = "die";

        this.width = 240;
        this.height = 50;
        this.vx = 0;
        this.vy = 0;
        this.attackArea = {
            x1:0,
            x2:0,
            y1:0,
            y2:0,
        }

          //动画相关
          this.frameCurrentCount = 20;
          this.offset_x = 0;
          this.offset_y =  -240;
          this.animationRate = 5;

    }


    updateStatus(){
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
                this.jump();
            }else if(d){
                if(this.direction === 1) this.forward();
                else this.backward();
            }else if(a){
                if(this.direction === 1) this.backward();
                else this.forward();
            }else if(space){
                this.normalAttack();
            }
        }else if(this.status === "normalAttack"){
            if(this.frameCurrentCount >= this.animationRate*this.animations.get(this.status).frameCnt){
                this.idle();
            }else{
                if(this.attackCount > 0 && this.isSuccessfuleAttack() && this.frameCurrentCount >= 25 && this.frameCurrentCount <= 50){
                    this.attackCount =0;
                    this.root.players[1-this.id].attacked();
                }
            }
        }else if(this.status === "attacked"){
           if(this.frameCurrentCount >= this.animationRate*this.animations.get(this.status).frameCnt){
                this.x -= this.direction * parseInt(this.width/2);
                if(this.hp <= 0){
                    this.die();
                }else{
                    this.idle();
                }
                
           }
        }else if(this.status === "die"){
           if(this.frameCurrentCount === 70){
                this.frameCurrentCount--;
           }
        }
    }
}



