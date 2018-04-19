<template>
  <div class="index">
    <div class="header">
      <div class="headerbg">
        <img src="/static/img/headerbg.png" alt=""> 
      </div>
      <div class="userinfo">
        <a href="../test/main">
          <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover"/>
        </a>
      </div>
    </div>
    <div class="content">
      <div class="clock" @click="new_clock">
          + 新建打卡
      </div>
      <div class="clock_item" @click="clock_detail(team_leader)">
           <div class="clock_img">
              <img src="/static/img/active_img.jpg" alt="">
           </div>
           <div class="cont">
               <p class="cont_title">
                活动名称
                <span v-if="team_leader" class="team_leader">群主</span>
              </p>
               <p class="cont_detail">
                 <img class="cont_icon" src="/static/img/alarm.png" alt="">
                 <span>19:34:00</span>
                 <img class="cont_icon icon_user" src="/static/img/user_min.png" alt="">
                 <span>18人已打卡</span>
               </p>
               
           </div>
           <div class="clock_btn">
             <button class="clock_button">打卡</button>
           </div>
      </div>
      <div class="clock_item" @click="clock_detail(0)">
           <div class="clock_img">
              <img src="/static/img/active_img.jpg" alt="">
           </div>
           <div class="cont">
               <p class="cont_title">活动名称</p>
               <p class="cont_detail">
                 <img class="cont_icon" src="/static/img/alarm.png" alt="">
                 <span>19:34:00</span>
                 <img class="cont_icon icon_user" src="/static/img/user_min.png" alt="">
                 <span>18人已打卡</span>
               </p>
               
           </div>
           <div class="clock_btn">
             <button class="clock_button">打卡</button>
           </div>
      </div>
    </div>
    <div class="diary_item">
      <div class="diary">
        <div class="diary_img">
          <img src="/static/img/header.jpg">
        </div>
        <div class="userinfo_diary">
          <p class="nickName">nickName</p>
          <p class="diary_timer"><span class="timer">22分钟前</span><span class="">已坚持6天</span></p>
        </div>
      </div>
      <div class="diary_detail">
        这里显示日记详情
      </div>
      <div class="zan-panel active">
          <div class="zan-cell zan-cell--access">
              <div class="zan-cell__bd active_all">
                <div class="active_img">
                  <img src="/static/img/active_img.jpg">
                </div>
                <div class="active_info">
                  <p style="margin-bottom:18rpx;">活动名称</p>
                  <p style="color:#888;font-size:24rpx">1233人已参加</p>
                </div>
              </div>
              <div class="zan-cell__ft">
              </div>
          </div>
      </div>
    </div>
    <div class="diary_item">
      <div class="diary">
        <div class="diary_img">
          <img src="/static/img/header.jpg">
        </div>
        <div class="userinfo_diary">
          <p class="nickName">nickName</p>
          <p class="diary_timer"><span class="timer">22分钟前</span><span class="">已坚持6天</span></p>
        </div>
      </div>
      <div class="diary_detail">
        今天的任务是学习日语
      </div>
      <div class="zan-panel active">
          <div class="zan-cell zan-cell--access">
              <div class="zan-cell__bd active_all">
                <div class="active_img">
                  <img src="/static/img/active_img.jpg">
                </div>
                <div class="active_info">
                  <p style="margin-bottom:18rpx;">活动名称</p>
                  <p style="color:#888;font-size:24rpx">1233人已参加</p>
                </div>
              </div>
              <div class="zan-cell__ft">
              </div>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import  ajax  from '../../common/js/ajax.js'
import store from '../../store'

