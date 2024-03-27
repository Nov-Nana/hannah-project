<script setup lang='ts'>
import { renderIcon,logout } from '@/utils'
import { icon } from '@/plugins';
import Avatar from '@/assets/avatar.jpg'
import { h, onBeforeUpdate, ref } from 'vue';
import { NAvatar, NIcon, NText } from 'naive-ui';

const { PersonOutline, LogOutOutline } = icon.ionicons5
const hasAvatar = ref(false)

const options = ref([
    {
        label: '我的信息',
        key: 'info',
        type: 'render',
        render: () => {
            return h(
                'div',
                {
                    style: 'display: flex; align-items: center; padding: 8px 12px;'
                },
                [
                    h(NAvatar, {
                        round: true,
                        style: 'margin-right: 12px;',
                        src: Avatar
                    }),
                    h('div', null, [
                        h(NText, { depth: 2 }, { default: () => 'hannah' })
                    ])
                ]
            )
        },
    },
    {
        type: 'divider',
        key: 'divider1'
    },
    {
        label: '退出',
        key: 'logout',
        icon: renderIcon(LogOutOutline)

    }
])

function handleSelect(key: string) {
    switch(key){
        case 'logout':
            logout()
            break
    }
}

onBeforeUpdate(() => {
    console.log('ss')
})
</script>
<template>
    <n-dropdown trigger="hover" :show-arrow="true" :options="options" @select="handleSelect">
        <n-button v-if="hasAvatar" quaternary>
            <n-icon size="20" depth="1">
                <PersonOutline></PersonOutline>
            </n-icon>
        </n-button>
        <n-avatar style="cursor: pointer;scale: 0.9;" v-else="!hasAvatar" round object-fit="cover" size="small"
            :src="Avatar" @error="hasAvatar = true"></n-avatar>
    </n-dropdown>
</template>
<style lang='scss' scoped>
.user-info-box {
    cursor: pointer;
    transform: scale(0.7)
}
</style>