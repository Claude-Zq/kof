export class Menu{
    constructor(root) {
        this.root = root;
        this.root.$kof.append($(`
        <div id="start-menu">
		    <h1>大乱斗</h1>
            <!-- 选择按钮 --> 
            <div id='menu'>
                <button id=”select-role“>切换角色</button>
                <button id=”select-background“>切换背景</button>
                <button id="intro">游戏介绍</button>
                <button id ="start">开始游戏</button>
            </div>
		    <!-- 游戏介绍 -->
            <div class="intro">
                <h2>游戏规则：</h2>
                <p>
                    这是非常简单的点击小游戏<br>
                    您只需要点击星星就可以获得分数<br>
                    <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fgss0.baidu.com%2F94o3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2F960a304e251f95ca31067fcbc9177f3e660952d8.jpg&refer=http%3A%2F%2Fgss0.baidu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1669965862&t=eedab0831a655406dc30114eb62f3014" width="50"><br>
                    您每次点击星星进度条都会减短<br>
                <div class='bar'><span></span></div>
                进度条满后游戏结束
                <div class='bar'><span style="width: 100%"></span></div>
                </p>
                <button>X</button>
            </div>
	    </div>`
        ))

            // 规则按钮
        $("#intro").click(function () {
            $(".intro").show(200);
        })

        $('.intro button').click(function () {
            $(".intro").hide(200);
        })

        // 开始 按钮
        $("#menu #start").click(function () {
            $("#start-menu").fadeOut(500);
            root.startGame();// 开始游戏
        });

        this.setCss();

           
  


    }



    setCss(){

                  
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
        $('#start-menu').css({
            "width":window.innerWidth,
            "height":window.innerHeight,
            "background-image": "url('/static/images/background/1.gif')",
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
        $("#start-menu h1").css({
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
    $('#start-menu #menu').css({
        "width": "400px",
        "position": "absolute",
        "left": "50%",
        "top": "50%",
        "transform": "translate(-50%, -50%)",
        "text-align": "center",
    })  

    //菜单按钮
    $("#start-menu #menu button").css({
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


}