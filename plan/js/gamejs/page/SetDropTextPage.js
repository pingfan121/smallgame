//游戏开始之前的界面
import Button from '../../base/Button'
import sprite from '../../base/sprite'
import ColorSprite from '../../base/ColorSprite';

let that=null;

let words=new Array();

let btns=new Array();

let max=8;

let xx=60;

let s_panel = new ColorSprite('white', canvas.width-100, 40, 50, 340);

let s_share = new ColorSprite('#425066', canvas.width-100-180-20, 80, 50+180+20, 600,"点我添加掉落词组");

let s_back = new ColorSprite('#425066', 180, 80, 50, 600,"返回");

export default class SetDropTextPage extends sprite
 {
  constructor() 
  {
    super();
    that=this;

    //读取保存的数据
        try 
        {
          words = wx.getStorageSync('droptext');

          //console.log("words"+words);
      
            if (words == undefined || words=="") 
            {
              words = new Array();
              words.push("穷");
              words.push("焦虑");
              words.push("懒惰");
            }
      
        } 
         catch (e)
        {
          words = new Array();
          words.push("穷");
          words.push("焦虑");
          words.push("懒惰");
        }

        //console.log("words2:"+words);

    for(let i=0;i<max;i++)
    {
      let btn= new Button("images/jianhao.png", xx, xx);

      btn.btnclick=this.btnClick;

      btn.y=s_panel.y+20+xx*i;

      btn.x=s_panel.x+s_panel.width-xx-30;
      btns.push(btn);
    }

    s_share.btnclick=this.addWord.bind(this);
    s_back.btnclick=this.onback.bind(this);

    //键盘输入完成事件
    wx.onKeyboardConfirm( this.inputOver.bind(this));

    this.hide();
  }

  show(score,maxscore) {
    super.show();

    this.score=score;
    this.maxscore=maxscore;
  }

  btnClick(btn)
  {
    if(this.visible==false)
    {
      return;
    }

         btns.forEach((item,index) => {
           if(item==btn)
           {
             words.splice(index, 1);
             wx.setStorageSync("droptext",words);
             return false;
           }
         });
  }

  addWord()
  {

    if(this.visible==false)
    {
      return;
    }


    if(words.length>=max)
    {
      wx.showToast({
        title:"词组数量已经到达上限",
        icon:'none'
      })

      return ;
    }
    
     
    wx.showKeyboard({
      maxLength:6,
      multiple:false,
      confirmHold:false,
    })
    
  }

  //键盘输入完成
   inputOver(res)
   {

    if(words.length>=max)
    {
      return ;
    }

    if(res.value.length<=0 || res.value.length>6)
    {
      return;
    }

    words.push(res.value);

    wx.setStorageSync("droptext",words);

    return ;
       //检测是否输入的文字是否包含敏感字符

       //console.log(res);

       wx.showToast({
        title:res.value,
        icon:'none'
      })

       let text=res.value;

       wx.request({
        url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx5712d376ab114888&secret=26099883f80c3e74bb4983ee5d3c0b16', //仅为示例，并非真实的接口地址
        
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function(res) {
          //console.log(res.data)

          let {access_token} =res.data;

          wx.showToast({
            title:"成功",
            icon:'none'
          })

       
          that.checkText(access_token,text);

        },
        fail:function(err){
          //console.log(res.data);
          let aa =JSON.stringify(err);
         

          wx.showToast({
            title:"cuowu:"+aa,
            icon:'none'
          })

          //网络异常
        }
      })
   }

   //检测文本
   checkText(token,text)
   {

    //console.log("check:"+text);

    wx.request({
      url: 'https://api.weixin.qq.com/wxa/msg_sec_check?access_token='+token,
      method:'POST',
      data:{content:text},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        //console.log(res.data)

        let {errcode} =res.data;

        //console.log("错误码:"+errcode);

        if(errcode==0)
        {
          //成功了..

          //console.log("jiancechenggong");

          //console.log("text:"+text);

          words.push(text);

          wx.setStorageSync("droptext",words);

        }
        else
        {
          //console.log("内容含有违法违规内容");
        }

      },
      fail:function(res){
        //console.log(res.data);

        //网络异常
      }
    })
   }

   onback(e) 
  {
    if (this.visible == false)
    {
      return;
    }
     
    this.hide();

    window.main.showendpage(this.score,this.maxscore);

  }

  getarr()
  {
    return words;
  }


    draw(ctx)
    {
      if(this.visible==false)
      {
        return ;
      }

      ctx.fillStyle = '#343235';

      ctx.fillRect(0,0,750,1330);
      
      //本局得分
    ctx.font = "30px 宋体";
    ctx.fillStyle = 'white';
    ctx.textAlign = "center";
    ctx.textBaseline = 'middle';
    ctx.fillText("设置掉落文字", canvas.width / 2, 100);


      //本局得分
      ctx.font = "30px 宋体";
      ctx.fillStyle = 'white';
      ctx.textAlign = "center";
      ctx.textBaseline = 'middle';
      ctx.fillText("游戏里可以设置掉落的文字 ", canvas.width / 2, 200);

      ctx.font = "30px 宋体";
      ctx.fillStyle = 'white';
      ctx.textAlign = "center";
      ctx.textBaseline = 'middle';
      ctx.fillText("掉落长度最长是六个字", canvas.width / 2, 240);

      s_panel.height=40+words.length * xx;
      s_panel.draw(ctx);

      words.forEach((item,index) => 
      {
        ctx.font = "30px 宋体";
        ctx.fillStyle = 'black';
        ctx.textAlign = "left";
        ctx.textBaseline = 'middle';
        ctx.fillText(item,130 , 340+20+index*xx+xx/2);

        btns[index].show();
        btns[index].draw(ctx);
      });

      s_share.y=s_panel.y+s_panel.height+50;

      s_share.draw(ctx);

      s_back.y=s_panel.y+s_panel.height+50;

      s_back.draw(ctx);


   }
   
 }