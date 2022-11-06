import { Player } from "../base.js";
import { GIF } from "../../utils/gif.js";
import { GROUND_HEIGHT } from "../../base.js";

export class Yuri extends Player{
    constructor(root,info){
        super(root,info);
        
         //存放角色的所有状态 gif的文件名必须与状态名相同
        this.allStates = [];
        this.initSkills();
        this.initAnimations();
    }

    initSkills(){
        this.allStates = ["idle","forward","backward","jump","jumpAttack","squat","normalAttack","attacked","die","squatDefense","win","standDefense"]
    }

    initAnimations(){
        let outer = this;
        for(let i = 0;i < this.allStates.length;i++){
            let gif = GIF();
            gif.load(`/static/images/player/yuri/${this.allStates[i]}.gif`)
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
        console.log('load success');
    }


    idle(){

        this.status = "idle";
        this.width = 120;
        this.height = 200; 

        this.vx = 0;
        this.vy = 0;
        this.defense = 0;
        this.attackArea = {
            x1 : 0,
            y1 : 0,
            x2 : 0,
            y2 : 0,
        }

        //动画相关
        this.offset_x = 0;
        this.offset_y =  -10;
        this.animationRate = 6;

        
    }

    forward(){

        this.status = "forward";
        this.width = 120;
        this.height = 200;

        this.vx = this.direction*400;
        this.vy = 0;
        this.defense = 0;

        //动画相关
        this.offset_x = 0;
        this.offset_y = 10;
        this.animationRate = 6;
    }

    backward(){
        this.status = "backward";
        this.width = 120;
        this.height = 200; 
        this.defense = 0;

        this.vx = -this.direction*400;
        this.vy = 0;

        //动画相关
        this.offset_x = 0;
        this.offset_y =  -10;
        this.animationRate = 6; 
    }

    jump(){
        this.status = "jump";
        this.width = 140;
        this.height = 220;
        this.defense = 0;
        
        this.y -= 200;
        this.vy = -2000;

        //动画相关
        this.offset_x = 0;
        this.offset_y = 0;
        this.frameCurrentCount = 0;
        this.animationRate = 8;  
    }

    jumpAttack(){
        this.status = "jumpAttack";
        this.attackCount = 1;
        this.attackArea = {
            x1 : 70,
            y1 : 0,
            x2 : 120,
            y2 : 40,
        }
        this.width = 90;
        this.height = 140;
        this.defense = 10;
        
        this.vy = -2100;

        //动画相关
        this.offset_x = -50;
        this.offset_y = -100;
        this.frameCurrentCount = 0;
        this.animationRate = 3.5;   
    }
    squat(){
        this.status = "squat";
        this.width = 110;
        this.height = 120;
        this.defense = 0;
        
        this.vx = 0;
        this.vy = 0;

        //动画相关
        this.offset_x = 0;
        this.offset_y = -70;
        this.frameCurrentCount = 0;
        this.animationRate = 16;  
    }

    normalAttack(){
        this.status = "normalAttack";
        this.attackCount = 4;
        this.attackArea = {
            x1 : 120,
            y1 : 40,
            x2 : 230,
            y2 : 90,
        }
        this.damage = 5;
        this.defense = 10;
        this.width = 120;
        this.height = 200; 

        this.vx = 0 ;
        this.vy = 0;

        //动画相关
        this.frameCurrentCount = 0;
        this.offset_x = -30;
        this.offset_y = -20;
        this.animationRate = 6;

    }

    attacked(){
        if(this.hp <= 0) return;
        this.status = "attacked";

        this.hp -= Math.max(this.root.players[1-this.id].damage-this.defense,0);
        this.$hpDiv.animate({
            width: this.$hp.parent().width() * this.hp / 100
        }, 300)
        this.$hp.animate({
            width: this.$hp.parent().width() * this.hp / 100
        }, 600)
        this.defense =0;
        this.attackArea = {
            x1 : 0,
            y1 : 0,
            x2 : 0,
            y2 : 0,
        }
        this.width = 140;
        this.height = 220;
        this.vx = 0;
        this.vy = 0;

         //动画相关
         this.frameCurrentCount = 0;
         this.offset_x = -50;
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
        this.root.players[1-this.id].win();
          //动画相关
          this.frameCurrentCount = 10;
          this.offset_x = 0;
          this.offset_y =  -250;
          this.animationRate = 5;
    }

    standDefense(){
        this.status = "standDefense";
        this.defense = 20;
        this.width = 110;
        this.height = 200; 
       
    
        this.vx = 0;
        this.vy = 0;

        //动画相关
        this.offset_x = 0;
        this.offset_y = 0;
        this.frameCurrentCount = 0;
        this.animationRate = 8;   
    }

    squatDefense(){
        this.status = "squatDefense";
        this.defense = 20;
        this.width = 120;
        this.height = 120;
       
    
        this.vx = 0;
        this.vy = 0;

        //动画相关
        this.offset_x = 0;
        this.offset_y = 0;
        this.frameCurrentCount = 0;
        this.animationRate = 16;  
    }

    

    win(){
        this.status = "win";
        this.width = 140;
        this.height = 220;

        this.vx = 0;
        this.vy = 0;
        this.defense = 0;
        this.attackArea = {
            x1 : 0,
            y1 : 0,
            x2 : 0,
            y2 : 0,
        }

        //动画相关
        this.frameCurrentCount = 0;
        this.offset_x = -10;
        this.offset_y =  -50;
        this.animationRate = 5;
    }

   

    updateStatus(){
        let w,a,d,s,space,f;
        if(this.id === 0){
            w = this.pressedKeys.has('w');
            a = this.pressedKeys.has('a');
            d = this.pressedKeys.has('d');
            s = this.pressedKeys.has('s');
            f = this.pressedKeys.has('f');
            space = this.pressedKeys.has(' ');
        }else{
            w = this.pressedKeys.has("arrowup");
            a = this.pressedKeys.has("arrowleft");
            s = this.pressedKeys.has('arrowdown');
            f = this.pressedKeys.has('shift');
            d = this.pressedKeys.has('arrowright');
            space = this.pressedKeys.has('enter');
        }

        if(this.status === "idle"){

           if(f){
                this.standDefense();
            }
            else if(w){
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
            
        }else if(this.status === "jumpAttack"){
            if(this.isAnimationOver()){
                this.idle();
            }else{
                if(this.attackCount > 0 && this.isSuccessfuleAttack() && this.frameCurrentCount >= 25 && this.frameCurrentCount <= 100){
                    let you = this.root.players[1-this.id];
                    this.attackCount = 0;
                    if(you.defense< this.damage){
                        you.attacked();
                    }
                    
                }
            }
        }else if(this.status === "squat"){
            if(w){
                this.idle();
            }else if(d){
                if(this.direction === 1) this.forward();
                else this.backward();
            }else if(a){
                if(this.direction === 1) this.backward();
                else this.forward();
            }else if(s){
                this.squatDefense();
            }else if(space){
                this.normalAttack();
            }
            else if(this.frameCurrentCount === 30){
                this.frameCurrentCount--;
           }
        }else if(this.status === "squatDefense"){
            if(!s){
                this.squat();
            }
        }else if (this.status === "standDefense"){
            if(!f){
                this.idle();
            }
        }else if(this.status === "normalAttack"){
            if(this.isAnimationOver()){
                this.idle();
            }else if(w && space){
                this.jumpAttack();
            }else{
                if(this.attackCount > 0 && this.isSuccessfuleAttack() && (this.frameCurrentCount === 10|| this.frameCurrentCount ===40 || this.frameCurrentCount === 100 || this.frameCurrentCount === 140)){
                    let you = this.root.players[1-this.id];
                    this.attackCount--;
                    if(you.defense< this.damage){
                        you.attacked();
                    }
                    
                }
            }
        }else if(this.status === "attacked"){
           if(this.isAnimationOver()){
                
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
        }else if(this.status === "win"){ 
            if(this.isAnimationOver()){
                this.idle();
                this.root.endGame();
            }  
        }
    }
}
