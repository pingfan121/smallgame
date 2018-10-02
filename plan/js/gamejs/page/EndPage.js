//游戏开始之前的界面
import Button from '../../base/Button'
import sprite from '../../base/sprite'
import ColorSprite from '../../base/ColorSprite';



let btn_again = new Button("images/btn_again.png", 300, 300 / 1078 * 320);

let gs = 0;
let ms = 0;

let openDataContext = wx.getOpenDataContext()

let s_rank = new ColorSprite('#425066', 650, 300, 50, 400);
let s_ad = new ColorSprite('#425066', 650, 80, 50, 400 + 300 + 20+80+20,"点我设置掉落词组");

let s_share = new ColorSprite('#425066', (650-10)/3, 80, 50, 400 + 300 + 20,"分享给朋友");
let s_group = new ColorSprite('#425066', (650-10)/3, 80, 50+(650-10)/3+5, 400 + 300 + 20,"查看群排行");

let s_word = new ColorSprite('#425066', (650-10)/3, 80, 50+(650-10)/3+5+(650-10)/3+5, 400 + 300 + 20,"查看世界排行");

let { screenWidt,screenHeight } = wx.getSystemInfoSync();

let bannerAd = null;

let bannerAd2= wx.createRewardedVideoAd({ adUnitId: 'adunit-e80d2e69e5b09526' });

let that=null;

export default class EndPage extends sprite {

  constructor() {
    super();

    that=this;

    console.log("宽:" + canvas.width);

    this.visible = false;
    btn_again.x = (canvas.width - btn_again.width) / 2;
    btn_again.y = canvas.height - 350;


    btn_again.btnclick = this.startgame.bind(this);

    s_rank.btnclick = this.showrank.bind(this);

    s_ad.btnclick = this.showAd.bind(this);

    s_share.btnclick=this.shareClick.bind(this);
    s_group.btnclick=this.groupClick.bind(this);
    s_word.btnclick=this.wordClick.bind(this);

    this.hide();

    bannerAd2.onClose(res => {
      // 用户点击了【关闭广告】按钮
      // 小于 2.1.0 的基础库版本，res 是一个 undefined
      if (res && res.isEnded || res === undefined) {
        // 正常播放结束，可以下发游戏奖励
         that.hide();
         window.main.showSetDropPage(gs,ms);
      }
      else {
          // 播放中途退出，不下发游戏奖励
      }
  })

  }
  showview(score, maxscore) {

    gs = score;
    ms = maxscore;
    this.show();
    openDataContext.postMessage({ key: "endpage" });

    if(bannerAd!=null)
    {
      bannerAd.destroy();
      bannerAd=null;
    }

    bannerAd =wx.createBannerAd({
      adUnitId: 'adunit-41368c32d74b8ba2',
      style: {
          left: 0,
          top: screenHeight-100,
          width: screenWidt
      }
    })
    

   

    bannerAd.show();

    

  }
  hide() {
    super.hide();
    openDataContext.postMessage({ key: "clearcanvas" });

    if(bannerAd!=null)
    {
      bannerAd.hide();
      bannerAd.destroy();
      bannerAd=null;
    }

  }
  startgame(e) {
    if (this.visible == false) {
      return;
    }

    window.main.gameStart();
  }
  showrank(e) {
    if (this.visible == false) {
      return;
    }
    this.hide();
    window.main.showFriendRank(gs,ms);
  }


  //设置掉落词组按钮
  showAd(e) {
    if (this.visible == false) {
      return;
    }

    //that.hide();
    //window.main.showSetDropPage(gs,ms);
   

    bannerAd2.show().catch(err => { bannerAd2.load().then(() => bannerAd2.show())});
  }


  // 分享按钮
  shareClick(e) {
    if (this.visible == false) {
      return;
    }

    wx.updateShareMenu({
      withShareTicket: false
    })

    setTimeout(function () {
      wx.shareAppMessage(window.sharedata())
    }, 100);

    
  }

  // 查看群排行按钮
   groupClick(e) 
   {
     if (this.visible == false)
     {
       return;
     }
    
 
     wx.updateShareMenu({
       withShareTicket: true
     })
 
     setTimeout(function () {
       wx.shareAppMessage(window.sharegroupdata())
     }, 100);
   }

   //查看世界排行
   wordClick(e)
   {
    if (this.visible == false)
    {
      return;
    }

    // wx.showToast({
    //   title:"功能正在努力开发中",
    //   icon:'none'
    // })
    this.hide();
    window.main.showWordPage(gs,ms);

   }



  draw(ctx) {

    if (this.visible == false) {
      return;
    }

    //本局得分
    ctx.font = "30px 宋体";
    ctx.fillStyle = 'white';
    ctx.textAlign = "center";
    ctx.textBaseline = 'middle';
    ctx.fillText("本局得分" + "", canvas.width / 2, 100);


    //分数
    ctx.font = "100px 微软雅黑";
    ctx.fillStyle = 'white';
    ctx.textAlign = "center";
    ctx.textBaseline = 'middle';
    ctx.fillText(gs + "", canvas.width / 2, 220);

    //历史得分
    ctx.font = "30px 微软雅黑";
    ctx.fillStyle = 'white';
    ctx.textAlign = "center";
    ctx.textBaseline = 'middle';
    ctx.fillText("历史最高分:" + ms, canvas.width / 2, 340);

    btn_again.draw(ctx);
    //btn_again2.draw(ctx);

    //画排行
    s_rank.draw(ctx);
    s_ad.draw(ctx);

    s_share.draw(ctx);
    s_group.draw(ctx);
    s_word.draw(ctx);

    //写上点击
    //历史得分
    // ctx.font = "25px 微软雅黑";
    // ctx.fillStyle = 'white';
    // ctx.textAlign = "center";
    // ctx.textBaseline = 'middle';
    // ctx.fillText("觉着游戏好玩记得点我分享给朋友哦 ^_^", canvas.width / 2, s_ad.y+s_ad.height/2);

  }



}