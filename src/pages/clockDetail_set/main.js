import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    navigationBarTitleText: '打卡详情设置',
    navigationBarBackgroundColor: '#5acb9a'
  }
}
