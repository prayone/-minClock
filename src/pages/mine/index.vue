<template>
	<div class="mine">
		<div class="header">
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
				<div class="zan-panel">
			      <div class="zan-cell zan-cell--access">
			        <div class="zan-cell__bd"><span class="zan-icon zan-icon-gift-card-pay imgIcon"></span>我的关注</div>
			        <div class="zan-cell__ft"></div>
			      </div>
			      <div class="zan-cell zan-cell--access">
			        <div class="zan-cell__bd"><span class="zan-icon zan-icon-gift-card-pay imgIcon"></span>我的粉丝</div>
			        <div class="zan-cell__ft"></div>
			      </div>
			      <div class="zan-cell zan-cell--access">
			        <div class="zan-cell__bd"><span class="zan-icon zan-icon-gift-card-pay imgIcon"></span>我的评论</div>
			        <div class="zan-cell__ft"></div>
			      </div>
			      <div class="zan-cell zan-cell--access">
			        <div class="zan-cell__bd"><span class="zan-icon zan-icon-gift-card-pay imgIcon"></span>我的赞</div>
			        <div class="zan-cell__ft"></div>
			      </div>
			      <div class="zan-cell zan-cell--access">
			        <div class="zan-cell__bd"><span class="zan-icon zan-icon-gift-card-pay imgIcon"></span>设置</div>
			        <div class="zan-cell__ft"></div>
			      </div>
			      <div class="zan-cell zan-cell--access">
			        <div class="zan-cell__bd"><span class="zan-icon zan-icon-gift-card-pay imgIcon"></span>意见反馈</div>
			        <div class="zan-cell__ft"></div>
			      </div>
			    </div>
			</div>
		</div>
		<div class="footer">
			
		</div>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				userInfo: {}
			}
		},
		methods:{
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
			    this.getUserInfo()
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
		padding 10rpx 0	
		.cont_item
			background-color #fff
			.imgIcon
				color #5acb9a
				margin-right 16rpx
			
</style>