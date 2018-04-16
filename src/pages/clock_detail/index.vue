<template>
	<div class="clock_detail">
		<div class="header">
			<div class="header_top">
				<div class="header_img">
					<img src="/static/img/header.jpg" alt="">
				</div>
				<div class="header_text">
					<p class="header_title">【每日一分钟】小编帮你学日语</p>
					<p class="header_cont">589人已参加<span class="space">|</span>500人已打卡</p>
				</div>
			</div>
			<div class="admin" v-if='team_leader' @click="clock_manager">
				<button class="admin_btn"><span class="tools_icon"></span>管理后台</button>
			</div>
		</div>
		<div class="notice">
			<div class="zan-panel notice_bar">
				<div class="notice_title">公告</div>
			    <zanbar v-on:ref="setRef" v-bind="movable"  :componentId="'movable'"/>
			</div>
		</div>
		<div class="tools">
			<div class="calander" @click="calendar">
				<p class="calander_img">
					<img src="/static/img/canader.png" alt="">
				</p>
				打卡日历
			</div>
			<div class="charts" @click="billboard">
				<p class="calander_img">
					<img src="/static/img/phb.png" alt="">
				</p>
				打卡排行
			</div>
			<div class="reset" @click="clock_set">
				<p class="calander_img">
					<img src="/static/img/reset.png" alt="">
				</p>
				打卡设置
			</div>
		</div>
		<div class="add_theme" v-if='team_leader'>
			<div class="add_btn" @click="add_theme">
				<span class="zan-icon zan-icon-add-o add_icon"></span>
				<span style="position:relative;top:-4rpx">添加打卡主题</span>
			</div>
		</div>
		<div class="theme">
			<div class="theme_title">
				<span class="zan-icon zan-icon-pending-deliver"></span>
				打卡主题
			</div>
			<div class="theme_cont">
				<div class="header_top">
					<div class="header_img">
						<img src="/static/img/header.jpg" alt="">
					</div>
					<div class="header_text">
						<p class="header_title">【每日一分钟】小编帮你学日语</p>
						<p class="header_cont"><span>2018/4/12</span></p>
					</div>
				</div>
				<div class="theme_detail" style="margin-top:20rpx;color:#666;">
					今日打卡要求，必须上传图片、语音、视频及打卡位置哦！
				</div>
			</div>
		</div>
		<div class="sec_tab">
			<div style="margin: 20px 0">
		      <ZanTab v-bind="tab1" :componentId="'tab1'" :handleZanTabChange="handleZanTabChange"/>
		    </div>
		</div>
		<div class="footer">
			<div class="clock_btn" @click='jump_diary'>
				<img src="/static/img/clock_btn.png" alt="">
			</div>
		</div>
	</div>
</template>
<script>
	import ZanTab from '../../components/zan/tab'
	import ZanNoticeBar from '../../components/zan/noticebar'
	export default {
		 components: {
		      zanbar: ZanNoticeBar,
		      ZanTab
		    },
		data(){
			return { 
				 movable: {
		          text: '生活赋予我们一种巨大的和无限高贵的礼品，这就是青春：充满着力量，充满着期待志愿，充满着求知和斗争的志向，充满着希望信心和青春。',
		          animationData: [],
		        },
		         tab1: {
			          list: [{
			            id: 'all',
			            title: '日记'
			          },{
			            id: 'send',
			            title: '详情'
			          }, {
			            id: 'sign',
			            title: '成员'
			          }],
			          scroll: false,
			          selectedId: 'all'
			        },
			    team_leader:null,

			}
		},
		onLoad(options){
			this.team_leader = parseInt(this.$root.$mp.query.team_lead) 
			console.log(typeof(this.team_leader))
		},
		methods:{

			 ...ZanNoticeBar.methods,
			 setRef: function (payload) {
		        console.log(payload)
		        setTimeout(() => {
		          var that = this
		          this.initZanNoticeBarScroll(that, 'movable')
		          this.initZanNoticeBarScroll(that, 'static1')
		        }, 500)
		     },
		      jump_diary(){
		      	const url="../publish_diary/main"
		      	wx.navigateTo({ url })
		      },
		      ...ZanTab.methods,
		      handleZanTabChange (e) {
		        const {componentId, selectedId} = e
		        this[componentId].selectedId = selectedId
		      },
		      add_theme(){
		      	wx.navigateTo({ url:"../add_theme/main" })
		      },
		      clock_manager(){
		      	wx.navigateTo({ url:"../clock_manager/main" })
		      },
		      calendar(){
		      	wx.navigateTo({ url:"../calendar/main" })
		      },
		       clock_set(){
		      	wx.navigateTo({ url:"../clock_set/main" })
		      },
		      billboard(){
		      	wx.navigateTo({ url:"../billboard/main" })
		      }
		}
	}
</script>
<style lang="stylus">
	.header
		background: linear-gradient(#444, #777);
		opacity 0.8
		padding 20rpx
		font-size 30rpx
		color #fff
	.header_top
		display flex
		justify-content flex-start
		.header_img
			width 210rpx 
			height 160rpx
			margin-right 20rpx
			img
				width 100%
				height 100%
				border-radius 4rpx
		.header_text
			width 60%
			box-sizing border-box
			display flex
			align-content space-between
			flex-direction column
			.header_cont
				margin 16rpx 0
				font-size 26rpx
				color #bbb
				margin-left 14rpx
				text-align left
				.space
					margin 0 14rpx
	.admin
		.admin_btn
			font-size 30rpx
			width 100%
			margin 20rpx auto
			height 80rpx
			line-height 80rpx
			color #fff
			background rgba(150,150,150,0.4) 
			border 1px solid #fff
			.tools_icon
				position relative
				top 4rpx
				margin-right 8rpx
				width 30rpx
				height 30rpx
				display inline-block
				background url("../../../static/img/guanli.png") left center no-repeat
				background-size 100% 100%
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
	.add_theme
		padding 45rpx 25rpx 30rpx 25rpx
		position relative
		&::after
			position absolute
			width 100%
			left 0
			top 0
			background-color #f3f3f3
			height 12rpx
			content ''
		.add_btn
			height 80rpx
			line-height 80rpx
			border 1px solid #5acb9a
			font-size 30rpx
			text-align center
			color #5acb9a
			.add_icon
				font-size 40rpx
				margin-right 10rpx
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
			margin-bottom 30rpx
			color #5acb9a
			span
				color #5acb9a
	.sec_tab
		margin-bottom 130rpx
		position relative
		&::after
			position absolute
			width 100%
			left 0
			top 0
			background-color #f3f3f3
			height 12rpx
			content ''
	.footer
		border-top 1px solid #bbb
		height 80rpx
		width 100%	
		position fixed
		left 0
		bottom 0
		z-index 999
		background-color #fff
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