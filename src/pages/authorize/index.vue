<template>
	<div class="authorize">
		<div class="header">
			<div class="img">
				<img src="/static/img/authorize.png" alt="">
			</div>
			<p class="authorize_fail">授权失败</p>
			<p class="text">拒绝授权后，您将无法使用该小程序的部分功能</p>
		</div>
		<div class="content">
			<div class="cont_img">
				<img src="/static/img/weixin1.png" alt="">
			</div>
			<p class="notice">点击下方<span class="notice_span">“重新授权”</span>按钮，按图示打开授权</p>
		</div>
		<div class="footer">
			<!-- <button class="button" @click="reAuthorize">重新授权</button> -->
			<button type="primary" open-type="getUserInfo" @getuserinfo="getUserInfo" @click='aa'>微信授权</button>
		</div>
	</div>
</template>
<script>
	import  ajax  from '../../common/js/ajax.js'
	export default{
		data(){
			memberId:''
		},
		onLoad(){
      		this.getSession(this.getUserInfo())


		},
		methods:{
			// reAuthorize(){
			// 	wx.authorize({
	  //               scope: 'scope.record'
	  //           })
	  //           wx.authorize({
	  //               scope: 'scope.userLocation'
	  //           })
	  //           wx.openSetting({

	  //           })
			// },
			  // 获取session
			    getSession (callback) {
			      wx.login({
			        success: function(res) {
			          console.log('code......',res.code)
			           if (res.code) {
			             var param = {
			                  url: '/v1/miniprogram/login.htm',
			                  data: { code: res.code },
			                  setUpUrl: true,
			                }
			                ajax(param).then(function(res){
			                    console.log('session----',res.data.data)
			                    wx.setStorageSync('session', res.data.data);
			                    callback && callback()
			                })
			          } else {
			            console.log('登录失败！' + res.errMsg)
			          }
			        }
			      })
			    },
			 getUserInfo () {
			      // 调用登录接口
			      var that=this
			      console.log('0000000000000000')
			          wx.getUserInfo({
			            withCredentials:true,
			            success: (res) => {
			                  global.user_info = res.userInfo
			                  that.userInfo = res.userInfo
			                  console.log('--------',that.userInfo)
			                  var sessionId = wx.getStorageSync('session');
			                  var param = {
			                        url: '/v1/miniprogram/decrypt_user_info.htm',
			                        setUpUrl: true,
			                        data: {
			                          encryptedData: res.encryptedData,
			                          iv: res.iv,
			                          sessionId: sessionId
			                        },
			                      } 
			                  ajax(param).then(function(res){
			                      console.log('resresresres------',res)
			                      console.log('memberId------',res.data.data.memberId)
			                      wx.setStorageSync('memberId', res.data.data.memberId);
			                      that.memberId = wx.getStorageSync('memberId');
			                      if(res.data.data.memberId){
			                      	console.log(that.memberId)
			                      }

			                  },function(err){
			                      console.log('err',err)
			                      that.getSession(function (){
			                        that.getUserInfo ()
			                      })

			                  })
			                wx.switchTab({
									url:'/pages/index/main'
								})

			            },
			            fail(err){
			                  console.log(err)
			                  wx.navigateTo({url:'../authorize/main'})
			            }
			          })
			        },
			        aa(){
			        	wx.navigateTo({url:'../index/main?memberId'})
			        }
		}
	}
	
</script>
<style lang='stylus'>
	page 
		background-color #f7f7f7
	.authorize
		font-size 24rpx 
		.img
			width 250rpx
			height 250rpx
			margin 30rpx auto
			img
				width 100%
				height 100%
		.authorize_fail
			text-align center
			font-size 34rpx
			color #666
			margin-bottom 30rpx
		.text
			color #999
			text-align center
			margin-bottom 70rpx
		.content
			.cont_img
				width 90%
				height 300rpx
				margin 10rpx auto
				border 1px solid #5acb9a
				img
					width 100%
					height 100%
			.notice
				padding 10rpx 40rpx
				color #444
				.notice_span
					color #5acb9a
		.footer
			position fixed
			bottom 0
			width 100%
			color #fff
			.button
				background-color #5acb9a
				border-radius 0
				color #fff
</style>