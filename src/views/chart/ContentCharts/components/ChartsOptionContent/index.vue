<script setup lang='ts'>
import { reactive, ref, watch } from 'vue';
import { ConfigType } from '@/packages/index.d'
import { loadAsyncComponent } from '@/utils';

const props = defineProps({
    selectOptions: {
        type: Object,
        default: () => {
            return {}
        }
    }
})
const selectValue = ref<string>('all')
type menuOptionsType = {
    key: string,
    label: string
}
const packages = reactive({
    menuOptions: [] as menuOptionsType[], // 侧边栏
    selectionOptions: {}, // 当前选择
    // 分类归档
    categorys: {
        all: [] as ConfigType[]
    },
    categoryNames: {
        all: '所有'
    },
    // 分类归档数量
    categorysNum: 0,
    // 存储不同类别组件进来的选中值
    saveSelectOptions: {}

})
const setSelectOptions = (categorys: any) => {
    for (const val in categorys) {
        packages.selectionOptions = categorys[val]
        break;
    }
}
watch(
    //@ts-ignore
    () => props.selectOptions, (newData: { list: ConfigType[] }) => {
        packages.categorysNum = 0
        if (!newData) return
        newData.list.forEach((e: ConfigType) => {
            const value: ConfigType[] = (packages.categorys as any)[e.category]
            // @ts-ignore
            packages.categorys[e.category] = value && value.length ? [...value, e] : [e]
            // @ts-ignore
            packages.categoryNames[e.category] = e.categoryName
            packages.categorys['all'].push(e)
        })
        for (const val in packages.categorys) {
            packages.categorysNum += 1
            packages.menuOptions.push({
                key: val,
                // @ts-ignore
                label: packages.categoryNames[val]
            })
        }
        setSelectOptions(packages.categorys)
        // 默认选中处理
        selectValue.value = packages.menuOptions[0]['key']
    }, { immediate: true })

const handkeClickItem = (key: string) => {
    // @ts-ignore
    packages.selectionOptions = packages.categorys[key]
}

const ChartsItemBox = loadAsyncComponent(() => import('../ChartsItemBox/index.vue'))
</script>
<template>
    <!-- 侧边栏和数据分发处理 -->
    <div class="get-chart-box">
        <n-menu class="chart-menu-box" v-model:value="selectValue" :options="packages.menuOptions" :icon-size="16"
            :indent="18" @update:value="handkeClickItem">

        </n-menu>
        <div class="chart-content-list">
            <n-scrollbar trigger="none">
                <ChartsItemBox :menuOptions="packages.selectionOptions"></ChartsItemBox>
            </n-scrollbar>
        </div>
    </div>
</template>
<style lang='scss' scoped>
$topHeight: 40px;
$menuWidth: 65px;

@include get(chart-box) {
    display: flex;
    height: calc(100vh - #{$--header-height} - #{$topHeight});

    .chart-menu-box {
        width: $menuWidth;
        flex-shrink: 0;
        @include get-bg-color('background-color2-shallow');
        font-size: 12px;

        .n-menu-item {
            height: 30px !important;
        }
    }

    .chart-content-list {
        width: 200px;
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

}
</style>