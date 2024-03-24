import { createApp } from 'vue'
import App from './App.vue'
import { setupNaive } from './plugins'
import { setupStore } from './store'
import { setupRouter,router } from './router'
import '@/styles/common/style.scss'

async function appInit(){
    const app = createApp(App)
    // 注册全局常用的 naive-ui 组件
    setupNaive(app)
    // 挂在状态管理
    setupStore(app)
    // 挂在路由
    setupRouter(app)
    await router.isReady()

    app.mount('#app')
}

appInit().then(()=>{
    // initFunction()
})
