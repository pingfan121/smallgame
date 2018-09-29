import './js/libs/weapp-adapter'
import './js/libs/symbol'
import './js/gamejs/GlobalVal'

import GameMain from './js/GameMain'


wx.showShareMenu();

wx.onShareAppMessage( function()
{

  let data=window.sharedata();

  console.log("主动转发数据:"+data);

  return data;
});



window.main = new GameMain();


//获取转发信息
wx.onShow(function (res) {
  let shareTicket = res.shareTicket;

  console.log("shareTicket:  " + res.shareTicket)
 
  //延迟200毫秒在显示群排行
  setTimeout(function () {
    window.main.showgroupRank(shareTicket);
  }, 200);

  window.playcount = 0;

  //登录
  // 登录
  wx.login({
    success: res => {
      // ------ 获取凭证 ------

      console.log("登录成功:"+res.code);
      var code = res.code;
      if (code) {
        // console.log('获取用户登录凭证：' + code);
        // ------ 发送凭证 ------
        wx.request({
          url: "https://api.weixin.qq.com/sns/jscode2session?appid=" + "wx5712d376ab114888" + "&secret=" + "26099883f80c3e74bb4983ee5d3c0b16" + "&js_code=" + code + "&grant_type=authorization_code",
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            if (res.statusCode == 200) {
              console.log("获取到的openid为：" + res.data.openid)

              let openDataContext = wx.getOpenDataContext();
              openDataContext.postMessage({ key: "openid", data: res.data.openid });
            } else {
              console.log("登录失败:"+res.errMsg)
            }
          },
          fail:function(res)
          {
            console.log("登录失败了:"+res);
          }
        })
      } else {
        console.log('获取用户登录失败：' + res.errMsg);
      }
    }
  })

})


let share_arr=[
  {
   title: '朋友,你旁边有人吗?没人的话快来一局打飞机呀!',
   imageUrl:"images/share.jpg"
  },
  {
    title: '朋友,还记得之前的经典游戏飞机大战吗?它又回来了',
    imageUrl:"images/share.jpg"
   }
]

let share_group_arr=[
  {
   title: '群成员打飞机的成绩快来看看吧',
   imageUrl:"images/share.jpg"
  },
  {
    title: '看看你在群里排第几,究竟谁在独领风骚',
    imageUrl:"images/share.jpg"
   }
]

//朋友,你旁边有人吗?没人的话快来一局打飞机呀!

//朋友,还记得之前的经典游戏飞机大战吗?它又回来了

//朋友,你想了解其他人打飞机的成绩吗? 快进来看一看吧

window.sharedata =function()
{

    //console.log("分享列表:"+share_arr);
    //console.log("列表长度:"+share_arr.length);

    let rand = parseInt(Math.random() * share_arr.length);

    //console.log("随机:"+a);

    let data=share_arr[rand];

   // console.log("数据:"+data);

     return data;
}

window.sharegroupdata =function()
{

    //console.log("分享列表:"+share_arr);
    //console.log("列表长度:"+share_arr.length);

    let rand = parseInt(Math.random() * share_group_arr.length);

    //console.log("随机:"+a);

    let data=share_group_arr[rand];

   // console.log("数据:"+data);

     return data;
}
