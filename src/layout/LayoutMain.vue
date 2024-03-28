<script setup lang='ts'>
import LayoutSider from './LayoutSider.vue'
import LayoutHeader from './LayoutHeader.vue';
import {UserInfo} from '@/components/UserInfo'
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import {useSettingStore} from '@/store/modules/settingStore/settingStore'
import { onMounted } from 'vue';

const route = useRoute()
const key = computed(() => route.meta.activeMenuName)

const settingStore = useSettingStore()

onMounted(()=>{
    // 监控窗口大小变化
    window.addEventListener('resize', handleResize)
})
const windoWWidth = ref(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth)
function handleResize(){
    // 更新响应式属性
    windoWWidth.value = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    // 设置侧边栏宽度
    if(windoWWidth.value < 1200){
        settingStore.setCollapsed(true)
    }
}
</script>
<template>
    <n-layout has-sider position="absolute">
        <LayoutSider></LayoutSider>
        <n-layout>
            <LayoutHeader>
                <template #left>
                    <span></span>
                </template>
                <template #center>
                    <span></span>
                </template>
                <template #right-right>
                    <UserInfo></UserInfo>
                </template>
                
            </LayoutHeader>
            <n-layout-content>
                <router-view>
                    <template #default="{ Component, route }">
                        <component v-if="route.meta.noKeepAlive" :is="Component" :key="key"></component>
                        <KeepAlive v-else>
                            <component :is="Component" :key="key"></component>
                        </KeepAlive>
                    </template>
                </router-view>
            </n-layout-content>
        </n-layout>
    </n-layout>

</template>
<style lang='scss' scoped></style>