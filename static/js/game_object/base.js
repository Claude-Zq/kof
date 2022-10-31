let GAME_OBJECTS = [];

export class GameObject{
    constructor(){
        GAME_OBJECTS.push(this);
        this.timedelta = 0;
        this.hasCallStart = false;
    }
    start(){

    }

    update(){

    }
    destroy(){
        for(let i in GAME_OBJECTS){
            if(GAME_OBJECTS[i] === this){
                GAME_OBJECTS.splice[i,1];
                break;
            }
        }
    }
}
let lastTimestamp = 0;
let gameObjectsFrame = (timestamp)=>{
    for(let obj of GAME_OBJECTS){
        if(!obj.hasCallStart){
            obj.start();
            obj.hasCallStart = true;
        }else{
            obj.timedelta = timestamp - lastTimestamp;
            obj.update();
        }
    }
    lastTimestamp = timestamp;
    requestAnimationFrame(gameObjectsFrame);
}
requestAnimationFrame(gameObjectsFrame);