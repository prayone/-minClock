<template>
	<div class="new_clock">
		<div class="header">
			<p class="active_title">活动名称</p>
			<input class="active_input" type="text" placeholder="输入活动标题">
		</div>
		<div class="content">
			<p class="active_title">隐私设置</p>
			<radio-group class="radio-group" @change="radioChange">
			  <label class="radio" v-for=" item in RadioItems" :key='item'>
			  	<p class="radio_detail">
			  		<radio class='' :value="item.name" :checked="item.checked"/>
				    {{item.value}}
				    <span class="remark">{{item.remark}}</span>
			  	</p>
			  </label>
			</radio-group>
		</div>
		<div class="footer">
			<div>
				<p class="active_title">开启报名费</p>
				<p class="entry_fee">
					<span class="fee_text">是否开启报名费</span>
					<switch  @change="switch1Change"/>
				</p>
			</div>
		</div>
		<div class="btn">
			<button class="clock_btn">创建打卡</button>
		</div>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				RadioItems: [
				      {name: '1', value: '公开',remark: '任何人都可以参与,且有机会被小打卡推荐', checked: 'true'},
				      {name: '2',remark: '必须群主邀请才可以参与,成员邀请需群主审核', value: '私密'}
				    ]
			}
		},
		methods:{
			radioChange: function(e) {
			    console.log('radio发生change事件，携带value值为：', e.mp.detail.value)
			},
			switch1Change: function(e) {
			    console.log('radio发生change事件，携带value值为：', e.mp.detail.value)
			}
		}
	}
</script>
<style lang='stylus'>
	.new_clock
		padding 0 28rpx
		font-size 24rpx
		.active_title
			font-size 28rpx
			color #000
			margin 40rpx 0 20rpx 0
		.active_input
			border 1px solid #ddd
			padding 4rpx 24rpx 
			border-radius 5rpx
		.content
			margin 70rpx 0
			.radio_detail
				margin-bottom 20rpx 
				.remark
					margin-left 15rpx
					font-size 22rpx
					color #999
		.footer
			margin-bottom 150rpx	
			.entry_fee
				display flex
				justify-content space-between
				.fee_text
					color #777777
		.btn
			.clock_btn
				width 80%
				margin 0 auto
				background-color #5acb9a
				color #fff
</style>