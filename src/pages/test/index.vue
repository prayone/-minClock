<template>
	<div class="test">
      <div class="btn">
        <button @click="luyin">录音</button>
      </div>
      <div class="btn">
        <button @click="over_luyin">停止录音</button>
      </div>
      <view class="text-center">
        <audio id="audio" :src="audio.src" loop="false" controls="true" :poster="audio.poster" :name="audio.name" :author="audio.author" :error="audioError" :play="audioPlay" :eneded="playEnd" :timeupdate="timeUpdate"></audio>
      </view>
      
	</div>
</template>
<script>
  const recorderManager = wx.getRecorderManager()
	export default {
  data () {
    return {
      audioContext:'', 
      audio:{
          poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg',
          name: '此时此刻',
          author: '许巍',
          src: '',
          currentTime:0,
          currtRate:0
      }
    }
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    this.audioContext=wx.createAudioContext('audio');

  },
  methods: {
    luyin(){

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

          //结束录音  

          recorderManager.onStop((res) => {
            console.log('recorder stop', res.tempFilePath)
            that.src=res.tempFilePath
            that.audioContext=wx.createAudioContext('audio');


          })
    },
    over_luyin(){
      
    },
    //以下是状态监听
      audioError:function(resp){
          console.log(resp);
      },
      audioPlay:function(resp){
          console.log(resp);
          console.log('开始播放');
      },
      playEnd:function(resp){
          console.log(resp);
          console.log('播放结束');
      },
      timeUpdate:function(resp){
          this.setData({
              currtRate:(100*resp.detail.currentTime/resp.detail.duration)
          });//总时长
          this.currentTime = resp.detail.currentTime;//当前时长
          console.log(resp);
          console.log('播放进度变化');
      },
      //以下是操作
      play:function(){
          this.audioContext.play();
      },
      pause:function(){
          this.audioContext.pause();
      },
      goFast:function(){
          this.audioContext.seek(this.currentTime+20);
      },                  
   
  },
}
</script>
<style>
	
</style>