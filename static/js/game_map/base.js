import { GameObject } from "../game_object/base.js";

export class GameMap extends GameObject{
    constructor(root){
        super();

        this.root = root;

        //加入画布
        this.$canvas = $(`<canvas  width="1280" height="720" tabindex=0 ></canvas>`);
        this.ctx = this.$canvas[0].getContext('2d');
        this.root.$kof.append(this.$canvas);
        this.$canvas.focus();

        this.timeLeft = 60000;

        //加入计时器和血条
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

    }

    start(){

        $(this.root.$kof).css({
            "background-image": `url(/static/images/background/${this.root.bgId}.gif)`,
            "background-size": "100% 100%",
            "background-position": "top",
            "position": "absolute",
        })

        $('.kof-head').css({
            "width":"100%",
            "height":"80px",
            "position":"absolute",
            "top":"0",
            "display":"flex",
            "align-items":"center",
        })

        $('.kof-head-hp-0').css({
        "width":"calc(50% - 60px)",
        "height": "40px",
        "margin-left":"20px",
        "border":"white 5px solid",
        "border-right":"none",
        "box-sizing":"border-box",
        })

    $('.kof-head-timer').css({
        "height":"60px",
        "width":"80px",
        "background-color":"orange",
        "border":"white 5px solid",
        "box-sizing":"border-box",
        "color":"white",
        "font-size":"30px",
        "font-weight":"800",
        "text-align":"center",
        "line-height":"50px",
        "user-select":"none",
    })

    $('.kof-head-hp-1').css({
        "height":"40px",
        "width":"calc(50% - 60px)",
        "margin-right":"20px",
        "border":"white 5px solid",
        "box-sizing":"border-box",
        "border-left":"none",
    })

    $(`.kof-head-hp-0>div`).css({
        "background-color":"red",
        "height":"100%",
        "width":"100%",
        "float":"right",
    })

    $(`.kof-head-hp-1>div`).css({
        "background-color":"red",
        "height":"100%",
        "width":"100%",
    })

    $(`.kof-head-hp-0>div>div`).css({
        "background-color":"lightgreen",
        "height":"100%",
        "width":"100%",
        "float":"right",
    })

    $(`.kof-head-hp-1>div>div`).css({
        "background-color":"lightgreen",
        "height":"100%",
        "width":"100%",
    })

    }
    update(){
        this.timeLeft -= this.timedelta;
        if (this.timeLeft < 0) {
            this.timeLeft = 0;
            let [a, b] = this.root.players;
            if (a.status !== "die" && b.status !== "die") {
                if(a.hp > b.hp){
                    b.die();
                }else if(a.hp === b.hp){
                    this.root.endGame();
                }else{
                    a.die();
                }
            }
        }
        this.$timer.text(parseInt(this.timeLeft / 1000));
        this.render();
    }

    render(){
        this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
    }
}