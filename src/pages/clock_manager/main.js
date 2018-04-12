import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    navigationBarTitleText: '打卡管理',
    navigationBarBackgroundColor: '#5acb9a'
  }
}
