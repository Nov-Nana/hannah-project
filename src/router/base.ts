import { PageEnum } from "@/enums/pageEnum";
import { RouteRecordRaw } from "vue-router";

export const HomeRoute: RouteRecordRaw = {
    path: PageEnum.BASE_HOME,
    name: PageEnum.BASE_HOME_NAME,
    component: () => import('@/views/home/index.vue'),
    meta: {
        title: 'Home',
        activeMenuName: 'Home'
    }
}

export const LoginRoute: RouteRecordRaw = {
    path: PageEnum.BASE_LOGIN,
    name: PageEnum.BASE_LOGIN_NAME,
    component: ()=>import('@/views/login/index.vue'),
    meta: {
        title: 'Login',
        activeMenuName: 'Login'
    }
}