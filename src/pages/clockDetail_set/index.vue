<template>
	<div class="clockDetail_set">
		<div class="img_set">
			<p class="img_set_text">活动图片<span>（必填）</span></p>
			<div class="active_img">
				<img :src="img" alt="">
				<span class="edit_icon" @click='edit_img'>修改图片</span>
			</div>
		</div>
		<div class="title_set space">
			<p class="img_set_text">活动名称<span>（必填）</span></p>
			<input type="text">
		</div>
		<div class="detail_set space notice">
			<p class="img_set_text">公告设置</p>
			<input type="text">
		</div>
		<div class="detail_set space active_detail" >
			<p class="img_set_text ">活动详情</p>
			<textarea name="" id="" cols="30" rows="10"></textarea>
		</div>
		
		<div class="foot">
			<button class="button">保存设置</button>
		</div>
	</div>
</template>	
<script>
export default{
	data(){
		return {
			img:'/static/img/active_img.jpg'
		}
	},
	methods:{
		edit_img(){
			var that=this
				wx.chooseImage({
					  count: 1, 
					  sizeType: ['compressed'], 
					  sourceType: ['album', 'camera'], 
					  success: function (res) {
					    that.img=res.tempFilePaths
					    //tempFilePaths是要上传给服务器的图片地址
					    // that.tempFilePaths = res.tempFilePaths
					    // console.log(that.img_urls)
					  }
				})
		}
	}

}
</script>
<style lang='stylus'>
input 
	border 1px solid #ccc
	padding 10rpx
	margin 20rpx 0
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
.clockDetail_set
	font-size 30rpx
	color #333
	.img_set
		padding 25rpx
		.img_set_text
			span
				color red
		.active_img
			width 650rpx
			height 400rpx
			margin 20rpx auto
			span 
				position relative
				top -90rpx
				left 20rpx
				display inline-block
				color #fff
				background rgba(#222,0.5) 
				padding 10rpx
			img
				width 100%
				height 100%
	.title_set
		.img_set_text
			span
				color red
		
	.detail_set
		textarea
			border 1px solid #ccc
			padding 10rpx
			margin 20rpx auto
			height 200rpx
			width 90%
	.active_detail
		margin-bottom 200rpx
	.foot
		position fixed
		bottom 0
		width 100%
		.button
			background-color #5acb9a
			border-radius 0
			color #fff
</style>
