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
        this.allStates = ["idle","forward","backward","jump","squat","normalAttack","attacked","die","squatDefense","overLordFist","win"]
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
        this.defense = 0;
        this.attackArea = {
            x1 : 0,
            y1 : 0,
            x2 : 0,
            y2 : 0,
        }

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
        this.defense = 0;

        //动画相关
        this.offset_x = 0;
        this.offset_y =  10;
        this.animationRate = 6;
    }

    backward(){
        this.status = "backward";
        this.width = 120;
        this.height = 220;
        this.defense = 0;

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
        this.defense = 0;
        
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
        this.width = 120;
        this.height = 150;
        this.defense = 0;
        
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
        this.attackArea = {
            x1 : 90,
            y1 : 65,
            x2 : 210,
            y2 : 100,
        }
        this.defense = 0;

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
        this.x -= this.direction * parseInt(this.width/2);

        this.hp -= Math.max(this.root.players[1-this.id].damage-this.defense,0);
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

        this.root.players[1-this.id].win();

          //动画相关
          this.frameCurrentCount = 20;
          this.offset_x = 0;
          this.offset_y =  -240;
          this.animationRate = 5;

    }

    squatDefense(){
        this.status = "squatDefense";
        this.defense = 10;
        this.width = 120;
        this.height = 150;
       
    
        this.vx = 0;
        this.vy = 0;

        //动画相关
        this.offset_x = 0;
        this.offset_y = 0;
        this.frameCurrentCount = 0;
        this.animationRate = 16;  
    }

    overLordFist(){
        this.status ="overLordFist";
        this.attackCount  = 1;
        this.damage = 100;
        this.defense = 0;
        this.attackArea = {
            x1 : 100, 
            y1 : -10,
            x2 : 560,
            y2 : 220,
        }

        this.width = 140;
        this.height = 220;

        this.vx = 0 ;
        this.vy = 0;

        //动画相关
        this.frameCurrentCount = 0;
        this.offset_x = 0;
        this.offset_y =  -85; 
        this.animationRate = 6;
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
        this.offset_x = 0;
        this.offset_y =  -20;
        this.animationRate = 15;
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
            w = this.pressedKeys.has("ArrowUp");
            a = this.pressedKeys.has("ArrowLeft");
            s = this.pressedKeys.has('ArrowDown');
            f = this.pressedKeys.has('Shift');
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
            if(f){
                this.overLordFist();
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
            }else if(s){
                this.squatDefense();
            }else if(space){
                this.normalAttack();
            }
        }else if(this.status === "squatDefense"){
            if(!s){
                this.squat();
            }

        }else if(this.status === "normalAttack"){
            if(this.isAnimationOver()){
                this.idle();
            }else{
                if(this.attackCount > 0 && this.isSuccessfuleAttack() && this.frameCurrentCount >= 25 && this.frameCurrentCount <= 50){
                    let you = this.root.players[1-this.id];
                    this.attackCount = 0;
                    if(you.defense< this.damage){
                        you.attacked();
                    }
                    
                }
            }
        }else if(this.status === "overLordFist"){
            if(this.isAnimationOver()){
                this.idle();
            }else{ 
                if(this.attackCount > 0 && this.isSuccessfuleAttack() && this.frameCurrentCount >= 110 && this.frameCurrentCount <= 160){
                    let you = this.root.players[1-this.id];
                    this.attackCount = 0;
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
            } 
        }
    }
}



