<script setup lang='ts'>
import { ConfigType } from '@/packages/index.d';
import { useChartLayoutStore } from '@/store/modules/chartLayoutStore';
import { ChartModeEnum } from '@/store/modules/chartLayoutStore/chartLayoutStore.d'
import { PropType, computed } from 'vue';


defineProps({
    menuOptions: {
        type: Array as PropType<ConfigType[]>,
        default: () => []
    }
})

const getImage = (pk: string, url: string) => {
    return new URL(`../../../../../assets/images/chart/${pk}/${url}`, import.meta.url).href
}

const chartLayoutStore = useChartLayoutStore()

const chartMode = computed(() => {
    return chartLayoutStore.getChartType
})
</script>
<template>
    <div class="get-content-charts-item-wrapper">
        <div class="get-charts-item-box" ref="chartsItemBoxRef"
            :class="[chartMode === ChartModeEnum.DOUBLE ? 'double' : 'single']">
            <div class="item-box" v-for="(item) in menuOptions" :key="item.title" draggable>
                <div class="list-header">
                    <slot>
                        <div class="list-btn-box"></div>
                    </slot>
                    <n-text class="list-header-text" :depth="3">
                        <n-ellipsis>{{ item.title }}</n-ellipsis>
                    </n-text>
                </div>
                <n-flex justify="center" class="list-center">
                    <n-icon v-if="item.icon" class="list-img" :component="item.icon" size="48"></n-icon>
                    <img v-else class="list-img" :src="getImage(item.package, item.image)" alt="图片" />
                </n-flex>
                <div class="list-bottom">
                    <n-text class="list-bottom-text" depth="3">
                        <n-ellipsis style="max-width: 90%">{{ item.title }}</n-ellipsis>
                    </n-text>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang='scss' scoped>
/* 列表项宽度 */
$itemWidth: 100%;
$maxItemWidth: 180px;
$halfItemWidth: 46%;
/* 内容高度 */
$centerHeight: 100px;
$halfCenterHeight: 50px;

@include get(content-charts-item-wrapper) {
    padding: 10px;
}

@include get(charts-item-box) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 9px;
    transition: all 0.7s linear;

    .item-box {
        position: relative;
        margin: 0;
        width: $itemWidth;
        overflow: hidden;
        border-radius: 6px;
        cursor: pointer;
        border: 1px solid rgba($color: #000000, $alpha: 0);
        @include get-bg-color('background-color2');

        &:hover {
            @include hover-border-color('background-color4');

        }

        .list-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 2px 15px;
            @include get-bg-color('background-color3');

            &-text {
                font-size: 12px;
                margin-left: 8px;
                user-select: none;
            }
        }

        .list-center {
            padding: 6px 0;
            height: $centerHeight;
            overflow: hidden;

            .list-img {
                height: 90px;
                max-width: 140px;
                border-radius: 6px;
                object-fit: cover;
                transition: all 0.4s;
            }
        }

        .list-bottom {
            display: none;

            .list-bottom-text {
                font-size: 12px;
                padding-left: 5px;
            }
        }
    }

    &.single {
        .item-box {
            transition: all 0.7s;
        }
    }

    &.double {
        .list-header {
            padding: 2px 5px;

            .list-header-text {
                display: none;
            }
        }

        .item-box {
            width: $halfItemWidth;
            max-width: $maxItemWidth;

            .list-img {
                max-width: 76px;
            }
        }

        .list-center {
            height: $halfCenterHeight;
            padding-bottom: 0px;

            .list-img {
                height: calc($halfCenterHeight - 5px);
                width: auto;
                transition: all 0.2s;
                object-fit: cover;
            }
        }

        .list-bottom {
            display: block;
        }
    }
}
</style>