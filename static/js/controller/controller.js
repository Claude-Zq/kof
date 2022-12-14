export class Controller{
    constructor($canvas){
        this.$canvas = $canvas;
        this.pressedKeys = new Set();
        this.work();
    }

    work(){

        let outer = this;
        this.$canvas.keydown(function(e){
            outer.pressedKeys.add(e.key.toLowerCase());
           
        });

        this.$canvas.keyup(function(e){
            outer.pressedKeys.delete(e.key.toLowerCase());
        })
    }
}