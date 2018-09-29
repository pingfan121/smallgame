//游戏开始之前的界面
import Button from '../../base/Button'
import sprite from '../../base/sprite'
import ColorSprite from '../../base/ColorSprite';



let btn_again = new Button("images/btn_again.png", 300, 300 / 1078 * 320);

let gs = 0;
let ms = 0;

let openDataContext = wx.getOpenDataContext()

let s_rank = new ColorSprite('#425066', 650, 300, 50, 400);
let s_ad = new ColorSprite('#425066', 650, 80, 50, 400 + 300 + 50);



export default class EndPage extends sprite {

  constructor() {
    super();

    console.log("宽:" + canvas.width);

    this.visible = false;
    btn_again.x = (canvas.width - btn_again.width) / 2;
    btn_again.y = canvas.height - 400;


    btn_again.btnclick = this.startgame.bind(this);

    s_rank.btnclick = this.showrank.bind(this);

    s_ad.btnclick = this.showAd.bind(this);

    this.hide();

  }
  showview(score, maxscore) {

    gs = score;
    ms = maxscore;
    this.show();
    openDataContext.postMessage({ key: "endpage" });

  }
  hide() {
    super.hide();
    openDataContext.postMessage({ key: "clearcanvas" });
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
    window.main.showFriendRank();
  }

  showAd(e) {
    if (this.visible == false) {
      return;
    }

    wx.shareAppMessage(window.sharedata());

    
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

    //写上点击
    //历史得分
    ctx.font = "25px 微软雅黑";
    ctx.fillStyle = 'white';
    ctx.textAlign = "center";
    ctx.textBaseline = 'middle';
    ctx.fillText("觉着游戏好玩记得点我分享给朋友哦 ^_^", canvas.width / 2, s_ad.y+s_ad.height/2);

  }



}