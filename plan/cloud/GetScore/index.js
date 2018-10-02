// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init();

let db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {

  let openId = event.userInfo.openId;

  try {
    
      //还没有这个人的数据 插入

    let list = await db.collection('score').field({ _openid: true, score: true }).limit(50).get();

      //得到自己的数据

      let mydata = await db.collection('score').where({ _openid: openId }).field({_openid: true,score: true}).get();

      let index=-11;

      let ownerdata=null;

      if(mydata==null || mydata.data == null || mydata.data.length <=0 )
      {

      }
      else
      {

        let result =await db.collection('score').where({ score: db.command.gte(mydata.score), time: db.command.gt(mydata.time) }).count();

        index = result.total+1;

        ownerdata= mydata.data[0];
      }

      console.log("获取成功")
      return {list:list.data,mydata:ownerdata,index:index};
    
  }
  catch (e)
  {
    console.error(e)
  }
}