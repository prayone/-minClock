<template>
	<div class="test">
		<!-- <div class="record">
			<button @click="record">录音</button>
    	<button @click="play_record">播放录音</button>
		</div>
    <view class="container">
        <button @click="bindButtonTap">获取视频</button>
        <video :src="src"></video>
    </view> -->
    <div class="ss">
        <button @click="new_record">xin录音</button>
    </div>
    <div class="audio1">
      <audio  :src="src" class="audio"></audio>
    </div>
	</div>
</template>
<script>
const recorderManager = wx.getRecorderManager()
	export default {
  data () {
    return {
      tempFilePath:'',
      src:'/static/1.mp3'
    }
  },
  methods: {
  new_record(){
    var that=this
      const options = {
        duration: 10000,
        sampleRate: 44100,
        numberOfChannels: 1,
        encodeBitRate: 192000,
        format: 'mp3',
        frameSize: 50
      }

      recorderManager.start(options)

      setTimeout(function() {
        //结束录音  
        recorderManager.onStop((res) => {
          console.log('recorder stop', res)
          that.src=res.tempFilePath
          console.log(that.src)
        })
      }, 1000)
  },                      
    record(){
      var that=this
      wx.startRecord({
        success: function(res) {
          that.tempFilePath = res.tempFilePath 
          wx.showModal({
            title: '提示',
            content: that.tempFilePath,
            success: function(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        },
        fail: function(res) {
           wx.showModal({
            title: '提示',
            content: "失败",
            success: function(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      })
      setTimeout(function() {
        //结束录音  
        wx.stopRecord()
      }, 1000)
    },
    play_record(){
      console.log(this.tempFilePath)
       wx.playVoice({
        filePath: this.tempFilePath,
        complete: function(){
          console.log(88)
        }
      })
    },
    bindButtonTap: function() {
        var that = this
        wx.chooseVideo({
            sourceType: ['album','camera'],
            maxDuration: 60,
      camera: 'back',
            success: function(res) {
                that.src = res.tempFilePath
                 wx.showModal({
                  title: '提示',
                  content: that.src,
                  success: function(res) {
                    if (res.confirm) {
                      console.log('用户点击确定')
                    } else if (res.cancel) {
                      console.log('用户点击取消')
                    }
                  }
                })
            }
        })
    }
  
  },
}
</script>
<style>
	/*.test
		padding 20rpx
	// button
	// 	width 80%
	// 	margin 10rpx auto*/
    .audio{
      width: 100%;
      height: 400rpx;
    }
        
</style>