import { GameObject } from "../game_object/base.js";
import { GRAVITY } from "../base.js";

export class Player extends GameObject{
    constructor(root,info) {
        super();

        this.root = root;
        this.id = info.id;
        this.x = info.x;
        this.y = info.y;
        this.speedx = info.speedx;
        this.speedy = info.speedy;
        this.width = info.width;
        this.height = info.height;

        this.vx = 0;
        this.vy = 0;

       


        
        this.ctx = this.root.gameMap.ctx;
        
    }


    start(){

    }

    update_move(){
        this.vy += GRAVITY;
        this.x +=this.vx* this.timedelta/1000;
        this.y += this.vy * this.timedelta/1000;
       
        if(this.y > this.ctx.canvas.height-this.height-50){
            this.y = this.ctx.canvas.height - this.height-50;
            this.vy = 0;
        }
    }

    update(){
        this.update_move();
        this.render();
    }

    render(){
        this.ctx.fillStyle = "green";
        this.ctx.fillRect(this.x,this.y,this.width,this.height);
    }
}