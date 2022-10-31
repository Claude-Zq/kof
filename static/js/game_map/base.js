import { GameObject } from "../game_object/base.js";

export class GameMap extends GameObject{
    constructor(root){
        super();

        this.root = root;
        this.$canvas = $(`<canvas  width=${window.innerWidth.toString()} height=${window.innerHeight.toString()} tabindex=0 ></canvas>`);
        this.ctx = this.$canvas[0].getContext('2d');
        this.root.$kof.append(this.$canvas);
        this.$canvas.focus();
    }


    start(){

    }

    update(){
        this.render();
    }

    render(){
        // console.log("width = " + this.ctx.canvas.width+"height = "+this.ctx.canvas.height);
        this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
    }
}