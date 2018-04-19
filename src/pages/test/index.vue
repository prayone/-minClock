<template>
	<div class="test">
      <Calendar
      v-on:choseDay="clickDay"
      v-on:changeMonth="changeDate"
    ></Calendar>
	</div>
</template>
<script>
import Calendar from '../../components/calendar/calendar.vue'
export default {
  components:{
    Calendar
  },
  data () {
    return {
      
    }
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
<style>
	
</style>