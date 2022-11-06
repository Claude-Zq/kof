import { GameObject } from "../game_object/base.js";

export class GameMap extends GameObject{
    constructor(root){
        super();

        this.root = root;
        this.$canvas = $(`<canvas  width=${window.innerWidth.toString()} height=${window.innerHeight.toString()} tabindex=0 ></canvas>`);
        this.ctx = this.$canvas[0].getContext('2d');
        this.root.$kof.append(this.$canvas);
        this.$canvas.focus();

        this.timeLeft = 60000;

        this.root.$kof.append($(`
        <div class="kof-head">
                <div class="kof-head-hp-0">
                    <div>
                        <div>
                        </div>
                    </div>
                    
                </div>
                <div class="kof-head-timer">60</div>
                <div class="kof-head-hp-1">
                    <div>
                        <div>
                        </div>
                    </div>
                </div>
        </div>`
        ))

        this.$timer = this.root.$kof.find(".kof-head-timer");

        $(this.root.$kof).css({
            "width":window.innerWidth,
            "height":window.innerHeight,
            "background-image": `url(/static/images/background/${root.bgId}.gif)`,
            "background-size": "100% 100%",
            "background-position": "top",
            "position": "absolute",
        })


// #kof>.kof-head {
//     width: 100%;
//     height: 80px;
//     position: absolute;
//     top: 0;
//     display: flex;
//     align-items: center;
// }
        $('.kof-head').css({
            "width":"100%",
            "height":"8%",
            "position":"absolute",
            "top":"0",
            "display":"flex",
            "align-items":"center",
        })

// #kof>.kof-head>.kof-head-hp-0 {
//     height: 40px;
//     width: calc(50% - 60px);
//     margin-left: 20px;
//     border: white 5px solid;
//     border-right: none;
//     box-sizing: border-box;
// }

        $('.kof-head-hp-0').css({
        "width":"45%",
        "height": "100%",
        "margin-left":"20px",
        "border":"white 5px solid",
        "border-right":"none",
        "box-sizing":"border-box",
        })



// #kof>.kof-head>.kof-head-timer {
//     height: 60px;
//     width: 80px;
//     background-color: orange;
//     border: white 5px solid;
//     box-sizing: border-box;
//     color: white;
//     font-size: 30px;
//     font-weight: 800;
//     text-align: center;
//     line-height: 50px;
//     user-select: none;
// }
        

    $('.kof-head-timer').css({
        "height":"100%",
        "width":"10%",
        "background-color":"orange",
        "border":"white 5px solid",
        "box-sizing":"border-box",
        "color":"white",
        "font-size":"30px",
        "font-weight":"800",
        "text-align":"center",
        "line-height":"60px",
        "user-select":"none",
    })

    // #kof>.kof-head>.kof-head-hp-1 {
    //     height: 40px;
    //     width: calc(50% - 60px);
    //     border: white 5px solid;
    //     border-left: none;
    //     box-sizing: border-box;
    // }

    $('.kof-head-hp-1').css({
        "height":"100%",
        "width":"45%",
        "margin-right":"20px",
        "border":"white 5px solid",
        "box-sizing":"border-box",
        "border-left":"none",
    })


// #kof>.kof-head>.kof-head-hp-0>div {
//     background-color: red;
//     height: 100%;
//     width: 100%;
//     float: right;
// }
    $(`.kof-head-hp-0>div`).css({
        "background-color":"red",
        "height":"100%",
        "width":"100%",
        "float":"right",
    })


// #kof>.kof-head>.kof-head-hp-1>div {
//     background-color: red;
//     height: 100%;
//     width: 100%;
// }
    $(`.kof-head-hp-1>div`).css({
        "background-color":"red",
        "height":"100%",
        "width":"100%",
    })


// #kof>.kof-head>.kof-head-hp-0>div>div {
//     background-color: lightgreen;
//     height: 100%;
//     width: 100%;
//     float: right;
// }

    $(`.kof-head-hp-0>div>div`).css({
        "background-color":"lightgreen",
        "height":"100%",
        "width":"100%",
        "float":"right",
    })

// #kof>.kof-head>.kof-head-hp-1>div>div {
//     background-color: lightgreen;
//     height: 100%;
//     width: 100%;
// }
    $(`.kof-head-hp-1>div>div`).css({
        "background-color":"lightgreen",
        "height":"100%",
        "width":"100%",
    })

    }


    start(){

    }

    update(){
        this.timeLeft -= this.timedelta;
        if (this.timeLeft < 0) {
            this.timeLeft = 0;
            let [a, b] = this.root.players;
            if (a.status !== "die" && b.status !== "die") {
                a.die();b.die();
            }
        }
        this.$timer.text(parseInt(this.timeLeft / 1000));
        this.render();
    }

    render(){
        this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
    }
}