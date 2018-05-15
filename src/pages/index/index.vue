<template>
  <div class="index">
    <div class="header">
      <div class="headerbg">
        <img src="/static/img/headerbg.png" alt=""> 
      </div>
      <div class="userinfo">
          <img class="userinfo-avatar" v-if="getuserInfo.avatarUrl" :src="getuserInfo.avatarUrl" background-size="cover"/>
      </div>
    </div>
    <div class="content">
      <div class="clock" @click="new_clock">
          + 新建打卡
      </div>
      <div class="active_big" v-for = "active in active_lists" :key='active'>
          <div class="clock_item" @click="clock_detail(!(active.userRole*1),active.activityId)">
             <div class="clock_img">
                <img :src="active.activityCoverPic" alt="">
             </div>
             <div class="cont">
                <p class="cont_title">
                    {{active.activityName}}
                </p>
                 <p class="cont_detail">
                   <img class="cont_icon" src="/static/img/alarm.png" alt="">
                   <span>{{active.clockRemindDate}}</span>
                   <img class="cont_icon icon_user" src="/static/img/user_min.png" alt="">
                   <span>{{active.clockCount}}人已打卡</span>
                 </p>
             </div>
             <form @submit="FormSubmit" report-submit="true">
               <div class="clock_btn">
                 <button class="clock_button" formType="submit">打卡</button>
               </div>
            </form>
             <img src="/static/img/qunzhu.png" alt="" v-if="!(active.userRole*1)" class="team_leader">
          </div>
      </div>
    </div>
    <div class="diary_item" @click='' v-for = "item in diary_lists" :key='item'>
      <div class="clockDiary">
          <div class="diary">
              <div class="diary_img">
                  <img :src="getuserInfo.avatarUrl">
              </div>
              <div class="userinfo_diary">
                  <p class="nickName">{{getuserInfo.nickName}}</p>
                  <p class="diary_timer"><span class="timer">{{item.clockDate}}</span><span class="">已坚持{{item.clockDay}}天</span></p>
              </div>
              <div style="margin-left:260rpx;" @click="diary_share(item.clockId)"><span class="share"></span></div>
          </div>
          <div class="diary_detail">
            <p>{{item.Word}}</p>
            <div class="flex_img">
                <div class="img_diary" v-for = "(pic_item,ind) in item.clockPic" :key='pic_item' v-if="item.clockPic.length">
                  <img :src="pic_item" alt="">
                </div>
                <div class="img_diary" v-if='item.clockVideo'>
                  <video id="myVideo" :src="item.clockVideo" controls></video>
                </div>
            </div>

            <div class="record" v-if='item.clockVoice'>
              <audio name="日记语音" :poster="poster" :author="getuserInfo.nickName" :src="item.clockVoice" id="myAudio" controls loop></audio>
            </div>
          </div>
      </div>
      <div class="zan-panel active">
          <div class="zan-cell">
              <div class="zan-cell__bd active_all">
                <div class="active_img">
                  <img :src="item.activityPic">
                </div>
                <div class="active_info">
                  <p style="margin-bottom:18rpx;">{{item.activityName}}</p>
                  <p style="color:#888;font-size:24rpx">{{item.activityUserCount}}人已参加</p>
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
import  dealFormIds  from '../../common/js/formIds.js'
import  addImg  from '../../common/js/addImg.js'
export default {
  data () {
    return {
      getuserInfo: {},
      tempFilePath:'',
      team_leader:1,
      active_lists:[],
      poster:'http://ww1.sinaimg.cn/large/eccb7e56ly1fr63qo6ylnj20m80m874w.jpg',
      // poster:'http://ww1.sinaimg.cn/large/eccb7e56ly1fr63xvy6y1j202s02saa2.jpg'
      diary_lists:[],
    }
  },

  onLoad(){
    var that = this
     wx.getUserInfo({
        success: function(res) {
          that.getuserInfo = res.userInfo
          global.user_info = res.userInfo
        }
      })
  },
  onShow(){
      this.showActives()
      this.showDiarys()
  },
  methods: {
    FormSubmit(e){
        let formId = e.mp.detail.formId;
        dealFormIds(formId).then(function(formIds){
        console.log('llll====',formIds);
      })
    },
    diary_share(diary_id){
      const url = '../share_diary/main?diary_id=' + diary_id
      wx.navigateTo({ url })
    },
    new_clock () {
      const url = '../new_clock/main'
      wx.navigateTo({ url })
    },
    clock_detail(info,activeId){
      wx.navigateTo({url:'../clock_detail/main?team_lead='+info+'&activeId='+activeId})
    },
    showDiarys(){
      var that = this
      // await getUserInfo()
      var param = {
          url: '/v1/miniprogram/showClockDesc.htm',
          data: {
          },
          setUpUrl: true,
      }
      ajax(param,'memberId').then(function(res){
            console.log('dairydairydairy',res)
            if(res.statusCode == 200){
              that.diary_lists = res.data.data
              console.log('=-------====',that.diary_lists)
            } 
        })
    },
     showActives(){
        var that = this
        // await getUserInfo()
        var param = {
            url: '/v1/miniprogram/showActivitys.htm',
            data: {
            },
            setUpUrl: true,
        }
        ajax(param,'memberId').then(function(res){
              console.log('hhhhhhhhhhhhh',res)
              if(res.statusCode == 200){
                that.active_lists = res.data.data
                // that.team_leader = parseInt(res.data.data.userRole)
                console.log('that',that.active_lists)
              } 
          })
    }
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
        position relative
        border 1px solid #dddddd
        padding 20rpx 20rpx
        display flex
        justify-content flex-start
        margin-bottom 25rpx
        align-items center
        .clock_img
          flex 1.5
          width 160rpx 
          height 100rpx
          img
            width 100%
            height 100%
        .team_leader
            position absolute
            top -15rpx
            right -10rpx
            display inline-block
            width 60rpx
            height 40rpx
            text-align center
        .cont
          flex 4
          font-size 24rpx  
          color #999
          margin-left 20rpx
          margin-right 15rpx
          .cont_title
            max-width: 860rpx;
            overflow: hidden;
            text-overflow: ellipsis;
            display:-webkit-box; 
            -webkit-box-orient:vertical;
            -webkit-line-clamp:2; 
            font-size 28rpx
            color #111111
            margin-bottom 16rpx
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
          flex 1
          display flex
          align-items center
          .clock_button
            width 90rpx 
            height 66rpx
            line-height 66rpx
            background-color #5acb9a
            color #fff
            font-size 28rpx
            border-radius 0
            padding 0
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
          font-size 30rpx
        .diary_timer
          color #888
          font-size 24rpx
          margin-top 10rpx
          .timer
            margin-right 30rpx
      .share
        width 50rpx
        height 50rpx
        display inline-block
        background url('http://ww1.sinaimg.cn/large/eccb7e56ly1fr7czqcz2xj200w00w0cu.jpg') center center no-repeat
        background-size 100% 100%
    .diary_detail
      font-size 30rpx
      color #444
      padding 30rpx 30rpx 0 30rpx
      .flex_img
        display flex
        justify-content space-between
        flex-wrap wrap
      .img_diary
        padding 10rpx
        border 1px solid #f7f7f7
        border-sizing border-box
        width 200rpx
        height 200rpx
        img
          width 100%
          height 100%
        video
          width 100%
          height 100%
      .location
        font-size 24rpx
        color #888
        margin-top 25rpx
        .zan-icon-location
          color 
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
