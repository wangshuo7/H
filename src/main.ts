import { createApp } from 'vue'
import './style.less'
import App from './App.vue'
import axios from 'axios'
// 引入路由
import router from './router'
// 引入 element plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
// 引入 vue-i18n
import i18n from './utils/i18n'
// 引入normalize.css
import 'normalize.css'
// 引入 pinia
import { createPinia } from 'pinia'
// 引入 vue-toastification
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import { TostOptions } from './utils/toast'
const pinia = createPinia()
import { useCollapseStore } from './store/collapse'

const app = createApp(App)
app.config.globalProperties.$axios = axios

app
  .use(router)
  .use(ElementPlus)
  .use(i18n)
  .use(pinia)
  .use(Toast, TostOptions)
  .mount('#app')
  
const collapseStore = useCollapseStore()
const isMobile = window.innerWidth < 780
collapseStore.setCollapse(isMobile)