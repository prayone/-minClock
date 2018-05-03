<template>
	<div class="find">
		<div class="header">
			<div class="search">
				<input type="text" class="input" placeholder="请输入搜索内容">
				<span class="zan-icon zan-icon-search search_icon"></span>
			</div>
			
		</div>
		<div class="content">
			<div class="clock_item" @click='jump_detail'>
	           <div class="clock_img">
	              <img src="/static/img/header.jpg" alt="">
	           </div>
	           <div class="cont">
	               <p class="cont_title">诗词天天读</p>
	               <p class="cont_detail">
	                 坚持打卡每一天
	               </p>
	               <p class="cont_text">
	               	<span>52人参加</span>
	               	<span class="fuhao">|</span>
	               	<span>104次打卡</span>
	               </p>
	           </div>
	      	</div>
	      	<div class="clock_item">
	           <div class="clock_img">
	              <img src="/static/img/header.jpg" alt="">
	           </div>
	           <div class="cont">
	               <p class="cont_title">诗词天天读</p>
	               <p class="cont_detail">
	                 坚持打卡每一天
	               </p>
	               <p class="cont_text">
	               	<span>52人参加</span>
	               	<span class="fuhao">|</span>
	               	<span>104次打卡</span>
	               </p>
	           </div>
	      	</div>
	      	<div class="clock_item">
	           <div class="clock_img">
	              <img src="/static/img/header.jpg" alt="">
	           </div>
	           <div class="cont">
	               <p class="cont_title">诗词天天读</p>
	               <p class="cont_detail">
	                 坚持打卡每一天
	               </p>
	               <p class="cont_text">
	               	<span>52人参加</span>
	               	<span class="fuhao">|</span>
	               	<span>104次打卡</span>
	               </p>
	           </div>
	      	</div>
	      	<div class="clock_item">
	           <div class="clock_img">
	              <img src="/static/img/header.jpg" alt="">
	           </div>
	           <div class="cont">
	               <p class="cont_title">诗词天天读</p>
	               <p class="cont_detail">
	                 坚持打卡每一天
	               </p>
	               <p class="cont_text">
	               	<span>52人参加</span>
	               	<span class="fuhao">|</span>
	               	<span>104次打卡</span>
	               </p>
	           </div>
	      	</div>
	      	<div class="clock_item">
	           <div class="clock_img">
	              <img src="/static/img/header.jpg" alt="">
	           </div>
	           <div class="cont">
	               <p class="cont_title">诗词天天读</p>
	               <p class="cont_detail">
	                 坚持打卡每一天
	               </p>
	               <p class="cont_text">
	               	<span>52人参加</span>
	               	<span class="fuhao">|</span>
	               	<span>104次打卡</span>
	               </p>
	           </div>
	      	</div>
		</div>
	</div>
</template>
<script>
export default{
	data(){
		return {

		}
	},
	methods:{
		jump_detail(){
			wx.navigateTo({url:'../active_detail/main'})
		}
	}
}
</script>
<style lang="stylus">
	.find
		
		font-size 28rpx
		color #777
		.header
			padding 24rpx
			background-color #fafafa
		.search
			margin 0 20rpx
			width 100%
			display flex
			justify-content flex-start
			.input
				display inline-block
				border 1px solid #ddd
				width 75%
				height 80rpx
				padding 8rpx 30rpx
				box-sizing border-box
			.search_icon
				text-align center
				display inline-block
				width 90rpx 
				height 80rpx
				line-height 80rpx
				color #bbb
				border 1px solid #ddd
				box-sizing border-box
				
		.content
			padding 20rpx
			.clock_item
				border-bottom 1px solid #dddddd
				padding 20rpx
				display flex
				justify-content flex-start
				.clock_img
					width 230rpx 
					height 180rpx
					margin-right 50rpx
					img
						width 100%
						height 100%
				.cont
					font-size 24rpx
					color #999
				.cont_title
					font-size 28rpx
					color #111111
				.cont_detail
					padding 2rpx 4rpx
					border 1px solid #fc642d
					background-color #fff7f4
					margin 32rpx 0
					text-align center
				.cont_text
					color #555
					.fuhao
						margin 0 20rpx
</style>