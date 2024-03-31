<script setup lang='ts'>
import { ref, watch } from 'vue';
import ItemJPG from '../../../../assets/item.jpg'
import { icon } from '@/plugins';
import screenfull from 'screenfull';

const t = window['$t']
const props = defineProps({
    modalShow: {
        type: Boolean,
        required: true
    },
    cardData: {
        type: Object,
        required: true
    }
})
const emits = defineEmits(['close', 'edit'])
const { LineOutlined, FullscreenOutlined, ToolOutlined } = icon.antd
const showRef = ref(props.modalShow)
const fullRef = ref()
watch(() => props.modalShow, (newVal) => {
    showRef.value = newVal
})
function handleClick(type: string) {
    switch (type) {
        case 'expand':
            screenfull.isFullscreen ? screenfull.exit() : screenfull.request()
            fullRef.value = !fullRef.value
            break;
        case 'close':
            emits('close')
            break;
        case 'edit':
            emits('edit',props.cardData)
    }
}
</script>
<template>
    <n-modal v-model:show="showRef" :mask-closable="false">
        <div class="get-preview">
            <n-flex class="btn-box">
                <n-icon-wrapper :border-radius="50" :size="17" @click="handleClick('expand')">
                    <FullscreenOutlined class="icon"></FullscreenOutlined>
                    <!-- <FullscreenExitOutlined v-else class="icon"></FullscreenExitOutlined> -->
                </n-icon-wrapper>
                <n-icon-wrapper :border-radius="50" :size="17" @click="handleClick('close')">
                    <LineOutlined class="icon"></LineOutlined>
                </n-icon-wrapper>
            </n-flex>
            <div class="img-box">
                <n-image :preview-disabled="true" width="100%" object-fit="cover" :src="ItemJPG"
                    :alt="cardData?.projectName" />
            </div>
            <n-flex justify="space-between" class="info-box">
                <n-text>{{ cardData?.createTime }}</n-text>
                <n-flex>
                    <n-text>
                        <n-badge dot :color="cardData.state === 1 ? '#34c749' : '#fcbc40'"></n-badge>
                        {{ cardData.state === 1 ? t('global.publish') : t('global.unpublish') }}
                    </n-text>
                    <n-tooltip placement="bottom" trigger="hover">
                        <template #trigger>
                            <n-button size="small" @click="handleClick('edit')">
                                <template #icon>
                                    <ToolOutlined></ToolOutlined>
                                </template>
                            </n-button>
                        </template>
                        <span>{{ t('global.edit') }}</span>
                    </n-tooltip>
                </n-flex>
            </n-flex>
        </div>
    </n-modal>
</template>
<style lang='scss' scoped>
@include get(preview) {
    position: relative;
    width: 80%;
    height: 95vh;
    border-radius: 8px;
    overflow: hidden;
    left: 10%;
    @include get-bg-color('background-color1');

    .btn-box {
        height: calc($--header-height/2);
        padding: 10px;

        .n-icon-wrapper {
            cursor: pointer;
        }

        .n-icon-wrapper:hover .icon {
            opacity: 1;
            transition: opacity 0.5s;
        }

        .icon {
            opacity: 0;
            transition: opacity 0.5s;
        }
    }

    .img-box {
        margin: 10px;
        border-radius: 8px;
        overflow: hidden;
        height: calc(100% - 90px);
    }

    .info-box {
        @include get-bg-color('background-color2');
        height: 60px;
        padding: 10px;

        .n-text {
            @include get-text-color('color1');

        }
    }
}
</style>