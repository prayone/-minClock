<template>
	<div class="clock_detail">
		<div class="header">
			<div class="header_top">
				<div class="header_img">
					<img :src="detail_lists.activityCoverPic" alt="">
				</div>
				<div class="header_text">
					<p class="header_title">{{detail_lists.activityName}}</p>
					<p class="header_cont">{{detail_lists.activityUserCount}}人已参加<span class="space">|</span>{{detail_lists.clockCount}}人已打卡</p>
				</div>
			</div>
			<form @submit="FormSubmit" report-submit="true">
               <div class="admin" v-if='team_leader' @click="clock_manager(activityID)">
					<button class="admin_btn" formType="submit"><span class="tools_icon"></span>管理后台</button>
				</div>
            </form>
			
		</div>
		<div class="notice">
			<div class="zan-panel notice_bar">
				<div class="notice_title">公告</div>
			    <ZanNoticeBar v-on:ref="setRef" v-bind="movable"  :componentId="'movable'"/>
			</div>
		</div>
		<div class="tools">
			<div class="calander" @click="calendar(activityID)">
				<p class="calander_img">
					<img src="/static/img/canader.png" alt="">
				</p>
				打卡日历
			</div>
			<div class="charts" @click="billboard(activityID)">
				<p class="calander_img">
					<img src="/static/img/phb.png" alt="">
				</p>
				打卡排行
			</div>
			<div class="reset" @click="clock_set(activityID)">
				<p class="calander_img">
					<img src="/static/img/reset.png" alt="">
				</p>
				打卡设置
			</div>
		</div>
		<div class="add_theme" v-if='team_leader'>
			<div class="add_btn" @click="add_theme(activityID)">
				<span class="zan-icon zan-icon-add-o add_icon"></span>
				<span style="position:relative;top:-4rpx">添加打卡主题</span>
			</div>
		</div>
		<div class="theme" v-if='theme_lists'>
			<div class="theme_title">
				<span class="zan-icon zan-icon-pending-deliver"></span>
				打卡主题
			</div>
			<div class="theme_cont">
				<div class="header_top">
					<div class="header_img">
						<img :src="theme_lists.themeCover" alt="">
					</div>
					<div class="header_text">
						<p class="header_title">{{theme_lists.clockTheme}}</p>
						<p class="header_cont">{{theme_lists.themeDate}}</p>
					</div>
				</div>
				<div class="theme_detail" style="margin-top:20rpx;color:#666;">
					{{theme_lists.themeDesc}}
				</div>
			</div>
		</div>
		<div class="sec_tab">
			<div style="margin: 20px 0">
		      	<ZanTab v-bind="tab1" :componentId="'tab1'" @change="handleZanTabChange"/>
		    </div>
		    <!-- 日记详情 -->
		    <div class="tab_cont tab_cont_diary" v-if="tab1.selectedId=='diary'">
		    	<div class="diary_item"  v-for = "item in diary_lists" :key='item'>
			      	<div class="clockDiary">
			          	<div class="diary">
				            <div class="diary_img">
				                <img :src="item.headPic">
				            </div>
				            <div class="userinfo_diary">
				                <p class="nickName">{{item.nickName}}</p>
				                <p class="diary_timer"><span class="timer">{{item.clockDate}}</span><span class="">已坚{{item.clockDay}}天</span></p>
				            </div>
			          	</div>
			          	<div class="diary_detail">
			            	<p>{{item.clockWord}}</p>
				            <div class="flex_img">
				                <div class="img_diary" v-for = "(pic_item,ind) in item.clockPic" :key='pic_item' v-if="item.clockPic.length">
				                  <img :src="pic_item" alt="">
				                </div>
				                <div class="img_diary" v-if='item.clockVideo'>
				                  <video id="myVideo" :src="item.clockVideo" controls></video>
				                </div>
				            </div>
				            <div class="record" v-if='item.clockVoice'>
				              	<audio name="日记语音" :poster="poster" :author="item.activityName" :src="item.clockVoice" id="myAudio" controls loop></audio>
				            </div>
			          </div>
			      	</div>
			    </div>
		    </div>
		    <!-- 活动详情 -->
		    <div class="tab_cont tab_cont_detail" v-if="tab1.selectedId=='detail'">
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
						<span>{{detail_lists.clockCount}}人已打卡</span>
					</div>
				</div>
				<div class="active_detail space">
					<p class="img_set_text">活动详情</p>
					<div class="detail_des">
						{{detail_lists.activityDesc}}
					</div>
				</div>
		    </div>
		    <!-- 用户信息 -->
		    <div class="tab_cont tab_cont_user" v-if="tab1.selectedId=='user'">
		    	<div class="zan-panel" v-for='user in user_lists' :key="user">
				    <div class="zan-cell zan-cell--access">
				        <div class="zan-cell__bd flexNone header_img">
				        	<img :src="user.headPic" alt="">
				        </div>
				        <div class="zan-cell__bd nickName">{{user.nickName}}</div>
				        <div class="join_time">
				        	<span>{{user.joinDate}}&nbsp;加入</span>
				    	</div>
				    </div>
			    </div>
		    </div>
		    
		   
		</div>
		<div class="footer">
			<div class="clock_btn" >
				<img v-if='!isClock' src="/static/img/clock_btn.png" alt="" @click='jump_diary(activityID)'>
				<img v-if='isClock' src="/static/img/yidaka.png" alt="">
			</div>
		</div>
	</div>
