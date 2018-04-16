<template>
	<div class="clock_set">
		<div class="zan-panel zan_panel">
	      <div class="zan-cell">
	        <div class="zan-cell__bd"><span class="zan-icon zan-icon-sign"></span>每日打卡提醒</div>
	      </div>
	      <div class="zan-cell">
	        <div class="zan-cell__bd"><span class="imgIcon imgIcon2"></span>提醒开启状态</div>
	        <div class="zan-cell__ft"><switch checked  @change="switch1Change"/></div>
	      </div>
	      <div class="zan-cell">
	        <div class="zan-cell__bd"><span class="imgIcon imgIcon3"></span>微信提醒通知时间</div>
	        <div class="zan-cell__ft">19:00</div>
	      </div>
	      <div class="remind">开启提醒后，每日打卡，第二天再提醒时间微信可接收到消息通知。</div>
	    </div>
	    <div class="btn zan-btns">
	    	<button class="zan-btn zan-btn--danger">删除并退出打卡</button>
	    </div>
	</div>
</template>
<script>
	export default {
		methods:{
			switch1Change: function(e) {
				    console.log('radio发生change事件，携带value值为：', e.mp.detail.value)
				}
		}
	}
</script>
<style lang='stylus'> 
	.zan-icon
  		font-size 30rpx
  		color #5acb9a
  		margin-right 20rpx
  	.clock_set
  		.remind
  			font-size 26rpx
  			color #888
  			padding 10rpx 18rpx
  		.btn
  			width 80%
  			margin 90rpx auto
  			.zan-btn
  				height 90rpx
  				line-height 90rpx
  				text-align center 
  				border-radius 10rpx
</style>