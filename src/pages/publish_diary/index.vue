<template>
	<div class="publish_diary">
		<div class="header">
			<textarea class="textarea" name="diary" placeholder="说说今天的感想和收获吧..." v-model='words'>
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
							<p class="timer">{{min}}:{{sec}}</p>
							<p class="record_text">录音时长10分钟以内</p>
						</div>
					</div>
					<!-- 播放录音 -->
					<div class="play_record" v-if="play_record">
						<div class="zan-panel zan_panel">
					      <div class="zan-cell">
					      	<div class="zan-cell__bd flexNone" @click="Play">
					        	<div class="play_record_img">
									<img :src="(playStatus?'/static/img/bofang.gif':'/static/img/play_record.png')" alt="">
								</div>
					        </div>
					      	<div class="zan-cell__bd zan-cell__edit">
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
		        <div class="zan-cell__bd">{{address}}</div>
		        <div class="zan-cell__ft"></div>
		      </div>
		    </div>
		</div>
		<div class="footer">
			<div class="all">
				<div class="cancle">
				取消
				</div>
				<div class="publish" @click='publish_diary'>
					发表日记
				</div>
			</div>
		</div>
		<!-- <div style="width:100px;height:100px;display:inline-block!important;" v-for='(item,index) in imgUrls' :key='item'>
			<img style="width:100%;height:100%;" :src="item" alt="" @click="seeImg(index)">
		</div> -->
		
	</div>
</template>

<script>
	import  addImg  from '../../common/js/addImg.js'
	import  ajax  from '../../common/js/ajax.js'
	const recorderManager = wx.getRecorderManager()
	const innerAudioContext = wx.createInnerAudioContext()
	var timer
	export default {
		data(){
			return {
				img_urls:[],
				addimg:false,
				record_tempFilePath:'',
				start_record:false,
				play_record:false,
				isRecord:true,
				playStatus:false,
				address:"位置",
				video_src:'',
				count:0,
				temCount:0,
				imgUrls:['http://ww1.sinaimg.cn/large/eccb7e56ly1fqnqljyat3j2040040744.jpg','http://ww1.sinaimg.cn/large/eccb7e56ly1fqnqvts6bgj20dw098dfw.jpg','http://ww1.sinaimg.cn/large/eccb7e56ly1fqnqwi8h8rj20sg0g6wf1.jpg'],
				activityId:'',
				saveFile:'http://192.168.100.8:8081//wacc-wap-web/v1/miniprogram/saveFiles.htm',
				words:'',
				pic_arr:[],
				record_arr:'',
				video_arr:'',

			}
		},
		onLoad(options){
			this.activityId = this.$root.$mp.query.activityId
			this.img_urls=[]
			this.address='位置'
			this.record_tempFilePath=''
			this.video_src=''
			this.isRecord=true
			this.words= ''
			this.pic_arr=[]
			this.record_arr=''
			this.video_arr=''

		},
		computed:{
			min(){
				let m = parseInt(this.count/60) 
				if(m!=10){
					m = "0"+ m
				}
				return m
			},
			sec(){
				let s = this.count % 60
				if(s < 10){
					s = "0" + s
				}
				return s
			}
		},
		methods:{
			seeImg(index){
				addImg.previewImg(this.imgUrls[index],this.imgUrls)
			},
			//获取位置
			getLocation(){
				var that=this
				 wx.chooseLocation({
	        		success(res){
	        			if(res.name){
	        				that.address=res.name
	        			}else{
	        				that.address="您还没有选取位置"
	        			}
	        		},
	        		fail(){
	        			console.log('取消')
	        		}
	        	})		
			},
			//添加图片
			add_img(){
				var that=this
				addImg.addimg().then((res) => {
					that.img_urls = that.img_urls.concat(res.tempFilePaths)
					// 图片上传开始
					let url = that.saveFile
					for(let i in res.tempFilePaths){
						addImg.uploadImg(url,res.tempFilePaths[i],null).then((res) => {
							console.log(JSON.parse(res.data))
							var pic_url = JSON.parse(res.data).data.iconUrl
								that.pic_arr.push(pic_url)
						})
					}
					// 图片上传结束
				})
			},
			clear_img(index){
				this.img_urls.splice(index,1)
				this.pic_arr.splice(index,1)
				console.log("图片sever地址列表",this.pic_arr)
			},
			add_record(){
			    var that=this
			    that.isRecord=false
			    const options = {
	                  duration: 600000,
	                  sampleRate: 44100,
	                  numberOfChannels: 1,
	                  encodeBitRate: 192000,
	                  format: 'mp3',
	                  frameSize: 50
              	}
	            recorderManager.start(options);
	            recorderManager.onStart(() => {
	                that.start_record = true
	                timer = setInterval(()=>{
	                    this.count++
	                },1000)
                   console.log('recorder start')
               	})
		    },
		    over_record(){
		    	var that = this
	            recorderManager.stop();
	            recorderManager.onStop((res) => {
		            clearInterval(timer)
		            that.start_record = false
		            that.play_record = true
		            that.record_tempFilePath = res.tempFilePath
		            // 音频上传开始
					let url = that.saveFile
					addImg.uploadImg(url,that.record_tempFilePath,null).then((res) => {
						that.record_arr = JSON.parse(res.data).data.iconUrl
						console.log('===============',that.record_arr)

					})
					// 音频上传结束
	            })
		    },
		    Play(){
		    	var that = this
	            innerAudioContext.src = that.record_tempFilePath
	            if(that.playStatus){
	                that.playStatus = !that.playStatus
	                innerAudioContext.stop()
	            } else {
	                that.playStatus = !that.playStatus
	                innerAudioContext.play()
	                innerAudioContext.onEnded(() => {
	                    that.playStatus = false
	                })
	            }
		    },
		    remove_record(){
		    	this.record_tempFilePath=''
		    	this.record_arr=''
		      	this.isRecord=true
				this.play_record=false
				this.playStatus=false
		    },
		    add_video(){
		    	var that = this
			        wx.chooseVideo({
			            sourceType: ['album','camera'],
			            maxDuration: 60,
			        	camera: 'back',
			            success: function(res) {
			                that.video_src=res.tempFilePath
			                console.log(that.video_src)
			                 // 视频上传开始
							let url = that.saveFile
							addImg.uploadImg(url,that.video_src,null).then((res) => {
								that.video_arr = JSON.parse(res.data).data.iconUrl
								console.log(res)
							})
							// 视频上传结束
			            }
			        })
		    },
		    remove_video(){
		    	this.video_src = ''
		    	this.video_arr = ''
		    },
		    publish_diary(){
		    	var that = this
				var diary_param = {
			          	url: '/v1/miniprogram/insertClock.htm',
		                data: {
		                	activityId:that.activityId,
		                	clockWord:that.words,
		                	clockPic:(that.pic_arr).join(','),
		                	clockVoice:that.record_arr,
		                	clockVideo:that.video_arr,
		                	clockPosition:that.address
		                },
		                setUpUrl: true,
		        	}
		      	ajax(diary_param).then(function(res){
		      		console.log('ppp',res)
		      		if(res.statusCode == 200){
			       		wx.showToast({
						  title: '发表成功',
						  icon: 'success',
						  duration: 2000,
						  success(res){
						  	setTimeout(function(){
								wx.navigateBack({
								  delta:1
								})
					  		},1000)
						  }
						})
			       	}
		        })
		    }
		},
	}
</script>
<style lang='stylus'>
.timer
		color red
		font-size 28rpx
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
		margin-bottom 200rpx
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
		z-index 999
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