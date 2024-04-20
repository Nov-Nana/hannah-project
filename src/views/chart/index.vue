<script setup lang='ts'>
import LayoutHeader from '@/layout/LayoutHeader.vue';
import { UserInfo } from '@/components/UserInfo';
import { loadAsyncComponent } from '@/utils';

// 异步加载组件
const HeaderLeftBtn = loadAsyncComponent(() => import('@/views/chart/ContentHeader/headerLeftBtn/index.vue'))
const HeaderTitle = loadAsyncComponent(() => import('@/views/chart/ContentHeader/headerTitle/index.vue'))
const ContentCharts = loadAsyncComponent(() => import('@/views/chart/ContentCharts/index.vue'))
const ContentLayers = loadAsyncComponent(() => import('@/views/chart/ContentLayers/index.vue'))
const ContentConfigurations = loadAsyncComponent(() => import('@/views/chart/ContentConfigurations/index.vue'))

</script>
<template>
    <!-- 工作台相关 -->
    <div class="get-chart">
        <n-layout>
            <LayoutHeader>
                <template #left>
                    <HeaderLeftBtn></HeaderLeftBtn>
                </template>
                <template #center>
                    <HeaderTitle></HeaderTitle>
                </template>
                <template #right-right>
                    <UserInfo></UserInfo>
                </template>
            </LayoutHeader>
            <n-layout-content content-style="overflow: hidden; display:flex">
                <div style="overflow: hidden; display:flex">
                    <ContentCharts></ContentCharts>
                    <ContentLayers></ContentLayers>
                </div>
                <ContentConfigurations></ContentConfigurations>
            </n-layout-content>
        </n-layout>
    </div>
</template>
<style lang='scss' scoped>
@include get(chart) {
    @include get-bg-image('background-image');
    @include get-text-color('color1');
    height: 100vh;
    width: 100vw;
    overflow: hidden;


}
</style>