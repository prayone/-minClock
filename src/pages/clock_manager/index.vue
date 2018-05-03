<template>
	<div class="clock_manager">
		<div class="header">
			<p class="active_name">打卡名称</p>
			<p class="active_id">活动编号：<span>741019</span></p>
		</div>
		<div class="content">
			<div class="data_info header">
				<p>昨日数据报告</p>
				<p class="data_timer">数据更新至:<span>2018/4/12</span></p>
			</div>
			<div class="zan-panel">
			    <div class="zan-cell ">
			        <div class="zan-cell__bd">用户总数</div>
			        <div class="zan-cell__ft picker">
			        	<span>100</span>
			    	</div>
			      </div>
			      <div class="zan-cell ">
			        <div class="zan-cell__bd">已打卡人数</div>
			        <div class="zan-cell__ft picker">
			        	<span>90</span>
			    	</div>
			      </div>
			      <div class="zan-cell ">
			        <div class="zan-cell__bd">访问人数</div>
			        <div class="zan-cell__ft picker">
			        	<span>400</span>
			    	</div>
			      </div>
			      <div class="zan-cell ">
			        <div class="zan-cell__bd">访问次数</div>
			        <div class="zan-cell__ft picker">
			        	<span>400</span>
			    	</div>
			      </div>
		    </div>
		</div>
		<div class="notice_set">
			<div class="zan-panel">
		      <div class="zan-cell zan-cell--access">
		        <div class="zan-cell__bd"><span class="zan-icon zan-icon-edit"> </span>公告设置</div>
		      </div>
		    </div>
			<input type="text" class="input" placeholder="请输入公告...">
		</div>
		<div class="notice_set" @click='click_set'>
			<div class="zan-panel">
		      <div class="zan-cell zan-cell--access">
		        <div class="zan-cell__bd"><span class="zan-icon zan-icon-edit"></span>打卡详情设置</div>
		       	<div class="zan-cell__ft click_set">点击设置</div>
		      </div>
		    </div>
		</div>
		<div class="user_manager">
			<div class="zan-panel">
		      <div class="zan-cell zan-cell--access">
		        <div class="zan-cell__bd"><img class="user_icon" src="/static/img/user.png" alt="">成员管理</div>
		      </div>
		    </div>
		    <div class="user_item">
		    	<div class="user_info">
		    		<img src="/static/img/header.jpg" alt="">
		    		<span class="nickName">prayone</span>
		    		<span class="user_id">用户编号:<span>87675</span></span>
		    	</div>
		    	<div class="join_time all_class">
		    		<p>加入时间</p>
		    		<p>2018-04-12 00:00:26</p>
		    	</div>
		    	<div class="join_time all_class">
		    		<p>总打卡天数</p>
		    		<p>23</p>
		    	</div>
		    	<div class="join_time all_class">
		    		<p>打卡日记数</p>
		    		<p>23</p>
		    	</div>
		    	<div class="join_time all_class">
		    		<p>最后一次打卡日期</p>
		    		<p>2018-4-12</p>
		    	</div>
		    	<div class="remove_user">
		    		<button class="zan-btn zan-btn--small zan-btn--warn">淘汰</button>
		    	</div>
		    </div>
		</div>

	</div>
</template>
<script>
	export default {
		methods:{
			user_manager(){

			},
			click_set(){
				 wx.navigateTo({url:'../clockDetail_set/main'})
			}
		}
	}
</script>
<style lang='stylus'> 
	Page
		background-color #f7f7f7
	.header
		padding 20rpx 25rpx
		background-color #fff
		font-size 32rpx
		color #444
		margin-bottom 20rpx
		.active_id
			margin-top 20rpx
			font-size 24rpx
			color #888
	.data_info
		display flex
		justify-content space-between
		align-items center
		margin-bottom 0
		.data_timer
			color #888
			font-size 28rpx
	.zan-panel	
		margin 0
		.zan-cell__bd
			color #555
	.notice_set
		background-color #fff
		margin 20rpx 0
		font-size 28rpx
		.zan-icon
			font-weight 800
			color #5acb9a
			margin-right 20rpx
		.input
			border-top 1px solid #ddd
			border-bottom 1px solid #ddd
			padding 20rpx 28rpx
		.click_set
			color #5acb9a
	.user_manager
		margin-top 20rpx
		background-color #fff
		.user_icon
			width 45rpx
			height 45rpx
			position relative
			top 10rpx
			margin-right 10rpx
		.user_item
			border-top 1px solid #dddddd	
			border-bottom 1px solid #dddddd	
			padding 0 20rpx
			.user_info
				border-bottom 1px solid #ddd
				font-size 28rpx
				padding-bottom 16rpx 
				img
					width 50rpx
					height 50rpx
					border-radius 50% 
					position relative 
					top 16rpx
				.nickName
					margin 0 28rpx 0 14rpx
				.user_id
					color #999
			.all_class
				font-size 28rpx
				color #999
				display flex
				align-items center
				justify-content space-between
				height 60rpx
			.remove_user
				text-align right
				margin 20rpx
					
</style>
