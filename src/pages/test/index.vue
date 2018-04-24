<template>
	<div class="test">
      <button @click="onStart">开始录音</button>
      <button @click="">结束录音</button>
      <button type="primary" @click="Play">播放</button>
      <button type="primary" @click="stopPlay">stop</button>

      <div class="main_record" v-if="!isRecord">
          <div class="start_record" v-if='start_record'>
            <div class="record_img" @click="onStop">
              <div class="record_mini">
              </div>
            </div>
            <div class="record_info">
              <p class="timer">{{min}}:{{sec}}</p>
              <p class="record_text">录音时长10分钟以内</p>
            </div>
          </div>
          <!-- 播放录音 -->
          <div class="play_record" v-if="play_record">
            <div class="zan-panel zan_panel">
                <div class="zan-cell">
                  <div class="zan-cell__bd flexNone" @click="Play">
                    <div class="play_record_img">
                      <img :src="(playStatus?'/static/img/bofang.gif':'/static/img/play_record.png')" alt="">
                    </div>
                  </div>
                  <div class="zan-cell__bd zan-cell__edit">
                    <div class="zan-cell__text zan-cell__edit">
                      <div class="record_info_play">
                        <p class="timer">{{min}}:{{sec}}</p>
                        <p class="record_text">点击可以播放录音</p>
                      </div>
                    </div>
                  </div>
                  <div class="zan-cell__ft">
                    <div class="remove_record">
                      <p class="remove_text" @click="remove_record">删除</p>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
	</div>
</template>
<script>
const recorderManager = wx.getRecorderManager()
const innerAudioContext = wx.createInnerAudioContext()
var timer
export default{
      data(){
          return {
              record_temp:"",
              start_record:false,
              play_record:false,
              count:0,
              playStatus:false,
          }
      },
      computed:{
          min(){
              let m = parseInt(this.count/60) 
              if(m!=10){
                m = "0"+ m
              }
              return m
          },
          sec(){
              let s = this.count % 60
              if(s < 10){
                s = "0" + s
              }
              return s
          }
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