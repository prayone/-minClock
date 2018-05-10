<template>
	<div class="active_detail">
		<div class="img_set">
			<div class="active_img">
				<img :src="detail_lists.activityCoverPic" alt="">
			</div>
		</div>
		<div class="title">
			<p class="active_title">{{detail_lists.activityName}}</p>
			<div class="active_des">
				<span>{{detail_lists.activityUserCount}}人已参加</span>
				<span class="span_icon">|</span>
				<span>{{detail_lists.clockCount}}人打卡</span>
			</div>
		</div>
		<div class="active_detail space">
			<p class="img_set_text">活动详情</p>
			<div class="detail_des">
				{{detail_lists.activityDesc}}
			</div>
		</div>
		<div class="foot">
			<button class="button" @click='join'>立即参加</button>
		</div>
	</div>
</template>
<script>
	import  ajax  from '../../common/js/ajax.js'
	export default{
		data(){
			return {
			    detail_lists:{},
			    activityId:'',
			    memberId:''
			}
		},
		onLoad(options){
			this.memberId = wx.getStorageSync('memberId');
			this.activityId = this.$root.$mp.query.activityId
			var memberId = wx.getStorageSync('memberId');
			console.log('nnnnnnnn',this.activityId)
			var that = this
	      	var active_de_param = {
	          	url: '/v1/miniprogram/AshowActivity.htm',
	                data: {
	                  	activityId:that.activityId,
	                  	memberId:memberId
	                },
	                setUpUrl: true,
	        	}
	      	ajax(active_de_param).then(function(res){
	      		// console.log('99999999999',res)
	            that.detail_lists = res.data.data
	        })
		},
		methods:{
			join(){
				var that = this
		      	var active_de_param = {
		          	url: '/v1/miniprogram/insertUserClock.htm',
		                data: {
		                  	activityId:that.activityId,
		                  	memberId:that.memberId
		                },
		                setUpUrl: true,
		        	}
		      	ajax(active_de_param).then(function(res){
		      		if(res.statusCode == 200){
			       		wx.showToast({
						  title: '参加成功',
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
		      		console.log('99999999999',res)
		            
		        })
			}
		}
	}
</script>
<style lang="stylus">
.space
	margin 0
	position relative
	padding 25rpx
	&::after
		position absolute
		width 100%
		left 0
		top 0
		background-color #f3f3f3
		height 12rpx
		content ''
.active_detail
	font-size 30rpx
	color #333
	.img_set
		.img_set_text
			span
				color red
		.active_img
			width 100%
			height 420rpx
			margin 0 auto
			margin-bottom 20rpx 
			img
				width 100%
				height 100%
	.title
		margin-bottom 38rpx
		.active_title
			text-align center
			font-size 34rpx
			font-weight 700
			margin-bottom 10rpx
		.active_des
			text-align center
			color #888
			font-size 26rpx
			.span_icon
				margin 0 20rpx
	.img_set_text	
		margin-bottom 30rpx	
		font-weight 600
	.foot
		position fixed
		bottom 0
		width 100%
		.button
			background-color #5acb9a
			border-radius 0
			color #fff
</style>