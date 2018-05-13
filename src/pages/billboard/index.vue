<template>
	<div class="billboard">
		<div class="header_pic">
			<img src="/static/img/yd.png" alt="">
		</div>
		<div class="content">
			<div class="zan-panel zan_panel">
		      <div class="zan-cell">
		      	<div class="zan-cell__bd flexNone">
		        	<div class="img_icon" >
		        		<img src="/static/img/a1.png" alt="">
		        	</div>
		        </div>
		      	<div class="zan-cell__bd flexNone">
		        	<div class="zan-cell__text">
		        		<div class="img">
		        			<img src="/static/img/header.jpg" alt="">
		        		</div>
		        	</div>
		        </div>
		        <div class="zan-cell__bd">
		        	<div class="zan-cell__text">prayone</div>
          			<div class="zan-cell__desc">13:07:09</div>
		        </div>
		        <div class="zan-cell__ft">10分</div>
		      </div>
		      <div class="zan-cell">
		        <div class="zan-cell__bd flexNone">
		        	<div class="img_icon" >
		        		<img src="/static/img/a2.png" alt="">
		        	</div>
		        </div>
		      	<div class="zan-cell__bd flexNone">
		        	<div class="zan-cell__text">
		        		<div class="img">
		        			<img src="/static/img/header.jpg" alt="">
		        		</div>
		        	</div>
		        </div>
		        <div class="zan-cell__bd">
		        	<div class="zan-cell__text">prayone</div>
          			<div class="zan-cell__desc">13:07:09</div>
		        </div>
		        <div class="zan-cell__ft">9分</div>
		      </div>
		      <div class="zan-cell">
		        <div class="zan-cell__bd flexNone">
		        	<div class="img_icon" >
		        		<img src="/static/img/a3.png" alt="">
		        	</div>
		        </div>
		      	<div class="zan-cell__bd flexNone">
		        	<div class="zan-cell__text">
		        		<div class="img">
		        			<img src="/static/img/header.jpg" alt="">
		        		</div>
		        	</div>
		        </div>
		        <div class="zan-cell__bd">
		        	<div class="zan-cell__text">prayone</div>
          			<div class="zan-cell__desc">13:07:09</div>
		        </div>
		        <div class="zan-cell__ft">8分</div>
		      </div>
		    </div>
		</div>	
	</div>
</template>
<script>
	import  ajax  from '../../common/js/ajax.js'
	export default {
		data(){
			return{
				activityId:'',
				ranking:[]
			}
		},
		onLoad(options){
			this.activityID = this.$root.$mp.query.activityId
			this.showUser()

		},
		methods:{
			showUser(){
		        var that = this
		        var param = {
		            url: '/v1/miniprogram/v1/clock_ranking.htm',
		                    data: {
		                      activityId:that.activityID
		                    },
		                    setUpUrl: true,
		        }
		        ajax(param).then(function(res){
		              console.log('dairydairydairy',res)
		              if(res.statusCode == 200){
		                that.ranking = res.data.data
		                console.log('that.ranking====',that.ranking)
		              } 
		          })
		  	},
		}

	}
</script>
<style lang='stylus'> 
	.header_pic
		width 400rpx
		height 90rpx
		margin 28rpx auto
		img
			width 100%
			height 100%
	.flexNone
		flex none
		margin-right 10rpx

	.img_icon
		width 50rpx
		height 50rpx
		img
			width 100%
			height 100%
	.img
		width 70rpx
		height 70rpx
		img
			width 100%
			height 100%
			border-radius 50%
	
</style>