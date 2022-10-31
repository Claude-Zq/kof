export class Controller{
    constructor($canvas){
        this.$canvas = $canvas;
        this.pressedKey = new Set();
        this.work();
    }

    work(){

        let outer = this;
        this.$canvas.keydown(function(e){
            outer.pressedKey.add(e.key);
            console.log(e.key);
        });

        this.$canvas.keyup(function(e){
            outer.pressedKey.delete(e.key);
        })
    }
}