<template>
	<div class="test">
    <video id="myVideo" src="https://oss-ysx-video.yunshuxie.com/video/2018/05/10/15/1525937334644.mp4" controls></video>
      
	</div>
</template>
<script>

export default{
      data(){
          return {
             aa:'https://oss-ysx-video.yunshuxie.com/video/2018/05/10/15/1525937334644.mp4'
          }
      },
      computed:{
         
      },
      methods:{
          // 录音开始
          onStart(){
              var that = this
              const options = {
                  duration: 600000,
                  sampleRate: 44100,
                  numberOfChannels: 1,
                  encodeBitRate: 192000,
                  format: 'mp3',
                  frameSize: 50
              }
              recorderManager.start(options);
              recorderManager.onStart(() => {

                  that.start_record = true
                  timer = setInterval(()=>{
                      this.count++
                  },1000)
                  console.log('recorder start')
              })
          },

          onStop(){
              var that = this
              recorderManager.stop();
              recorderManager.onStop((res) => {
              clearInterval(timer)

              that.start_record = false
              that.play_record = true
              that.record_temp = res.tempFilePath

              })
          },
          Play(){
            var that = this
            innerAudioContext.src = that.record_temp
            if(that.playStatus){
                that.playStatus = !that.playStatus
                innerAudioContext.stop()
            } else {
                that.playStatus = !that.playStatus
                innerAudioContext.play()
                innerAudioContext.onEnded(() => {
                    that.playStatus = false
                })
            }
          }
      },
        
    }
</script>
<style lang='stylus'>
 img
   width 100%
   height 100%
 .main_record
      padding 20rpx 0
    .start_record
      display flex
      justify-content flex-start 
      align-items center
      padding 0 20rpx
      .record_img
        width 50rpx
        height 50rpx
        border 1px solid #ddd
        border-radius 50%
        padding 10rpx
        margin-right 28rpx
        .record_mini
          width 50rpx
          height 50rpx
          border-radius 50%
          background-color red
      .record_text
        font-size 24rpx
        color #888
    .play_record
      .record_info_play
        color #999
        position relative
        top -26rpx
      .flexNone 
        flex none
        border 1px solid #bbb
        margin-right 15rpx
        padding 20rpx
      .zan-cell__bd
      .play_record_img
        width 50rpx
        height 50rpx
      .remove_text
        border 1px solid red
        font-size 28rpx
        padding 10rpx 20rpx
        border-radius 5rpx
</style>