export default {
  data () {
    return {
      userInfo: {},
      tempFilePath:'',
      team_leader:1,

    }
  },
  onShow(){
    this.getUserInfo()
    },
  
  methods: {
    new_clock () {
      const url = '../new_clock/main'
      wx.navigateTo({ url })
    },
    clock_detail(info){
      console.log(info)
      wx.navigateTo({url:'../clock_detail/main?team_lead='+info})
    },
    
    getUserInfo () {
      // 调用登录接口
      var that=this
          wx.getUserInfo({
            withCredentials:true,
            success: (res) => {
                  store.state.user_info = res.userInfo
                  that.userInfo = store.state.user_info
                  console.log('store.state.user_info',store.state.user_info)

                  var sessionId = wx.getStorageSync('session');
                  var param = {
                        url: '/v1/miniprogram/decrypt_user_info.htm',
                        setUpUrl: true,
                        data: {
                          encryptedData: res.encryptedData,
                          iv: res.iv,
                          sessionId: sessionId
                        },
                      } 
                  ajax(param).then(function(res){
                      console.log('res',res)
                     
                  },function(err){
                      console.log('err',err)
                      that.getSession(function (){
                        that.getUserInfo ()
                      })

                  })
            },
            fail(){
                  wx.navigateTo({url:'../authorize/main'})
            }
          })
        },
        // 获取session
    getSession (callback) {
      wx.login({
        success: function(res) {
           if (res.code) {
             var param = {
                  url: '/v1/miniprogram/login.htm',
                  data: { code: res.code },
                  setUpUrl: true,
                }
                ajax(param).then(function(res){
                    // console.log(res.data.data)
                    wx.setStorageSync('session', res.data.data);
                    callback && callback()
                })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    },
  },
    onPullDownRefresh () {                          
      wx.showNavigationBarLoading() //在标题栏中显示加载
      //模拟加载
      setTimeout(function () {
        // complete
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }, 1000)
    },
  created () {
    // 调用应用实例的方法获取全局数据
    this.getSession()
  },
  
}
</script>
<style lang='stylus' scoped>
    .header 
      position relative 
      margin-bottom 70rpx
    .headerbg
      width 100%
      height 70rpx
      img
        width 100%
        height 100%
    .userinfo
      width 100%
      text-align center
      position absolute
      top 10rpx
      left 0
      z-index 10
      .userinfo-avatar 
        width: 128rpx;
        height: 128rpx;
        border-radius: 50%;
    .content
      padding 24rpx
      .clock
        font-size 30rpx
        color #5acb9a
        margin-bottom 24rpx
      .clock_item
        border 1px solid #dddddd
        padding 20rpx
        display flex
        justify-content space-between
        margin-bottom 12rpx
        .clock_img
          width 160rpx 
          height 100rpx
          img
            width 100%
            height 100%
        .cont
          font-size 24rpx  
          color #999
          .cont_title
            font-size 28rpx
            color #111111
            margin-bottom 26rpx
            .team_leader
              display inline-block
              width 78rpx
              height 42rpx
              line-height 42rpx
              text-align center
              font-size 24rpx
              background-color #eaa246
              color #fff
              border-radius 6rpx
          .cont_detail
            .cont_icon
              width 30rpx
              height 30rpx
              margin-right 10rpx
              position relative
              top 5rpx
            .icon_user
              margin-left 16rpx
        .clock_btn
          display flex
          align-items center
          .clock_button
            width 120rpx 
            height 70rpx
            line-height 70rpx
            background-color #5acb9a
            color #fff
            font-size 30rpx
    .diary
      font-size 34rpx
      padding 45rpx 30rpx 0 30rpx
      display flex
      justify-content flex-start
      align-items center
      position relative
      &::after
        position absolute
        width 100%
        left 0
        top 0
        background-color #f3f3f3
        height 12rpx
        content ''
      .diary_img
        width 80rpx
        height 80rpx
        margin-right 40rpx
        img
          width 100%
          height 100%
          border-radius 50%
      .userinfo_diary
        .nickName
          color #5acb9a
          font-size 28rpx
        .diary_timer
          color #888
          font-size 24rpx
          margin-top 10rpx
          .timer
            margin-right 30rpx
    .diary_detail
      font-size 28rpx
      color #444
      padding 30rpx
    .active
      .active_all
        margin 0
        display flex
        justify-content flex-start
        align-items center
        .active_img
          width 140rpx
          height 100rpx
          margin-right 40rpx
          img
            width 100%
            height 100%
</style>
