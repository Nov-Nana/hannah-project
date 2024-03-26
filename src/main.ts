import { createApp } from 'vue'
import App from './App.vue'
import { setupNaive } from './plugins'
import { setupStore } from './store'
import { setupRouter,router } from './router'
import i18n from './i18n'

async function appInit(){
    const app = createApp(App)
    // 注册全局常用的 naive-ui 组件
    setupNaive(app)
    // 挂在状态管理
    setupStore(app)
    // 挂在路由
    setupRouter(app)
    await router.isReady()
    // 国际化
    app.use(i18n)

    app.mount('#app')
}

appInit().then(()=>{
    // initFunction()
})
