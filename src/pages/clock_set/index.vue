<template>
	<div class="clock_set">
		<div class="zan-panel zan_panel">
	      <div class="zan-cell">
	        <div class="zan-cell__bd"><span class="zan-icon zan-icon-sign"></span>每日打卡提醒</div>
	      </div>
	      <div class="zan-cell">
	        <div class="zan-cell__bd"><span class="imgIcon imgIcon2"></span>提醒开启状态</div>
	        <div class="zan-cell__ft"><switch  @change="switch1Change"/></div>
	      </div>
	      <div :class="access">
	        <div class="zan-cell__bd"><span class="imgIcon imgIcon3"></span>微信提醒通知时间</div>
	        <div class="zan-cell__ft">
	        	<picker v-if='picker' mode="time" :value="time" start="06:00" end="23:00" @change="bindTimeChange">
				    <view class="picker">
				      {{time}}
				    </view>
				</picker>
				<div v-if='!picker'>
					{{time}}
				</div>
	    	</div>
	      </div>
	      <div class="remind">开启提醒后，每日打卡，第二天再提醒时间微信可接收到消息通知。</div>
	      <form @submit="FormSubmit" report-submit="true">
		      <div class="all_btn" v-if='picker'>
		      	<button>取消</button>
		      	<button class="save" formType="submit" @click="save">保存</button>
		      </div>
 		  </form>

	    </div>
	    <div class="btn zan-btns">
	    	<button class="zan-btn zan-btn--danger" @click='remove'>删除并退出打卡</button>
	    </div>
	</div>
</template>
<script>
	import  ajax  from '../../common/js/ajax.js'
	import  dealFormIds  from '../../common/js/formIds.js'

	export default {
		data(){
			return {
				access:'zan-cell',
				time: '19:00',
				picker:false,
				activityID:'',
				show:true

			}
		},
		onLoad(options){
			this.activityID = this.$root.$mp.query.activityId
			console.log(this.activityID)
		},
		methods:{
			switch1Change: function(e) {
				var that=this
				    console.log('radio发生change事件，携带value值为：', e.mp.detail.value)
				    if(e.mp.detail.value){
				    	that.access = 'zan-cell zan-cell--access'
				    	that.picker=true
				    }else{
				    	that.access = 'zan-cell'	
				    	that.picker=false
				    }
				},
			bindTimeChange: function(e) {
			    console.log('picker发送选择改变，携带值为', e.mp.detail.value)
			    this.time = e.mp.detail.value
			},
			FormSubmit(e){
		        let formId = e.mp.detail.formId;
		        dealFormIds(formId).then(function(formIds){
		        console.log('333====',formIds);
		      })
		    },
			save(){
			      this.show = false

			      var that = this
			      var status;
			      if(that.picker){
			      		status = 1
			      }else{
			      		status = 0
			      }
			      console.log(status)
			      var param = {
			          url: '/v1/miniprogram/set_activity_remind.htm',
			                  data: {
			                    activityId:that.activityID,
			                    remindTime:that.time,
			                    status:status
			                  },
			                  setUpUrl: true,
			      }
			      ajax(param,'memberId').then(function(res){
			            console.log('oooooooooooo',res)
			            if(res.statusCode == 200){
			            } 
			        })

			},
			remove(){
				var that=this
				 var param = {
			          url: '/v1/miniprogram/deleteUser.htm',
			                  data: {
			                    activityId:that.activityID
			                  },
			                  setUpUrl: true,
			      }
			      ajax(param,'memberId').then(function(res){
			            console.log('oooooooooooo',res)
			            if(res.statusCode == 200){
			            	wx.showToast({
							  title: '删除并退出成功',
							  icon: 'success',
							  duration: 2000,
							  success(res){
							  	setTimeout(function(){
									wx.switchTab({
										url:'/pages/index/main'
									})
						  		},1000)
							  }
							})
			            } 
			        })
			},
		}
	}
</script>
<style lang='stylus'> 
	.zan-icon
  		font-size 30rpx
  		color #5acb9a
  		margin-right 20rpx
  	.clock_set
  		.remind
  			font-size 26rpx
  			color #888
  			padding 10rpx 18rpx
  		.btn
  			width 80%
  			margin 90rpx auto
  			.zan-btn
  				height 90rpx
  				line-height 90rpx
  				text-align center 
  				border-radius 10rpx
  	.all_btn
  		text-align center
  		button
  			display inline-block
  			width 100rpx
  			height 60rpx
  			color #888
  			font-size 24rpx
  			padding 0
  			margin 0 40rpx 10rpx 40rpx
  		.save
  			color #5acb9a
</style>