<template>
	<div class="mine">
		<div class="header" @click="edit_info">
			<div class="head_img">
				<img :src="userInfo.avatarUrl"  alt="">
			</div>
			<div class="person_info">
				<div class="userinfo-nickname">
			     <p class="nickName">{{userInfo.nickName}}</p> 
			     <p>用户id：23348148</p>
			    </div>
			</div>
			<div class="edit_info">
				<p>修改个人资料
					<span class="zan-icon zan-icon-arrow"></span>
				</p>
			</div>
		</div>
		<div class="content">
			<div class="cont_item">
				<div class="zan-panel zan_panel">
			      <div class="zan-cell zan-cell--access">
			        <div class="zan-cell__bd"><span class="imgIcon imgIcon1"></span>我的关注</div>

			        <div class="zan-cell__ft"></div>
			      </div>
			      <div class="zan-cell zan-cell--access">
			        <div class="zan-cell__bd"><span class="imgIcon imgIcon2"></span>我的粉丝</div>
			        <div class="zan-cell__ft"></div>
			      </div>
			      <div class="zan-cell zan-cell--access">
			        <div class="zan-cell__bd"><span class="imgIcon imgIcon3"></span>我的评论</div>
			        <div class="zan-cell__ft"></div>
			      </div>
			      <div class="zan-cell zan-cell--access">
			        <div class="zan-cell__bd"><span class="imgIcon imgIcon4"></span>我的赞</div>
			        <div class="zan-cell__ft"></div>
			      </div>
			      <div class="zan-cell zan-cell--access">
			        <div class="zan-cell__bd"><span class="imgIcon imgIcon5"></span>设置</div>
			        <div class="zan-cell__ft"></div>
			      </div>
			      <div class="zan-cell zan-cell--access">
			        <div class="zan-cell__bd"><span class="imgIcon imgIcon6"></span>意见反馈</div>
			        <div class="zan-cell__ft"><button class="back_notice" open-type="contact">点击反馈</button></div>
			      </div>
			    </div>
			</div>
		</div>
		<div class="footer">
			
		</div>
	</div>
</template>
<script>
	import store from '../../store'
	export default {
		data(){
			return {
				userInfo: {}
			}
		},
		onShow(){
			 this.userInfo = global.user_info
			 console.log(global.user_info)
		},
		methods:{
			edit_info(){
			   const  url="../edit_info/main?userInfo="+this.userInfo.nickName+","+this.userInfo.avatarUrl
			   wx.navigateTo({ url })
			},
			getUserInfo () {
		      // 调用登录接口
		      wx.login({
		        success: () => {
		          wx.getUserInfo({
		            success: (res) => {
		              this.userInfo = res.userInfo
		              console.log("res")
		            }
		          })
		        }
		      })
    		}
    		
		},
		created () {
			    // 调用应用实例的方法获取全局数据
			    // this.getUserInfo()
			  }
	}
</script>
<style lang='stylus'>
	.header
		color #ffffff
		font-size 26rpx
		background-color #5acb9a
		padding 30rpx 22rpx
		display flex
		justify-content space-between
		.head_img
			width 100rpx
			height 100rpx
			img
				width 100%
				height 100%
				border-radius 50%
		.person_info
			margin-left -100rpx
			.nickName 
				font-size 34rpx
				font-weight 700
				margin-bottom 16rpx
		.edit_info
			display flex
			align-items center
	.content
		background-color #f7f7f7
		padding 14rpx 0	
		font-size 32rpx
		.cont_item
			background-color #fff
			.zan_panel
				margin 0
			.zan-cell__bd
				font-size 34rpx
				display flex
				align-items center
			.imgIcon
				display inline-block
				width 50rpx
				height 50rpx 
				color #5acb9a
				margin-right 16rpx
			.imgIcon1
				background url(../../../static/img/care@2x.png) center center no-repeat
				background-size 100% 100%
				
			.imgIcon2
				background url(../../../static/img/fensi@2x.png) center center no-repeat
				background-size 100% 100%
				
			.imgIcon3
				background url(../../../static/img/recommend@2x.png) center center no-repeat
				background-size 100% 100%
				
			.imgIcon4
				background url(../../../static/img/zan@2x.png) center center no-repeat
				background-size 100% 100%
				
			.imgIcon5
				background url(../../../static/img/set@2x.png) center center no-repeat
				background-size 100% 100%
				
			.imgIcon6
				background url(../../../static/img/idea@2x.png) center center no-repeat
				background-size 100% 100%
				
	.back_notice
		background-color #5acb9a
		border none	0	
		padding 0 20rpx
		height 64rpx 
		line-height 64rpx
		font-size 28rpx
		color #fff
</style>