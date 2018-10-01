import sprite from '../base/sprite'

let that = null;


let arr = new Array();
let arr2 = new Array();
let ww = (window.v_width - 100) / 3;

let totalcount = 0;
let currcount = 0;

export default class EndPage extends sprite {
  constructor() {
    super();
    that = this;

  }

  show() {
    super.show();
    this.getFriendData();
  }

  getFriendData() {

    arr.length = 0;
    arr2.length = 0;

    wx.getFriendCloudStorage({
      keyList: ['maxscore',"scoretime"],
      success: function (res) {
        
       
        //排序

        res.data.sort( (x, y) => {
          return -(x.KVDataList[0].value - y.KVDataList[0].value);
      });


      //删除不是这个星期的数据
        let delarr=[];

        res.data.forEach((item2, index) => {

          item2.KVDataList.forEach((item,index)=>{
            if(item!=null && item.key=="scoretime")
            {
                  let date=new Date( item.value);

                  if( window.isSameWeek(date,new Date())==true)
                  {
                     delarr.push(item2);
                     return false;
                  }
            }
        })});

         res.data=delarr;


         res.data.forEach((item, index) => {

          item.img = new Image();

          arr.push(item);

          item.img.src = item.avatarUrl;
          item.index = index+1;
          item.img.onload = function () {
            currcount++;
          }

          totalcount++;

        });

        that.getOwnerNearData();

        setTimeout(that.timecall, 200);

      }
    });
  }

  timecall() {

    that.draw();

    if (totalcount != currcount) {
      setTimeout(that.timecall, 200);
    }
  }



  draw(data) 
  {

    if( this.visible==false)
    {
      return;
    }

    let xx = 50;
    let yy = 400;

    let hh = 300;

    let sharedCanvas = wx.getSharedCanvas();
    let ctx = sharedCanvas.getContext('2d');

    //画面板
    ctx.fillStyle = '#425066';
    ctx.fillRect(50, yy, window.v_width - 100, hh);

    //画排行

    arr2.forEach((item, index) => {
      //if(item.openid==window.openid)
      //{
      //是自己 怎么画


      // }
      if (index % 2 == 1)
      {
        ctx.fillStyle = '#426066';
        ctx.fillRect(index * ww + 50, yy, ww, hh-60);
      }

      that.drawitem(ctx, item, index * ww + 50, yy);
    });

    //画分割线
    ctx.moveTo(50, yy + hh - 60);       //设置起点状态
    ctx.lineTo(window.v_width - 50, yy + hh - 60);       //设置末端状态
    ctx.lineWidth = 1;          //设置线宽状态
    ctx.strokeStyle = '#222';  //设置线的颜色状态
    ctx.stroke();               //进行绘制


    ctx.font = 20 + "px serif";
    ctx.textAlign = "left";
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'white';
    ctx.fillText("排行榜每周一刷新", xx + 20, yy + hh - 30);

    ctx.font = 20 + "px serif";
    ctx.textAlign = "right";
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'white';
    ctx.fillText("查看全部排行 >", window.v_width - 50 - 20, yy + hh - 30);


  }


  //宽


  drawitem(ctx, item, xxx, yyy) 
  {
    //画名次

    if(item==null)
    {
      return;
    }

 

    let iw = 60;

    ctx.font = 30 + "px serif";
    ctx.textAlign = "center";
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'white';
    ctx.fillText("" + item.index, xxx + ww / 2, yyy + 30);

    //画头像
    ctx.drawImage(
      item.img,
      xxx + (ww - iw) / 2,
      yyy + 60,
      iw,
      iw,
    )

    //  画昵称
    ctx.font = 25 + "px serif";
    ctx.textAlign = "center";
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'white';
    ctx.fillText("" + window.sliceText(item.nickname), xxx + ww / 2, yyy + 150);

    // haufenshu 

    ctx.font = 32 + "px serif";
    ctx.textAlign = "center";
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'white';
    ctx.fillText("" + item.KVDataList[0].value, xxx + ww / 2, yyy + 200);


  }


  //得到自己排行附近人的数据
  getOwnerNearData() {
    let index2 = -1;
    //算出来自己排第几
    arr.forEach((item, index) => {
      if (item.openid == window.openid) {
        index2 = index;
      }
    }

    );

    if (index2 == -1 || index2 == 0)
     {
      //没有自己数据 
      arr2.push(null);

      arr.forEach((item, index) => {

        if (index <= 1) {
          arr2.push(item);
        }
      });
    }
    else {
      arr.forEach((item, index) => {

        if (index >= index2 - 1 && index <= index2 + 1) {
          arr2.push(item);
        }
      });
    }

  }
}