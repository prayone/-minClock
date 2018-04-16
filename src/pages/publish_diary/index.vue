<template>
	<div class="publish_diary">
		<div class="header">
			<textarea class="textarea" name="diary" placeholder="说说今天的感想和收获吧...">
			</textarea>
			<div class="main_function">
				<div class="img" v-if='img_urls'>
					<div  v-for="(item,index) in img_urls" :key="item" class="main_photo">
						<img :src="item" alt="">
						<span @click='clear_img(index)' v-if='item' class="zan-icon zan-icon-clear clear"></span>
					</div>
					<div v-if='img_urls.length' class="addimg"  @click='add_img'>
						<img src="/static/img/add.png" alt="">
					</div>
				</div>
				<div class="main_record" v-if="!isRecord">
					<div class="start_record" v-if='start_record'>
						<div class="record_img" @click="over_record">
							<div class="record_mini">
							</div>
						</div>
						<div class="record_info">
							<p class="timer">定时器</p>
							<p class="record_text">录音时长10分钟以内</p>
						</div>
					</div>
					<!-- 播放录音 -->
					<div class="play_record" v-if="play_record">
						<div class="zan-panel zan_panel">
					      <div class="zan-cell">
					      	<div class="zan-cell__bd flexNone">
					        	<div class="play_record_img" @click="play_records">
									<img :src="play_init" alt="">
								</div>
					        </div>
					      	<div class="zan-cell__bd">
					        	<div class="zan-cell__text">
					        		<div class="record_info_play">
										<p class="record_text">点击可以播放录音</p>
									</div>
					        	</div>
					        </div>
					        <div class="zan-cell__ft">
					        	<div class="remove_record">
									<p class="remove_text" @click="remove_record">删除</p>
								</div>
					        </div>
					      </div>
					    </div>
					</div>

				</div>
				<!-- 视频 -->
				<div class="main_video" v-if="video_src">
					<video :src="video_src"></video>
					<div class="remove_video">
						<p class="remove_text" @click="remove_video">删除</p>
					</div>
				</div>
			</div>
			<div class="function">
				<div class="photo" v-if="!img_urls.length" @click='add_img'>
					<img src="/static/img/photo.png" alt="">
				</div>
				<div class="record" v-if="isRecord" @click="add_record">
					<img src="/static/img/record.png" alt="">
				</div>
				<div class="video" v-if="!video_src" @click="add_video">
					<img src="/static/img/video.png" alt="">
				</div>
			</div>
		</div>
		<div class="place">
			<div class="zan-panel" @click='getLocation'>
		      <div class="zan-cell zan-cell--access">
		      	<span class="zan-icon zan-icon-location"></span>
		        <div class="zan-cell__bd">所在位置</div>
		        <div class="zan-cell__ft">{{address}}</div>
		      </div>
		    </div>
		</div>
		<div>
			
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
	import QQMapWX from '../../assets/js/qqmap-wx-jssdk.min.js'
	// var  QQMapWX = require('../../assets/js/qqmap-wx-jssdk.min.js');
	export default {
		data(){
			return {
				qqmapsdk:null,
				img_urls:[],
				addimg:false,
				record_tempFilePath:'',
				start_record:false,
				play_record:false,
				isRecord:true,
				play_init:'/static/img/play_record.png',
				address:"address",
				video_src:''
			}
		},
		 onReady: function (e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
    this.audioCtx.setSrc('')
    this.audioCtx.play()
  },
		onLoad(){
			 // 实例化API核心类
	         this.qqmapsdk = new QQMapWX({
	            key: 'MRLBZ-7AQ35-SHHIU-QMQMQ-VFRU6-JMB5Z'
	        });
		},
		methods:{
			//获取位置
			getLocation(){
				var that=this
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
							    // 调用接口
								that.qqmapsdk.reverseGeocoder({
								    location: {
								        latitude: latitude,
								        longitude: longitude
								    },
								    success: function(res) {
								        console.log(res.result.address);
								        that.address = res.result.address
								    },
								    fail: function(res) {
								        console.log(res);
								    },
								    complete: function(res) {
								        console.log(res);
								    }
								});
							  }
							})
				        }
			        }
				})
			},
			//添加图片
			add_img(){
				var that=this
				wx.chooseImage({
					  count: 9, 
					  sizeType: ['compressed'], 
					  sourceType: ['album', 'camera'], 
					  success: function (res) {
					    that.img_urls=that.img_urls.concat(res.tempFilePaths)
					    //tempFilePaths是要上传给服务器的图片地址
					    // that.tempFilePaths = res.tempFilePaths
					    // console.log(that.img_urls)
					  }
				})
			},
			clear_img(index){
				this.img_urls.splice(index,1)
				console.log(this.img_urls)
			},
			add_record(){
				console.log("sssssssssss")
		      var that=this
		      this.start_record=true
		      this.isRecord=false
		      wx.startRecord({
		        success: function(res) {
		        	// 本地录音文件
		          that.record_tempFilePath = res.tempFilePath
		          console.log(that.record_tempFilePath)
		          wx.showModal({
					  title: '提示',
					  content: that.record_tempFilePath,
					  success: function(res) {
					    
					  }
					})
		          
		        },
		        fail: function(res) {
		           
		        }
		      })
		    },
		    over_record(){
		    	wx.stopRecord()
		    	this.start_record=false
		   		this.play_record=true
		    },
		    play_records(){
		    	console.log(99)
		    	this.play_init="/static/img/bofang.gif"
		    	var that=this
		    	wx.playVoice({
		        filePath: that.record_tempFilePath,
		        complete: function(){
		        }
		      })
		    },
		    remove_record(){
		    	this.record_tempFilePath=null
		      	this.isRecord=true
				this.play_record=false
		    },
		    add_video(){
		    	 var that = this
			        wx.chooseVideo({
			            sourceType: ['album','camera'],
			            maxDuration: 60,
			      camera: 'back',
			            success: function(res) {
			                that.video_src=res.tempFilePath
			            }
			        })
		    },
		    remove_video(){
		    	this.video_src=''
		    },

		}
	}
