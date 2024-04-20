import zh from "@/i18n/zh"
import en from "@/i18n/en"
import {routes} from '@/router'
import { h } from "vue"
import { PageEnum } from "@/enums/pageEnum"
import { RouterLink } from "vue-router"
import { renderIcon } from "@/utils"
import { icon } from "@/plugins"

const { Home, Grid, LogoCss3, Construct } = icon.ionicons5
const { ProfileFilled, FileExcelFilled, FileExcelOutlined, TableOutlined, ProjectFilled,
    ProjectOutlined } = icon.antd
const t = window['$t']
const menu = [
    {
        label: () => {
            return h(
                RouterLink,
                { to: { name: PageEnum.BASE_HOME_NAME } },
                { default: () => t('page.home') }
            )
        },
        key: PageEnum.BASE_HOME_NAME,
        icon: renderIcon(Home)
    },
    {
        label: () => {
            return h(
                RouterLink,
                { to: { name: PageEnum.BASE_CONFIG_NAME } },
                { default: () => t('page.config_router') }
            )
        },
        key: PageEnum.BASE_CONFIG_NAME,
        icon: renderIcon(Construct)
    },
    {
        label: () => h('span', null, { default: () => t('page.office') }),
        key: PageEnum.OFFICE_NAME,
        icon: renderIcon(ProfileFilled),
        children: [
            {
                label: () => h(
                    RouterLink, {
                    to: {
                        name: PageEnum.OFFICE_EXPORT_EXCEL_NAME
                    }
                }, {
                    default: () => t('page.export_excel')
                }
                ),
                key: PageEnum.OFFICE_EXPORT_EXCEL_NAME,
                icon: renderIcon(FileExcelFilled)
            },
            {
                label: () => h(
                    RouterLink, {
                    to: {
                        name: PageEnum.OFFICE_UPLOAD_EXCEL_NAME
                    }
                }, {
                    default: () => t('page.upload_excel')
                }
                ),
                key: PageEnum.OFFICE_UPLOAD_EXCEL_NAME,
                icon: renderIcon(FileExcelOutlined)
            },
            {
                label: () => h(
                    RouterLink, {
                    to: {
                        name: PageEnum.TABLE_DRAG_NAME
                    }
                }, {
                    default: () => t('page.drag_table')
                }
                ),
                key: PageEnum.TABLE_DRAG_NAME,
                icon: renderIcon(TableOutlined)
            }
        ]
    }, {
        label: () => h('span', null, { default: () => t('page.project') }),
        key: PageEnum.PROJECT_NAME,
        icon: renderIcon(ProjectFilled),
        children: [
            {
                label: () => h(
                    RouterLink, {
                    to: {
                        name: PageEnum.PROJECT_ALL_NAME
                    }
                }, {
                    default: () => t('page.all_project')
                }
                ),
                key: PageEnum.PROJECT_ALL_NAME,
                icon: renderIcon(ProjectOutlined)
            },
        ]
    }, {
        label: () => h('span', null, { default: () => t('page.other') }),
        key: PageEnum.OTHER_NAME,
        icon: renderIcon(Grid),
        children: [
            {
                label: () => h(
                    RouterLink, {
                    to: {
                        name: PageEnum.OTHER_3DHOVEREFFECT_NAME
                    }
                }, {
                    default: () => t('page.hover_effect')
                }
                ),
                key: PageEnum.OTHER_3DHOVEREFFECT_NAME,
                icon: renderIcon(LogoCss3)
            },
        ]
    }

]

export const menuSetting = {
    i18n: {
        zh,
        en
    },
    routes,
    menu
}