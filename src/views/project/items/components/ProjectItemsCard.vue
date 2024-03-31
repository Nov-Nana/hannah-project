<script setup lang='ts'>
import { icon } from '@/plugins';
import ItemJPG from '@/assets/item.jpg'
import { reactive, ref } from 'vue';
import { renderIcon } from '@/utils';

const t = window['$t']
const { ToolOutlined, EllipsisOutlined, ExpandAltOutlined, CloseOutlined } = icon.antd
const { BrowsersOutline, SendOutline, Trash } = icon.ionicons5

interface Props {
    cardData: any
}
const props = defineProps<Props>()

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
        label: props.cardData?.state
            ? t('global.publish')
            : t('global.unpublish'),
        key: 'send',
        icon: renderIcon(SendOutline)
    },
    {
        label: t('global.delete'),
        key: 'delete',
        icon: renderIcon(Trash)
    }
])
const emits = defineEmits(['edit', 'delete', 'expand'])

function handleSelect(select: string) {
    switch (select) {
        case 'edit':
            emits('edit', props.cardData)
            break;
        case 'delete':
            emits('delete', props.cardData)
            break;
    }
}
function handleClick(type: string) {
    switch (type) {
        case 'expand':
            emits('expand', props.cardData)
            break;
        case 'delete':
            emits('delete', props.cardData)
            break;
    }
}
</script>
<template>
    <div v-if="cardData" vertical class="get-items-list-card">
        <n-flex justify="space-between" class="header">
            <n-icon-wrapper style="cursor: pointer;" :border-radius="50" :size="15" @click="handleClick('expand')">
                <ExpandAltOutlined class="icon"></ExpandAltOutlined>
            </n-icon-wrapper>
            <n-icon-wrapper style="cursor: pointer;" :border-radius="50" :size="15" @click="handleClick('delete')">
                <CloseOutlined class="icon"></CloseOutlined>
            </n-icon-wrapper>
        </n-flex>
        <div class="content">
            <n-image :preview-disabled="true" width="100%" object-fit="cover" :src="ItemJPG"
                :alt="cardData.projectName" />
        </div>
        <n-flex class="footer" justify="space-between">
            <div class="footer-title">{{ cardData.projectName || '' }}</div>
            <n-flex class="footer-tools">
                <n-text>
                    <n-badge dot :color="cardData.state === 1 ? '#34c749' : '#fcbc40'"></n-badge>
                    {{ cardData.state === 1 ? t('global.publish') : t('global.unpublish') }}
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

    }

}


.n-image:not(.n-image--preview-disabled) {
    width: 100% !important;
}
</style>