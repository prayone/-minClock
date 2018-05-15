<template>
	<div class="share_dairy">
		<div class="all">
			    <div class="diary_item">
  	          <div class="diary">
  	            <div class="diary_img">
  	              <img :src="userinfo.avatarUrl">
  	            </div>
  	            <div class="userinfo_diary">
  	              <p class="nickName">{{userinfo.nickName}}</p>
  	              <p class="diary_timer"><span class="timer">{{diary.clockDate}}</span><span class="">已坚持{{diary.clockDay}}天</span></p>
  	            </div>
  	          </div>
  	          <div class="share" >
      	    		<button open-type="share" class="share_btn" @click='share'>
      	    			分享
      	    		</button>
  	          </div>
	      	</div>
	      	<div class="diary_detail">
            <p>{{diary.clockWord}}</p>
            <div class="flex_img">
                <div class="img_diary" v-for = "(pic_item,ind) in diary.clockPic" :key='pic_item' v-if="diary.clockPic[0]">
                  <img :src="pic_item" alt="">
                </div>
                <div class="img_diary" v-if='diary.clockVideo'>
                  <video id="myVideo" :src="diary.clockVideo" controls></video>
                </div>
            </div>

            <div class="record" v-if='diary.clockVoice'>
              <audio name="日记语音" :poster="poster" :author="userinfo.nickName" :src="diary.clockVoice" id="myAudio" controls loop></audio>
            </div>
	        </div>
		</div>
        <footer class="footer">
        	<button open-type="share" plain="true" class="wx_group">
        		发送到微信群
        	</button>
        	<!-- <div class="firend common_class">分享到朋友圈</div> -->
        	<div class="back_index common_class" @click='back_index'>
        		<span class="zan-icon zan-icon-wap-home"></span>返回首页
        	</div>
        </footer>
	</div>
</template>
<script>
  import  ajax  from '../../common/js/ajax.js'
	export default{
        data(){
            return {
                diary_id:'',
                diary:{},
                userinfo:{}
            }
        },
        onLoad(options){
            this.diary_id = this.$root.$mp.query.diary_id
            console.log(this.diary_id)
            this.userinfo = global.user_info

        },
        onShow(){
          this.showDiary()
        },
		methods:{
			back_index(){
				wx.switchTab({
				  url: '/pages/index/main'
				})
			},
      showDiary(){
            var that = this
            var param = {
                url: '/v1/miniprogram/shareClockDesc.htm',
                data: {
                  clockId:that.diary_id
                },
                setUpUrl: true,
            }
            ajax(param).then(function(res){
                  if(res.statusCode == 200){
                        that.diary = res.data.data
                        console.log('=-------====',that.diary)
                  } 
              })
      }

		},
		onShareAppMessage: function (res) {
		    return {
		      title: '经典打卡',
		      path: '/pages/share_diary/main',
		      success: function(res) {
		        // 转发成功
		        console.log("转发成功")
		      },
		      fail: function(res) {
		        // 转发失败
		      }
		    }
	  	}
	}
</script>
<style lang="stylus">
  page
     background-color #f7f7f7
     .share_btn
        background-color #5acb9a
        font-size 30rpx
        color #fff
        padding 0
        height 55rpx
        line-height 55rpx
        width 100rpx
        border-radius 0
     .diary_item
        display flex
        justify-content space-between
        align-items center
     .diary
        font-size 34rpx
        padding 45rpx 30rpx 0 30rpx
        display flex
        justify-content flex-start
        align-items center
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
     .share
        margin-right 30rpx
     .footer
        font-size 30rpx
        position fixed
        width  100%
        bottom 0
        left 0
        display flex
        justify-content space-around
        align-items center
        border-top 1px solid #ddd
        padding 20rpx 0
        background-color #fff 
        .wx_group[plain]
            border 0
            padding 0 20rpx
            border-radius 0
            background-color #5acb9a
            margin 0
            color #fff
            height 70rpx
            line-height 70rpx
            box-sizing border-box
            font-size 30rpx
            text-align center
        .common_class
            text-align center
            width 240rpx
            background-color #5acb9a
            padding 0 20rpx
            color #fff
            height 70rpx
            line-height 70rpx
            box-sizing border-box
        .back_index
            background-color #f38863
            .zan-icon-wap-home
                margin-right 10rpx
                position relative
                bottom 3rpx
</style>
