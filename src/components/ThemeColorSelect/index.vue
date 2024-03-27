<script setup lang='ts'>
import { Ref, computed, onBeforeMount, ref } from 'vue';
import { icon } from '@/plugins'
import { InfiniteScroll } from '@/components/InfiniteScroll'
import designColor from '@/settings/designColor.json'
import designColorRecommend from '@/settings/designColorRecommend.json'
import { ColorInfo } from './index.d'
import ColorCard from './ColorCard.vue'
import { useDesignStore } from '@/store/modules/designStore/designStore'
import {AppThemeColorType} from '@/store/modules/designStore/designStore.d'
const t = window['$t']
const { ColorWandOutline, CloseOutline } = icon.ionicons5
const splitNumber = 50
const designColorSplit: Ref<ColorInfo[] | undefined> = ref()
let index: number = 0
onBeforeMount(() => {
    index++
    //@ts-ignore
    designColorSplit.value = designColor.slice(0, splitNumber)
})
const getMoreData = (num: number) => {
    if (num >= designColor.length) return
    index++
    //@ts-ignore
    designColorSplit.value = designColor.slice(0, index * splitNumber)
}

const modalShow = ref(false)
const designStore = useDesignStore()
const appThemeDetail = computed(() => designStore.getAppThemeDetail)
function changeThemeColor(item: AppThemeColorType){
    designStore.setAppColor(item)
}
</script>
<template>
    <n-button quaternary title="颜色" @click="modalShow = true">
        <n-icon size="20" depth="1">
            <ColorWandOutline></ColorWandOutline>
        </n-icon>
    </n-button>
    <n-modal v-model:show="modalShow">
        <div class="get-theme-color-select">
            <n-flex :wrap="false" justify="space-between" class="theme-color-top">
                <span>
                    {{ t('global.color_theme_title') }}
                </span>
                <n-icon size="25" class="theme-color-top-close" @click="modalShow = false">
                    <CloseOutline></CloseOutline>
                </n-icon>
            </n-flex>
            <n-divider />
            <div class="theme-color-content">
                <InfiniteScroll :data="designColorSplit" @getMoreData="getMoreData">
                    <template v-slot:content="slotProps">
                        <n-grid style="padding: 5px 0; width: 80%" :x-gap="4" :y-gap="18"
                            cols="1 s:2 m:2 l:3 xl:3 2xl:3" responsive="screen">
                            <n-grid-item span="1" v-for="item in designColorRecommend" :key="item.hex">
                                <ColorCard :item="item" @changeThemeColor="changeThemeColor"></ColorCard>
                            </n-grid-item>
                            <n-grid-item span='4'>
                                <n-divider />
                            </n-grid-item>
                            <n-grid-item span="1" v-for="item in slotProps.list" :key="item.hex">
                                <ColorCard :item="item" @changeThemeColor="changeThemeColor"></ColorCard>
                            </n-grid-item>
                        </n-grid>
                        <n-flex vertical class="current-color-box">
                            <span v-if="appThemeDetail" class="name">{{ appThemeDetail.name }}</span>
                            <span v-else class="name">中国色</span>
                            <span v-if="appThemeDetail" class="pinyin">BIKONLV</span>
                            <div v-if="appThemeDetail" class="color" :style="{backgroundColor: appThemeDetail.hex}"></div>
                        </n-flex>
                    </template>
                </InfiniteScroll>
            </div>
            <div class="theme-color-footer">
                {{ t('global.color_theme_footer') }}
                <n-a href="http://zhongguose.com" target="_blank">http://zhongguose.com</n-a>
            </div>
        </div>
    </n-modal>
</template>
<style lang='scss' scoped>
@include get(theme-color-select) {
    position: relative;
    width: 90%;
    height: 85vh;
    padding: 20px 25px;
    border-radius: 15px;
    overflow: hidden;
    left: 5%;

    @include get-bg-color('filter-color');
    @include get-box-shadow('filter-color-shallow');
    backdrop-filter: $--filter-blur-base;

    .theme-color-top {
        height: 1rem;
        font-size: 1.2rem;

        &-close {
            cursor: pointer;
        }
    }

    .theme-color-content {
        position: relative;
        height: calc(100% - 6rem);

        .current-color-box {
            position: absolute;
            bottom: 0px;
            right: 5px;
            width: 20%;
            height: 100%;
            align-items: center;

            .name {
                text-align: center;
                font-size: 6rem;
                margin-bottom: 1rem;
            }

            .pintin {
                font-size: .5rem;
            }

            .color {
                margin-top: 1rem;
                width: 50%;
                height: 2rem;
            }

        }

    }

    .theme-color-footer {
        height: 1rem;
        text-align: center;
        line-height: 3.5rem;
    }
}

@media screen and (min-width: 1124px) {
    .current-color-box {
        padding: 0 2rem !important;

        .name {
            font-size: 7rem !important;
        }
    }
}

@media screen and (max-width: 820px) {
    .current-color-box {
        .name {
            font-size: 5rem !important;
        }
    }
}

@media screen and (max-width: 542px) {
    .current-color-box {
        .name {
            font-size: 3rem !important;
        }
    }
}

@media screen and (max-width: 380px) {
    .current-color-box {
        .name {
            font-size: 2rem !important;
        }
    }
}
</style>