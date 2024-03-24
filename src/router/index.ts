import type { App } from 'vue'
import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'
import { PageEnum } from '@/enums/pageEnum'
const Layout = () => import('../layout/index.vue')
const rootRoute: RouteRecordRaw = {
    path: '/',
    name: 'Root',
    redirect: PageEnum.BASE_HOME,
    component: Layout,
    meta: {
        title: 'Root'
    },
    children:[
        {
            path: PageEnum.BASE_HOME,
            name: PageEnum.BASE_HOME_NAME,
            component: () => import('@/views/home/index.vue'),
            meta: {
                title: 'Home',
                activeMenuName: 'Home'
            }
        }
    ]

}
const routes: RouteRecordRaw[] = [
    rootRoute
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})
export function setupRouter(app: App<Element>) {
    app.use(router)
}
export {router}