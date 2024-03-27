<script setup lang='ts'>
import { useSettingStore } from '@/store/modules/settingStore/settingStore'
import Avatar from '@/assets/avatar.jpg'

const settings = useSettingStore()
// 折叠
const setCollapsed = (value: boolean) => {
    settings.setCollapsed(value)
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