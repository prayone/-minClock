<template>
	<div class="calendar">
		<div class="statistic">
			<div class="zan-panel zan_panel">
			      <div class="zan-cell">
			        <div class="zan-cell__bd"><span class="zan-icon zan-icon-goods-collect"></span>统计信息</div>
			      </div>
			      <div class="zan-cell">
			        <div class="zan-cell__bd"><span class="imgIcon imgIcon2"></span>加入日期</div>
			        <div class="zan-cell__ft">{{clockMessage.joinDate}}</div>
			      </div>
			      <div class="zan-cell">
			        <div class="zan-cell__bd"><span class="imgIcon imgIcon3"></span>已打卡天数</div>
			        <div class="zan-cell__ft">{{clockMessage.clockDays}}天</div>
			      </div>
			      <div class="zan-cell">
			        <div class="zan-cell__bd"><span class="imgIcon imgIcon4"></span>当月打卡天数</div>
			        <div class="zan-cell__ft">{{clockMessage.clockMonthDays}}天</div>
			      </div>
			    </div>
		</div>
		<div class="my_calendar">
			<div class="zan-panel zan_panel">
			      <div class="zan-cell">
			        <div class="zan-cell__bd"><span class="zan-icon zan-icon-description"></span>我的打卡日历</div>
			      </div>
			</div>
			<div class="clock_calendar">
				   <Calendar v-on:choseDay="clickDay" v-on:changeMonth="changeDate"  :markDate="clockTimer_arr"></Calendar>
			</div>
		</div>
		<div class="my_diary">
      <div class="zan-panel zan_panel">
            <div class="zan-cell">
              <div class="zan-cell__bd"><span class="zan-icon zan-icon-description"></span>打卡日记列表</div>
            </div>
      </div>
			<div class="diary_item">
          <div class="diary">
            <div class="diary_img">
              <img src="/static/img/header.jpg">
            </div>
            <div class="userinfo_diary">
              <p class="nickName">nickName</p>
              <p class="diary_timer"><span class="timer">2018-4-1</span><span class="">已坚持6天</span></p>
            </div>
          </div>
          <div class="diary_detail">
            今天的任务是学习日语
          </div>
      </div>
		</div>
	</div>
</template>
<script>
  import  ajax  from '../../common/js/ajax.js'
  import Calendar from '../../components/calendar/calendar.vue'
	export default {
      components:{
        Calendar
      },
      data () {
        return {
          clockTimer_arr:[],
          activityId:'',
          clockMessage:{},
          memberId:''
        }
      },
      onLoad(options){
          this.activityId = this.$root.$mp.query.activityId
          this.memberId = wx.getStorageSync('memberId');
          var that = this

          var active_de_param = {
            url: '/v1/miniprogram/clockMessage.htm',
                    data: {
                      activityId:that.activityId,
                      memberId:that.memberId
                    },
                    setUpUrl: true,
          }
          ajax(active_de_param).then(function(res){
              console.log('uuuuuuuuuuu',res)
              that.clockMessage = res.data.data
              that.clockTimer_arr = res.data.data.clockCalendars
              console.log(that.clockTimer_arr)

          })

      },
      methods: {
        clickDay(data) {
          console.log(data); //选中某天
        },
        changeDate(data) {
          console.log(data); //左右点击切换月份
        },
        clickToday(data) {
          console.log(data); //跳到了本月
        }
      }
}
</script>
<style lang='stylus'> 
  	.zan-icon
  		font-size 30rpx
  		color #5acb9a
  		margin-right 20rpx
		.my_calendar
        padding-top 10rpx  
        position relative
        &::after
          position absolute
          width 100%
          left 0
          top 0
          background-color #f3f3f3
          height 12rpx
          content ''  
    .my_diary
        position relative
        &::after
          position absolute
          width 100%
          left 0
          top 0
          background-color #f3f3f3
          height 12rpx
          content '' 
      .diary
        font-size 34rpx
        padding 45rpx 30rpx 0 30rpx
        display flex
        justify-content flex-start
        align-items center
        .diary_img
          width 80rpx
          height 80rpx
          margin-right 40rpx
          img
            width 100%
            height 100%
            border-radius 50%
        .userinfo_diary
          .nickName
            color #5acb9a
            font-size 28rpx
          .diary_timer
            color #888
            font-size 24rpx
            margin-top 10rpx
            .timer
              margin-right 30rpx
      .diary_detail
        font-size 28rpx
        color #444
        padding 30rpx
</style>