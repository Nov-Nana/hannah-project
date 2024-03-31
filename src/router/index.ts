import type { App } from 'vue'
import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'
import { PageEnum } from '@/enums/pageEnum'
import { HomeRoute, LoginRoute,OfficeRoute,projectRoute } from './base'
import {createRouterGuard} from './router-guards'

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
        HomeRoute,
        OfficeRoute,
        projectRoute
    ]

}
const routes: RouteRecordRaw[] = [
    rootRoute,
    LoginRoute,
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})
export function setupRouter(app: App<Element>) {
    app.use(router)
    createRouterGuard(router)
}
export {router}