<script setup lang='ts'>
import { ConfigType } from '@/packages/index.d';
import { icon } from '@/plugins';
import { useChartLayoutStore } from '@/store/modules/chartLayoutStore';
import { ChartLayoutStoreEnum, ChartModeEnum } from '@/store/modules/chartLayoutStore/chartLayoutStore.d';
import { isString } from '@/utils';
import { computed, onBeforeMount, ref } from 'vue';


const { SearchOutlined } = icon.antd
const { Grid, Albums } = icon.ionicons5
const props = defineProps({
    menuOptions: {
        type: Array,
        default: () => []
    }
})

const chartModeList = [
    { label: '单列', icon: Albums, value: ChartModeEnum.SINGLE },
    { label: '双列', icon: Grid, value: ChartModeEnum.DOUBLE }
]
const chartLayoutStore = useChartLayoutStore()
const chartMode = computed(() => {
    return chartLayoutStore.getChartType
})
const changeChartModeType = (value: ChartModeEnum) => {
    chartLayoutStore.setItem(ChartLayoutStoreEnum.CHART_TYPE, value)
}

let allComponentList = [] as ConfigType[]
// 组件数组
const handleListFormate = (options: any[]) => {
    const arr = []
    for (const item of options) {
        arr.push(...item.list)
    }
    allComponentList = arr
}
onBeforeMount(() => {
    handleListFormate(props.menuOptions)
})

const isFocus = ref<boolean>(false)
const handleFocus = (val: boolean) => {
    isFocus.value = val
    if (!val) {
        handleClose()
    }
}

const loading = ref<boolean | undefined>(undefined)
const showPopover = ref<boolean>(false)
const search = ref<string | null>(null)
const searchRes = ref([] as ConfigType[])
const handleClose = () => {
    loading.value = undefined
    showPopover.value = false
    search.value = null
    searchRes.value = []
}
const handleSearch = (key: string | null) => {
    if (!isString(key) || !key.length) {
        handleClose()
        return
    }
    loading.value = true
    showPopover.value = true
    searchRes.value = allComponentList.filter(((item: ConfigType) => {
        return !item.disabled && (!key || item.title.toLowerCase().includes(key.toLowerCase()))
    }))
    setTimeout(() => {
        loading.value = undefined
    }, 500)
}

const getImage = (pk: string, url: string) => {
    return new URL(`../../../../../assets/images/chart/${pk}/${url}`, import.meta.url).href
}

</script>
<template>
    <div class="get-chart-search">
        <div class="chart-search" :class="{ 'chart-search-focus': isFocus }">
            <n-popover :show-arrow="false" :show="showPopover" :to="false" trigger="hover" placement="bottom-start">
                <template #trigger>
                    <n-input-group>
                        <n-input size="small" placeholder="搜索组件" v-model:value.trim="search" :loading="loading"
                            @focus="handleFocus(true)" @blur="handleFocus(false)" @update:value="handleSearch">
                            <template #suffix>
                                <n-icon v-show="!loading">
                                    <SearchOutlined></SearchOutlined>
                                </n-icon>
                            </template>
                        </n-input>
                    </n-input-group>
                </template>

                <div class="search-list-box">
                    <n-scrollbar style="max-width: 500px">
                        <n-empty v-show="!searchRes.length" size="small" scription="没有找到组件">
                        </n-empty>
                        <div class="list-item" v-for="(item) in searchRes" :key="item.key" :title="item.title">
                            <n-icon v-if="item.icon" class="list-img" :component="item.icon" size="48"></n-icon>
                            <img v-else class="list-item-img" :src="getImage(item.package, item.image)" alt="图片" />
                            <n-text class="list-item-fs" depth="2">{{ item.title }}</n-text>
                        </div>
                    </n-scrollbar>

                </div>
            </n-popover>
        </div>
        <n-button-group class="chart-btn-group" :class="{ 'btn-group-focus': isFocus }">
            <n-button ghost size="small" :type="chartMode === item.value ? 'primary' : 'tertiary'"
                v-for="(item) in chartModeList" :key="item.value" @click="changeChartModeType(item.value)">
                <n-tooltip trigger="hover" :show-arrow="false">
                    <template #trigger>
                        <n-icon size="14" :component="item.icon">
                        </n-icon>
                    </template>
                    {{ item.label }}
                </n-tooltip>
            </n-button>
        </n-button-group>
    </div>
</template>
<style lang='scss' scoped>
$width: 98px;
$searchWidth: 175px;

@include get(chart-search) {
    display: flex;

    .chart-search {
        width: $width;
        margin-right: 10px;
        transition: width .5s ease;

        &.chart-search-focus {
            width: $searchWidth;
        }

        .n-icon {
            margin-top: -7px;

        }

        .search-list-box {
            width: 163px;

            .list-item {
                z-index: 2;
                position: relative;
                cursor: pointer;
                padding: 2px;
                padding-left: 6px;
                margin-bottom: 5px;

                &-fs {
                    font-size: 12px;
                }

                &-img {
                    height: 20px;
                    max-width: 30px;
                    margin-right: 5px;
                    border-radius: 5px;
                }

                &>svg {
                    min-width: 20px;
                    min-height: 20px;
                    margin-right: 5px;
                }

                &:hover {
                    &::before {
                        content: '';
                        position: absolute;
                        width: 3px;
                        height: 100%;
                        left: 0;
                        top: 0;
                        border-radius: 2px;
                    }

                    &::after {
                        z-index: -1;
                        content: '';
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        opacity: 0.1;
                        left: 0;
                        top: 0;
                        border-radius: 5px;
                    }
                }
            }
        }
    }

    .chart-btn-group {
        width: 68px;
        overflow: hidden;
        display: flex;
        transition: width .5s ease;

        &.btn-group-focus {
            width: 0px;
        }

    }
}
</style>