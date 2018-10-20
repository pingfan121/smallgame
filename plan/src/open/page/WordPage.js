import sprite from '../base/sprite'


let that = null

let arr = new Array();
let ownerdata=null;
let rankcanvas=wx.createCanvas();

let page =0;

let mode=9;

export default class WordPage extends sprite {
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

  show()
  {
    super.show();

    page=0;
    arr.length = 0;
  }
  //huoqupengyoushuju
   setWordData(result)
   {

        if(result.list!=null && result.list.length>0)
        {
            result.list.forEach((item, index) => {
            item.img = new Image();

            let temp =item;
    
            arr.push(item);
            
                wx.getUserInfo({
                openIdList: [item._openid],
                lang: 'zh_CN',
                success: (res => {
                    console.log('success', res.data[0]);

                    temp.nickName=res.data[0].nickName;

                    //下载图片
                    if(res.data[0].avatarUrl!="")
                    {
                        temp.img.src = res.data[0].avatarUrl;
                        temp.img.onload = function () {
                            that.draw();
                            console.log("下载好了11");
                            }
                    }

                    })
                } );
            });
        }


        if(result.mydata!=null)
        {
            ownerdata=result.mydata;
            ownerdata.rank=result.index;

            ownerdata.img = new Image();

            let temp =ownerdata;
    
            wx.getUserInfo({
            openIdList: [temp._openid],
            lang: 'zh_CN',
            success: (res => {

                temp.nickName=res.data[0].nickName;
                //下载图片
                if(res.data[0].avatarUrl!="")
                {
                    temp.img.src = res.data[0].avatarUrl;
                    temp.img.onload = function () {
                        that.draw();
    
                        console.log("下载好了22");
                        }
                }
               

                })
            });
          
        }
  }

  setofflinecanvas()
  {

    let xx = 80;

    let ii = (window.v_height/10*6-60)/10;

    let ctx=rankcanvas.getContext("2d");

    ctx.clearRect(0,0,rankcanvas.width,rankcanvas.height); 

    let yy=0;

  

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
      ctx.fillText(window.sliceText(item.nickName), xx + 30 + ii + 30, yy + index * ii + ii / 2);

       //绘制分数
       ctx.fillText(item.score,  window.v_width - 100-100, yy + index * ii + ii / 2);
 
    }
   
  }

  draw()
   {
    if( this.visible==false)
    {
      return;
    }

    let sharedCanvas = wx.getSharedCanvas();
    let ctx = sharedCanvas.getContext('2d');

    ctx.clearRect(0,0,sharedCanvas.width,sharedCanvas.height); 
   

    let xx = 80;
    let yy = v_height/20*3+30;

    let ii =(window.v_height/10*6-60)/10;

   

    this.setofflinecanvas();

    ctx.drawImage(rankcanvas, 0, window.v_height/20*3+50, rankcanvas.width, rankcanvas.height);



    yy=window.v_height/20*3 + window.v_height / 10 * 6 + 20;
    yy +=((window.v_height / 10 -20)-ii)/2;

   
      if(ownerdata==null)
      {
         return;
      }

      let img = ownerdata.img;
      yy = 220 + window.v_height / 10 * 6 + 20;

      // huan paiming
      ctx.font = 30 + "px serif";
      ctx.textAlign = "center";
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'white';
      ctx.fillText("" + ownerdata.rank, xx, yy + ii / 2);

      ctx.drawImage(
        img,
        xx + 50,
        yy + 10,
        ii - 20,
        ii - 20,
      )


      ctx.fillStyle = 'white';
      ctx.textAlign = "left";
      ctx.fillText(ownerdata.nickName, xx + 30 + ii + 30, yy   + ii / 2);

      //绘制分数
      ctx.fillText(ownerdata.score,  window.v_width - 100-100, yy   + ii / 2);



  }

}