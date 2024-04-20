import { createApp } from 'vue'
import App from './App.vue'
import { setupNaive,setupCustomComponents } from './plugins'
import { setupStore } from './store'
import { setupRouter, router } from './router'
import i18n from './i18n'
import 'vue3-sketch-ruler/lib/style.css'

async function appInit() {
    const app = createApp(App)
    // 注册全局常用的 naive-ui 组件
    setupNaive(app)
    // 注册全局自定义组件
    setupCustomComponents(app)
    // 挂载状态管理
    setupStore(app)
    // 挂载路由
    setupRouter(app)
    await router.isReady()
    // 
    // 国际化
    app.use(i18n)
    app.mount('#app')
}

appInit().then(() => {
    // initFunction()
})
