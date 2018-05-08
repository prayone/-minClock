<template>
	<div class="add_theme">
		<div class="theme_title">
			<input class="title_input" type="text" placeholder="请输入主题标题" v-model="theme_title">
		</div>
		<div class="theme_timer">
			<div class="zan-panel">
			  <picker mode="date" :value="date" start="2017-09-01" end="2018-09-01" @change="bindDateChange">
			    <div class="zan-cell zan-cell--access">
			        <div class="zan-cell__bd">主题时间</div>
			        <div class="zan-cell__ft picker">
			        	<span v-if="!date">请选择</span>{{date}}
			    	</div>
			      </div>
			  </picker>
		    </div>
		</div>
		
		<div class="index_page">
			<p class="index_title">编辑封面</p>
			<div class="index_img" >
				<div class="img_icon"  @click='add_img'>
					<img :src="img_url" alt="">
				</div>
				<span @click='clear_img' v-if='clear' class="zan-icon zan-icon-clear clear"></span>
			</div>
			<p class="index_title" style="margin-top:20rpx;">主题详情</p>
			<textarea class="textarea" name="theme" placeholder="说说今天主题的详细要求吧..." v-model="theme_desc">
			</textarea>
		</div>
		<div class="footer">
			<div class="all">
				<div class="cancle">
				取消
				</div>
				<div class="publish" @click="publish_theme">
					发布主题
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import  ajax  from '../../common/js/ajax.js'
	import  addImg  from '../../common/js/addImg.js'
	export default{
		data(){
			return {
				date:'',
				img_url:'/static/img/add.png',
				clear:'',
				tempFilePaths:'',
				theme_title:'',
				theme_timer:'',
				theme_desc:'',
				activityId:''
			}
		},
		onLoad(){
			this.activityId = this.$root.$mp.query.activityId
			
		},
		methods:{
			bindDateChange: function(e) {
			    console.log('picker发送选择改变，携带值为', e.mp.detail.value)
			    this.date = e.mp.detail.value
			},
			add_img(){
				var that=this
				wx.chooseImage({
					  count: 1, 
					  sizeType: ['compressed'], 
					  sourceType: ['album', 'camera'], 
					  success: function (res) {
					    that.img_url = res.tempFilePaths[0]
					    that.clear = true
					    //tempFilePaths是要上传给服务器的图片地址
					    that.tempFilePaths = res.tempFilePaths[0]
					    console.log('jjjjjjj',res.tempFilePaths[0])

					  }
					})
			},
			clear_img(){
				this.img_url = "/static/img/add.png"
				this.clear=false
			},
			publish_theme(){
				var that = this
				var data = {
					activityId:that.activityId,
                  	clockTheme:that.theme_title,
                  	themeDate:that.date,
                  	themeDesc:that.theme_desc
				}
				wx.uploadFile({
			      url: 'http://192.168.100.8:8081//wacc-wap-web/v1/miniprogram/insertClockThem.htm', //仅为示例，非真实的接口地址
			      filePath: that.tempFilePaths,
			      name: 'file',
			      formData:data,
			      success: function(res){
			       	console.log('LLLLLLLLLLLLLLL---',res)
			       	if(res.statusCode == 200){
			       		wx.showToast({
						  title: '发布成功',
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
			      }
			    })
			}
		}

	}
</script>
<style lang='stylus'>
	.theme_title
		font-size 30rpx
		width 100%
		background-color #f7f7f7
		padding 20rpx 0
		.title_input
			background-color #fff
			height 80rpx
			line-height 80rpx
			width 98%
			padding-left 25rpx
	.index_page
		padding 40rpx 25rpx
		font-size 28rpx
		position relative
		&::after
			position absolute
			width 100%
			left 0
			top 0
			background-color #f3f3f3
			height 12rpx
			content ''
		.index_title
			color #5acb9a
			margin-bottom 20rpx
		.textarea
			height 250rpx
			font-size 28rpx
			width 90%
			border-top 1px solid #ddd
			border-bottom 1px solid #ddd
			padding 20rpx 40rpx
		.index_img
			width 100%
			height 160rpx
			border 1px solid #5acb9a
			font-size 60rpx
			color #aaa
			display flex
			justify-content center
			align-items center
			.img_icon
				width 140rpx
				height 140rpx
				img 
					width 100%
					height 100%
			.clear
					color red
					font-size 34rpx
					position relative
					top 40rpx
					left 190rpx
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