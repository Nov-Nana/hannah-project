<script setup lang='ts'>
import { useSettingStore } from '@/store/modules/settingStore/settingStore'
import Avatar from '@/assets/avatar.jpg'
import { RouterLink, useRoute } from 'vue-router';
import { computed, h, reactive } from 'vue';
import { PageEnum } from '@/enums/pageEnum';
import { icon } from '@/plugins';
import { renderIcon } from '@/utils';

const settings = useSettingStore()
// 折叠
const setCollapsed = (value: boolean) => {
    settings.setCollapsed(value)
}
const route = useRoute()
const menuValue = computed(() => route.name)
const { Home, Grid, LogoCss3 } = icon.ionicons5
const { ProfileFilled, FileExcelFilled, FileExcelOutlined, TableOutlined, ProjectFilled,
    ProjectOutlined } = icon.antd
const menuOptions = menuOptionsInit()

function menuOptionsInit() {
    const t = window['$t']
    return reactive([
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

    ])
}
</script>
<template>
    <n-layout-sider :collapsed="settings.getCollapsed" bordered collapse-mode="width" show-trigger="bar"
        :native-scrollbar="false" @collapse="setCollapsed(true)" @expand="setCollapsed(false)">
        <div class="get-sider-box">
            <n-flex class="sider-top" vertical justify="space-between">
                <slot name="avatar">
                    <n-avatar :src="Avatar" :style="{ transform: settings.getCollapsed ? 'scale(0.7)' : 'scale(1.5)' }"
                        size="large" round bordered object-fit="cover"></n-avatar>
                </slot>
                <div :style="{ display: settings.getCollapsed ? 'none' : 'block' }">
                    <slot name="title">
                        hannah
                    </slot>
                </div>
            </n-flex>
            <n-menu :value="menuValue" :options="menuOptions">
            </n-menu>
        </div>
    </n-layout-sider>
</template>
<style lang='scss' scoped>
@include get(sider-box) {

    .sider-top {
        align-items: center;
        padding: 25px;

        .n-avatar {
            transition: all 0.3s ease-out;
        }
    }
}
</style>