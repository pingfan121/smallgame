import sprite from '../base/sprite'

let that = null;


let arr = new Array();

let rankcanvas=wx.createCanvas();

let page =0;

let mode=9;


export default class FriendPage extends sprite {
  constructor() {
    super();
    that = this;

    rankcanvas.width=window.v_width;
    rankcanvas.height=window.v_height-v_height/10*4-60;
  }

  //
  lastPage()
  {
    if( that.visible==false)
    {
      return;
    }

     if(page<=0)
     {
       return;
     }

     page-=1;

     that.draw();

     console.log(" fanhui:"+page);
  }

  nextPage()
  {
    if( that.visible==false)
    {
      return;
    }

     if((page+1)*mode>arr.length)
     {
       return;
     }

     page+=1;

     that.draw();

     console.log(" fanye:"+page);
  }


  showview(shareTicket)
  {
    super.show();
    this.getFriendData(shareTicket);

    page=0;
  }

  //huoqupengyoushuju
  getFriendData(shareTicket)
  {

    arr.length = 0;

    wx.getGroupCloudStorage({
      shareTicket:shareTicket,
      keyList: ['maxscore'],
      success: function (res) {
        
        console.log(res);

        res.data.sort( (x, y) => {
          return -(x.KVDataList[0].value - y.KVDataList[0].value);
      })

      //删除不是这个星期的数据
      let delarr=[];

      res.data.forEach((item, index) => {

        item.KVDataList.forEach((item,index)=>{
          if(item!=null && item.key=="scoretime")
          {
                let date=new Date( item.value);

                if( window.isSameWeek(date,new Date())==false)
                {
                   delarr.push(item);
                }
          }
      })});

       delarr.forEach((item,index)=>{res.data.remove(item)});
        
        res.data.forEach((item, index) => {
          item.img = new Image();

          arr.push(item);

          item.img.src = item.avatarUrl;
          item.img.onload = function () {
            that.draw();
          }

        });

      }
    });
  }

  setofflinecanvas()
  {

    let xx = 80;

    let ii = (window.v_height/10*6-60)/10;

    let ctx=rankcanvas.getContext("2d");

    let yy=0;

    ctx.clearRect(0,0,rankcanvas.width,rankcanvas.height); 

    let end=(page+1)*mode;

     for (var i = page* mode; i < arr.length; i++) 
    {
      if(i>=end)
      {
        break;
      }

      let index = i%mode;
      let item = arr[i];

      if (index % 2 == 1)
      {
        ctx.fillStyle = '#426066';
        ctx.fillRect(50, yy + index * ii, window.v_width - 100, ii);
      }
      else
      {
        ctx.fillStyle = '#425066';
      }

      // huan paiming
      ctx.font = 30 + "px serif";
      ctx.textAlign = "left";
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'white';
      ctx.fillText("" + (i + 1), xx, yy + index * ii + ii / 2);

      ctx.drawImage(
        item.img,
        xx + 50,
        yy + index * ii + 10,
        ii - 20,
        ii - 20,
      )
     
      //绘制名字
      ctx.fillStyle = 'white';
      ctx.fillText(item.nickname, xx + 30 + ii + 30, yy + index * ii + ii / 2);

       //绘制分数
       ctx.fillText(item.KVDataList[0].value,  window.v_width - 100-100, yy + index * ii + ii / 2);
 
    }
   
  }

  draw(data)
  {
   if( this.visible==false)
   {
     return;
   }

   let sharedCanvas = wx.getSharedCanvas();
   let ctx = sharedCanvas.getContext('2d');

   ctx.clearRect(0,0,sharedCanvas.width,sharedCanvas.height); 
   //排行榜名字 --好友排行
   //显示游戏时间
   //显示积分
   // ctx.font = 40 + "px serif";
   // ctx.textAlign = "center";
   // ctx.textBaseline = 'middle';
   // ctx.fillStyle = 'white';
   // ctx.fillText("好友排行", window.v_width / 2, window.v_height/20*3/2);

   // //面板
   // ctx.fillStyle = '#425066';
   // ctx.fillRect(50, window.v_height/20*3, window.v_width - 100, window.v_height / 10 * 6);


   // ctx.fillRect(50, window.v_height/20*3 + window.v_height / 10 * 6 + 20, window.v_width - 100, window.v_height / 10-20);

   // ctx.font = "20px serif";
   // ctx.textAlign = "left";
   // ctx.textBaseline = 'middle';
   // ctx.fillStyle = 'white';
   // ctx.fillText("每周一凌晨刷新", 80, window.v_height/20*3+window.v_height/40);

   let xx = 80;
   let yy = v_height/20*3+30;

   let ii =(window.v_height/10*6-60)/10;

  

   this.setofflinecanvas();

   ctx.drawImage(rankcanvas, 0, window.v_height/20*3+50, rankcanvas.width, rankcanvas.height);



   yy=window.v_height/20*3 + window.v_height / 10 * 6 + 20;
   yy +=((window.v_height / 10 -20)-ii)/2;

   for (var i = 0; i < arr.length; i++) {

     if (arr[i].openid != window.openid) {
       continue;
     }

     let img = arr[i].img;
     let index = i;
     let yy = 220 + window.v_height / 10 * 6 + 20;

     // huan paiming
     ctx.font = 30 + "px serif";
     ctx.textAlign = "left";
     ctx.textBaseline = 'middle';
     ctx.fillStyle = 'white';
     ctx.fillText("" + (index + 1), xx, yy + ii / 2);

     ctx.drawImage(
       img,
       xx + 50,
       yy + 10,
       ii - 20,
       ii - 20,
     )


     ctx.fillStyle = 'white';
     ctx.fillText(arr[i].nickname, xx + 30 + ii + 30, yy + index  + ii / 2);

     //绘制分数
     ctx.fillText(arr[i].KVDataList[0].value,  window.v_width - 100-100, yy + index  + ii / 2);



     break;
   }

 }


}