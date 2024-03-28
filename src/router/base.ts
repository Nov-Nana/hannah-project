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

export const OfficeRoute: RouteRecordRaw = {
    path: PageEnum.OFFICE,
    name: PageEnum.OFFICE_NAME,
    redirect: PageEnum.OFFICE_EXPORT_EXCEL,
    component: ()=>import('@/views/office/index.vue'),
    meta: {
        title: 'Office',
        activeMenuName: 'Office'
    },
    children: [
        {
            path: PageEnum.OFFICE_EXPORT_EXCEL,
            name: PageEnum.OFFICE_EXPORT_EXCEL_NAME,
            component: () => import('@/views/office/ExportExcel.vue'),
            meta: {
                title: 'ExportExcel',
                activeMenuName: 'Office'
            }
        }
    ]

    
}