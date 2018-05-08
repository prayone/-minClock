<template>
	<div class="active_detail">
		<div class="img_set">
			<div class="active_img">
				<img src="/static/img/active_img.jpg" alt="">
			</div>
		</div>
		<div class="title">
			<p class="active_title">活动名称</p>
			<div class="active_des">
				<span>300人已参加</span>
				<span class="span_icon">|</span>
				<span>100人打卡</span>
			</div>
		</div>
		<div class="active_detail space">
			<p class="img_set_text">活动详情</p>
			<div class="detail_des">
				这里是活动详情的介绍，希望大家能坚持打卡。
			</div>
		</div>
		<div class="foot">
			<button class="button">立即参加</button>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				
			}
		},
		onLoad(options){
			this.activityID = this.$root.$mp.query.activityId
			console.log('nnnnnnnn',this.activityID)
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