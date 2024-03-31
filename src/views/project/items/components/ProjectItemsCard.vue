<script setup lang='ts'>
import { icon } from '@/plugins';
import ItemJPG from '@/assets/item.jpg'
import { PropType, onMounted, reactive, ref } from 'vue';
import { Chartype } from '../index.d'
import { renderIcon } from '@/utils';

const t = window['$t']
const { ToolOutlined, EllipsisOutlined, ExpandAltOutlined, CloseOutlined } = icon.antd
const { BrowsersOutline, SendOutline, Trash } = icon.ionicons5
const props = defineProps({
    cardData: Object as PropType<Chartype>
})

const btnList = reactive([
    {
        label: t('global.edit'),
        key: 'edit',
        icon: renderIcon(ToolOutlined)
    },
    {
        lable: t('global.more'),
        key: 'select',
        icon: renderIcon(EllipsisOutlined)
    }
])
const selectOptions = ref([
    {
        label: t('global.preview'),
        key: 'preview',
        icon: renderIcon(BrowsersOutline)
    },
    {
        label: props.cardData?.release
            ? t('global.unpublish')
            : t('global.publish'),
        key: 'send',
        icon: renderIcon(SendOutline)
    },
    {
        label: t('global.delete'),
        key: 'delete',
        icon: renderIcon(Trash)
    }
])
const emits = defineEmits(['edit', 'delete'])

function handleSelect(select: string) {
    switch (select) {
        case 'edit':
            handleEdit()
            break;
        case 'delete':
            handleDelete()
            break;
    }
}
function handleEdit() {
    emits('edit', props.cardData)
}
function handleDelete() {
    emits('delete', props.cardData)
}
/**
 * CSS 3D Hover Effect
 */
 onMounted(() => {
    set3DHoverEffect()
})
function set3DHoverEffect() {
    const xRang = [-10, 10]
    const yRang = [-10, 10]
    const card: HTMLElement | null = document.querySelector('.get-items-list-card352')
    function getRange(rang: number[], value: number, length: number) {
        return value / length * (rang[1] - rang[0]) + rang[0]
    }
    if (card) {
        card.onmousemove = (e: MouseEvent) => {
            const { offsetX, offsetY } = e
            const { offsetWidth, offsetHeight } = card
            console.log(offsetX, offsetY, offsetWidth, offsetHeight)
            const y = -getRange(yRang, offsetX, offsetWidth)
            const x = getRange(xRang, offsetY, offsetHeight)
            card?.style.setProperty('--x', `${x}deg`)
            card?.style.setProperty('--y', `${y}deg`)
        }
        card.onmouseleave = () => {
            card?.style.setProperty('--x', '0deg')
            card?.style.setProperty('--y', '0deg')
        }
    }
}


</script>
<template>
    <div v-if="cardData" vertical class="get-items-list-card">
        <n-flex justify="space-between" class="header">
            <n-icon-wrapper style="cursor: pointer;" :border-radius="50" :size="15">
                <ExpandAltOutlined class="icon"></ExpandAltOutlined>
            </n-icon-wrapper>
            <n-icon-wrapper style="cursor: pointer;" :border-radius="50" :size="15" @click="handleEdit">
                <CloseOutlined class="icon"></CloseOutlined>
            </n-icon-wrapper>
        </n-flex>
        <div class="content">
            <n-image :preview-disabled="true" height="180px" width="100%" object-fit="cover" :src="ItemJPG"
                :alt="cardData.title" />
        </div>
        <n-flex class="footer" justify="space-between">
            <div class="footer-title">{{ cardData.title || '' }}</div>
            <n-flex class="footer-tools">
                <n-text>
                    <n-badge dot :color="cardData.release ? '#34c749' : '#fcbc40'"></n-badge>
                    {{ cardData.release ? t('project.release') : t('project.unrelease') }}
                </n-text>
                <template v-for="item in btnList" :key="item.key">
                    <template v-if="item.key === 'select'">
                        <n-dropdown trigger="hover" placement="bottom" :options="selectOptions" :show-arrow="true"
                            @select="handleSelect">
                            <n-button size="small">
                                <template #icon>
                                    <component :is="item.icon"></component>
                                </template>
                            </n-button>
                        </n-dropdown>
                    </template>
                    <n-tooltip v-else placement="bottom" trigger="hover">
                        <template #trigger>
                            <n-button size="small" @click="handleSelect(item.key)">
                                <template #icon>
                                    <component :is="item.icon"></component>
                                </template>
                            </n-button>
                        </template>
                        <span>{{ item.label }}</span>
                    </n-tooltip>
                </template>
            </n-flex>
        </n-flex>
    </div>
</template>
<style lang='scss' scoped>
@include get(items-list-card) {
    width: 300px;
    border-radius: 8px;
    @include get-text-color('color');
    transform: perspective(500px) rotateX(var(--x, 0deg)) rotateY(var(--y, 0deg));

    &:hover {
        @include get-box-shadow('color-item-shadow');
    }

    .header {
        padding: 10px;

        .n-icon-wrapper:hover .icon {
            opacity: 1;
            transition: opacity 0.5s;
        }

        .icon {
            opacity: 0;
            transition: opacity 0.5s;
        }
    }

    .content {
        padding: 10px;
        height: 180px;
    }

    .footer {
        padding: 10px;
        border-end-start-radius: 8px;
        border-end-end-radius: 8px;
        @include get-bg-color('background-color2');

        &-title {
            width: 50px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }

        &-tools {}
    }
}

.n-image:not(.n-image--preview-disabled) {
    width: 100% !important;
}
</style>