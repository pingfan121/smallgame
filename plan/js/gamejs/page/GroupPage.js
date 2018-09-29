//游戏开始之前的界面
import Button from '../../base/Button'
import sprite from '../../base/sprite'

let that=null;


let btn_group = new Button("images/btn_start.png", (canvas.width - 200) / 2, (canvas.width - 200) / 2/1078*320);

let btn_last = new Button("images/btn_lastpage.png",48,48, 750/2-30 -48,  canvas.height/20*3 +canvas.height / 10 * 6-60);
let btn_next = new Button("images/btn_nextpage.png",48,48, 750/2+30,  canvas.height/20*3 +canvas.height / 10 * 6-60);


let openDataContext = wx.getOpenDataContext();


export default class GroupPage extends sprite
 {

  constructor() 
  {
    super();
    that=this;

    btn_group.x = (canvas.width-((canvas.width - 200) / 2))/2;
    btn_group.y = canvas.height/20*17+(canvas.height/20*3-101)/2;

    btn_group.btnclick=this.onback.bind(this);

    btn_last.btnclick=this.lastPage.bind(this);
    btn_next.btnclick=this.nextPage.bind(this);

    this.hide();
  }

  lastPage()
  {
    openDataContext.postMessage({ key: "grouppage_last" });
  }

  nextPage()
  {
    openDataContext.postMessage({ key: "grouppage_next" });
  }


  draw(ctx)
   {
     if(this.visible==false)
     {
       return ;
     }

        //排行榜名字 --好友排行
        ctx.font = 40 + "px serif";
        ctx.textAlign = "center";
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'white';
        ctx.fillText("群排行", canvas.width / 2, canvas.height/20*3/2);
    
       //面板
       ctx.fillStyle = '#425066';
       ctx.fillRect(50, canvas.height/20*3, canvas.width - 100, canvas.height / 10 * 6);
    
    
       ctx.fillRect(50, canvas.height/20*3 + canvas.height / 10 * 6 + 20, canvas.width - 100, canvas.height / 10-20);
    
       ctx.font = "20px serif";
       ctx.textAlign = "left";
       ctx.textBaseline = 'middle';
       ctx.fillStyle = 'white';
       ctx.fillText("每周一凌晨刷新", 80, canvas.height/20*3+canvas.height/40);

    btn_group.draw(ctx);

    btn_last.draw(ctx);
    btn_next.draw(ctx);
  }
  
  showview(shareTicket)
  {
    super.show();
      //通知子域 显示好友排行
    openDataContext.postMessage({key:"grouppage",data:shareTicket});
  }

  hide()
  {
    super.hide();
    openDataContext.postMessage({ key: "clearcanvas" });
  }

  onback(e)
  {
    if(this.visible==false)
    {
      return;
    }
    this.hide();
    openDataContext.postMessage({ key: "clearcanvas" });
    window.main.gameStart();
  }

}