</script>
<style lang='stylus'>
img
	width 100%
	height 100%
.publish_diary
	.textarea
		height 250rpx
		font-size 28rpx
		width 90%
		border-bottom 1px solid #ddd
		padding 20rpx 40rpx
	.main_function
		.img
			padding 10rpx 20rpx
		.main_photo
			width 120rpx;
			height 120rpx
			margin-right 50rpx
			display inline-block
			position relative
			.clear
				color red
				position absolute
				right -10rpx
				top -10rpx
				background-color #fff
				border-radius 50%
		.addimg
			display inline-block
			width 120rpx
			height 120rpx
		.main_record
			padding 20rpx 0
		.start_record
			display flex
			justify-content flex-start 
			align-items center
			padding 0 20rpx
			
			.record_img
				width 50rpx
				height 50rpx
				border 1px solid #ddd
				border-radius 50%
				padding 10rpx
				margin-right 28rpx
				.record_mini
					width 50rpx
					height 50rpx
					border-radius 50%
					background-color red
			.record_text
				font-size 24rpx
				color #888
		.play_record
			.record_info_play
				color #999
			.flexNone 
				flex none
				border 1px solid #bbb
				margin-right 15rpx
				padding 20rpx
			.zan-cell__bd
			.play_record_img
				width 50rpx
				height 50rpx
			.remove_text
				border 1px solid red
				font-size 28rpx
				padding 10rpx 20rpx
				border-radius 5rpx
		.main_video
			display flex
			align-items center
			justify-content space-between
			padding 0 16rpx
			.remove_video
				.remove_text
					border 1px solid red
					font-size 28rpx
					padding 10rpx 20rpx
					border-radius 5rpx
			video
				width 70%
				height 400rpx
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