import  clearGameObjects  from "../game_object/base.js";
export class Menu{
    constructor(root) {
        this.root = root;
        this.addStartMenu();
        this.addIntroPage();
        this.addOverMenu();
    }

    addStartMenu(){
         //开始菜单页
         this.startMenu = $(`
         <div id="start-menu">
             <h1>大乱斗</h1>
             <!-- 角色头像 --> 
             <img src="/static/images/allPlayers/${this.root.player0Id}.png" id="player0-img" alt="角色0图片">
             <img src="/static/images/allPlayers/${this.root.player1Id}.png" id="player1-img" alt="角色1图片">
             <!-- 选择按钮 --> 
             <div id='menu'>
                 <button id="select-background-btn">切换背景</button>
                 <button id="intro-btn">游戏介绍</button>
                 <button id ="start-btn">开始游戏</button>
             </div>
         </div>`
         )

         this.root.$kof.append(this.startMenu);
         this.startMenu.show();

         let outer = this;
           // 游戏介绍按钮
       this.startMenu.find("#intro-btn").click(function () {
            outer.intro.show();
        })

        // 开始游戏按钮
        this.startMenu.find("#start-btn").click(function () {
            $('#start-menu #menu').hide();
            outer.root.startGame();
            outer.startMenu.fadeOut(1000);
        });

        //切换背景
        this.startMenu.find("#select-background-btn").click(function(){
            outer.root.bgId = (outer.root.bgId+1)%5;
            $('#start-menu').css({
                "background-image": `url("/static/images/background/${outer.root.bgId}.gif")`
            })    
            
        })

         //点击图片切换角色
         this.startMenu.find("#player0-img").click(function(){
            outer.root.player0Id = (outer.root.player0Id +1)%6;
            $('#start-menu #player0-img').attr('src', `/static/images/allPlayers/${outer.root.player0Id}.png`) 
        })
        //点击图片切换角色
        this.startMenu.find("#player1-img").click(function(){
            outer.root.player1Id = (outer.root.player1Id +1)%6;
            $('#start-menu #player1-img').attr('src', `/static/images/allPlayers/${outer.root.player1Id}.png`) 
        })

    }

    addIntroPage(){
         //介绍页面
        this.intro = $(` 
         <!-- 游戏介绍 -->
         <div id="intro">
             <h2>游戏介绍</h2>
             <p>
                 经典的双人对战街机游戏<br>
                 点击角色图片可切换角色<br>
                 <br>
                 玩家操作键： <br>
                 跳跃：↑(w) <br>
                 下蹲：↓(s) <br>
                 左移：←(a) <br>
                 右移：→(d) <br>
                 攻击: 空格(回车) <br>
                 防守: f(Shift) <br>
                 <br>
             </p>
             <button>×</button>
         </div>`)

         this.root.$kof.append(this.intro);
         this.intro.hide();

         let outer = this;
           //关闭游戏介绍页面按钮
        this.intro.find('button').click(function () {
            outer.intro.hide();
            outer.startMenu.show();
        })
 
    }

    addOverMenu(){
        //结束游戏界面
        this.overMenu = $(`
        <!-- 结束菜单 -->
        <div id="overMenu">
            <h2>玩家左获胜</h2>
            <button class="back">返 回</button>
        </div>
        `)
        this.root.$kof.append(this.overMenu);
        this.overMenu.hide();

        let outer = this;
        this.overMenu.find("button").click(function(){
            outer.overMenu.hide();
            outer.startMenu.show();
            $('#start-menu #menu').show();
            $(`#${outer.root.id} .kof-head`).remove();
            $(`#${outer.root.id} canvas`).remove();
            clearGameObjects();
        })
    }
    
    endGame(){
        $(`#${this.root.id} #overMenu h2`).text(this.root.gameResult);
        $(`#${this.root.id} #overMenu`).show();
    }


}