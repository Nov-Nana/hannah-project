<script setup lang='ts'>
import { useSettingStore } from '@/store/modules/settingStore/settingStore'
import {SettingStoreEnums} from '@/enums/settingEnum'
import { toRefs } from 'vue';

const {getAsideCollapsedWidth} = toRefs(useSettingStore())
const settings = useSettingStore()
// 折叠
const setCollapsed = (value: boolean) => {
    settings.setItem(SettingStoreEnums.ASIDE_ALL_COLLAPSED, value)
}
</script>
<template>
    <n-layout-sider bordered collapse-mode="width" show-trigger="bar" :collapse-width="getAsideCollapsedWidth"
        :native-scrollbar="false" @collapse="setCollapsed(true)" @expand="setCollapsed(false)">侧边栏</n-layout-sider>
</template>
<style lang='scss' scoped></style>