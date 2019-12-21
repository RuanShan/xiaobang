// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import 'weui/dist/style/weui.css'
import '@/assets/common/css/base2.css'
import '@/assets/game/sample/css/game.css'
//import '@/assets/game/zhaobaba/css/skin.css'

/* eslint-disable no-new */
new Vue({
  render: h => h(App)
}).$mount('#app')
