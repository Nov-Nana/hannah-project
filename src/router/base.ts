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
    component: () => import('@/views/login/index.vue'),
    meta: {
        title: 'Login',
        activeMenuName: 'Login'
    }
}

export const ConfigRoute: RouteRecordRaw = {
    path: PageEnum.BASE_CONFIG,
    name: PageEnum.BASE_CONFIG_NAME,
    component: () => import('@/views/config/index.vue'),
    meta: {
        title: 'Config',
        activeMenuName: 'Config'
    }
}

export const OfficeRoute: RouteRecordRaw = {
    path: PageEnum.OFFICE,
    name: PageEnum.OFFICE_NAME,
    redirect: PageEnum.OFFICE_EXPORT_EXCEL,
    component: () => import('@/views/office/index.vue'),
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
        }, {
            path: PageEnum.OFFICE_UPLOAD_EXCEL,
            name: PageEnum.OFFICE_UPLOAD_EXCEL_NAME,
            component: () => import('@/views/office/UploadExcel.vue'),
            meta: {
                title: 'UploadExcel',
                activeMenuName: 'Office'
            }
        }, {
            path: PageEnum.TABLE_DRAG,
            name: PageEnum.TABLE_DRAG_NAME,
            component: () => import('@/views/office/DraggableList.vue'),
            meta: {
                title: 'DraggableList',
                activeMenuName: 'Office'
            }
        }
    ]


}

export const ProjectRoute: RouteRecordRaw = {
    path: PageEnum.PROJECT,
    name: PageEnum.PROJECT_NAME,
    component: () => import('@/views/project/index.vue'),
    meta: {
        title: 'Project',
        activeMenuName: 'Project'
    },
    children: [
        {
            path: PageEnum.PROJECT_ALL,
            name:PageEnum.PROJECT_ALL_NAME,
            component:()=>import('@/views/project/items/index.vue'),
            meta:{
                title:'AllProject',
                activeMenuName:'Project'
            }
        }
    ]
}

export const OtherRoute: RouteRecordRaw = {
    path: PageEnum.OTHER,
    name: PageEnum.OTHER_NAME,
    component: () => import('@/views/other/index.vue'),
    meta: {
        title: 'Other',
        activeMenuName: 'Other'
    },
    children: [
        {
            name: PageEnum.OTHER_3DHOVEREFFECT_NAME,
            path: PageEnum.OTHER_3DHOVEREFFECT,
            component: () => import('@/views/other/3DHoverEffect.vue'),
            meta: {
                title: '3DHoverEffect',
                activeMenuName: 'Other'
            }
        }
    ]
}