import { Player } from "../base.js";
import { GIF } from "../../utils/gif.js";


export class Ryo extends Player{
    constructor(root,info){
        super(root,info);

        this.initAnimations();
        console.log(this.allStates);
        console.log(this.animations);
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
}



