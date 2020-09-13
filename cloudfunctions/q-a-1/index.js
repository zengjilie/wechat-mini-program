// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({env:"tips-coronavirus-h8zry"})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  result = await db.collection('q-a').where({
    answer:{
      $regex:'.*'+ event.input,
      $options: 'i'
    }  
  }).get()
  
  return result
  

//   return {
//     event,
//     openid: wxContext.OPENID,
//     appid: wxContext.APPID,
//     unionid: wxContext.UNIONID,
//   }
}