export class Menu{
    constructor(root) {
        this.root = root;

        //开始菜单页
        let startMenu = $(`
        <div id="start-menu">
		    <h1>大乱斗</h1>
            <!-- 选择按钮 --> 
            <div id='menu'>
                <button id="select-role-btn">切换角色</button>
                <button id="select-background-btn">切换背景</button>
                <button id="intro-btn">游戏介绍</button>
                <button id ="start-btn">开始游戏</button>
            </div>
	    </div>`
        )

        //介绍页面
        let intro = $(` 
        <!-- 游戏介绍 -->
        <div id="intro">
            <h2>游戏介绍</h2>
            <p>
                简单的双人对战游戏<br>
                <br>
                <br>
            </p>
            <button>X</button>
        </div>`)
        this.root.$kof.append(startMenu);
        this.root.$kof.append(intro);
        intro.hide();

        // 规则按钮
        $("#menu #intro-btn").click(function () {
            $("#intro").show();
            // $('#start-menu').hide();
        })

        $('#intro button').click(function () {
            $("#intro").hide();
            $('#start-menu').show();
        })

        // 开始 按钮
        $("#menu #start-btn").click(function () {
            $("#start-menu").fadeOut(500);
            root.startGame();// 开始游戏
        });

        $("#menu #select-background-btn").click(function(){
            root.bgId = (root.bgId+1)%5;
            $('#start-menu').css({
                "background-image": `url("/static/images/background/${root.bgId}.gif")`
            })    
            
        })

        this.setMenuCss();
        this.setIntroCss();

           
    }



    setMenuCss(){
        // /* 游戏菜单 盒子 */
        // #menu-box {
        //     width: 300px;
        //     position: absolute;
        //     color: #fff;
        //     left: 50%;
        //     top: 50%;
        //     transform: translate(-50%, -50%);
        //     text-align: center;
        // }
        //整个菜单
        $(`#${this.root.id} #start-menu`).css({
            "width":window.innerWidth,
            "height":window.innerHeight,
            "background-image": `url("/static/images/background/${this.root.bgId}.gif")`,
            "background-size": "100% 100%",
            "background-position": "top",
            "position": "absolute",
        })      
        // /* 游戏菜单 游戏标题 */
        // #menu-box h1 {
        //     letter-spacing: 5px;
        //     margin-bottom: 30px;
        //     font-size: 40px;
        // }

        //菜单标题
        $(`#${this.root.id} #start-menu h1`).css({
            "text-align": "center",
            "font-size": "75px",
            "color":"#f5f7a7",

        })
    // /* 游戏菜单 按钮 */
    // #menu-box #d2 button {
    //     display: inline-block;
    //     background-image: linear-gradient(160deg, rgb(89, 175, 255), rgb(99, 63, 255));
    //     box-shadow: 0px 0px 20px rgb(89, 175, 255);
    //     width: 200px;
    //     height: 40px;
    //     border-radius: 20px;
    //     margin: 20px 0;
    //     color: #fff;
    //     border: none;
    // }
    $(`#${this.root.id} #start-menu #menu`).css({
        "width": "400px",
        "position": "absolute",
        "left": "50%",
        "top": "50%",
        "transform": "translate(-50%, -50%)",
        "text-align": "center",
    })  

    //菜单按钮
    $(`#${this.root.id} #menu button`).css({
        "display ": "inline-block",
        "background-color":"#1f9cf0",
        "box-shadow": "0px 0px 20px rgb(89, 175, 255)",
        "width": "300px",
        "height": "60px",
        "border-radius": "20px",
        "margin": "20px 0",
        "color": "white",
        "border": "none",
    })

    }

    setIntroCss(){


// /* 规则盒子 */
// .guize-box {
//     display: none;
//     position: absolute;
//     left: 50%;
//     top: 50%;
//     transform: translate(-50%, -50%);
//     background-image: linear-gradient(160deg, rgb(89, 175, 255), rgb(99, 63, 255));
//     box-shadow: 0px 0px 20px rgb(89, 175, 255);
//     width: 300px;
//     height: 300px;
//     border-radius: 20px;
//     text-align: center;
//     padding: 40px;
//     color: #fff;
//     overflow: hidden;
//     line-height: 40px;
// }

    $(`#${this.root.id} #intro`).css({
        // "display": "none",
        "position": "absolute",
        "left": "50%",
        "top": "50%",
        "transform": "translate(-50%, -50%)",
        "background-image": "linear-gradient(160deg, rgb(89, 175, 255), rgb(99, 63, 255))",
        "box-shadow": "0px 0px 20px rgb(89, 175, 255)",
        "width": "300px",
        "height": "300px",
        "border-radius": "20px",
        "text-align": "center",
        "padding": "40px",
        "color": "#fff",
        "overflow": "hidden",
        "line-height": "40px",
    })

    $(`#${this.root.id} #intro button`).css({
        "position": "absolute",
        "right": "0",
        "top": "0",
        "width": "40px",
        "height": "40px",
        "border-radius": "20px",
        "border": "none",
        "font-weight": "700",
        "font-size": "24px",
        "color": "#fff",
        "background-color": "transparent", 
    })

    $(`#${this.root.id} #intro p`).css({
        "font-size": "20px",
    })
    }



}