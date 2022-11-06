import  clearGameObjects  from "../game_object/base.js";
export class Menu{
    constructor(root) {
        this.root = root;

        //开始菜单页
        let startMenu = $(`
        <div id="start-menu">
		    <h1>大乱斗</h1>
            <!-- 角色头像 --> 
            <img src="/static/images/allPlayers/${root.player0Id}.png" id="player0-img" alt="角色0图片">
            <img src="/static/images/allPlayers/${root.player1Id}.png" id="player1-img" alt="角色1图片">
            <!-- 选择按钮 --> 
            <div id='menu'>
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
                点击头像可切换角色<br>
                <br>
            </p>
            <button>X</button>
        </div>`)

        //结束游戏界面
        let overMenu = $(`
        <!-- 结束菜单 -->
        <div id="overMenu">
            <h2>玩家左获胜</h2>
			<button class="back">返 回</button>
        </div>
        `)
        this.root.$kof.append(startMenu);
        this.root.$kof.append(intro);
        this.root.$kof.append(overMenu);

        startMenu.show();
        intro.hide();
        overMenu.hide();

        // 游戏介绍按钮
        $("#menu #intro-btn").click(function () {
            $("#intro").show();
           
        })

        //关闭游戏介绍页面按钮
        $('#intro button').click(function () {
            $("#intro").hide();
            $('#start-menu').show();
        })

        // 开始游戏按钮
        $("#menu #start-btn").click(function () {
            $("#start-menu").fadeOut(500);
            root.startGame();
        });

        //切换背景
        $("#menu #select-background-btn").click(function(){
            root.bgId = (root.bgId+1)%5;
            $('#start-menu').css({
                "background-image": `url("/static/images/background/${root.bgId}.gif")`
            })    
            
        })

        //点击图片切换角色
        $("#start-menu #player0-img").click(function(){
            root.player0Id = (root.player0Id +1)%6;
            $('#start-menu #player0-img').attr('src', `/static/images/allPlayers/${root.player0Id}.png`) 
        })
        //点击图片切换角色
        $("#start-menu #player1-img").click(function(){
            root.player1Id = (root.player1Id +1)%6;
            $('#start-menu #player1-img').attr('src', `/static/images/allPlayers/${root.player1Id}.png`) 
        })

        $("#overMenu button").click(function(){
            overMenu.hide();
            startMenu.show();
           $(`#${root.id} .kof-head`).remove();
           $(`#${root.id} canvas`).remove();
        //    GAME_OBJECTS = [];
           clearGameObjects();
          
        })
        this.setStartMenuCss();
        this.setIntroCss();
        this.setOverMenuCss();
    }

    setStartMenuCss(){    
        //整个菜单
        $(`#${this.root.id} #start-menu`).css({
            "width":window.innerWidth,
            "height":window.innerHeight,
            "background-image": `url("/static/images/background/${this.root.bgId}.gif")`,
            "background-size": "100% 100%",
            "background-position": "top",
            "position": "absolute",
        })      

        //菜单标题
        $(`#${this.root.id} #start-menu h1`).css({
            "text-align": "center",
            "font-size": "75px",
            "color":"#f5f7a7",

        })

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
    $(`#${this.root.id} #start-menu #player0-img`).css({
        "box-sizing": "border-box",
        "border": "solid #dee2e6",
        "width": "200px",
        "height":"200px",
        "position": "absolute",
        "left": "0%",
        "top": "0%",

        "margin": "0 1rem 1rem 0",
        "border": "4mm ridge rgba(211, 220, 50, .6)",
        "border-radius": "30px",
        
    })  
    $(`#${this.root.id} #start-menu #player1-img`).css({
        "box-sizing": "border-box",
        "border": "solid #dee2e6",
        "width": "200px",
        "height":"200px",
        "position": "absolute",
        "right": "0%",
        "top": "0%",

        "margin": "0 0 1rem 1rem",
        "border": "4mm ridge rgba(211, 220, 50, .6)",
        "border-radius": "30px",
    }) 

    }

    setIntroCss(){


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

    setOverMenuCss(){
        $(`#${this.root.id} #overMenu`).css({
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
        $(`#${this.root.id} #overMenu button`).css({
            "display ": "inline-block",
            "background-color":"#1f9cf0",
            "box-shadow": "0px 0px 20px rgb(89, 175, 255)",
            "width": "300px",
            "height": "60px",
            "border-radius": "20px",
            "margin": "60px 0",
            "color": "white",
            "border": "none",
            
        })
         $(`#${this.root.id} #overMenu h2`).css({
            "text-align": "center",
            "font-size": "40px",
            "color":"#f5f7a7",
        })
    }
    endGame(){
        $(`#${this.root.id} #overMenu h2`).text(this.root.gameResult);
        $(`#${this.root.id} #overMenu`).show();
    }


}