<template>
	<div class="clock_manager">
		<div class="header">
			<p class="active_name">{{lists.activityName}}</p>
			<p class="active_id">活动编号：<span class="common">{{lists.activityId}}</span></p>
		</div>
		<div class="content">
			<div class="data_info header">
				<p>昨日数据报告</p>
				<p class="data_timer">数据更新至:<span class="data_timer_date">{{lists.onTime}}</span></p>
			</div>
			<div class="zan-panel">
			    <div class="zan-cell ">
			        <div class="zan-cell__bd">用户总数</div>
			        <div class="zan-cell__ft picker">
			        	<span class="common">{{lists.activityUserCount}}</span>
			    	</div>
			      </div>
			      <div class="zan-cell ">
			        <div class="zan-cell__bd">已打卡人数</div>
			        <div class="zan-cell__ft picker">
			        	<span class="common">{{lists.clockCount}}</span>
			    	</div>
			      </div>
			      <div class="zan-cell ">
			        <div class="zan-cell__bd">访问人数</div>
			        <div class="zan-cell__ft picker">
			        	<span class="common">{{lists.accessPeople}}</span>
			    	</div>
			      </div>
			      <div class="zan-cell ">
			        <div class="zan-cell__bd">访问次数</div>
			        <div class="zan-cell__ft picker">
			        	<span class="common">{{lists.accessCount}}</span>
			    	</div>
			      </div>
		    </div>
		</div>
		<div class="notice_set" @click='click_set(activityID)'>
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
		    <div class="allUser" v-for='user in user_items' :key="user">
		    	<div class="user_item" >
			    	<div class="user_info">
			    		<img :src="user.headPic" alt="">
			    		<span class="nickName">{{user.nickName}}</span>
			    	</div>
			    	<div class="join_time all_class">
			    		<p>加入时间</p>
			    		<p class="common">{{user.joinDate}}</p>
			    	</div>
			    	<div class="join_time all_class">
			    		<p>总打卡天数</p>
			    		<p class="common">{{user.clockDay}}</p>
			    	</div>
			    	<div class="join_time all_class">
			    		<p>打卡日记数</p>
			    		<p class="common">{{user.clockDescCount}}</p>
			    	</div>
			    	<div class="join_time all_class">
			    		<p>最后一次打卡日期</p>
			    		<p v-if='user.clockDateEnd' class="common">{{user.clockDateEnd}}</p>
			    		<p v-if='!user.clockDateEnd' class="common">还未打过卡哦</p>
			    	</div>
			    	<div class="remove_user">
			    		<button class="zan-btn zan-btn--small zan-btn--warn" @click='remove(user.memberId)'>淘汰</button>
			    	</div>
			    </div>
		    </div>
		</div>

	</div>
</template>
<script>
import  ajax  from '../../common/js/ajax.js'
	export default {
		data(){
			return {
				activityID:'',
				lists:{},
				user_items:[]

			}
		},
		onLoad(options){
			this.activityID = this.$root.$mp.query.activityId
			console.log('nnnnnnnn',this.activityID)
			 var that = this
		      var param = {
		          url: '/v1/miniprogram/activityMessage.htm',
		                  data: {
		                    activityId:that.activityID
		                  },
		                  setUpUrl: true,
		      }
		      ajax(param,'memberId').then(function(res){
		            console.log('oooooooooooo',res)
		            if(res.statusCode == 200){
		              that.lists = res.data.data
		              // console.log('that',that.active_lists)
		            } 
		        })

		},
		onShow(){
			this.user_manager()
		},
		methods:{
			user_manager(){
				  var that = this
			      var param = {
			          url: '/v1/miniprogram/showActivityMemebr.htm',
			                  data: {
			                    activityId:that.activityID
			                  },
			                  setUpUrl: true,
			      }
			      ajax(param,'memberId').then(function(res){
			            if(res.statusCode == 200){
			              that.user_items = res.data.data
			              console.log('666',that.user_items)
			            } 
			        })
			},
			click_set(activityID){
				 wx.navigateTo({url:'../clockDetail_set/main?activityId=' + activityID})
			},
			remove(memberId){
				var that=this
				 var param = {
			          url: '/v1/miniprogram/deleteUser.htm',
			                  data: {
			                    activityId:that.activityID,
			                    memberId:memberId
			                  },
			                  setUpUrl: true,
			      }
			      ajax(param,'memberId').then(function(res){
			            console.log('oooooooooooo',res)
			            if(res.statusCode == 200){
			            	wx.showToast({
							  title: '已成功删除该成员',
							  icon: 'success',
							  duration: 2000,
							  success(res){
							  	setTimeout(function(){
									wx.switchTab({
										url:'/pages/index/main'
									})
						  		},1000)
							  }
							})
			            } 
			        })
			},
		}
	}
</script>
<style lang='stylus'> 
	Page
		background-color #f7f7f7
	.common
		color #5acb9a
	.header
		padding 20rpx 25rpx
		background-color #fff
		font-size 32rpx
		color #444
		margin-bottom 20rpx
		.active_name
			font-weight 600
		.active_id
			margin-top 20rpx
			font-size 24rpx
			color #888
	.data_info
		display flex
		justify-content space-between
		align-items center
		margin-bottom 0
		font-size 32rpx
		.data_timer
			color #888
			font-size 26rpx
			.data_timer_date
				color #5acb9a
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
