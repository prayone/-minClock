<template>
	<div class="clock_detail">
		<div class="header">
			<div class="header_img">
				<img src="/static/img/header.jpg" alt="">
			</div>
			<div class="header_text">
				<p class="header_title">【每日一分钟】小编帮你学日语</p>
				<p class="header_cont">589人已参加<span class="space">|</span>500人已打卡</p>
			</div>
		</div>
		<div class="notice">
			<div class="zan-panel notice_bar">
				<div class="notice_title">公告</div>
			    <zanbar v-on:ref="setRef" v-bind="movable"  :componentId="'movable'"/>
			</div>
		</div>
		<div class="tools">
			<div class="calander">
				<p class="calander_img">
					<img src="/static/img/canader.png" alt="">
				</p>
				打卡日历
			</div>
			<div class="charts">
				<p class="calander_img">
					<img src="/static/img/phb.png" alt="">
				</p>
				打卡排行
			</div>
			<div class="reset">
				<p class="calander_img">
					<img src="/static/img/reset.png" alt="">
				</p>
				打卡设置
			</div>
		</div>
		<div class="theme">
			<div class="theme_title">
				<span class="zan-icon zan-icon-pending-deliver"></span>
				打卡主题
			</div>
			<div class="theme_cont">
				正在学【小编陪你学日语】
			</div>
		</div>
		<div class="sec_tab">
			
		</div>
		<div class="footer">
			<div class="clock_btn" @click='jump_diary'>
				<img src="/static/img/clock_btn.png" alt="">
			</div>
		</div>
	</div>
</template>
<script>
	import ZanNoticeBar from '../../components/zan/noticebar'
	export default {
		 components: {
		      zanbar: ZanNoticeBar
		    },
		data(){
			return {
				 movable: {
		          text: '生活赋予我们一种巨大的和无限高贵的礼品，这就是青春：充满着力量，充满着期待志愿，充满着求知和斗争的志向，充满着希望信心和青春。',
		          animationData: []
		        },
			}
		},
		methods:{
			...ZanNoticeBar.methods,
			setRef: function (payload) {
		        console.log(payload)
		        // this.initZanNoticeBarScroll = payload['movable'].initZanNoticeBarScroll
		        // this.scrollZanNoticeBar = payload['movable'].scrollZanNoticeBar
		        // 滚动通告栏需要initScroll
		        setTimeout(() => {
		          var that = this
		          this.initZanNoticeBarScroll(that, 'movable')
		          // initScroll的通告栏如果宽度足够显示内容将保持静止
		          this.initZanNoticeBarScroll(that, 'static1')
		          // 不进行initScroll的通告栏也将保持静止
		          // this.initZanNoticeBarScroll('static2');
		        }, 500)
		      },
		      jump_diary(){
		      	const url="../publish_diary/main"
		      	wx.navigateTo({ url })
		      }
		}
	}
</script>
<style lang="stylus">
	.header
		display flex
		justify-content flex-start
		background: linear-gradient(#444, #777);
		opacity 0.8
		padding 20rpx
		font-size 30rpx
		color #fff
		.header_img
			width 210rpx 
			height 140rpx
			margin-right 20rpx
			img
				width 100%
				height 100%
				border-radius 4rpx
		.header_text
			display flex
			align-content space-between
			flex-direction column
			.header_cont
				margin 16rpx 0
				font-size 26rpx
				color #bbb
				margin-left 14rpx
				text-align center
				.space
					margin 0 14rpx
	.notice_bar
		margin 0
		position relative
		.notice_title
			position absolute
			width 80rpx
			height 70rpx
			line-height 70rpx
			font-size 26rpx
			background-color #eaa246
			z-index 9
			color #fff
			text-align center
	.tools
		display flex
		justify-content space-between
		padding 20rpx
		font-size 24rpx
		color #555
		.calander
			text-align center
		.calander_img
			width 50rpx
			height 50rpx
			margin 6rpx auto
			img
				width 100%
				height 100%
	.theme
		padding 30rpx 20rpx
		font-size 26rpx
		color #444
		position relative
		&::after
			position absolute
			width 100%
			left 0
			top 0
			background-color #f3f3f3
			height 12rpx
			content ''
		.theme_title
			margin-bottom 20rpx
			span
				color #444
	.footer
		border-top 1px solid #bbb
		height 80rpx
		width 100%	
		position fixed
		left 0
		bottom 0
		.clock_btn
			background-color #fff
			z-index 777
			position relative
			bottom 40rpx
			margin 0 auto
			width 120rpx
			height 120rpx
			img 
				width 100%
				height 100%	
						
</style>