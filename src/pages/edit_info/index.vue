<template>
	<div class="clock_detail">
		<div class="zan-panel">
	      <div class="zan-cell zan-cell--access">
	        <div class="zan-cell__bd">头像</div>
	        <div class="zan-cell__ft header_img">
	        	<img :src="userInfo_avatarUrl" alt="">
	    	</div>
	      </div>
	      <div class="zan-cell zan-cell--access">
	        <div class="zan-cell__bd">个人主页背景图</div>
	        <div class="zan-cell__ft"></div>
	      </div>
	      <div class="zan-cell zan-cell--access">
	        <div class="zan-cell__bd">名字</div>
	        <div class="zan-cell__ft">{{userInfo_nickName}}</div>
	      </div>
	      <div class="zan-cell zan-cell--access">
	        <div class="zan-cell__bd">微信号</div>
	        <div class="zan-cell__ft"></div>
	      </div>
	      <div class="zan-cell zan-cell--access">
	        <div class="zan-cell__bd">出生日期</div>
	        <div class="zan-cell__ft"></div>
	      </div>
	      <div class="zan-cell zan-cell--access">
	        <div class="zan-cell__bd">性别</div>
	        <div class="zan-cell__ft"></div>
	      </div>
	      <div class="zan-cell zan-cell--access">
	        <div class="zan-cell__bd">个性签名</div>
	        <div class="zan-cell__ft"></div>
	      </div>
	      <div class="zan-cell zan-cell--access">
	        <div class="zan-cell__bd">兴趣标签</div>
	        <div class="zan-cell__ft"></div>
	      </div>
	    </div>
	</div>
</template>
<script>
	import store from '../../store'

	export default {
		data(){
			return {
				userInfo_avatarUrl:'',
				userInfo_nickName:''

			}
		},
		onLoad(options){
			this.userInfo_avatarUrl = this.$root.$mp.query.userInfo.split(',')[1]
			this.userInfo_nickName = this.$root.$mp.query.userInfo.split(',')[0]
			store.state.user_info={}
			console.log(store.state.user_info)
			
		},
		methods:{
			
		}
	}
</script>
<style lang="stylus">
	.header_img
		width 90rpx 
		height 90rpx
		img
			width 100%
			height 100%
			border-radius 50%
</style>