import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    navigationBarTitleText: '官方打卡班级',
    enablePullDownRefresh: true,
    backgroundTextStyle:"dark"
    
  }
}
