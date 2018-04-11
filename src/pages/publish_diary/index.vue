<template>
	<div class="publish_diary">
		<div class="header">
			<textarea class="textarea" name="diary" placeholder="说说今天的感想和收获吧...">
			</textarea>
			<div class="function">
				<div class="photo">
					<img src="/static/img/photo.png" alt="">
				</div>
				<div class="record">
					<img src="/static/img/record.png" alt="">
				</div>
				<div class="video">
					<img src="/static/img/video.png" alt="">
				</div>
			</div>
		</div>
		<div class="place">
			<div class="zan-panel" @click='getLocation'>
		      <div class="zan-cell zan-cell--access">
		      	<span class="zan-icon zan-icon-location"></span>
		        <div class="zan-cell__bd">所在位置</div>
		        <div class="zan-cell__ft"></div>
		      </div>
		    </div>
		</div>
		<div class="footer">
			<div class="all">
				<div class="cancle">
				取消
				</div>
				<div class="publish">
					发表日记
				</div>
			</div>
			
		</div>
	</div>
</template>
<script>
	export default {
		data(){
			return {

			}
		},
		methods:{
			getLocation(){
				wx.getSetting({
				  success: (res) => {
				        console.log(res.authSetting['scope.userLocation']);
				        if(!res.authSetting['scope.userLocation']){
				        	wx.showModal({
							  title: '提示',
							  content: '小程序要获取您的地理位置',
							  success: function(res) {
							    if (res.confirm) {
							      wx.openSetting({
								      success: (res) => {
								        console.log(res);
								        console.log(res.authSetting['scope.userLocation']);
								        }
								   })
							    } else if (res.cancel) {
							      console.log('用户点击取消')
							    }
							  }
							})
							
				        }else{
				        	console.log("success")
				        	wx.getLocation({
							  type: 'gcj02', //返回可以用于wx.openLocation的经纬度
							  success: function(res) {
							    var latitude = res.latitude
							    var longitude = res.longitude
							    
							  }
							})
				        }
			        }
				})
				

				
			}
		},
	}
</script>
<style lang='stylus'>
.publish_diary
	.textarea
		height 250rpx
		font-size 28rpx
		width 90%
		border-bottom 1px solid #ddd
		padding 20rpx 40rpx
	.function	
		padding 20rpx 40rpx 
		.photo,.record,.video
			margin-right 16rpx
			display inline-block
			border 1px solid #cecece
			width 100rpx
			height 100rpx
			padding 20rpx
			box-sizing border-box
			border-radius 10rpx
			img
				width 100%
				height 100%
	.place
		position relative
		&::after
			position absolute
			width 100%
			left 0
			top 0
			background-color #f3f3f3
			height 12rpx
			content ''
		.zan-cell
			border-bottom 1px solid #ccc
			padding-top 40rpx
		.zan-icon
			margin-right 6rpx
			color #888
		.zan-cell__bd
			color #888
	.footer
		width 100%
		position fixed
		left 0
		bottom 0
		font-size 30rpx
		.all
			display flex
			justify-content flex-start
		.cancle,.publish
			width 38%
			height 100rpx
			line-height 100rpx
			background-color #aaa
			text-align center
			color #fff
		.publish
			width 62%
			background-color #5acb9a
			
</style>