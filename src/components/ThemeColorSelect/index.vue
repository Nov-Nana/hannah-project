<script setup lang='ts'>
import { Ref, onBeforeMount, ref } from 'vue';
import { icon } from '@/plugins'
import { InfiniteScroll } from '@/components/InfiniteScroll'
import designColor from '@/settings/designColor.json'
import { ColorInfo } from './index.d'

const t = window['$t']
const { ColorWandOutline, CloseOutline } = icon.ionicons5
const splitNumber = 50
const designColorSplit: Ref<Array<ColorInfo> | undefined> = ref()
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
</script>
<template>
    <n-button title="颜色" @click="modalShow = true">
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
                        <n-grid style="padding: 5px 0;" :x-gap="4" :y-gap="18" cols="2 s:2 m:2 l:4 xl:4 2xl:4" responsive="screen">
                            <n-grid-item span="1" v-for="item in slotProps.list" :key="item.hex">
                                <div class="color-card-box">
                                    {{ item.name }}

                                </div>
                            </n-grid-item>
                        </n-grid>
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

        .color-card-box {
            width: 80%;
            height: 70px;
            padding: 10px 20px;
            cursor: pointer;
            border-radius: 5px;
            @include get-bg-color('color-item-bg');
            @include get-color-box-shadow('color-item-shadow');

            &:hover {
                @include hover-border-color('background-color5')
            }
        }

    }

    .theme-color-footer {
        height: 1rem;
        text-align: center;
        line-height: 3.5rem;
    }
}
</style>