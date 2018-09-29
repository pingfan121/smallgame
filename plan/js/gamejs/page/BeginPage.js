//游戏开始之前的界面
import Button from '../../base/Button'
import sprite from '../../base/sprite'

let that=null;


export default class BeginPage extends sprite
 {

  constructor() 
  {
    super();
    that=this;

    
    this.btn_start=new Button("images/btn_start.png",300,300/1078*320);
    this.icon_title=new sprite("images/title.png",404,208);

    this.icon_title.x = (canvas.width - this.icon_title.width) / 2;
    this.icon_title.y = 200;

    this.btn_start.x = (canvas.width - this.btn_start.width) / 2;
    this.btn_start.y = canvas.height - 400;

    this.btn_start.btnclick=this.startgame.bind(this);

    this.visible=true;
  }
  
  startgame(e)
  {
    if(this.visible==false)
     {
       return ;
     }
    
    window.main.gameStart();
  }

  draw(ctx)
   {
     if(this.visible==false)
     {
       return ;
     }
     
    //在最下方画灰色

    this.btn_start.draw(ctx);
    this.icon_title.draw(ctx);
  }
}