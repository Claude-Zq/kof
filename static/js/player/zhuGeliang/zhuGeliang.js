import { Player } from "../base.js";
import { GIF } from "../../utils/gif.js";
import { GROUND_HEIGHT } from "../../base.js";

export class ZhuGeliang extends Player{
    constructor(root,info){
        super(root,info);

        this.animationScale = 2.5;
        this.status ="idle";
         //存放角色的所有状态 gif的文件名必须与状态名相同
        this.allStates = [];
        this.initSkills();
        this.initAnimations();
    }
    initSkills(){
        this.allStates = ["idle","forward","backward","jumpAttack","normalAttack","attacked","die","win","standDefense","fireAttack","thunderAttack","jumpAttack","swordUnity"]
    }
    initAnimations(){
        let outer = this;
        for(let i = 0;i < this.allStates.length;i++){
            let gif = GIF();
            gif.load(`/static/images/player/zhuGeliang/${this.allStates[i]}.gif`)
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
        this.width = 130;
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
        this.offset_x = -50;
        this.offset_y =  5;
        this.animationRate = 6;

        
    }

    forward(){

        this.status = "forward";
        this.width = 130;
        this.height = 200; 

        this.vx = this.direction*400;
        this.vy = 0;
        this.defense = 0;

        //动画相关
        this.offset_x = -50;
        this.offset_y = 10;
        this.animationRate = 6;
    }

    backward(){
        this.status = "backward";
        this.width = 130;
        this.height = 200; 
        this.defense = 0;

        this.vx = -this.direction*400;
        this.vy = 0;

        //动画相关
        this.offset_x = -50;
        this.offset_y =  -10;
        this.animationRate = 12; 
    }
    jumpAttack(){
        this.status = "jumpAttack";
        this.attackCount = 1;
        this.damage = 30;
        this.attackArea = {
            x1 : 120,
            y1 : -40 ,
            x2 : 420,
            y2 : 150,
        }
        this.width = 180;
        this.height = 200; 
        this.defense = 10;
        
        this.vy = -2100;

        //动画相关
        this.offset_x = -100;
        this.offset_y = -150;
        this.frameCurrentCount = 0;
        this.animationRate = 3.6 ;   
    } 

    normalAttack(){
        this.status = "normalAttack";
        this.attackCount = 1;
        this.attackArea = {
            x1 : 160,
            y1 : 60,
            x2 : 430,
            y2 : 80,
        }
        this.damage = 40;
        this.defense = 30;
        this.width = 180;
        this.height = 200; 

        this.vx = 0 ;
        this.vy = 0;

        //动画相关
        this.frameCurrentCount = 0;
        this.offset_x = -50;
        this.offset_y = 0;
        this.animationRate = 6;

    }

    fireAttack(){
        this.status = "fireAttack";
        this.attackCount = 1;
        this.attackArea = {
            x1 : 250,
            y1 : 0,
            x2 : 740,
            y2 : 80,
        }
        this.damage = 30;
        this.defense = 10;
        this.width = 180;
        this.height = 200; 

        this.vx = 0 ;
        this.vy = 0;

        //动画相关
        this.frameCurrentCount = 0;
        this.offset_x = -50;
        this.offset_y = -50;
        this.animationRate = 5; 
    }

    thunderAttack(){
        this.status = "thunderAttack";
        this.attackCount = 3;
        this.attackArea = {
            x1 :  100,
            y1 : -250,
            x2 : 360,
            y2 : 80,
        }
        this.damage = 10;
        this.defense = 100;
        this.width = 180;
        this.height = 200; 

        this.vx = 0 ;
        this.vy = 0;

        //动画相关
        this.frameCurrentCount = 0;
        this.offset_x = -350;
        this.offset_y = -250;
        this.animationRate = 4;  
    }

    swordUnity(){
        this.status = "swordUnity";
        this.attackCount = 1;
        this.attackArea = {
            x1 :  -200,
            y1 : -40,
            x2 : 400,
            y2 : 220,
        }
        this.damage = 10;
        this.defense = 80;
        this.width = 180;
        this.height = 200; 

        this.vx = 0 ;
        this.vy = 0;

        //动画相关
        this.frameCurrentCount = 0;
        this.offset_x = -210;
        this.offset_y = -50;
        this.animationRate = 3;  
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
        this.width = 130;
        this.height = 200;
        this.vx = 0;
        this.vy = 0;

         //动画相关
         this.frameCurrentCount = 0;
         this.offset_x = -50;
         this.offset_y =  -50;
         this.animationRate = 6;
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
        this.width = 180;
        this.height = 200; 
       
        this.vx = 0;
        this.vy = 0;

        //动画相关
        this.offset_x = -10;
        this.offset_y = 0;
        this.frameCurrentCount = 0;
        this.animationRate = 8;   
    }

   

    win(){
        this.status = "win";
        this.width = 130;
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
        this.frameCurrentCount = 0;
        this.offset_x = -70;
        this.offset_y =  -260;
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
                this.thunderAttack();
            }else if(d){
                if(this.direction === 1) this.forward();
                else this.backward();
            }else if(a){
                if(this.direction === 1) this.backward();
                else this.forward();
            }else if(s){
                this.swordUnity();
            }else if(space){
                this.normalAttack();
            }
        }else if(this.status ==="forward"){
           if(w){
               
            }else if(d){
                if(this.direction === 1) this.forward();
                else this.backward();
            }else if(a){
                if(this.direction === 1) this.backward();
                else this.forward();
            }else if(s){
                this.swordUnity();
            }else if(space){
                this.normalAttack();
            }else{
                this.idle();
            }
        
        }else if(this.status === "backward"){
            if(w){
               
            }else if(d){
                if(this.direction === 1) this.forward();
                else this.backward();
            }else if(a){
                if(this.direction === 1) this.backward();
                else this.forward();
            }else if(s){
                this.swordUnity();
            }else if(space){
                this.normalAttack();
            }else{
                this.idle();
            }

        }else if(this.status === "jumpAttack"){
          
            if(this.isAnimationOver()){
                this.idle();
            }else{
                if(this.attackCount > 0 && this.isSuccessfuleAttack() && this.frameCurrentCount >= 10 && this.frameCurrentCount <= 30){
                    let you = this.root.players[1-this.id];
                    this.attackCount = 0;
                    if(you.defense< this.damage){
                        you.attacked();
                    }
                    
                }
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
            }else if(f &&space){
                this.fireAttack();
            }else{
                if(this.attackCount > 0 && this.isSuccessfuleAttack() && this.frameCurrentCount >= 7 && this.frameCurrentCount <= 24){
                    let you = this.root.players[1-this.id];
                    this.attackCount  = 0;
                    if(you.defense< this.damage){
                        you.attacked();
                    }
                    
                }
            }
        }else if(this.status === "fireAttack"){
            if(this.isAnimationOver()){
                this.idle();
            }else{
                if(this.attackCount > 0 && this.isSuccessfuleAttack() && this.frameCurrentCount >= 46 && this.frameCurrentCount <= 80){
                    let you = this.root.players[1-this.id];
                    this.attackCount  = 0;
                    if(you.defense< this.damage){
                        you.attacked();
                    }
                    
                }
            }
        }else if(this.status === "thunderAttack"){
           
            if(this.isAnimationOver()){
                this.idle();
            }else if(this.frameCurrentCount === 40){
                this.attackArea = {
                    x1 :  -270,
                    y1 : -250,
                    x2 : 0,
                    y2 : 80,
                }
            }else if(this.frameCurrentCount ===110){
                this.attackArea = {
                    x1 :  -20,
                    y1 : -250,
                    x2 : 200,
                    y2 : 80, 
                }
            }else if(this.frameCurrentCount ===130){
                this.attackArea = {
                    x1 :  110,
                    y1 : -250,
                    x2 : 350,
                    y2 : 80, 
                } 
            }
            if(this.attackCount > 0 && this.isSuccessfuleAttack()){
                let you = this.root.players[1-this.id];
                this.attackCount--;
                if(you.defense< this.damage){
                    you.attacked();
                }
            }
        }else if(this.status === "swordUnity"){
            if(this.isAnimationOver()){
                this.idle();
            }d
            if(this.isAnimationOver()){
                this.idle();
            }
            if(this.attackCount > 0 && this.isSuccessfuleAttack() && this.frameCurrentCount >= 5 && this.frameCurrentCount <= 24){
                let you = this.root.players[1-this.id];
                this.attackCount  = 0;
                if(you.defense< this.damage){
                    you.attacked();
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
          
        }else if(this.status === "win"){ 
            if(this.isAnimationOver()){
                this.idle();
            } 
        }
    }
}
