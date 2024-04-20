<script setup lang='ts'>
import { icon } from '@/plugins'

const { ChevronBackOutline } = icon.ionicons5

defineProps({
    title: String,
    showTop: {
        type: Boolean,
        default: true
    },
    showBottom: {
        type: Boolean,
        default: false
    },
    backIcon: {
        type: Boolean,
        default: false
    },
    depth: {
        type: Number,
        default: 1
    },
    flex: {
        type: Boolean,
        default: false
    }
})
const emits = defineEmits(['back'])
const handleBack = () => {
    emits('back')
}

</script>
<template>
    <!-- 每个小模块的公共样式 -->
    <div class="get-content-box" :class="[`bg-depth${depth}`, flex && 'flex']">
        <n-flex v-if="showTop" class="top" justify="space-between" :wrap="false" >
            <n-flex :wrap="false">
                <n-ellipsis>
                    <n-text>{{ title }}</n-text>
                </n-ellipsis>
                <div class="top-icon">
                    <slot name="icon"></slot>
                </div>
            </n-flex>
            <n-flex :wrap="false">
                <slot name="top-right"></slot>
                <n-icon v-show="backIcon" size="20" style="cursor: pointer;" @click="handleBack">
                    <ChevronBackOutline></ChevronBackOutline>
                </n-icon>
            </n-flex>
        </n-flex>

        <div class="content"
            :class="{ 'content-height-top-bottom': showBottom || showTop, 'content-height-show-both': showBottom && showTop }">
            <n-scrollbar>
                <slot></slot>
            </n-scrollbar>
        </div>

        <n-flex v-if="showBottom" justify="space-between" :wrap="false" class="bottom">
            <slot name="bottom"></slot>
        </n-flex>

        <div class="aside">
            <slot name="slot"></slot>
        </div>
    </div>
</template>
<style lang='scss' scoped>
$topOrBottomHeight: 40px;

@include get(content-box) {
    height: calc(100vh - #{$--header-height});
    margin: 1px;
    margin-bottom: 0;

    &.bg-depth0 {
        @include get-bg-color('background-color1');

        .bottom,
        .top {
            @include get-bg-color('background-color1');
        }
    }

    &.bg-depth1 {
        @include get-bg-color('background-color1');

        .bottom,
        .top {
            @include get-bg-color('background-color2');
        }
    }

    &.bg-depth2 {
        @include get-bg-color('background-color2');

        .bottom,
        .top {
            @include get-bg-color('background-color3');
        }
    }

    &.bg-depth3 {
        @include get-bg-color('background-color3');

        .bottom,
        .top {
            @include get-bg-color('background-color4');
        }
    }

    &.flex {
        flex: 1;
    }

    .top,
    .bottom {
        height: $topOrBottomHeight;
        align-items: center;
        padding: 0 10px;
        // border-top: 1px solid;
    }

    .top {
        &-icon {
            margin-left: -8px;
            margin-top: 2px;
        }
    }

    .content {
        height: calc(100vh - #{$--header-height});
        overflow: hidden;
    }


    .aside {
        position: relative;
    }

    .content-height-top-bottom {
        height: calc(100vh - #{$--header-height} - #{$topOrBottomHeight});
    }

    .content-height-show-both {
        height: calc(100vh - #{$--header-height} - #{$topOrBottomHeight} - #{$topOrBottomHeight});
    }
}
</style>