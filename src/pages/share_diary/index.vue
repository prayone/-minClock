<template>
	<div class="share_dairy">
		<div class="all">
			<div class="diary_item">
	          <div class="diary">
	            <div class="diary_img">
	              <img src="/static/img/header.jpg">
	            </div>
	            <div class="userinfo_diary">
	              <p class="nickName">nickName</p>
	              <p class="diary_timer"><span class="timer">2018-4-1</span><span class="">已坚持6天</span></p>
	            </div>
	          </div>
	          <div class="share" @click='share'>
	    		<button open-type="share" class="share_btn">
	    			分享
	    		</button>
	          </div>
	         
	      	</div>
	      	<div class="diary_detail">
	            今天的任务是学习日语
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
	export default{
		methods:{
			back_index(){
				wx.switchTab({
				  url: '/pages/index/main'
				})
			},
				
		},
		onShareAppMessage: function (res) {
		    if (res.from === 'button') {
		      // 来自页面内转发按钮
		      console.log(res.target)
		    }
		    return {
		      title: '经典打卡',
		      path: '/pages/share_dairy/main',
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
        font-size 32rpx
        color #444
        padding 30rpx
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
