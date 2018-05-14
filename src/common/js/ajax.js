export default function ajax (params,flag) {
      //  flag用于判断是否用memberId
      var data ;
      let MemberId = wx.getStorageSync('memberId')
      console.log(MemberId)
      if(!MemberId){
            wx.redirectTo({url:'../authorize/main'})
      }
      if(flag){
            data = extend(params.data,{memberId:MemberId})
      } else {
            data = params.data
      }
      let url = params.setUpUrl === false ? params.url : 'https://wap.yunshuxie.com' + params.url
      if (!params.type) {
          params.type = 'get'
      }
      return new Promise((resolve, reject) => {
        wx.request({
          url: url,
          data: data,
          method: params.type,
          heaeder: {
            'content-type': 'application/json'
          },
          success (res) {
            if (params.dataType === 'jsonp') {
              res.data = JSON.parse(res.data.replace(/^callback\(|\)$/g, ''))
            }
            if (!params.verification) {
                if (res.data.returnCode === '0') {
                    resolve(res)
                } else {
                    console.log(url, ' => 错误原因 => ', res.data.returnCode, res.data.returnMsg)
                    reject(res.data.returnMsg)
                }
            }
              resolve(res)
          },
          fail (err) {
            reject(err)
          }
        })
      })
}
// extend函数
var extend = function(destination,source) {
    for(var property in source) {
        destination[property] = source[property]
    }
    return destination
  }
