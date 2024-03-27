<script setup lang='ts'>
import {icon} from '@/plugins'
import {useDesignStore} from '@/store/modules/designStore/designStore'
import {setHTMLTheme} from '@/utils'

const {Moon,SunnyOutline} = icon.ionicons5
const designStore = useDesignStore()

const changeTheme = ()=>{
    designStore.changeTheme()
    setHTMLTheme()
}

</script>
<template>
    <n-button quaternary @click="changeTheme" title="主题">
        <n-icon size="20" depth="1">
            <SunnyOutline v-if="designStore.getDarkTheme"></SunnyOutline>
            <Moon v-else></Moon>
        </n-icon>
    </n-button>
</template>
<style lang='scss' scoped></style>