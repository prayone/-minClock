import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['^pages/index/main', 'pages/find/main', 'pages/mine/main', 'pages/new_clock/main','pages/clock_manager/main','pages/clock_detail/main','pages/edit_info/main','pages/test/main','pages/clock_set/main','pages/billboard/main','pages/calendar/main','pages/publish_diary/main','pages/add_theme/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#5acb9a',
      navigationBarTitleText: '小打卡',
      navigationBarTextStyle: '#ffffff'
    },
    tabBar: {
      backgroundColor:"#fff",
      selectedColor:"#5acb9a",
      list: [
      {
        pagePath: "pages/index/main",
        iconPath: "/static/img/clock.png",
        selectedIconPath: "/static/img/clockpoint.png",
        text: "首页"
      },
      {
        pagePath: "pages/find/main",
        iconPath: "/static/img/find.png",
        selectedIconPath: "/static/img/findpoint.png",
        text: "发现"
      },
      {
        pagePath: "pages/mine/main",
        iconPath: "/static/img/mine.png",
        selectedIconPath: "/static/img/minepoint.png",
        text: "我的"
      }
    ]
  }
  }
}
