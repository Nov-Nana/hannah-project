<script setup lang='ts'>
import { onBeforeUnmount, ref } from 'vue';
import {
    BarChart,
    LineChart,
    PieChart,
    RaddarChart
} from '@/components/Charts'
import { PanelGroup } from '@/components/Home/PanelGroup'
import { TodoList } from '@/components/Home/TodoList'
import { BoxCard } from '@/components/Home/BoxCard'
import { TransactionTable } from '@/components/Home/TransactionTable'

type chartData = {
    newVisits: {
        expectedData: number[];
        actualData: number[];
    };
    messages: {
        expectedData: number[];
        actualData: number[];
    };
    purchases: {
        expectedData: number[];
        actualData: number[];
    };
    shoppings: {
        expectedData: number[];
        actualData: number[];
    };
}

const lineChartDataAll: chartData = {
    newVisits: {
        expectedData: [100, 120, 161, 134, 105, 160, 165],
        actualData: [120, 82, 91, 154, 162, 140, 145]
    },
    messages: {
        expectedData: [200, 192, 120, 144, 160, 130, 140],
        actualData: [180, 160, 151, 106, 145, 150, 130]
    },
    purchases: {
        expectedData: [80, 100, 121, 104, 105, 90, 100],
        actualData: [120, 90, 100, 138, 142, 130, 130]
    },
    shoppings: {
        expectedData: [130, 140, 141, 142, 145, 150, 160],
        actualData: [120, 82, 91, 154, 162, 140, 130]
    }
}
const lineChartData = ref()
lineChartData.value = lineChartDataAll.newVisits

onBeforeUnmount(() => {
    console.log('DASHBOARD')
})

const handleSetLineChartData = (type: 'newVisits' | 'messages' | 'purchases' | 'shoppings') => {
    lineChartData.value = lineChartDataAll[type]
}
</script>
<template>
    <div class="get-dashboard-container">
        <PanelGroup @handleSetLineChartData="handleSetLineChartData"></PanelGroup>
        <div class="dashboard-linechart">
            <LineChart :chart-data="lineChartData"></LineChart>
        </div>
        <n-grid :x-gap="24" cols="1 s:1 m:1 l:3 xl:3 2xl:3" responsive="screen">
            <n-grid-item>
                <div class="chart-wrapper">
                    <RaddarChart></RaddarChart>
                </div>
            </n-grid-item>
            <n-grid-item>
                <div class="chart-wrapper">
                    <PieChart></PieChart>
                </div>
            </n-grid-item>
            <n-grid-item>
                <div class="chart-wrapper">
                    <BarChart></BarChart>
                </div>
            </n-grid-item>
        </n-grid>

        <n-grid :x-gap="24" cols="1 s:2 m:2 l:4 xl:4 2xl:4 " responsive="screen">
            <n-grid-item :span="2">
                <div class="tabele-wrapper">
                    <transaction-table />
                </div>
            </n-grid-item>
            <n-grid-item>
                <TodoList></TodoList>
            </n-grid-item>
            <n-grid-item>
                <BoxCard></BoxCard>
            </n-grid-item>
        </n-grid>
    </div>
</template>
<style lang='scss' scoped>
@include get(dashboard-container) {
    width: 100%;
    padding: 32px;
    @include get-bg-color('background-color2');
    @include get-text-color('color');
    position: relative;

    .dashboard-linechart {
        width: 100%;
        padding: 16px 16px 0;
        margin-bottom: 32px;
        margin-top: 20px;
        @include get-box-shadow('color-item-shadow');
        @include get-bg-color('background-color');

    }

    .chart-wrapper {
        padding: 16px 16px 0;
        margin-bottom: 32px;
        @include get-box-shadow('color-item-shadow');
        @include get-bg-color('background-color');
    }
    .tabele-wrapper{
        @include get-box-shadow('color-item-shadow');
        @include get-bg-color('background-color');
    }
}

@media (max-width: 1024px) {
    .chart-wrapper {
        padding: 8px;
    }
}
</style>@/components/Home/BoxCard