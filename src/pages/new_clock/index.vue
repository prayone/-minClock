<template>
	<div class="new_clock">
		<div class="header">
			<p class="active_title">活动名称</p>
			<input class="active_input" type="text" placeholder="输入活动标题" v-model='active_title'>
		</div>
		<div class="content">
			<p class="active_title">隐私设置</p>
			<radio-group class="radio-group" @change="radioChange">
			  <label class="radio" v-for=" item in RadioItems" :key='item'>
			  	<p class="radio_detail">
			  		<radio class='' :value="item.name" :checked="item.name==isopen"/>
				    {{item.value}}
				    <span class="remark">{{item.remark}}</span>
			  	</p>
			  </label>
			</radio-group>
		</div>
		<div class="btn">
			<button class="clock_btn" @click="creat_clock">创建活动</button>
		</div>
	</div>
</template>
<script>
	import  ajax  from '../../common/js/ajax.js'
	export default {
		data(){
			return {
				active_title:'',
				RadioItems: [
				    {name: '1', value: '公开',remark: '任何人都可以参与,且有机会被小打卡推荐'},
				    {name: '2', value: '私密',remark: '仅群主自己可以参加打卡，且不会被小打卡推荐'}
				    ],
				isopen:1
			}
		},
		onLoad(){
			this.active_title = ''
		},
		methods:{
			radioChange(e) {
			    console.log('radio发生change事件，携带value值为：', e.mp.detail.value)
			    this.isopen = e.mp.detail.value
			    console.log(900,this.isopen)
			},
			creat_clock(){
				var sessionId = wx.getStorageSync('session');
				console.log(999,sessionId)
				var data = {
					activityStatus:this.isopen,
					 activityName:this.active_title,
					 sessionId:sessionId
				}
				var param = {
					url: '/v1/miniprogram/insertActivity.htm',
	                data: data,
	                setUpUrl: true,
				}
				if(this.active_title){
					ajax(param).then(function(res){
						if(res.data.data == 'success'){
							wx.showToast({
							  title: '创建成功',
							  icon: 'success',
							  duration: 2000,
							  success(res){
							  	setTimeout(function(){
							  		wx.switchTab({
									  url: '/pages/index/main'
									})
						  		},1000)
							  }
							})
						}
                	})
				} else {
					wx.showToast({
						  title: '活动名称不能为空',
						  icon: 'none',
						  image: '/static/img/tishi.png',
						  duration: 2000
						})
				}
			}
		}
	}
</script>
<style lang='stylus'>
	.new_clock
		padding 0 28rpx
		font-size 28rpx
		.active_title
			font-size 34rpx
			color #000
			margin 40rpx 0 20rpx 0
		.active_input
			border 1px solid #ddd
			padding 14rpx 24rpx 
			border-radius 5rpx
		.content
			margin 70rpx 0
			.radio_detail
				margin-bottom 20rpx 
				font-size 28rpx
				.remark
					margin-left 15rpx
					font-size 24rpx
					color #999
		.btn
			margin-top 400rpx
			.clock_btn
				width 80%
				margin 0 auto
				background-color #5acb9a
				color #fff
</style>