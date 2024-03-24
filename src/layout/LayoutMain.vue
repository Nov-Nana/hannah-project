<script setup lang='ts'>
import LayoutSider from './LayoutSider.vue'
import LayoutHeader from './LayoutHeader.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const key = computed(() => route.meta.activeMenuName)
</script>
<template>
    <n-layout has-sider position="absolute">
        <LayoutSider></LayoutSider>
        <n-layout>
            <LayoutHeader>
                <template #left>
                    left
                </template>
                <template #center>
                    center
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