import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    navigationBarTitleText: '打卡排行榜',
    navigationBarBackgroundColor: '#5acb9a'
  }
}
