<template>
	<div class="test">
      <button @click="onStart">开始录音</button>
      <button @click="onStop">结束录音</button>
      

      <audio   :src="src" id="myAudio" controls loop></audio>

      

      <button type="primary" @click="audioPlay">播放</button>
      <button type="primary" @click="stopPlay">stop</button>
      <!-- <button type="primary" bindtap="audioPause">暂停</button>
      <button type="primary" bindtap="audio14">设置当前播放时间为14秒</button>
      <button type="primary" bindtap="audioStart">回到开头</button> -->
	</div>
</template>
<script>
const recorderManager = wx.getRecorderManager()
const innerAudioContext = wx.createInnerAudioContext('myAudio')

export default{
      data(){
        return {
            record_temp:"",
            src:''
        }
      },
      methods:{
        // 录音开始
        onStart(){
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
              console.log('recorder start')
            })
        },

        onStop(){
          var that = this
          recorderManager.stop();
          recorderManager.onStop((res) => {
            console.log('recorder stop', res.tempFilePath)
            that.record_temp = res.tempFilePath
            innerAudioContext.autoplay = true
            innerAudioContext.src = res.tempFilePath
            innerAudioContext.onPlay(() => {
                console.log('开始播放')
            })
            innerAudioContext.onError((res) => {
                console.log(res.errMsg)
                console.log(res.errCode)
            })
          })
        },
        audioPlay(){
          AudioContext.autoplay = true
          AudioContext.src = this.record_temp
          innerAudioContext.onPlay(() => {
              console.log('开始播放')
          })
          innerAudioContext.onError((res) => {
              console.log(res.errMsg)
              console.log(res.errCode)
          })
        },
        stopPlay(){

        }

        
      },
        
    }
</script>
<style>
	
</style>