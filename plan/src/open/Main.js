import FriendPage from './page/FriendPage'
import GroupPage from './page/GroupPage';
import EndPage from './page/EndPage';
import WordPage from './page/WordPage';


let that=null;

let friendpage=new FriendPage();
let grouppage=new GroupPage();
let endpage=new EndPage();
let wordpage=new WordPage();

export default class Main 
{
  constructor()
  {
    that=this;
  }

  start() {
    wx.onMessage(that.onMessage);
  }

  onMessage(data)
  {
     switch(data.key)
     {
      case "endpage":
      {
          endpage.show();
          break;
      }
       case "friendpage":
       {
           friendpage.show();
           break;
       }
       case "friendpage_last":
       {
           friendpage.lastPage();
           break;
       }
       case "friendpage_next":
       {
           friendpage.nextPage();
           break;
       }
       case "wordpage":
       {
           wordpage.show();
           break;
       }
       case "wordpage_last":
       {
           wordpage.lastPage();
           break;
       }
       case "wordpage_next":
       {
           wordpage.nextPage();
           break;
       }
       case "worddata":
       {
           wordpage.setWordData(data.data);
           break;
       }
       case "grouppage":
       {
           grouppage.showview(data.data);
           break;
       }
       case "grouppage_last":
       {
           grouppage.lastPage();
           break;
       }
       case "grouppage_next":
       {
           grouppage.nextPage();
           break;
       }
       case "openid":
       {
         window.openid=data.data;
         break;
       }
       case "clearcanvas":
       {
        that.clearZiYu();
         break;
       }
       case "clear":
       {
        that.clearZiYu();
         break;
       }
      
     }
  }

  //清理子域
  clearZiYu()
  {
    let sharedCanvas = wx.getSharedCanvas();
    let ctx = sharedCanvas.getContext('2d');
    ctx.clearRect(0,0,sharedCanvas.width,sharedCanvas.height); 
    
    //将所有的子域页面隐藏
    endpage.hide();
    friendpage.hide();
    grouppage.hide();
    wordpage.hide();
  }
}