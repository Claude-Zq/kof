import { Player } from "../base.js";
import { GIF } from "../../utils/gif.js";
import { GROUND_HEIGHT } from "../../base.js";

export class RedRobot extends Player{
    constructor(root,info){
        super(root,info);
        
         //存放角色的所有状态 gif的文件名必须与状态名相同
        this.allStates = [];
        this.initSkills();
        this.initAnimations();
    }

    initSkills(){
        this.allStates = ["idle","forward","backward","jump","squat","normalAttack","die","attacked","squatAttack","win","standDefense"]
    }

    initAnimations(){
        let outer = this;
        for(let i = 0;i < this.allStates.length;i++){
            let gif = GIF();
            gif.load(`/static/images/player/redRobot/${this.allStates[i]}.gif`)
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
        this.width = 160;
        this.height = 190; 

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
        this.offset_x = -20;
        this.offset_y =  -10;
        this.animationRate = 5;
    }

    forward(){

        this.status = "forward";
        this.width = 150;
        this.height = 190; 
        this.vx = this.direction*400;
        this.vy = 0;
        this.defense = 0;

        //动画相关
        this.offset_x = -30;
        this.offset_y =  -10;
        this.animationRate = 5;
    }

    backward(){
        this.status = "backward";
        this.width = 150;
        this.height = 190; 
        this.defense = 0;

        this.vx = -this.direction*400;
        this.vy = 0;

        //动画相关
        this.offset_x = -30;
        this.offset_y =  -10;
        this.animationRate = 6; 
    }

    jump(){
        this.status = "jump";
        this.width = 150;
        this.height = 190; 
        this.defense = 0;
        
        this.y -= 200;
        this.vy = -2000;

        //动画相关
        this.offset_x = 0;
        this.offset_y = 0;
        this.frameCurrentCount = 10;
        this.animationRate = 5;  
    }

    squat(){
        this.status = "squat";
        this.width = 150;
        this.height = 140; 
        this.defense = 0;
        
        this.vx = 0;
        this.vy = 0;

        //动画相关
        this.offset_x = -30;
        this.offset_y = -60;
        this.frameCurrentCount = 38;
        this.animationRate = 16;  
    }

    squatAttack(){
        this.status = "squatAttack";
        this.width = 150;
        this.height = 140; 

        this.damage = 20;
        this.defense = 10;
        this.attackCount = 1;
        
        this.attackArea = {
            x1 : 140,
            y1 : 70,
            x2 : 260,
            y2 : 140,
        }
        this.vx = 0;
        this.vy = 0;

        //动画相关
        this.offset_x = -85;
        this.offset_y = -35;
        this.frameCurrentCount = 0;
        this.animationRate = 6;   
    }

    normalAttack(){
        this.status = "normalAttack";
        this.attackCount = 1;
        this.attackArea = {
            x1 : 120,
            y1 : 55,
            x2 : 260,
            y2 : 90,
        }
        this.damage = 20;
        this.defense = 10;
        this.width = 160;
        this.height = 190; 

        this.vx = 0 ;
        this.vy = 0;

        //动画相关
        this.frameCurrentCount = 0;
        this.offset_x = -30;
        this.offset_y = -10;
        this.animationRate = 5;

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
        this.width = 160;
        this.height = 190; 
        this.vx = 0;
        this.vy = 0;

         //动画相关
         this.frameCurrentCount = 0;
         this.offset_x = -50;
         this.offset_y =  -10;
         this.animationRate = 4;
    }
    standDefense(){
        this.status = "standDefense";
        this.defense = 20;
        this.width = 160;
        this.height = 190; 
       
        this.vx = 0;
        this.vy = 0;
        //动画相关
        this.offset_x = -50;
        this.offset_y = -20;
        this.frameCurrentCount = 0;
        this.animationRate = 4;   
    }

    die(){
        this.status = "die";
        this.width = 200;
        this.height = 100;
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
          this.frameCurrentCount = 0;
          this.offset_x = -40;
          this.offset_y =  -250;
          this.animationRate = 5;
    }
    

    win(){
        this.status = "win";
        this.width = 160;
        this.height = 190; 

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
        this.frameCurrentCount =0;
        this.offset_x = -40;
        this.offset_y =  -35;
        this.animationRate = 9;

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
        }else if(this.status === "standDefense"){ 
            if(!f){
                this.idle();
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
            }else if(space){
                this.squatAttack();
            }else if(this.frameCurrentCount >= 55){
                this.frameCurrentCount = 35;
            }
            
        }else if(this.status === "squatAttack"){

            if(this.isAnimationOver()){
                this.squat();
            }else {
                if(this.attackCount > 0 && this.isSuccessfuleAttack() && this.frameCurrentCount >= 19 && this.frameCurrentCount <= 25){
                    let you = this.root.players[1-this.id];
                    this.attackCount--;
                    if(you.defense< this.damage){
                        you.attacked();
                    }
                    
                }
            }
        }else if(this.status === "normalAttack"){
            if(this.isAnimationOver()){
                this.idle();
            }else if(w && space){
                this.jumpAttack();
            }else{
                if(this.attackCount > 0 && this.isSuccessfuleAttack() && this.frameCurrentCount >= 15 && this.frameCurrentCount <= 25){
                    let you = this.root.players[1-this.id];
                    this.attackCount--;
                    if(you.defense< this.damage){
                        you.attacked();
                    }
                    
                }
            }
        }else if(this.status === "attacked"){
           if(this.frameCurrentCount === 60){
                if(this.hp <= 0){
                    this.die();
                }else{
                    this.idle();
                }
                
           }
        }else if(this.status === "die"){
           if(this.frameCurrentCount >= 160){
                this.frameCurrentCount --;
           }
        }else if(this.status === "win"){ 
            if(this.isAnimationOver()){
                this.idle();
            }
        }
    }

}