</template>
<script>
	import ZanTab from '../../components/zan/tab'
	import ZanNoticeBar from '../../components/zan/noticebar'
	import  ajax  from '../../common/js/ajax.js'
	import  dealFormIds  from '../../common/js/formIds.js'


	export default {
		 components: {
		      ZanNoticeBar,
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
			            id: 'diary',
			            title: '日记'
			          },{
			            id: 'detail',
			            title: '详情'
			          }, {
			            id: 'user',
			            title: '成员'
			          }],
			          scroll: false,
			          selectedId: 'detail'
			        },
			    team_leader:null,
			    isClock:0,
			    detail_lists:{},
			    theme_lists:{},
			    diary_lists:[],
			    user_lists:[],
			    activityID:'',
			}
		},
		onLoad(options){
			this.isClock=0
			this.detail_lists = {}
			console.log('idididd',this.$root.$mp.query.activeId)
			this.activityID = this.$root.$mp.query.activeId

			if(this.$root.$mp.query.team_lead == 'true'){
				this.team_leader = true
			} else {
				this.team_leader = false
			}
	        this.showTheme()
	        this.isclock()

			var that = this
	      	var active_de_param = {
	          url: '/v1/miniprogram/showActivity.htm',
	                  data: {
	                  	activityId:that.activityID
	                  },
	                  setUpUrl: true,
	        }
	      	ajax(active_de_param,'memberId').then(function(res){
	            that.detail_lists = res.data.data
	            that.movable.text = res.data.data.activityNotice
	        })
		},
		onShow(){
	        this.showTheme()
	        this.isclock()
	        this.showDiarys()
	        this.showUser()
		},
		methods:{
			FormSubmit(e){
		        let formId = e.mp.detail.formId;
		        dealFormIds(formId).then(function(formIds){
		        console.log('llll====',formIds);
		      })
		    },
			isclock(){
				var that = this
				var theme_param = {
		          url: '/v1/miniprogram/checkClock.htm',
		                  data: {
		                  	activityId:that.activityID
		                  },
		                  setUpUrl: true,
		        }
		      	ajax(theme_param,'memberId').then(function(res){
		      		console.log('isclock---',res)
		      		console.log('isclock---',res.data.data.clockNmber)
		      		if(res.data.data.clockNmber == '1'){
		      			that.isClock = 0
		      		}else{
		      			that.isClock = 1
		      		}
		        })
			},
			showTheme(){
				var that = this
				var theme_param = {
		          url: '/v1/miniprogram/showClockThem.htm',
		                  data: {
		                  	activityId:this.activityID
		                  },
		                  setUpUrl: true,
		        }
		      	ajax(theme_param).then(function(res){
		      		console.log('hhhhuuuuiii',res)
		            that.theme_lists = res.data.data
		        })
			},
			showDiarys(){
		        var that = this
		        var param = {
		            url: '/v1/miniprogram/showActivityClockDesc.htm',
		                    data: {
		                      activityId:that.activityID   

		                    },
		                    setUpUrl: true,
		        }
		        ajax(param).then(function(res){
		              console.log('dairydairydairy',res)
		              if(res.statusCode == 200){
		                that.diary_lists = res.data.data
		                console.log('that.diary_lists====',that.diary_lists)
		              } 
		          })
		  	},
		  	showUser(){
		        var that = this
		        var param = {
		            url: '/v1/miniprogram/showActivityMemebr.htm',
		                    data: {
		                      activityId:that.activityID
		                    },
		                    setUpUrl: true,
		        }
		        ajax(param).then(function(res){
		              console.log('dairydairydairy',res)
		              if(res.statusCode == 200){
		                that.user_lists = res.data.data
		                console.log('that====',that.user_lists)
		              } 
		          })
		  	},
			 ...ZanNoticeBar.methods,
			 setRef: function (payload) {
		        setTimeout(() => {
		          var that = this
		          this.initZanNoticeBarScroll(that, 'movable')
		        }, 500)
		     },
		      jump_diary(activityID){
		      	const url="../publish_diary/main?activityId=" + activityID
		      	wx.navigateTo({ url })
		      },
		      ...ZanTab.methods,
		      handleZanTabChange (e) {
		      	console.log('eeeeeee',e)
		        const {componentId, selectedId} = e
		        this[componentId].selectedId = selectedId
		        console.log(">>>",this.tab1.selectedId)
		        console.log("e.selectedId",e.selectedId)
		      },
		      add_theme(activityID){
		      	wx.navigateTo({ url:"../add_theme/main?activityId=" + activityID})
		      },
		      clock_manager(activityID){
		      	wx.navigateTo({ url:"../clock_manager/main?activityId=" + activityID })
		      },
		      calendar(activityID){
		      	wx.navigateTo({ url:"../calendar/main?activityId=" + activityID })
		      },
		       clock_set(activityID){
		      	wx.navigateTo({ url:"../clock_set/main?activityId=" + activityID })
		      },
		      billboard(activityID){
		      	wx.navigateTo({ url:"../billboard/main?activityId=" + activityID })
		      }
		},
		onUnload(){
			this.theme_lists = {}
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
		.tab_cont
			// border 1px solid red
		.tab_cont_diary
			.diary_item
				border-bottom 1px solid #ddd
			.diary
				font-size 34rpx
				padding 45rpx 30rpx 0 30rpx
				display flex
				justify-content flex-start
				align-items center
			.diary_img
				width 80rpx
				height 80rpx
				margin-right 40rpx
				img
					width 100%
					height 100%
					border-radius 50%
			.userinfo_diary
				.nickName
					color #5acb9a
					font-size 28rpx
				.diary_timer
					color #888
					font-size 24rpx
					margin-top 10rpx
				.timer
					margin-right 30rpx
			.diary_detail
				font-size 30rpx
				color #444
				padding 30rpx 30rpx 0 30rpx
				.flex_img
					display flex
					justify-content space-between
					flex-wrap wrap
				.img_diary
					padding 10rpx
					border 1px solid #f7f7f7
					border-sizing border-box
					width 200rpx
					height 200rpx
					img
						width 100%
						height 100%
					video
						width 100%
						height 100%
					.location
						font-size 24rpx
						color #888
						margin-top 25rpx
						.zan-icon-location
							color 
		.tab_cont_detail
			font-size 30rpx
			color #333
			padding 0 25rpx
			.img_set
				.img_set_text
					span
						color red
				.active_img
					width 95%
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
		.tab_cont_user
			.flexNone
				flex none
				margin-right 30rpx
			.header_img
				width 100rpx
				height 100rpx
				img
					width 100%
					height 100%
					border-radius 50%
			.nickName
				color #197dbc
			.join_time
				color #999
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