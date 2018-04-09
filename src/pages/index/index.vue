<template>
  <div class="">
    <div class="userinfo">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover"/>
    </div>
    <div class="content">
      <div class="clock" @click="new_clock">
          + 新建打卡
      </div>
      <div class="clock_item">
           <div class="clock_img">
              <img src="/static/img/header.jpg" alt="">
           </div>
           <div class="cont">
               <p class="cont_title">活动名称</p>
               <p class="cont_detail">
                 <img class="cont_icon" src="/static/img/alarm.png" alt="">
                 <span>19:34:00</span>
                 <img class="cont_icon icon_user" src="/static/img/user.png" alt="">
                 <span>18人已打卡</span>
               </p>
               
           </div>
           <div class="clock_btn">
             <button class="clock_button">打卡</button>
           </div>
      </div>
      <div class="clock_item">
           <div class="clock_img">
              <img src="/static/img/header.jpg" alt="">
           </div>
           <div class="cont">
               <p class="cont_title">活动名称</p>
               <p class="cont_detail">
                 <img class="cont_icon" src="/static/img/alarm.png" alt="">
                 <span>19:34:00</span>
                 <img class="cont_icon icon_user" src="/static/img/user.png" alt="">
                 <span>18人已打卡</span>
               </p>
               
           </div>
           <div class="clock_btn">
             <button class="clock_button">打卡</button>
           </div>
      </div>
      <div class="clock_item">
           <div class="clock_img">
              <img src="/static/img/header.jpg" alt="">
           </div>
           <div class="cont">
               <p class="cont_title">活动名称</p>
               <p class="cont_detail">
                 <img class="cont_icon" src="/static/img/alarm.png" alt="">
                 <span>19:34:00</span>
                 <img class="cont_icon icon_user" src="/static/img/user.png" alt="">
                 <span>18人已打卡</span>
               </p>
               
           </div>
           <div class="clock_btn">
             <button class="clock_button">打卡</button>
           </div>
      </div>
      <div class="clock_item">
           <div class="clock_img">
              <img src="/static/img/header.jpg" alt="">
           </div>
           <div class="cont">
               <p class="cont_title">活动名称</p>
               <p class="cont_detail">
                 <img class="cont_icon" src="/static/img/alarm.png" alt="">
                 <span>19:34:00</span>
                 <img class="cont_icon icon_user" src="/static/img/user.png" alt="">
                 <span>18人已打卡</span>
               </p>
               
           </div>
           <div class="clock_btn">
             <button class="clock_button">打卡</button>
           </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    new_clock () {
      const url = '../new_clock/main'
      wx.navigateTo({ url })
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    },
  },
  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
  }
}
</script>
<style lang='stylus' scoped>
.userinfo 
  display: flex;
  flex-direction: column;
  align-items: center;
  .userinfo-avatar 
    width: 128rpx;
    height: 128rpx;
    margin: 20rpx;
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
      width 100rpx 
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
      
       
</style>
