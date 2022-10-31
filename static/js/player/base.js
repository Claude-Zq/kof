import { GameObject } from "../game_object/base.js";



export class Player extends GameObject{
    constructor(root,info) {
        super();

        this.root = root;
        this.id = info.id;
        this.x = info.x;
        this.y = info.y;
        this.width = info.width;
        this.height = info.height;

        
        
        this.ctx = this.root.gameMap.ctx;
        
    }


    start(){

    }

    update(){
        this.render();
    }

    render(){
        this.ctx.fillStyle = "green";
        this.ctx.fillRect(this.x,this.y,this.width,this.height);
    }
}