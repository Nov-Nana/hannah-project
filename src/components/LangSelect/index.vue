<script setup lang='ts'>
import { icon } from '@/plugins'
import { useI18n } from 'vue-i18n';
import { useSettingStore } from '@/store/modules/settingStore/settingStore'
import { LanguageEnum } from '@/enums/styleEnum';

const { LanguageOutline } = icon.ionicons5
const settingStore = useSettingStore()
const options = [
    {
        label: '中文',
        key: "zh"
    },
    {
        label: 'English',
        key: "en"
    }
]
const { locale } = useI18n()
const handleSelect = (key: LanguageEnum) => {
    locale.value = key
    settingStore.changeLang(key)
}
</script>
<template>
    <n-dropdown trigger="click" :options="options" @select="handleSelect" :show-arrow="true">
        <n-button quaternary>
            <n-icon size="20" depth="1">
                <LanguageOutline></LanguageOutline>
            </n-icon>
        </n-button>
    </n-dropdown>

</template>
<style lang='scss' scoped></style>