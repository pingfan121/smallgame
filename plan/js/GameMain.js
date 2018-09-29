
import BeginPage from './gamejs/page/BeginPage'
import EndPage from './gamejs/page/EndPage'
import FriendPage from './gamejs/page/FriendPage'
import GamePage from './gamejs/GamePage';
import GroupPage from './gamejs/page/GroupPage';
import Background from './gamejs/Background';
import Button from './base/Button';


let openDataContext = wx.getOpenDataContext()
let sharedCanvas = openDataContext.canvas;
let ctx = canvas.getContext('2d');

let background=new Background();   //背景页面
let beginpage = new BeginPage();   //开始页面
let endpage=new EndPage();         //结束页面
let friendpage=new FriendPage();   //好友排行页面
let grouppage=new GroupPage();     //群排行页面
let gamepage=new GamePage();       //游戏页面




let btn_zanting=new Button("images/zanting.png",64,64,10,70);  //暂停按钮
let btn_jixu=new Button("images/jixu.png",64,64,10,70);        //继续按钮

let btn_gbsy=new Button("images/gbsy.png",64,64,10,140);       //关闭声音按钮
let btn_dksy=new Button("images/dksy.png",64,64,10,140);       //打开声音按钮

let btn_share=new Button("images/btn_share.png",64,64,10,210);       //分享按钮

let btn_GameHub = wx.createGameClubButton({                         //游戏圈按钮
    icon: 'white',
    style: {
        left: 10*window.g_width/750,
        top: 70*window.g_width/750,
        width: 64*window.g_width/750,
        height: 64*window.g_width/750,
    }
})

window.playflag=true;      //游戏标志
window.playcount=0;        //暂停计数

let maxscore=0;   //历史最大分

let weekscore=0;  //每周最大分
let lastweektime=null;

export default class GameMain 
{
    constructor() 
    {
        this.binddraw=this.draw.bind(this);
       
        beginpage.show(true);

        this.getMaxScore();
        this.getWeekScore();

        this.draw();

        btn_GameHub.show();

        
    btn_jixu.btnclick=this.gamekeep;
    btn_zanting.btnclick=this.gamestop;

    btn_gbsy.btnclick=this.gbsy;
    btn_dksy.btnclick=this.dksy;

    btn_share.btnclick=this.share;

    btn_jixu.hide();
    btn_zanting.hide();
    btn_dksy.hide();
    btn_gbsy.hide();

    btn_share.hide();
        
    }

    gamestop()
    {
        window.playflag=false;
        window.playcount=0;
  
        btn_jixu.show();
        btn_zanting.hide();
    }
    gamekeep()
    {
        window.playflag=true;
  
      btn_jixu.hide();
      btn_zanting.show();
    }

    //关闭声音事件
    gbsy()
    {
        window.getmusic().stopMusic();
        btn_gbsy.hide();
        btn_dksy.show();
    }

    //打开声音事件
    dksy()
    {
        window.getmusic().startMusic();
        btn_gbsy.show();
        btn_dksy.hide();
    }

    //分享
    share()
    {
        window.playflag=false;
        window.playcount=0;
  
        btn_jixu.show();
        btn_zanting.hide();

       

        wx.shareAppMessage({
        title: '经典飞机大战,快来和朋友一较高低吧',
        imageUrl: canvas.toTempFilePathSync({
            destWidth: 500,
            destHeight: 400
        })});
    }

    getMaxScore()
    {
        try 
        {
            maxscore = wx.getStorageSync('maxscore');
      
            if (maxscore == undefined) 
            {
              maxscore = 0;
            }
      
        } 
         catch (e)
        {
            maxscore = 0;
        }
    }

    getWeekScore()
    {
        try 
        {
            weekscore = wx.getStorageSync('weekscore');
      
            if (weekscore == undefined) 
            {
                weekscore = 0;
            }
      
        } 
         catch (e)
        {
            weekscore = 0;
        }

        try 
        {
            lastweektime = wx.getStorageSync('weektime');
      
            if (lastweektime == undefined || lastweektime=="") 
            {
                lastweektime = new Date();
            }
      
        } 
         catch (e)
        {
            lastweektime = new Date();
        }
    }

    //游戏开始
    gameStart()
    {
        beginpage.hide();
        endpage.hide()
        friendpage.hide();
        grouppage.hide();
        

        gamepage.start();

        btn_zanting.show();
        btn_jixu.hide();

        if(window.musicflag==true)
        {
            btn_gbsy.show();
            btn_dksy.hide();
        }
        else
        {
            btn_gbsy.hide();
            btn_dksy.show();
        }

        btn_share.show();
        
        btn_GameHub.hide();

        console.log("游戏开始了呀");
    }

    //游戏结束了
    gameOver(score)
    {
        btn_zanting.hide();
        btn_jixu.hide();
        btn_dksy.hide();
        btn_gbsy.hide();
        btn_share.hide();
        gamepage.hide();


        if(score>maxscore)
        {
            maxscore=score;

             //保存游戏数据
            wx.setStorage({ key: "maxscore", data: maxscore })
        }

        //检测上次时间 和这次时间  有没有跨周

        let currtime=new Date();

        if(this.isSameWeek(lastweektime,currtime)==false)
        {
            weekscore=0;
        }

        if(score>weekscore)
        {
             lastweektime=currtime;
             weekscore=score;

               //保存游戏数据
            wx.setStorage({ key: "weekscore", data: weekscore });
            wx.setStorage({ key: "weektime", data: lastweektime });

            //上传分数到云
            var arr = new Array();
            arr.push({ key: "maxscore", value: "" + score });
            arr.push({ key: "scoretime", value: "" + lastweektime.toJSON() });
            wx.setUserCloudStorage({ KVDataList: arr });
        }

    
        endpage.showview(score,maxscore);

        btn_GameHub.show();

        console.log("游戏结束了呀");
    }

    savedata()
    {

    }

    isSameWeek(old,now){
        var oneDayTime = 1000*60*60*24;
        var old_count =parseInt(old.getTime()/oneDayTime);
        var now_other =parseInt(now.getTime()/oneDayTime);
            return parseInt((old_count+4)/7) == parseInt((now_other+4)/7);
    }
    

    //显示好友排行
    showFriendRank()
    {
        friendpage.show();
    }
    
    //显示群排行
    showgroupRank(shareTicket)
    {
        if(shareTicket!=null && shareTicket != undefined && shareTicket != "")
        {
             beginpage.hide();
             endpage.hide();
             friendpage.hide();
             gamepage.hide();

             btn_jixu.hide();
             btn_zanting.hide();
             btn_dksy.hide();
             btn_gbsy.hide();
             btn_share.hide();

            grouppage.showview(shareTicket);
             
        }
    }

    draw()
    {

        if(window.playflag==false)
        {
            if(window.playcount>0)
            {
                window.requestAnimationFrame(this.binddraw, canvas);
                return;
            }
            window.playcount++;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        background.draw(ctx);
    
        gamepage.draw(ctx);
        beginpage.draw(ctx);
        endpage.draw(ctx);
        friendpage.draw(ctx);
        grouppage.draw(ctx);
        
        ctx.drawImage(sharedCanvas, 0, 0, canvas.width, canvas.height);

        btn_zanting.draw(ctx);
        btn_jixu.draw(ctx);
        btn_gbsy.draw(ctx);
        btn_dksy.draw(ctx);
        btn_share.draw(ctx);

       window.requestAnimationFrame(this.binddraw, canvas);

    }

    //显示游戏圈
}