import { ChartEnum } from "@/enums/pageEnum";
import { RouteRecordRaw } from "vue-router";

const ChartRoutes: RouteRecordRaw = {
    path: ChartEnum.CHART_HOME,
    name: ChartEnum.CHART_HOME_NAME,
    component: () => import("@/views/chart/index.vue"),
    meta:{
        title: 'Work Space',
        isRoot: true,
        noKeepAlive: true,
    }
}

export default ChartRoutes;