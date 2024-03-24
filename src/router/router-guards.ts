import { PageEnum } from "@/enums/pageEnum";
import { loginCheck } from "@/utils";
import { Router } from "vue-router";

export function createRouterGuard(router: Router) {
    // 路由前置
    router.beforeEach(async (to, _from, next) => {

        // 没登录
        if (!loginCheck()) {
            if (to.name === PageEnum.BASE_LOGIN_NAME) {
                return next()
            }
            return next({ name: PageEnum.BASE_LOGIN_NAME })
        }
        next()
    })

    // 路由后置
    router.afterEach((_to, _, _failure) => {

    })

    // 路由错误
    router.onError((error) => {
        console.log(error,'路由错误')
    })
}