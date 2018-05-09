<template>
	<div class="find">
		<div class="header">
			<div class="search">
				<input type="text" class="input" placeholder="请输入搜索内容" v-model='keywords'>
				<span class="zan-icon zan-icon-search search_icon" @click='search'></span>
			</div>
		</div>
		<div class="content">
			<div class="active_big" v-for = "active in active_lists" :key='active'>
				<div class="clock_item" @click='jump_detail(active.activityId)'>
		           <div class="clock_img">
		              <img :src="active.activityCoverPic" alt="">
		           </div>
		           <div class="cont">
		               <p class="cont_title">{{active.activityName}}</p>
		               <p class="cont_detail">
		                 	坚持打卡每一天
		               </p>
		               <p class="cont_text">
		               	<span>{{active.activityUserCount}}人参加</span>
		               	<span class="fuhao">|</span>
		               	<span>{{active.clockCount}}次打卡</span>
		               </p>
		           </div>
		      	</div>
			</div>
		</div>
	</div>
</template>
<script>
import  ajax  from '../../common/js/ajax.js'
export default{
	data(){
		return {
			page:1,
			hasMoreData:true,
			active_lists:[],
			keywords:''
		}
	},
	onShow(){
		this.page = 1,
		this.hasMoreData = true,
		this.active_lists = [],
		this.keywords = ''

      	this.search()
  	},
	methods:{
		jump_detail(activityId){
			wx.navigateTo({ url:'../active_detail/main?activityId=' + activityId })
		},
		search(){
		  	var that = this
	      	var keywords = this.keywords
	      	console.log('keywords',keywords)
	      	var param = {
	          	url: '/v1/miniprogram/findSearchActivitys.htm',
              	data: {
              		page:that.page,
          			activityName:keywords
             	},
              	setUpUrl: true,
	        }
	        wx.showLoading({
			  	title: '加载中',
			})
	      	ajax(param).then(function(res){
	      		wx.hideLoading()
	            console.log('fffffffff',res)
	            var active_lists_Tem = that.active_lists
	            if(res.statusCode == 200){
            		if(that.page == 1){
	              		active_lists_Tem = []
	            	}
	            	var active_lists = res.data.data.findSearchActivitys
	            	if(active_lists < 10){
	            		that.active_lists = active_lists_Tem.concat(active_lists)
	            		that.hasMoreData = false
	            	} else {
	            		that.active_lists = active_lists_Tem.concat(active_lists)
	            		that.hasMoreData = true
	            		that.page++
	            	}
	            } 
	       })
		},
		find(){
			this.search()
		}
	},
	onUnload(){
		
	},
	 /**
   * 页面上拉触底事件的处理函数
   */
  	onReachBottom: function () {
	    if (this.hasMoreData) {
	    	this.search()
	    } else {
	      	wx.showToast({
	       		 title: '没有更多数据',
	      	})
	    }
  	},
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