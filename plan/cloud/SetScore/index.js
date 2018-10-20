// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()


let db=cloud.database();

let lasttime = new Date().getMilliseconds();

let isSameWeek = function (old, now) {
  var oneDayTime = 1000 * 60 * 60 * 24;
  var old_count = parseInt(old.getTime() / oneDayTime);
  var now_other = parseInt(now.getTime() / oneDayTime);
  return parseInt((old_count + 4) / 7) == parseInt((now_other + 4) / 7);
}

// 获取用户的头像昵称


// 云函数入口函数
exports.main = async (event, context) => {

  console.log("yonghuxinxi:" + JSON.stringify(event.userInfo));
  
  //判断两个时间是不是同一周is
  if ( isSameWeek(lasttime, new Date())==false)
  {
    await db.collection('score').where().remove();
  }

  lasttime = new Date().getMilliseconds();

  let openId = event.userInfo.openId;
  event.data.time = lasttime;

  try {
    event.data._openid = openId;

  let data = await db.collection("score").where({
    _openid: openId
  }).get();

  console.log("data:"+JSON.stringify(data));

  if(data==null || data.data.length==0)
  {
    //还没有这个人的数据 插入
    
      await db.collection('score').add({
        // data 字段表示需新增的 JSON 数据
        data: event.data
      })

    

      return "插入成功";
  }
  else
  {
    //有了这个人的数据  更新
   
    await db.collection('score').where({ _openid: openId}).update({
        // data 字段表示需新增的 JSON 数据
        data: event.data
      })
    console.log("更新数据:" + event.data);
    return "更新成功";
  }
  }
  catch (e) {
    console.error(e)
  }
}

